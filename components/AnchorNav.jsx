"use client";
import { useEffect, useState } from "react";

/**
 * Shopify-Editions-style on-page anchors.
 * Desktop: a slim rail on the left edge — numbers + labels light up as you
 * travel (scrollspy), labels unfold on hover so content is never covered.
 * Mobile/tablet: a floating pill bar along the bottom, swipeable.
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

  const activeIdx = Math.max(items.findIndex((i) => i.id === active), 0);
  const rail = light ? "border-ink/15" : "border-white/15";

  return (
    <>
      {/* Desktop rail */}
      <nav aria-label="On this page" className="hidden xl:flex fixed left-5 top-1/2 -translate-y-1/2 z-[70] flex-col gap-1">
        <span className={`absolute left-[13px] top-2 bottom-2 w-px ${light ? "bg-ink/10" : "bg-white/10"}`} aria-hidden />
        <span
          className="absolute left-[13px] top-2 w-px bg-orange transition-all duration-700 ease-out"
          style={{ height: `calc(${(activeIdx / Math.max(items.length - 1, 1)) * 100}% - 8px)` }}
          aria-hidden
        />
        {items.map((item, i) => {
          const isActive = active === item.id;
          return (
            <button key={item.id} onClick={() => jump(item.id)} data-hover aria-current={isActive ? "true" : undefined}
              className="group relative flex items-center gap-3 py-2 pl-0 pr-2 text-left">
              <span className={`relative z-10 grid place-items-center rounded-full border text-[9px] font-bold tabular-nums transition-all duration-500 ${
                isActive
                  ? "w-7 h-7 bg-orange border-orange text-white scale-110"
                  : `w-7 h-7 ${light ? "bg-[#f3efe7] text-ink/50 group-hover:text-orange" : "bg-ink text-cream/50 group-hover:text-orange"} ${rail}`}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={`whitespace-nowrap rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] backdrop-blur transition-all duration-500 ${
                isActive
                  ? (light ? "bg-ink text-[#f3efe7] opacity-100 translate-x-0" : "bg-cream text-ink opacity-100 translate-x-0")
                  : `opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 ${light ? "bg-ink/85 text-[#f3efe7]" : "bg-white/10 text-cream"}`}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Mobile / tablet pill bar */}
      <nav aria-label="On this page"
        className={`xl:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-[70] max-w-[94vw] flex gap-1 overflow-x-auto rounded-full border p-1.5 backdrop-blur-lg shadow-2xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
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
