"use client";
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/* One bar of the GL monogram, stretched between two points */
function Bar({ from, to, color, w = 0.17, emissive = 0 }) {
  const { pos, rot, len } = useMemo(() => {
    const a = new THREE.Vector2(...from), b = new THREE.Vector2(...to);
    const mid = a.clone().add(b).multiplyScalar(0.5);
    return { pos: [mid.x, mid.y, 0], rot: Math.atan2(b.y - a.y, b.x - a.x), len: a.distanceTo(b) + w };
  }, [from, to, w]);
  return (
    <mesh position={pos} rotation={[0, 0, rot]}>
      <boxGeometry args={[len, w, 0.22]} />
      <meshStandardMaterial color={color} roughness={0.28} metalness={0.35} emissive={color} emissiveIntensity={emissive} />
    </mesh>
  );
}

/* The GreeLogix mark, rebuilt in 3D — it travels the whole scroll journey */
function LogoMark() {
  const group = useRef(null);
  const ring1 = useRef(null);
  const ring2 = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const max = Math.max(document.documentElement.scrollHeight - innerHeight, 1);
    const p = Math.min(scrollY / max, 1); // 0 → 1 across the full page
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, state.pointer.x, 0.05);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, state.pointer.y, 0.05);
    const g = group.current;
    if (!g) return;
    // Journey: centre-stage in hero → drifts side to side, shrinks, keeps spinning gently
    const targetX = Math.sin(p * Math.PI * 2.2) * 2.1 + mouse.current.x * 0.35;
    const targetY = Math.cos(p * Math.PI * 1.6) * 0.7 + mouse.current.y * 0.25;
    g.position.x = THREE.MathUtils.lerp(g.position.x, targetX, 0.045);
    g.position.y = THREE.MathUtils.lerp(g.position.y, targetY, 0.045);
    g.rotation.y = t * 0.22 + p * Math.PI * 3 + mouse.current.x * 0.4;
    g.rotation.x = Math.sin(t * 0.4) * 0.12 + mouse.current.y * -0.25;
    const s = 1 - p * 0.35;
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, s, 0.05));
    if (ring1.current) { ring1.current.rotation.x = t * 0.25; ring1.current.rotation.y = t * 0.18; }
    if (ring2.current) { ring2.current.rotation.x = -t * 0.18; ring2.current.rotation.z = t * 0.22; }
    dt; // silence
  });

  return (
    <group ref={group} position={[1.9, 0.1, 0]}>
      <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.7}>
        {/* Orange G */}
        <Bar from={[-1.25, 0.88]} to={[0.95, 0.88]} color="#ff4d1c" emissive={0.55} />
        <Bar from={[-1.25, 0.88]} to={[-0.12, -0.98]} color="#ff4d1c" emissive={0.55} />
        <Bar from={[-0.78, 0.36]} to={[0.42, 0.36]} color="#ff4d1c" emissive={0.4} w={0.15} />
        <Bar from={[0.42, 0.36]} to={[-0.3, -0.52]} color="#ff4d1c" emissive={0.4} w={0.15} />
        {/* White L */}
        <Bar from={[0.78, 0.88]} to={[-0.02, -0.88]} color="#f4f1ea" w={0.16} />
        <Bar from={[0.32, -0.88]} to={[1.3, -0.88]} color="#f4f1ea" w={0.16} />
        {/* Glowing core */}
        <mesh position={[0.05, -0.05, -0.4]}>
          <icosahedronGeometry args={[0.34, 0]} />
          <meshStandardMaterial color="#ff4d1c" emissive="#ff4d1c" emissiveIntensity={1.6} wireframe />
        </mesh>
      </Float>
      {/* Orbit rings */}
      <mesh ref={ring1}><torusGeometry args={[2.05, 0.012, 8, 120]} /><meshBasicMaterial color="#ff4d1c" transparent opacity={0.5} /></mesh>
      <mesh ref={ring2}><torusGeometry args={[2.45, 0.008, 8, 120]} /><meshBasicMaterial color="#f4f1ea" transparent opacity={0.22} /></mesh>
      <Sparkles count={70} scale={[7, 5, 3]} size={2.2} speed={0.35} color="#ff8a5c" opacity={0.7} />
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
      <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.045} />
    </mesh>
  );
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 z-[1] pointer-events-none" aria-hidden>
      <Canvas camera={{ position: [0, 0, 6.2], fov: 42 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 5, 6]} intensity={1.6} />
        <pointLight position={[-5, -2, 3]} intensity={12} color="#ff4d1c" />
        <LogoMark />
        <Backdrop />
      </Canvas>
      {/* legibility gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(6,6,6,0.55)_100%)]" />
    </div>
  );
}
