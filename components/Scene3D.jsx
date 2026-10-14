"use client";
import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/**
 * Builds ONE solid ribbon polygon from a bent centre-line (a "stroke shape").
 * Previously the mark was assembled from separate boxes that overlapped at
 * every corner — their coincident faces z-fought and the bars poked through
 * each other as the mark rotated (the glitch at the joints). A single
 * extruded polygon per glyph has no overlaps, no coincident faces and clean
 * mitred corners, so the joints can never flicker or tear.
 */
function strokeShape(points, width) {
  const pts = points.map(([x, y]) => new THREE.Vector2(x, y));
  const half = width / 2;
  const segNormals = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const d = pts[i + 1].clone().sub(pts[i]).normalize();
    segNormals.push(new THREE.Vector2(-d.y, d.x)); // left-hand normal
  }
  const left = [];
  const right = [];
  for (let i = 0; i < pts.length; i++) {
    let miter, scale;
    if (i === 0) {
      miter = segNormals[0];
      scale = half;
    } else if (i === pts.length - 1) {
      miter = segNormals[segNormals.length - 1];
      scale = half;
    } else {
      const n0 = segNormals[i - 1];
      const n1 = segNormals[i];
      miter = n0.clone().add(n1).normalize();
      scale = half / Math.max(miter.dot(n0), 0.35); // mitre length, clamped for sharp corners
    }
    left.push(pts[i].clone().addScaledVector(miter, scale));
    right.push(pts[i].clone().addScaledVector(miter, -scale));
  }
  const shape = new THREE.Shape();
  shape.moveTo(left[0].x, left[0].y);
  for (let i = 1; i < left.length; i++) shape.lineTo(left[i].x, left[i].y);
  for (let i = right.length - 1; i >= 0; i--) shape.lineTo(right[i].x, right[i].y);
  shape.closePath();
  return shape;
}

function Glyph({ points, width, color, emissive = 0, z = 0 }) {
  const geometry = useMemo(() => {
    const geo = new THREE.ExtrudeGeometry(strokeShape(points, width), {
      depth: 0.2,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.022,
      bevelSize: 0.016,
      bevelSegments: 3,
    });
    geo.translate(0, 0, -0.1); // centre the extrusion on z = 0
    geo.computeVertexNormals();
    return geo;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <mesh geometry={geometry} position={[0, 0, z]}>
      <meshStandardMaterial
        color={color}
        roughness={0.3}
        metalness={0.32}
        emissive={color}
        emissiveIntensity={emissive}
        polygonOffset
        polygonOffsetFactor={1}
        polygonOffsetUnits={1}
      />
    </mesh>
  );
}

/* Distance the camera needs so the mark always fits the viewport width */
function CameraRig() {
  const { camera, size } = useThree();
  useFrame(() => {
    const aspect = size.width / Math.max(size.height, 1);
    const targetZ = aspect < 0.7 ? 9.6 : aspect < 1.05 ? 7.9 : 6.2;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.06);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* The GreeLogix mark, rebuilt in 3D — it travels the whole scroll journey */
function LogoMark() {
  const group = useRef(null);
  const ring1 = useRef(null);
  const ring2 = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const max = Math.max(document.documentElement.scrollHeight - innerHeight, 1);
    const p = Math.min(scrollY / max, 1); // 0 → 1 across the full page
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, state.pointer.x, 0.04);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, state.pointer.y, 0.04);
    const g = group.current;
    if (!g) return;

    /* --- responsive stage -------------------------------------------------
       Desktop: mark lives on the right of the hero, then roams.
       Tablet:  smaller roam, kept inside the frame.
       Mobile:  centred above the headline, smaller, never under the text. */
    const w = state.size.width;
    const isMobile = w < 640;
    const isTablet = w >= 640 && w < 1024;
    const baseScale = isMobile ? 0.52 : isTablet ? 0.72 : 1;
    const heroX = isMobile ? 0 : isTablet ? 0.9 : 1.55;
    const roam = isMobile ? 0 : isTablet ? 0.55 : 1.05;
    const heroY = isMobile ? 1.28 : 0.12;

    // Keep the whole mark (radius ≈ 1.6 × scale) inside the frame at all times
    const viewHalf = state.viewport.width / 2;
    const maxX = Math.max(viewHalf - 1.75 * baseScale, 0);

    const journeyX = Math.sin(p * Math.PI * 2.2) * roam;
    const targetX = THREE.MathUtils.clamp(heroX * (1 - p * 1.6) + journeyX + mouse.current.x * (isMobile ? 0.12 : 0.3), -maxX, maxX);
    const targetY = heroY * (1 - p * 2.4) + Math.cos(p * Math.PI * 1.6) * (isMobile ? 0.25 : 0.6) + mouse.current.y * (isMobile ? 0.1 : 0.22);

    g.position.x = THREE.MathUtils.lerp(g.position.x, targetX, 0.045);
    g.position.y = THREE.MathUtils.lerp(g.position.y, targetY, 0.045);
    // Gentle tumble only — capped angles keep the flat mark readable and
    // stop edge-on frames where extruded sides used to clip each other.
    g.rotation.y = Math.sin(t * 0.28) * 0.38 + p * Math.PI * 1.5 + mouse.current.x * 0.18;
    g.rotation.x = Math.sin(t * 0.36) * 0.1 + mouse.current.y * -0.12;
    g.rotation.z = Math.sin(p * Math.PI * 2) * 0.05;
    const s = baseScale * (1 - p * (isMobile ? 0.18 : 0.3));
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, s, 0.05));

    if (ring1.current) { ring1.current.rotation.x = t * 0.22; ring1.current.rotation.y = t * 0.16; }
    if (ring2.current) { ring2.current.rotation.x = -t * 0.16; ring2.current.rotation.z = t * 0.2; }
  });

  return (
    <group ref={group} position={[1.55, 0.12, 0]}>
      <Float speed={1.4} rotationIntensity={0.12} floatIntensity={0.45}>
        {/* Orange G — one solid piece each, corners mitred, nothing overlaps */}
        <Glyph points={[[0.66, 0.86], [-1.18, 0.86], [-0.22, -0.94]]} width={0.19} color="#ff4d1c" emissive={0.5} />
        <Glyph points={[[-0.6, 0.32], [0.38, 0.32], [-0.16, -0.5]]} width={0.15} color="#ff4d1c" emissive={0.38} />
        {/* Cream L — diagonal + foot as a single bent stroke */}
        <Glyph points={[[0.92, 0.86], [0.04, -0.9], [1.32, -0.9]]} width={0.17} color="#f4f1ea" emissive={0.04} />
        {/* Glowing core, parked safely behind the mark's plane */}
        <mesh position={[0.12, -0.08, -0.5]}>
          <icosahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial color="#ff4d1c" emissive="#ff4d1c" emissiveIntensity={1.5} wireframe />
        </mesh>
      </Float>
      {/* Orbit rings */}
      <mesh ref={ring1}><torusGeometry args={[2.0, 0.012, 8, 120]} /><meshBasicMaterial color="#ff4d1c" transparent opacity={0.45} /></mesh>
      <mesh ref={ring2}><torusGeometry args={[2.38, 0.008, 8, 120]} /><meshBasicMaterial color="#f4f1ea" transparent opacity={0.2} /></mesh>
      <Sparkles count={60} scale={[7, 5, 3]} size={2.2} speed={0.35} color="#ff8a5c" opacity={0.65} />
    </group>
  );
}

