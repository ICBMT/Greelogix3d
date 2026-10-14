"use client";
import { useEffect, useState } from "react";

/**
 * Shopify-Editions-style on-page anchors.
 * Phones: a floating pill bar along the bottom, swipeable, with scrollspy.
 * Larger screens stay clean — no side rail.
 */
export default function AnchorNav({ items, light = false }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const sections = items.map((i) => document.getElementById(i.id)).filter(Boolean);
    if (!sections.length) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-38% 0px -52% 0px", threshold: 0 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [items]);

  const jump = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: id === "top" ? 0 : -76, duration: 1.35 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Mobile / tablet pill bar */}
      <nav aria-label="On this page"
        className={`sm:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-[70] max-w-[94vw] flex gap-1 overflow-x-auto rounded-full border p-1.5 backdrop-blur-lg shadow-2xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          light ? "bg-white/85 border-ink/10 text-ink" : "bg-coal/85 border-line text-cream"}`}>
        {items.map((item) => (
          <button key={item.id} onClick={() => jump(item.id)} data-hover aria-current={active === item.id ? "true" : undefined}
            className={`shrink-0 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-all duration-300 ${
              active === item.id ? "bg-orange text-white" : light ? "text-ink/60" : "text-cream/60"}`}>
            {item.label}
          </button>
        ))}
      </nav>
    </>
  );
}
