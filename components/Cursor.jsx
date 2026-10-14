"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
    const d = dot.current, r = ring.current;
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my, scale = 1, target = 1;
    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    const onOver = (e) => { target = e.target.closest("a,button,[data-hover]") ? 2.6 : 1; };
    let raf;
    const loop = () => {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16; scale += (target - scale) * 0.18;
      if (d) d.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
      if (r) r.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%) scale(${scale})`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    addEventListener("mousemove", onMove);
    addEventListener("mouseover", onOver);
    return () => { cancelAnimationFrame(raf); removeEventListener("mousemove", onMove); removeEventListener("mouseover", onOver); };
  }, []);

  return (
    <div className="hidden md:block" aria-hidden>
      <div ref={dot} className="fixed top-0 left-0 z-[120] w-1.5 h-1.5 rounded-full bg-orange pointer-events-none" />
      <div ref={ring} className="fixed top-0 left-0 z-[119] w-9 h-9 rounded-full border border-cream/40 pointer-events-none mix-blend-difference" />
    </div>
  );
}
