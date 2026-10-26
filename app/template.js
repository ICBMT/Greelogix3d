"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

/* Cinematic page transition: an ink panel with an orange edge sweeps away */
export default function Template({ children }) {
  const pathname = usePathname();
  const panel = useRef(null);
  const edge = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    const names = { "/": "GreeLogix", "/portfolio": "Portfolio", "/free-ai-audit": "Free AI Audit", "/services": "Services", "/case-studies": "Case Studies", "/about": "About", "/blog": "Blog", "/resources": "Resources", "/ai-solutions": "AI Solutions" };
    if (label.current) label.current.textContent = names[pathname] || (pathname.startsWith("/ai") ? "AI Solutions" : "GreeLogix");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (panel.current) panel.current.style.display = "none";
      return;
    }
    const tl = gsap.timeline();
    tl.set(panel.current, { scaleY: 1, transformOrigin: "top" })
      .set(edge.current, { scaleX: 1 })
      .fromTo(label.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.32, ease: "power2.out" }, 0)
      .to(label.current, { opacity: 0, y: -10, duration: 0.28, ease: "power2.in" }, 0.42)
      .to(edge.current, { scaleX: 0, duration: 0.55, ease: "power3.inOut" }, 0.45)
      .to(panel.current, { scaleY: 0, duration: 0.75, ease: "power4.inOut" }, 0.5)
      .set(panel.current, { display: "none" });
    return () => tl.kill();
  }, [pathname]);

  return (
    <>
      <div ref={panel} className="fixed inset-0 z-[100] bg-[#0a0a09] grid place-items-center pointer-events-none" aria-hidden>
        <p className="text-center">
          <span ref={label} className="block font-display font-extrabold uppercase tracking-wide text-2xl sm:text-4xl text-cream opacity-0">GreeLogix</span>
          <span ref={edge} className="mt-4 block h-[3px] w-40 sm:w-56 mx-auto bg-orange origin-left" />
        </p>
      </div>
      {children}
    </>
  );
}
