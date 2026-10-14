"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { NAV, CALENDLY } from "@/lib/data";
import { Magnetic } from "./ui";

export default function Header({ loaded }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const menu = useRef(null);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = scrollY;
      setHidden(y > 140 && y > lastY.current && !open);
      lastY.current = y;
    };
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, [open ]);

  useEffect(() => {
    if (!menu.current) return;
    if (open) {
      window.__lenis?.stop();
      gsap.timeline()
        .set(menu.current, { display: "flex" })
        .fromTo(menu.current, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "power4.inOut" })
        .fromTo(".menu-link", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: "power3.out" }, "-=0.25")
        .fromTo(".menu-foot", { opacity: 0 }, { opacity: 1, duration: 0.4 }, "-=0.2");
    } else {
      window.__lenis?.start();
      gsap.to(menu.current, { clipPath: "inset(0 0 100% 0)", duration: 0.55, ease: "power4.inOut", onComplete: () => gsap.set(menu.current, { display: "none" }) });
    }
  }, [open ]);

  const go = (href) => { setOpen(false); setTimeout(() => window.__lenis?.scrollTo(href, { offset: -70, duration: 1.4 }), 450); };

  return (
    <>
      <header
        className="fixed top-0 inset-x-0 z-[80] transition-all duration-500"
        style={{ transform: loaded ? (hidden ? "translateY(-110%)" : "translateY(0)") : "translateY(-110%)", opacity: loaded ? 1 : 0 }}
      >
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 md:px-10 h-16 md:h-[72px] flex items-center justify-between gap-3 backdrop-blur-md bg-ink/55 border-b border-line">
          <a href="#top" data-hover className="flex items-center gap-2.5 sm:gap-3 shrink-0 min-w-0" aria-label="GreeLogix home">
            <span className="relative w-9 h-9 md:w-10 md:h-10 block shrink-0"><Image src="/logo.png" alt="" fill className="object-contain" /></span>
            <span className="font-display font-extrabold tracking-wide text-base sm:text-lg leading-none hidden min-[380px]:block">GREE<span className="text-orange">LOGIX</span></span>
          </a>
          <nav className="hidden lg:flex items-center gap-9 text-[13px] uppercase tracking-[0.18em] text-cream/75">
            {NAV.map((n) => (<a key={n.href} href={n.href} className="link-line hover:text-cream transition-colors">{n.label}</a>))}
          </nav>
          <div className="flex items-center gap-3">
            <Magnetic className="hidden sm:block">
              <a href={CALENDLY} target="_blank" rel="noreferrer" data-hover className="inline-flex items-center gap-2 rounded-full bg-orange px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-cream hover:text-ink">
                Book a free call <span aria-hidden>↗</span>
              </a>
            </Magnetic>
            <button onClick={() => setOpen(!open)} data-hover aria-label={open ? "Close menu" : "Open menu"}
              className="lg:hidden grid place-items-center w-11 h-11 rounded-full border border-line bg-white/5">
              <span className="relative block w-5 h-3">
                <span className={`absolute left-0 w-full h-[2px] bg-cream transition-all duration-300 ${open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 w-full h-[2px] bg-cream transition-all duration-300 ${open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"}`} />
              </span>
            </button>
          </div>
        </div>
        {/* scroll progress */}
        <ProgressBar />
      </header>

      {/* Full-screen menu */}
      <div ref={menu} className="fixed inset-0 z-[75] hidden flex-col bg-[#0a0a09] pt-28 px-6 pb-10" style={{ clipPath: "inset(0 0 100% 0)" }}>
        <p className="text-[11px] tracking-widest2 uppercase text-mute mb-8">Menu — Where to?</p>
        <nav className="flex flex-col gap-1">
          {[...NAV, { label: "Book a Call ↗", href: "#cta" }].map((n, i) => (
            <button key={n.label} onClick={() => go(n.href)} className="menu-link text-left font-display font-extrabold uppercase text-[13vw] sm:text-6xl leading-[1.02] hover:text-orange transition-colors">
              <span className="text-sm align-top text-orange mr-3 font-body font-medium">0{i + 1}</span>{n.label}
            </button>
          ))}
        </nav>
        <div className="menu-foot mt-auto flex flex-wrap gap-x-8 gap-y-2 text-sm text-mute">
          <span>US · UK · UAE · AU · CA</span><span>Response within 4 business hours</span><span className="text-orange">150+ products shipped</span>
        </div>
      </div>
    </>
  );
}

function ProgressBar() {
  const ref = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      const max = Math.max(document.documentElement.scrollHeight - innerHeight, 1);
      if (ref.current) ref.current.style.transform = `scaleX(${Math.min(scrollY / max, 1)})`;
    };
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);
  return <div ref={ref} className="h-[2px] bg-orange origin-left" style={{ transform: "scaleX(0)" }} />;
}
