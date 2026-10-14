"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { NAV, CALENDLY } from "@/lib/data";
import { Magnetic, RollText } from "./ui";
import LogoMark from "./Logo";

export default function Header({ loaded, light = false }) {
  const pathname = usePathname();
  const router = useRouter();
  const onHome = pathname === "/";
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

  const go = (href) => {
    setOpen(false);
    if (href.startsWith("/")) { setTimeout(() => router.push(href), 350); return; }
    setTimeout(() => window.__lenis?.scrollTo(href, { offset: -70, duration: 1.4 }), 450);
  };

  return (
    <>
      <header
        className="fixed top-0 inset-x-0 z-[80] transition-all duration-500"
        style={{ transform: loaded ? (hidden ? "translateY(-110%)" : "translateY(0)") : "translateY(-110%)", opacity: loaded ? 1 : 0 }}
      >
        <div className={`mx-auto max-w-[1500px] px-4 sm:px-6 md:px-10 h-16 md:h-[72px] flex items-center justify-between gap-3 backdrop-blur-md border-b ${light ? "bg-[#f3efe7]/80 border-ink/10" : "bg-ink/55 border-line"}`}>
          <a href={onHome ? "#top" : "/"} data-hover className="flex items-center gap-2.5 sm:gap-3 shrink-0 min-w-0" aria-label="GreeLogix home">
            <LogoMark className="w-8 h-8 md:w-9 md:h-9 shrink-0" />
            <span className="font-display font-extrabold tracking-wide text-base sm:text-lg leading-none hidden min-[380px]:block">GREE<span className="text-orange">LOGIX</span></span>
          </a>
          <nav data-dock className={`hidden min-[1440px]:flex items-center gap-7 2xl:gap-9 text-[12px] xl:text-[13px] uppercase tracking-[0.18em] ${light ? "text-ink/65" : "text-cream/75"}`}>
            {NAV.map((n) => {
              const isActive = pathname === n.href || n.children?.some((c) => c.href === pathname);
              const linkCls = `transition-colors ${isActive ? "text-orange" : light ? "hover:text-ink" : "hover:text-cream"}`;
              if (!n.children) {
                return (
                  <Link key={n.href} href={n.href} data-hover data-dock-item aria-current={pathname === n.href ? "page" : undefined} className={linkCls}>
                    <RollText text={n.label} />
                  </Link>
                );
              }
              return (
                <div key={n.href} className="relative group">
                  <Link href={n.href} data-hover data-dock-item aria-current={isActive ? "page" : undefined} aria-haspopup="true"
                    className={`inline-flex items-center gap-1.5 ${linkCls}`}>
                    <RollText text={n.label} />
                    <svg className="transition-transform duration-300 group-hover:rotate-180" width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M1 3.5L5 7.5L9 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                  </Link>
                  {/* Dropdown */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-5 opacity-0 invisible translate-y-3 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:pointer-events-auto transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)]">
                    <div className={`w-[352px] rounded-[1.4rem] border p-2 shadow-[0_36px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl ${light ? "bg-white/95 border-ink/10" : "bg-[#0e0e0d]/95 border-line"}`}>
                      {n.children.map((c, ci) => (
                        <Link key={c.href + c.label} href={c.href} data-hover
                          className={`group/item flex items-center justify-between gap-4 rounded-2xl px-4 py-3 normal-case tracking-normal transition-colors duration-300 ${light ? "hover:bg-orange/[0.08]" : "hover:bg-white/[0.05]"}`}
                          style={{ transitionDelay: `${ci * 12}ms` }}>
                          <span>
                            <span className={`block font-display font-bold text-[15px] leading-tight ${pathname === c.href ? "text-orange" : light ? "text-ink" : "text-cream"}`}>{c.label}</span>
                            <span className={`block text-xs mt-1 leading-snug ${light ? "text-ink/55" : "text-mute"}`}>{c.desc}</span>
                          </span>
                          <span className="grid place-items-center w-8 h-8 shrink-0 rounded-full border border-current opacity-30 transition-all duration-300 group-hover/item:opacity-100 group-hover/item:bg-orange group-hover/item:border-orange group-hover/item:text-white group-hover/item:rotate-45">
                            <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                          </span>
                        </Link>
                      ))}
                      <p className={`px-4 pt-2.5 pb-2 mt-1 border-t text-[10px] uppercase tracking-[0.2em] ${light ? "border-ink/10 text-ink/45" : "border-line text-mute"}`}>
                        75+ AI systems in production <span className="text-orange float-right">✦</span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>
          <div className="flex items-center gap-3">
            <Magnetic className="hidden sm:block">
              <a href={CALENDLY} target="_blank" rel="noreferrer" data-hover className="inline-flex items-center gap-2 rounded-full bg-orange px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-cream hover:text-ink">
                <RollText text="Book a free call" /> <span aria-hidden>↗</span>
              </a>
            </Magnetic>
            <button onClick={() => setOpen(!open)} data-hover aria-label={open ? "Close menu" : "Open menu"}
              className={`min-[1440px]:hidden grid place-items-center w-11 h-11 shrink-0 rounded-full border ${light ? "border-ink/15 bg-ink/5" : "border-line bg-white/5"}`}>
              <span className="relative block w-5 h-3">
                <span className={`absolute left-0 w-full h-[2px] transition-all duration-300 ${light ? "bg-ink" : "bg-cream"} ${open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 w-full h-[2px] transition-all duration-300 ${light ? "bg-ink" : "bg-cream"} ${open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"}`} />
              </span>
            </button>
          </div>
        </div>
        {/* scroll progress */}
        <ProgressBar />
      </header>

      {/* Full-screen menu */}
      <div ref={menu} className="fixed inset-0 z-[75] hidden flex-col overflow-y-auto overscroll-contain bg-[#0a0a09] pt-24 md:pt-28 px-5 sm:px-8 pb-10" style={{ clipPath: "inset(0 0 100% 0)" }}>
        <p className="text-[11px] tracking-widest2 uppercase text-mute mb-8">Menu — Where to?</p>
        <nav className="flex flex-col gap-1">
          {[...NAV, { label: "Book a Call ↗", href: "#cta" }].map((n, i) => (
            <span key={n.label} className="block">
              <button onClick={() => go(n.href)} className="menu-link block text-left font-display font-extrabold uppercase text-[11vw] min-[420px]:text-5xl sm:text-6xl leading-[1.05] py-1 hover:text-orange transition-colors">
                <span className="text-sm align-top text-orange mr-3 font-body font-medium">0{i + 1}</span><RollText text={n.label} />
              </button>
              {n.children && (
                <span className="menu-link flex flex-wrap gap-2 mt-3 mb-4 pl-1">
                  {n.children.slice(1).map((c) => (
                    <button key={c.href} onClick={() => go(c.href)} className="rounded-full border border-line px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-cream/70 hover:border-orange hover:text-orange transition-colors">
                      {c.label}
                    </button>
                  ))}
                </span>
              )}
            </span>
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
