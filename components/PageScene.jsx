"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/**
 * A different little 3D world for each page — same scroll-driven DNA as the
 * home logo (drift + rotate + shrink with page progress, mouse parallax),
 * different objects and mood per variant. Always fixed, always behind,
 * never intercepting a click.
 */
function Journey({ children, baseX = 2.1, mobileY = 1.1 }) {
  const group = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const max = Math.max(document.documentElement.scrollHeight - innerHeight, 1);
    const p = Math.min(scrollY / max, 1);
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, state.pointer.x, 0.04);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, state.pointer.y, 0.04);
    const g = group.current;
    if (!g) return;
    const isMobile = state.size.width < 640;
    const isTablet = state.size.width >= 640 && state.size.width < 1024;
    const scale = (isMobile ? 0.55 : isTablet ? 0.75 : 1) * (1 - p * 0.25);
    const targetX = isMobile ? 0 : (baseX * (1 - p * 1.4) + Math.sin(p * Math.PI * 2.4) * (isTablet ? 0.5 : 0.9));
    const targetY = isMobile ? mobileY * (1 - p * 2) : Math.cos(p * Math.PI * 1.8) * 0.55;
    g.position.x = THREE.MathUtils.lerp(g.position.x, targetX + mouse.current.x * 0.25, 0.04);
    g.position.y = THREE.MathUtils.lerp(g.position.y, targetY + mouse.current.y * 0.18, 0.04);
    g.rotation.y = t * 0.16 + p * Math.PI * 2.2;
    g.rotation.x = Math.sin(t * 0.3) * 0.14;
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, scale, 0.05));
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, state.size.width / Math.max(state.size.height, 1) < 0.8 ? 9 : 7, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return <group ref={group} position={[baseX, 0, 0]}>{children}</group>;
}

const std = (color, opts = {}) => (
  <meshStandardMaterial color={color} roughness={0.32} metalness={0.3} transparent opacity={0.92} {...opts} />
);

/* Audit: the readiness ring, a scanning knot and orbiting audit blocks */
function AuditWorld() {
  const orbit = useRef(null);
  useFrame((state) => { if (orbit.current) { orbit.current.rotation.z = state.clock.elapsedTime * 0.5; orbit.current.rotation.x = state.clock.elapsedTime * 0.22; } });
  return (
    <Journey baseX={2.2} mobileY={1.25}>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
        <mesh>
          <torusGeometry args={[1.15, 0.09, 20, 90]} />
          {std("#ff4d1c", { emissive: "#ff4d1c", emissiveIntensity: 0.65 })}
        </mesh>
        <mesh position={[0, 0, -0.3]}>
          <icosahedronGeometry args={[0.52, 0]} />
          {std("#f4f1ea", { wireframe: true, emissive: "#f4f1ea", emissiveIntensity: 0.25 })}
        </mesh>
      </Float>
      <group ref={orbit}>
        <mesh position={[1.7, 0.5, -0.4]}><boxGeometry args={[0.3, 0.3, 0.3]} />{std("#ffb020", { emissive: "#ffb020", emissiveIntensity: 0.35 })}</mesh>
        <mesh position={[-1.6, -0.7, 0.2]}><octahedronGeometry args={[0.26, 0]} />{std("#34d399", { emissive: "#34d399", emissiveIntensity: 0.3 })}</mesh>
        <mesh position={[-0.4, 1.65, -0.6]}><boxGeometry args={[0.2, 0.2, 0.2]} />{std("#f4f1ea")}</mesh>
      </group>
      <Sparkles count={45} scale={[6, 4.5, 2.5]} size={2} speed={0.3} color="#ff8a5c" opacity={0.6} />
    </Journey>
  );
}

