"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import gsap from "gsap";
import Cursor from "./Cursor";
import Header from "./Header";
import Smooth from "./Smooth";
import AnchorNav from "./AnchorNav";
import { Footer } from "./Sections";
import { SERVICE_LANES, CALENDLY } from "@/lib/data";
import { ArrowBtn, Magnetic, RevealLines, RollText } from "./ui";

const PageScene = dynamic(() => import("./PageScene"), { ssr: false });

const NAV_ITEMS = [
  { id: "top", label: "Intro" },
  ...SERVICE_LANES.map((l) => ({ id: l.id, label: l.name })),
  { id: "cta", label: "Start" },
];

/* Each lane enters speaking a different dialect */
const LANE_ANIMS = ["flip", "mask-left", "zoom", "bl", "rotate", "perspective"];

function ServiceModal({ picked, onClose }) {
  const backdrop = useRef(null);
  const panel = useRef(null);

  useEffect(() => {
    if (!picked) return;
    window.__lenis?.stop();
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    addEventListener("keydown", onKey);
    const tl = gsap.timeline();
    tl.fromTo(backdrop.current, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" })
      .fromTo(panel.current,
        { y: 90, scale: 0.94, opacity: 0, clipPath: "inset(6% 4% 6% 4% round 28px)" },
        { y: 0, scale: 1, opacity: 1, clipPath: "inset(0% 0% 0% 0% round 28px)", duration: 0.65, ease: "power4.out" }, "-=0.12")
      .fromTo(".modal-item", { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, stagger: 0.06, ease: "power3.out" }, "-=0.25");
    return () => {
      removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      window.__lenis?.start();
      tl.kill();
    };
  }, [picked, onClose]);

  if (!picked) return null;
  const { lane, service: svc } = picked;

  const close = () => {
    gsap.timeline({ onComplete: onClose })
      .to(panel.current, { y: 60, opacity: 0, scale: 0.96, duration: 0.32, ease: "power3.in" })
      .to(backdrop.current, { opacity: 0, duration: 0.28 }, "-=0.12");
  };

  return (
    <div className="fixed inset-0 z-[95] flex items-end sm:items-center justify-center p-0 sm:p-6" role="dialog" aria-modal="true" aria-label={svc.name}>
      <div ref={backdrop} onClick={close} className="absolute inset-0 bg-black/75 backdrop-blur-md" />
      <div ref={panel} className="relative w-full max-w-3xl max-h-[92svh] sm:max-h-[86svh] overflow-y-auto overscroll-contain rounded-t-[1.8rem] sm:rounded-[1.8rem] border border-line bg-[#0d0d0c] shadow-[0_50px_140px_rgba(0,0,0,0.7)]">
        {/* header band */}
        <div className="sticky top-0 z-10 bg-[#0d0d0c]/90 backdrop-blur-md border-b border-line px-6 sm:px-10 py-5 flex items-center justify-between gap-4">
          <p className="flex items-center gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-mute">
            <span className="grid place-items-center w-8 h-8 rounded-full bg-orange text-white font-display font-extrabold text-xs">{lane.num}</span>
            Lane — {lane.name} <span className="text-orange hidden sm:inline">{lane.glyph}</span>
          </p>
          <button onClick={close} data-hover aria-label="Close service details"
            className="grid place-items-center w-11 h-11 shrink-0 rounded-full border border-line hover:border-orange hover:text-orange hover:rotate-90 transition-all duration-400">
            <svg width="13" height="13" viewBox="0 0 12 12" fill="none"><path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
          </button>
        </div>

        <div className="px-6 sm:px-10 py-8 sm:py-10">
          <h3 className="modal-item font-display font-extrabold leading-[0.98] text-4xl min-[420px]:text-5xl">{svc.name}</h3>
          <p className="modal-item mt-5 text-cream/75 leading-[1.85] text-base sm:text-lg">
            {svc.d} {lane.intro}
          </p>

          <div className="modal-item mt-9 grid sm:grid-cols-2 gap-4">
            <div className="rounded-3xl border border-orange/35 bg-orange-dim/30 p-6">
              <p className="text-[10px] uppercase tracking-[0.24em] text-orange">Best for</p>
              <p className="mt-3 font-display font-bold text-lg leading-snug">{svc.for}</p>
            </div>
            <div className="rounded-3xl border border-line bg-white/[0.03] p-6">
              <p className="text-[10px] uppercase tracking-[0.24em] text-mute">Typical timeline</p>
              <p className="mt-3 font-display font-extrabold text-3xl text-orange">{svc.time}</p>
              <p className="mt-1.5 text-xs text-mute">Fixed milestones · weekly demos · no scope creep</p>
            </div>
          </div>

          <p className="modal-item mt-10 text-[11px] uppercase tracking-[0.24em] text-mute flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-orange" /> What's included <span className="h-px flex-1 bg-line" />
          </p>
          <ul className="mt-5 grid sm:grid-cols-2 gap-3">
            {svc.k.map((item) => (
              <li key={item} className="modal-item flex gap-3 rounded-2xl border border-line bg-white/[0.03] px-5 py-4 text-[15px] text-cream/85 leading-snug">
                <span className="text-orange shrink-0 mt-0.5">✦</span>{item}
              </li>
            ))}
          </ul>

          <p className="modal-item mt-10 text-[11px] uppercase tracking-[0.24em] text-mute flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-orange" /> How it starts <span className="h-px flex-1 bg-line" />
          </p>
          <ol className="mt-5 grid sm:grid-cols-3 gap-3">
            {[
              ["01", "Senior review", "A free 30-min call: scope, timeline and a cost range — no sales deck."],
              ["02", "Roadmap", "Fixed milestones and the stack we'd recommend, in writing."],
              ["03", "Weekly demos", "You watch it ship every week, in your own repo."],
            ].map(([n, t, d]) => (
              <li key={n} className="modal-item rounded-2xl border border-line p-5">
                <span className="font-display font-extrabold text-orange">{n}</span>
                <b className="block font-display mt-2">{t}</b>
                <span className="block text-sm text-mute leading-relaxed mt-1.5">{d}</span>
              </li>
            ))}
          </ol>

          <div className="modal-item mt-10 flex flex-wrap gap-4 pb-2">
            <ArrowBtn href={CALENDLY} external>Book a free 30-min review</ArrowBtn>
            <Magnetic>
              <Link href="/free-ai-audit" data-hover className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-7 py-3.5 text-sm font-semibold hover:border-orange hover:text-orange transition-colors">
                <RollText text="Or take the free AI audit" /> ↗
              </Link>
            </Magnetic>
          </div>
          <p className="modal-item mt-4 text-xs text-mute pb-4">Senior engineers only · Response within 4 business hours · Code in your repo, 100% ownership</p>
        </div>
      </div>
    </div>
  );
}

function Lane({ lane, index, onPick }) {
  const anim = LANE_ANIMS[index % LANE_ANIMS.length];
  return (
    <section id={lane.id} className="relative px-4 sm:px-6 md:px-10 py-20 md:py-32 max-w-[1500px] mx-auto w-full scroll-mt-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <p data-scramble className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-mute">
            <span className="grid place-items-center w-8 h-8 rounded-full border border-orange/50 text-orange font-bold text-[10px]">{lane.num}</span>
            Lane — {lane.name} <span className="text-orange">{lane.glyph}</span>
            <span className="h-px w-24 bg-line" />
          </p>
          <h2 data-split className="mt-7 font-display font-extrabold uppercase leading-[1.0] text-[2.6rem] min-[420px]:text-6xl lg:text-7xl">
            {lane.name}<span className="text-orange">.</span>
          </h2>
          <p data-words className="mt-5 text-mute leading-[1.85] max-w-xl">{lane.intro}</p>
        </div>
        <p data-anim={index % 2 ? "right-far" : "left-far"} className="text-[11px] uppercase tracking-[0.22em] text-mute">
          {lane.services.length} services — tap one to open it up ↓
        </p>
      </div>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {lane.services.map((svc, i) => (
          <article key={svc.name}
            data-anim={anim} data-delay={(i % 3) * 0.08} data-tilt data-cursor="Open" data-hover
            onClick={() => onPick({ lane, service: svc })}
            className="spot-card card-sheen group relative cursor-pointer rounded-[1.8rem] border border-line bg-coal/85 backdrop-blur p-7 sm:p-8 flex flex-col min-h-[240px] transition-colors duration-500 hover:border-orange/60"
            role="button" tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onPick({ lane, service: svc }); } }}
            aria-label={`Open details for ${svc.name}`}>
            <div className="flex items-start justify-between gap-3">
              <span className="font-display font-extrabold text-stroke-faint text-4xl group-hover:text-orange group-hover:[-webkit-text-stroke:0px] transition-all duration-500">{lane.num}.{i + 1}</span>
              <span className="grid place-items-center w-11 h-11 rounded-full border border-line transition-all duration-500 group-hover:bg-orange group-hover:border-orange group-hover:text-white group-hover:rotate-45 shrink-0">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </span>
            </div>
            <h3 className="mt-7 font-display font-extrabold text-[1.45rem] leading-tight group-hover:text-orange transition-colors">{svc.name}</h3>
            <p className="mt-2.5 text-sm text-mute leading-relaxed">{svc.d}</p>
            <p className="mt-auto pt-7 flex items-center justify-between text-[11px] uppercase tracking-[0.18em]">
              <span className="text-cream/60">{svc.time}</span>
              <span className="text-orange font-semibold"><RollText text="Explore" /> →</span>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function ServicesClient() {
  const [ready, setReady] = useState(false);
  const [picked, setPicked] = useState(null);
  useEffect(() => { const r = requestAnimationFrame(() => setReady(true)); return () => cancelAnimationFrame(r); }, []);
  const closeModal = () => setPicked(null);

  return (
    <main className="relative min-h-screen overflow-x-clip">
      <Cursor />
      <Smooth ready={ready} />
      <Header loaded={ready} />
      <AnchorNav items={NAV_ITEMS} />
      <PageScene variant="services" />

      <div className="relative z-10">
        {/* Hero */}
        <section id="top" className="relative px-4 sm:px-6 md:px-10 pt-36 md:pt-44 pb-20 md:pb-28 max-w-[1500px] mx-auto w-full">
          <div aria-hidden className="pointer-events-none absolute -top-24 right-[4%] w-[30rem] h-[30rem] rounded-full bg-orange/[0.13] blur-3xl animate-drift" />
          <nav aria-label="Breadcrumb" className="relative flex items-center gap-2.5 text-[11px] uppercase tracking-[0.22em] text-mute">
            <Link href="/" className="hover:text-orange transition-colors">Home</Link><span className="text-orange">/</span><span className="text-cream font-semibold">Services</span>
          </nav>
          <p data-batch className="relative mt-12 flex flex-wrap gap-2.5 text-[10px] sm:text-[11px] uppercase tracking-[0.22em]">
            {["29 services", "6 lanes", "Senior engineers only", "Fixed milestones"].map((c) => (
              <span key={c} className="rounded-full border border-line bg-white/[0.04] px-4 py-2 text-cream/75">{c}</span>
            ))}
          </p>
          <h1 className="relative mt-8 font-display font-extrabold uppercase leading-[0.94] tracking-tight text-[12.5vw] min-[420px]:text-[10.5vw] lg:text-[7.4rem] xl:text-[8.6rem]">
            <RevealLines loaded={ready} lines={[
              <>Software</>,
              <><span className="text-stroke">development</span></>,
              <><span className="text-orange">services.</span></>,
            ]} />
          </h1>
          <div className="relative mt-10 md:mt-12 grid lg:grid-cols-[1fr_auto] gap-10 items-end">
            <p data-scrub-words className="max-w-xl text-base md:text-lg text-cream/70 leading-[1.85]" style={{ opacity: ready ? 1 : 0, transition: "opacity .9s ease .55s" }}>
              For founders in the US, UK, UAE and Australia. Pick a lane below — every service opens up with what's
              included, who it's for and how it starts — or begin with a 30-minute senior-engineer review.
            </p>
            <div className="flex flex-wrap gap-4" style={{ opacity: ready ? 1 : 0, transition: "opacity .9s ease .7s" }}>
              <ArrowBtn href="#ai">Browse the lanes ↓</ArrowBtn>
              <Magnetic>
                <a href={CALENDLY} target="_blank" rel="noreferrer" data-hover className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-7 py-3.5 text-sm font-semibold hover:border-orange hover:text-orange transition-colors">
                  <RollText text="Free 30-min review" /> ↗
                </a>
              </Magnetic>
            </div>
          </div>
          <dl data-batch className="relative mt-14 md:mt-20 pt-8 border-t border-line grid grid-cols-2 md:grid-cols-4 gap-8">
            {[[150, "+", "Products shipped"], [29, "", "Services, one team"], [5, "", "Countries served"], [4, "h", "Response guarantee"]].map(([v, sfx, l]) => (
              <div key={l}>
                <dd className="font-display font-extrabold text-4xl md:text-5xl"><span data-count={v}>0</span><span className="text-orange">{sfx}</span></dd>
                <dt className="mt-2 text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-mute">{l}</dt>
              </div>
            ))}
          </dl>
        </section>

        {/* Marquee divider */}
        <div aria-hidden className="relative border-y border-line bg-ink/60 backdrop-blur-sm overflow-hidden py-4">
          <div data-velocity className="flex w-max animate-marquee">
            {[...SERVICE_LANES, ...SERVICE_LANES].map((l, i) => (
              <span key={i} className="flex items-center gap-6 px-6 whitespace-nowrap font-display font-bold uppercase tracking-wide text-lg text-cream/55">
                {l.name} <span className="text-orange text-sm">{l.glyph}</span>
              </span>
            ))}
          </div>
        </div>

        {SERVICE_LANES.map((lane, i) => (
          <Lane key={lane.id} lane={lane} index={i} onPick={setPicked} />
        ))}

        {/* How engagement works */}
        <section className="relative px-4 sm:px-6 md:px-10 py-20 md:py-28 max-w-[1500px] mx-auto w-full">
          <div data-anim="cinematic" className="rounded-[2rem] border border-orange/30 bg-gradient-to-br from-orange-dim/50 via-coal to-coal px-7 py-10 sm:p-12 overflow-hidden relative">
            <span data-scrub-rotate aria-hidden className="absolute -right-8 -bottom-14 font-display font-extrabold text-[10rem] leading-none text-white/[0.05] select-none">✦</span>
            <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center relative">
              <div>
                <p data-scramble className="text-[11px] uppercase tracking-[0.28em] text-mute">No lane fits? Start here</p>
                <h2 data-split className="mt-5 font-display font-extrabold uppercase leading-[1.0] text-3xl min-[420px]:text-5xl lg:text-6xl">
                  Get a senior take in <span className="text-orange">30 minutes</span>
                </h2>
                <p data-words className="mt-5 text-cream/70 leading-[1.85] max-w-xl">
                  Scope, timeline and cost range — no sales deck. You'll talk to Abuzer, the senior engineer who'll
                  scope your build. Or start with the free readiness quiz if you're still evaluating your stack.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-4 shrink-0">
                <ArrowBtn href={CALENDLY} external>Book a free 30-min call</ArrowBtn>
                <Magnetic>
                  <Link href="/free-ai-audit" data-hover className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/25 px-7 py-3.5 text-sm font-semibold hover:border-orange hover:text-orange transition-colors">
                    <RollText text="Take the free AI audit" /> ↗
                  </Link>
                </Magnetic>
              </div>
            </div>
            <div data-batch className="mt-10 flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.16em] relative">
              {["Senior engineers only", "Response within 4 business hours", "No commitment on first call", "100% code ownership"].map((t) => (
                <span key={t} className="border border-line rounded-full px-4 py-2 text-cream/65 bg-black/25">{t}</span>
              ))}
            </div>
          </div>
          <div className="h-14 xl:h-0" aria-hidden />
        </section>
      </div>

      <div className="relative z-10"><Footer /></div>
      <ServiceModal picked={picked} onClose={closeModal} />
    </main>
  );
}
