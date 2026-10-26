"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import LogoMark from "./Logo";

const WORDS = ["AI PRODUCTS", "MVPs IN 4–8 WEEKS", "150+ SHIPPED", "SENIOR ENGINEERS ONLY"];

export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0);
  const [word, setWord] = useState(0);
  const root = useRef(null);

  useEffect(() => {
    // Reduced motion: skip the count-up ceremony, hand over immediately.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(100);
      const t = setTimeout(onDone, 150);
      return () => clearTimeout(t);
    }
    const obj = { v: 0 };
    const wi = setInterval(() => setWord((w) => (w + 1) % WORDS.length), 480);
    const tween = gsap.to(obj, {
      v: 100, duration: 2, ease: "power2.inOut",
      onUpdate: () => setCount(Math.round(obj.v)),
      onComplete: () => {
        clearInterval(wi);
        const tl = gsap.timeline({ onComplete: onDone });
        tl.to(".pre-inner", { yPercent: -30, opacity: 0, duration: 0.5, ease: "power3.in" })
          .to(".pre-panel-l", { xPercent: -100, duration: 0.9, ease: "power4.inOut" }, "-=0.1")
          .to(".pre-panel-r", { xPercent: 100, duration: 0.9, ease: "power4.inOut" }, "<")
          .set(root.current, { display: "none" });
      },
    });
    return () => { tween.kill(); clearInterval(wi); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={root} className="fixed inset-0 z-[110]" role="status" aria-label="Loading GreeLogix">
      <div className="pre-panel-l absolute inset-y-0 left-0 w-1/2 bg-[#0a0a09]" />
      <div className="pre-panel-r absolute inset-y-0 right-0 w-1/2 bg-[#0a0a09]" />
      <div className="pre-inner relative z-10 h-full flex flex-col items-center justify-center px-6">
        <div className="text-cream">
          <LogoMark className="w-36 h-auto md:w-48" />
          <p className="mt-4 text-center font-display font-extrabold tracking-wide text-xl md:text-2xl">GREE<span className="text-orange">LOGIX</span></p>
        </div>
        <div className="mt-6 h-5 overflow-hidden">
          <p key={word} className="text-[11px] tracking-widest2 text-mute uppercase text-center">{WORDS[word]}</p>
        </div>
        <div className="mt-8 w-56 h-px bg-white/10 overflow-hidden">
          <div className="h-full bg-orange transition-[width] duration-150" style={{ width: `${count}%` }} />
        </div>
        <p className="mt-4 font-display font-extrabold text-5xl md:text-6xl tabular-nums">
          {count}<span className="text-orange">%</span>
        </p>
      </div>
    </div>
  );
}