/* Portfolio: soft gallery objects drifting like exhibits in light air */
function PortfolioWorld() {
  const orbit = useRef(null);
  useFrame((state) => { if (orbit.current) { orbit.current.rotation.y = state.clock.elapsedTime * 0.35; orbit.current.rotation.z = state.clock.elapsedTime * 0.12; } });
  return (
    <Journey baseX={2.3} mobileY={1.35}>
      <Float speed={1.3} rotationIntensity={0.35} floatIntensity={0.7}>
        <mesh>
          <torusKnotGeometry args={[0.62, 0.2, 110, 14]} />
          {std("#ff4d1c", { roughness: 0.45, emissive: "#ff4d1c", emissiveIntensity: 0.18 })}
        </mesh>
      </Float>
      <group ref={orbit}>
        <mesh position={[1.55, 0.75, -0.5]}><sphereGeometry args={[0.27, 32, 32]} />{std("#779c46", { roughness: 0.5 })}</mesh>
        <mesh position={[-1.5, -0.85, -0.2]}><torusGeometry args={[0.34, 0.11, 14, 40]} />{std("#5470b8", { roughness: 0.5 })}</mesh>
        <mesh position={[-1.15, 1.05, -0.7]}><octahedronGeometry args={[0.24, 0]} />{std("#e0a51f", { roughness: 0.45 })}</mesh>
      </group>
      <Sparkles count={35} scale={[6, 4.5, 2.5]} size={2.4} speed={0.25} color="#ff7a45" opacity={0.45} />
    </Journey>
  );
}

/* Services: a rising stack of building blocks under an orbit ring */
function ServicesWorld() {
  const orbit = useRef(null);
  useFrame((state) => { if (orbit.current) { orbit.current.rotation.z = state.clock.elapsedTime * 0.4; orbit.current.rotation.y = state.clock.elapsedTime * 0.25; } });
  const cube = (pos, size, color, emissive = 0.3) => (
    <mesh position={pos}>
      <boxGeometry args={[size, size, size]} />
      {std(color, { emissive: color, emissiveIntensity: emissive })}
    </mesh>
  );
  return (
    <Journey baseX={2.2} mobileY={1.3}>
      <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.55}>
        {cube([0, -0.85, 0], 0.92, "#2a2a28", 0.05)}
        {cube([0.08, 0.02, 0], 0.7, "#ff4d1c", 0.5)}
        {cube([-0.05, 0.72, 0], 0.48, "#f4f1ea", 0.06)}
        {cube([0, 1.28, 0], 0.28, "#ffb020", 0.45)}
      </Float>
      <group ref={orbit}>
        <mesh><torusGeometry args={[1.85, 0.014, 8, 110]} />{std("#ff4d1c", { transparent: true, opacity: 0.55 })}</mesh>
        <mesh position={[1.85, 0, 0]}><sphereGeometry args={[0.09, 16, 16]} />{std("#ffb020", { emissive: "#ffb020", emissiveIntensity: 0.7 })}</mesh>
        <mesh position={[-1.3, -1.3, 0]}><octahedronGeometry args={[0.14, 0]} />{std("#34d399", { emissive: "#34d399", emissiveIntensity: 0.4 })}</mesh>
      </group>
      <Sparkles count={45} scale={[6, 4.5, 2.5]} size={2} speed={0.3} color="#ff8a5c" opacity={0.6} />
    </Journey>
  );
}

/* AI: a neural knot with orbiting nodes — the AI universe's own object */
function AiWorld() {
  const orbit = useRef(null);
  useFrame((state) => { if (orbit.current) { orbit.current.rotation.y = state.clock.elapsedTime * 0.45; orbit.current.rotation.x = state.clock.elapsedTime * 0.18; } });
  const node = (pos, color, size = 0.09) => (
    <mesh position={pos}><sphereGeometry args={[size, 18, 18]} />{std(color, { emissive: color, emissiveIntensity: 0.8 })}</mesh>
  );
  return (
    <Journey baseX={2.25} mobileY={1.3}>
      <Float speed={1.5} rotationIntensity={0.35} floatIntensity={0.6}>
        <mesh>
          <torusKnotGeometry args={[0.68, 0.21, 120, 16]} />
          {std("#ff4d1c", { emissive: "#ff4d1c", emissiveIntensity: 0.45, roughness: 0.35 })}
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.3, 0]} />
          {std("#f4f1ea", { wireframe: true, emissive: "#f4f1ea", emissiveIntensity: 0.3 })}
        </mesh>
      </Float>
      <group ref={orbit}>
        <mesh><torusGeometry args={[1.8, 0.01, 8, 110]} />{std("#f4f1ea", { transparent: true, opacity: 0.25 })}</mesh>
        {node([1.8, 0, 0], "#ffb020", 0.1)}
        {node([-1.8, 0.1, 0], "#34d399")}
        {node([0.4, 1.55, -0.9], "#ff4d1c")}
        {node([-0.7, -1.6, 0.5], "#f4f1ea", 0.07)}
      </group>
      <Sparkles count={55} scale={[6.5, 4.5, 2.5]} size={2.1} speed={0.35} color="#ff8a5c" opacity={0.65} />
    </Journey>
  );
}