/* Small satellite objects that keep the logo company on its journey */
function Satellites() {
  const ref = useRef(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.3;
    ref.current.rotation.z = state.clock.elapsedTime * 0.1;
  });
  return (
    <group ref={ref}>
      <Float speed={2} floatIntensity={0.9}>
        <mesh position={[-2.7, 1.35, -1]}>
          <boxGeometry args={[0.26, 0.26, 0.26]} />
          <meshStandardMaterial color="#ffb020" roughness={0.3} metalness={0.3} emissive="#ffb020" emissiveIntensity={0.35} />
        </mesh>
      </Float>
      <Float speed={1.7} floatIntensity={1.1}>
        <mesh position={[2.75, -1.45, -0.8]}>
          <octahedronGeometry args={[0.24, 0]} />
          <meshStandardMaterial color="#34d399" roughness={0.3} metalness={0.3} emissive="#34d399" emissiveIntensity={0.3} />
        </mesh>
      </Float>
      <Float speed={2.3} floatIntensity={0.8}>
        <mesh position={[2.45, 1.75, -1.4]}>
          <torusGeometry args={[0.2, 0.07, 12, 32]} />
          <meshStandardMaterial color="#f4f1ea" roughness={0.35} metalness={0.4} />
        </mesh>
      </Float>
    </group>
  );
}

function Backdrop() {
  const ref = useRef(null);
  useFrame((state) => {
    if (ref.current) { ref.current.rotation.z = state.clock.elapsedTime * 0.03; ref.current.rotation.x = state.clock.elapsedTime * 0.05; }
  });
  return (
    <mesh ref={ref} position={[0, 0, -3.5]}>
      <icosahedronGeometry args={[4.6, 1]} />
      <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.04} />
    </mesh>
  );
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 42, near: 0.1, far: 60 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance", depthWrite: true }}
        resize={{ debounce: { scroll: 50, resize: 120 } }}
      >
        <CameraRig />
        <ambientLight intensity={0.75} />
        <directionalLight position={[4, 5, 6]} intensity={1.6} />
        <pointLight position={[-5, -2, 3]} intensity={12} color="#ff4d1c" />
        <LogoMark />
        <Satellites />
        <Backdrop />
      </Canvas>
      {/* legibility gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(6,6,6,0.55)_100%)]" />
    </div>
  );
}
