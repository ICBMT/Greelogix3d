"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

/* Magnetic hover — element leans toward the cursor, springs back on leave */
export function Magnetic({ children, strength = 0.35, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(hover: none)").matches) return;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * strength, y: (e.clientY - r.top - r.height / 2) * strength, duration: 0.4, ease: "power3.out" });
    };
    const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1,0.4)" });
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); };
  }, [strength]);
  return <div ref={ref} className={`inline-block ${className}`}>{children}</div>;
}

export function SectionTag({ index, label, light = false }) {
  return (
    <div data-reveal className="flex items-center gap-3 mb-8">
      <span className="w-2 h-2 rounded-full bg-orange animate-pulse-dot" />
      <span data-scramble className={`text-[11px] font-medium uppercase tracking-widest2 ${light ? "text-ink/60" : "text-mute"}`}>
        {index} — {label}
      </span>
      <span data-line className={`h-px flex-1 origin-left ${light ? "bg-ink/15" : "bg-line"}`} />
    </div>
  );
}

/* GSAP-style rolling letters: on hover each character flips up into an
   orange twin, staggered left-to-right. Wrap any link label in this. */
export function RollText({ text }) {
  return (
    <span className="roll" aria-label={text}>
      {[...text].map((ch, i) => (
        <span key={i} className="roll-char" aria-hidden>
          <span className="roll-char-inner" style={{ transitionDelay: `${i * 22}ms` }}>
            <span>{ch === " " ? "\u00A0" : ch}</span>
            <span>{ch === " " ? "\u00A0" : ch}</span>
          </span>
        </span>
      ))}
    </span>
  );
}

export function ArrowBtn({ href, children, dark = false, external = false }) {
  return (
    <Magnetic>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        data-hover
        className={`group inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-300 ${
          dark ? "bg-ink text-cream hover:bg-orange" : "bg-orange text-white hover:bg-cream hover:text-ink"
        }`}
      >
        {typeof children === "string" ? <RollText text={children} /> : children}
        <span className="grid place-items-center w-6 h-6 rounded-full bg-white/20 transition-transform duration-300 group-hover:rotate-45">
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
        </span>
      </a>
    </Magnetic>
  );
}

/* Splits a headline into masked lines that rise on load */
export function RevealLines({ lines, loaded, className = "", lineClassName = "" }) {
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="line-mask">
          <span
            className={`block will-change-transform ${lineClassName}`}
            style={{
              transform: loaded ? "translateY(0)" : "translateY(110%)",
              transition: `transform 1.1s cubic-bezier(.22,1,.36,1) ${0.08 * i + 0.1}s`,
            }}
          >
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}