/* Case studies: story pages drifting around a reading ring */
function StoriesWorld() {
  const orbit = useRef(null);
  useFrame((state) => { if (orbit.current) { orbit.current.rotation.y = state.clock.elapsedTime * 0.3; orbit.current.rotation.z = state.clock.elapsedTime * 0.08; } });
  const page = (pos, rot, color, emissive = 0.25) => (
    <mesh position={pos} rotation={rot}>
      <boxGeometry args={[0.85, 1.15, 0.05]} />
      {std(color, { emissive: color, emissiveIntensity: emissive, roughness: 0.5 })}
    </mesh>
  );
  return (
    <Journey baseX={2.25} mobileY={1.3}>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
        {page([-0.55, 0.15, 0], [0.1, -0.35, 0.08], "#f4f1ea", 0.08)}
        {page([0.45, -0.1, -0.25], [-0.06, 0.4, -0.06], "#ff4d1c", 0.5)}
        <mesh position={[0, 0, -0.7]}>
          <icosahedronGeometry args={[0.28, 0]} />
          {std("#ffb020", { wireframe: true, emissive: "#ffb020", emissiveIntensity: 0.5 })}
        </mesh>
      </Float>
      <group ref={orbit}>
        <mesh><torusGeometry args={[1.9, 0.012, 8, 110]} />{std("#ff4d1c", { transparent: true, opacity: 0.5 })}</mesh>
        <mesh position={[1.9, 0, 0]}><sphereGeometry args={[0.09, 16, 16]} />{std("#34d399", { emissive: "#34d399", emissiveIntensity: 0.7 })}</mesh>
        <mesh position={[-1.9, 0.2, 0]}><sphereGeometry args={[0.07, 16, 16]} />{std("#f4f1ea", { emissive: "#f4f1ea", emissiveIntensity: 0.4 })}</mesh>
      </group>
      <Sparkles count={45} scale={[6, 4.5, 2.5]} size={2} speed={0.3} color="#ff8a5c" opacity={0.6} />
    </Journey>
  );
}

/* About: a wireframe globe with the five client regions in orbit */
function AboutWorld() {
  const orbit = useRef(null);
  useFrame((state) => { if (orbit.current) { orbit.current.rotation.y = state.clock.elapsedTime * 0.4; orbit.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.2; } });
  const city = (pos, color, size = 0.08) => (
    <mesh position={pos}><sphereGeometry args={[size, 16, 16]} />{std(color, { emissive: color, emissiveIntensity: 0.8 })}</mesh>
  );
  return (
    <Journey baseX={2.25} mobileY={1.3}>
      <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.5}>
        <mesh>
          <icosahedronGeometry args={[1.05, 2]} />
          {std("#f4f1ea", { wireframe: true, emissive: "#f4f1ea", emissiveIntensity: 0.22, transparent: true, opacity: 0.5 })}
        </mesh>
        <mesh>
          <sphereGeometry args={[0.3, 24, 24]} />
          {std("#ff4d1c", { emissive: "#ff4d1c", emissiveIntensity: 0.7 })}
        </mesh>
        <mesh rotation={[Math.PI / 2.4, 0, 0]}>
          <torusGeometry args={[1.05, 0.012, 8, 90]} />
          {std("#ffb020", { emissive: "#ffb020", emissiveIntensity: 0.4, transparent: true, opacity: 0.8 })}
        </mesh>
      </Float>
      <group ref={orbit}>
        <mesh><torusGeometry args={[1.9, 0.01, 8, 110]} />{std("#ff4d1c", { transparent: true, opacity: 0.45 })}</mesh>
        {city([1.9, 0, 0], "#ffb020", 0.1)}
        {city([-1.9, 0.15, 0], "#34d399")}
        {city([0.3, 1.7, -0.85], "#f4f1ea")}
        {city([-0.5, -1.75, 0.6], "#ff4d1c")}
        {city([1.35, -1.3, -0.3], "#ffb020", 0.07)}
      </group>
      <Sparkles count={50} scale={[6.5, 4.5, 2.5]} size={2} speed={0.3} color="#ff8a5c" opacity={0.6} />
    </Journey>
  );
}

