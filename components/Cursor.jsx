"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
    const d = dot.current, r = ring.current;
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my, scale = 1, target = 1;
    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    const onOver = (e) => {
      const tagged = e.target.closest("[data-cursor]");
      if (tagged) {
        target = 4.4;
        if (label.current) label.current.textContent = tagged.dataset.cursor;
        if (d) d.style.opacity = "0";
      } else {
        target = e.target.closest("a,button,[data-hover]") ? 2.6 : 1;
        if (label.current) label.current.textContent = "";
        if (d) d.style.opacity = "1";
      }
    };
    let raf;
    const loop = () => {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16; scale += (target - scale) * 0.18;
      if (d) d.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
      if (r) r.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%) scale(${scale})`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    // Spark trail — tiny embers that flare and drift off the cursor path
    let lastSpawn = 0;
    const onTrail = (e) => {
      const now = performance.now();
      if (now - lastSpawn < 55) return;
      lastSpawn = now;
      const spark = document.createElement("span");
      const size = 2.5 + Math.random() * 4;
      spark.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:${size}px;height:${size}px;border-radius:9999px;background:${Math.random() > 0.35 ? "#ff4d1c" : "#ffb020"};pointer-events:none;z-index:118;`;
      document.body.appendChild(spark);
      gsap.to(spark, {
        x: (Math.random() - 0.5) * 46, y: (Math.random() - 0.35) * 46,
        opacity: 0, scale: 0.1, duration: 0.75 + Math.random() * 0.4, ease: "power2.out",
        onComplete: () => spark.remove(),
      });
    };
    addEventListener("mousemove", onTrail);
    addEventListener("mousemove", onMove);
    addEventListener("mouseover", onOver);
    return () => { cancelAnimationFrame(raf); removeEventListener("mousemove", onMove); removeEventListener("mouseover", onOver); removeEventListener("mousemove", onTrail); };
  }, []);

  return (
    <div className="hidden md:block" aria-hidden>
      <div ref={dot} className="fixed top-0 left-0 z-[120] w-1.5 h-1.5 rounded-full bg-orange pointer-events-none" />
      <div ref={ring} className="fixed top-0 left-0 z-[119] w-9 h-9 rounded-full border border-cream/40 pointer-events-none mix-blend-difference flex items-center justify-center">
        <span ref={label} className="text-[6.5px] font-bold uppercase tracking-[0.14em] text-cream whitespace-nowrap" />
      </div>
    </div>
  );
}