/* Blog: a floating manuscript page, its lines of light in orbit */
function BlogWorld() {
  const orbit = useRef(null);
  useFrame((state) => { if (orbit.current) { orbit.current.rotation.y = state.clock.elapsedTime * 0.35; orbit.current.rotation.z = state.clock.elapsedTime * 0.09; } });
  const line = (pos, w, color, e = 0.35) => (
    <mesh position={pos}><boxGeometry args={[w, 0.05, 0.05]} />{std(color, { emissive: color, emissiveIntensity: e })}</mesh>
  );
  return (
    <Journey baseX={2.25} mobileY={1.3}>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
        <mesh rotation={[0.08, -0.3, 0.04]}>
          <boxGeometry args={[1.15, 1.5, 0.05]} />
          {std("#f4f1ea", { emissive: "#f4f1ea", emissiveIntensity: 0.07, roughness: 0.5 })}
        </mesh>
        <group rotation={[0.08, -0.3, 0.04]}>
          {line([-0.08, 0.52, 0.06], 0.8, "#ff4d1c", 0.7)}
          {line([-0.16, 0.32, 0.06], 0.64, "#f4f1ea", 0.25)}
          {line([-0.1, 0.14, 0.06], 0.76, "#f4f1ea", 0.25)}
          {line([-0.22, -0.04, 0.06], 0.52, "#ffb020", 0.5)}
          {line([-0.13, -0.22, 0.06], 0.7, "#f4f1ea", 0.25)}
          {line([-0.19, -0.4, 0.06], 0.58, "#f4f1ea", 0.25)}
          {line([-0.3, -0.58, 0.06], 0.36, "#ff4d1c", 0.7)}
        </group>
        <mesh position={[0.15, -0.1, -0.7]}>
          <octahedronGeometry args={[0.3, 0]} />
          {std("#ffb020", { wireframe: true, emissive: "#ffb020", emissiveIntensity: 0.5 })}
        </mesh>
      </Float>
      <group ref={orbit}>
        <mesh><torusGeometry args={[1.9, 0.012, 8, 110]} />{std("#ff4d1c", { transparent: true, opacity: 0.5 })}</mesh>
        <mesh position={[1.9, 0, 0]}><sphereGeometry args={[0.09, 16, 16]} />{std("#34d399", { emissive: "#34d399", emissiveIntensity: 0.7 })}</mesh>
        <mesh position={[-1.9, 0.2, 0]}><sphereGeometry args={[0.07, 16, 16]} />{std("#f4f1ea", { emissive: "#f4f1ea", emissiveIntensity: 0.4 })}</mesh>
      </group>
      <Sparkles count={45} scale={[6, 4.5, 2.5]} size={2} speed={0.3} color="#ff8a5c" opacity={0.6} />
    </Journey>
  );
}

export default function PageScene({ variant = "audit" }) {
  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden" aria-hidden>
      <Canvas camera={{ position: [0, 0, 7], fov: 42, near: 0.1, far: 50 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
        <ambientLight intensity={0.85} />
        <directionalLight position={[4, 5, 6]} intensity={1.5} />
        <pointLight position={[-5, -2, 3]} intensity={10} color="#ff4d1c" />
        {variant === "portfolio" ? <PortfolioWorld /> : variant === "services" ? <ServicesWorld /> : variant === "ai" ? <AiWorld /> : variant === "stories" ? <StoriesWorld /> : variant === "about" ? <AboutWorld /> : variant === "blog" ? <BlogWorld /> : <AuditWorld />}
      </Canvas>
    </div>
  );
}
