"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import Cursor from "./Cursor";
import Header from "./Header";
import Smooth from "./Smooth";
import AnchorNav from "./AnchorNav";
import { Footer } from "./Sections";
import { CASE_STUDIES, CASE_FILTERS, CALENDLY } from "@/lib/data";
import { ArrowBtn, Magnetic, RevealLines, RollText } from "./ui";

gsap.registerPlugin(ScrollTrigger, Flip);
const PageScene = dynamic(() => import("./PageScene"), { ssr: false });

const GRADS = [
  "from-[#ff7a45] to-[#7a2408]", "from-[#5470b8] to-[#1d2c52]", "from-[#4d7d63] to-[#173527]",
  "from-[#c99b45] to-[#6b4a12]", "from-[#b4527d] to-[#571e38]", "from-[#3f8f8a] to-[#173f3c]",
  "from-[#779c46] to-[#33491a]", "from-[#cf8438] to-[#6e3e10]",
];

function CaseModal({ cs, onClose }) {
  const backdrop = useRef(null);
  const panel = useRef(null);
  useEffect(() => {
    if (!cs) return;
    window.__lenis?.stop();
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    addEventListener("keydown", onKey);
    const tl = gsap.timeline();
    tl.fromTo(backdrop.current, { opacity: 0 }, { opacity: 1, duration: 0.35 })
      .fromTo(panel.current, { y: 90, scale: 0.94, opacity: 0, clipPath: "inset(6% 4% 6% 4% round 28px)" },
        { y: 0, scale: 1, opacity: 1, clipPath: "inset(0% 0% 0% 0% round 28px)", duration: 0.65, ease: "power4.out" }, "-=0.12")
      .fromTo(".case-item", { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, stagger: 0.06, ease: "power3.out" }, "-=0.25");
    return () => { removeEventListener("keydown", onKey); document.body.style.overflow = ""; window.__lenis?.start(); tl.kill(); };
  }, [cs, onClose]);

  if (!cs) return null;
  const close = () => gsap.timeline({ onComplete: onClose })
    .to(panel.current, { y: 60, opacity: 0, scale: 0.96, duration: 0.32, ease: "power3.in" })
    .to(backdrop.current, { opacity: 0, duration: 0.28 }, "-=0.12");

  return (
    <div className="fixed inset-0 z-[95] flex items-end sm:items-center justify-center p-0 sm:p-6" role="dialog" aria-modal="true" aria-label={cs.title}>
      <div ref={backdrop} onClick={close} className="absolute inset-0 bg-black/75 backdrop-blur-md" />
      <div ref={panel} className="relative w-full max-w-3xl max-h-[92svh] sm:max-h-[86svh] overflow-y-auto overscroll-contain rounded-t-[1.8rem] sm:rounded-[1.8rem] border border-line bg-[#0d0d0c] shadow-[0_50px_140px_rgba(0,0,0,0.7)]">
        <div className="sticky top-0 z-10 bg-[#0d0d0c]/90 backdrop-blur-md border-b border-line px-6 sm:px-10 py-5 flex items-center justify-between gap-4">
          <p className="flex items-center gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-mute">
            <span className="text-xl" aria-hidden>{cs.glyph}</span> {cs.client} · {cs.industry}
          </p>
          <button onClick={close} data-hover aria-label="Close case study" className="grid place-items-center w-11 h-11 shrink-0 rounded-full border border-line hover:border-orange hover:text-orange hover:rotate-90 transition-all duration-500">
            <svg width="13" height="13" viewBox="0 0 12 12" fill="none"><path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
          </button>
        </div>
        <div className="px-6 sm:px-10 py-8 sm:py-10">
          {cs.img && (
            <div className="case-item relative rounded-3xl overflow-hidden aspect-[16/8] mb-8">
              <Image src={cs.img} alt="" fill sizes="(max-width: 768px) 92vw, 720px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
            </div>
          )}
          <h3 className="case-item font-display font-extrabold leading-[1.02] text-3xl min-[420px]:text-[2.6rem]">{cs.title}</h3>
          <div className="case-item mt-7 rounded-3xl border border-orange/35 bg-orange-dim/30 p-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-orange">The outcome</p>
              <p className="mt-2 font-display font-extrabold text-2xl sm:text-3xl">{cs.result}</p>
            </div>
            <span className="text-4xl" aria-hidden>{cs.glyph}</span>
          </div>
          <p className="case-item mt-8 text-[11px] uppercase tracking-[0.24em] text-mute flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-orange" /> What was broken, what we did <span className="h-px flex-1 bg-line" /></p>
          <p className="case-item mt-5 text-cream/75 leading-[1.9] text-base sm:text-lg">{cs.desc}</p>
          <p className="case-item mt-8 text-[11px] uppercase tracking-[0.24em] text-mute flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-orange" /> Built with <span className="h-px flex-1 bg-line" /></p>
          <div className="case-item mt-5 flex flex-wrap gap-2">
            {cs.stack.map((t) => (<span key={t} className="rounded-full border border-line bg-white/[0.04] px-4 py-2 text-[13px] text-cream/80">{t}</span>))}
          </div>
          <div className="case-item mt-10 flex flex-wrap gap-4 pb-4">
            <ArrowBtn href={CALENDLY} external>Got a project like this?</ArrowBtn>
            <Magnetic>
              <Link href="/free-ai-audit" data-hover className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-7 py-3.5 text-sm font-semibold hover:border-orange hover:text-orange transition-colors">
                <RollText text="Get a free project audit" /> ↗
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CasesClient() {
  const [ready, setReady] = useState(false);
  const [filter, setFilter] = useState("all");
  const [picked, setPicked] = useState(null);
  const flipState = useRef(null);
  useEffect(() => { const r = requestAnimationFrame(() => setReady(true)); return () => cancelAnimationFrame(r); }, []);

  const shown = CASE_STUDIES.filter((c) => filter === "all" || c.cat === filter);
  const featured = CASE_STUDIES.find((c) => c.featured);

  const chooseFilter = (id) => {
    if (id === filter) return;
    flipState.current = Flip.getState(".case-card");
    setFilter(id);
  };
  useLayoutEffect(() => {
    if (!flipState.current) return;
    const state = flipState.current; flipState.current = null;
    Flip.from(state, {
      targets: ".case-card", duration: 0.8, ease: "power3.inOut", stagger: 0.04, absolute: true,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 40, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out", delay: 0.1 }),
      onComplete: () => ScrollTrigger.refresh(),
    });
    const t = setTimeout(() => ScrollTrigger.refresh(), 700);
    return () => clearTimeout(t);
  }, [filter]);

  return (
    <main className="relative min-h-screen overflow-x-clip">
      <Cursor />
      <Smooth ready={ready} />
      <Header loaded={ready} />
      <AnchorNav items={[{ id: "top", label: "Intro" }, { id: "featured", label: "Featured" }, { id: "stories", label: "Stories" }, { id: "cta", label: "Start" }]} />
      <PageScene variant="stories" />

      <div className="relative z-10">
        {/* Hero */}
        <section id="top" className="relative px-4 sm:px-6 md:px-10 pt-36 md:pt-44 pb-20 md:pb-28 max-w-[1500px] mx-auto w-full">
          <div aria-hidden className="pointer-events-none absolute -top-24 right-[4%] w-[30rem] h-[30rem] rounded-full bg-orange/[0.13] blur-3xl animate-drift" />
          <nav aria-label="Breadcrumb" className="relative flex items-center gap-2.5 text-[11px] uppercase tracking-[0.22em] text-mute">
            <Link href="/" className="hover:text-orange transition-colors">Home</Link><span className="text-orange">/</span><span className="text-cream font-semibold">Case Studies</span>
          </nav>
          <p className="relative mt-12 inline-flex items-center gap-2.5 rounded-full border border-orange/40 bg-orange/10 px-5 py-2.5 text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-orange">
            <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse-dot" /> Case Studies — 16 stories
          </p>
          <h1 className="relative mt-8 font-display font-extrabold uppercase leading-[0.94] tracking-tight text-[12vw] min-[420px]:text-[10vw] lg:text-[7.4rem] xl:text-[8.6rem]">
            <RevealLines loaded={ready} lines={[<>Real projects.</>, <><span className="text-orange">Real outcomes.</span></>]} />
          </h1>
          <p data-scrub-words className="relative mt-10 max-w-xl text-base md:text-lg text-cream/70 leading-[1.85]" style={{ opacity: ready ? 1 : 0, transition: "opacity .9s ease .55s" }}>
            A look behind the scenes at the work we ship — what was broken, what we did, and what changed.
            Open any story to read it properly.
          </p>
          <dl data-batch className="relative mt-14 pt-8 border-t border-line grid grid-cols-2 md:grid-cols-4 gap-8">
            {[[16, "", "Stories told here"], [150, "+", "Products shipped"], [10, "+", "Industries covered"], [70, "+", "Engineers replaced once"]].map(([v, sfx, l]) => (
              <div key={l}>
                <dd className="font-display font-extrabold text-4xl md:text-5xl"><span data-count={v}>0</span><span className="text-orange">{sfx}</span></dd>
                <dt className="mt-2 text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-mute">{l}</dt>
              </div>
            ))}
          </dl>
        </section>

        {/* Featured rescue */}
        <section id="featured" className="relative px-4 sm:px-6 md:px-10 pb-20 md:pb-28 max-w-[1500px] mx-auto w-full scroll-mt-20">
          <article data-anim="cinematic" data-cursor="Read" data-hover onClick={() => setPicked(featured)} role="button" tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") setPicked(featured); }}
            className="card-sheen group relative cursor-pointer rounded-[2rem] border border-orange/35 bg-gradient-to-br from-orange-dim/60 via-coal to-coal overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="p-7 sm:p-10 md:p-14">
                <span className="text-[10px] uppercase tracking-[0.22em] bg-orange text-white font-semibold rounded-full px-3.5 py-1.5">Featured · {featured.client} — {featured.industry}</span>
                <h2 className="mt-8 font-display font-extrabold text-3xl sm:text-4xl md:text-[2.8rem] leading-[1.04]">
                  We shipped what <span className="text-orange">70 engineers</span> couldn't.
                </h2>
                <p data-words className="mt-5 text-cream/70 leading-[1.85] max-w-lg">{featured.desc}</p>
                <div className="mt-9 flex flex-wrap gap-8">
                  {[["Dead → Live", "Rescued & shipped"], ["3", "Platforms stabilized"], ["70+", "Engineers replaced"]].map(([v, l]) => (
                    <div key={l}><p className="font-display font-extrabold text-2xl md:text-3xl">{v}</p><p className="text-[11px] uppercase tracking-[0.18em] text-mute mt-1">{l}</p></div>
                  ))}
                </div>
                <p className="mt-10 inline-flex items-center gap-3 text-sm font-semibold text-orange">
                  <span className="grid place-items-center w-10 h-10 rounded-full border border-orange/50 transition-transform duration-500 group-hover:rotate-45">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  </span>
                  <RollText text="Read the rescue story" />
                </p>
              </div>
              <div className="relative min-h-[240px] bg-[radial-gradient(circle_at_70%_30%,rgba(255,77,28,0.35),transparent_60%)] grid place-items-center p-10 overflow-hidden">
                <span data-scrub-rotate aria-hidden className="absolute -right-6 -top-10 font-display font-extrabold text-[11rem] leading-none text-white/[0.05] select-none">🎓</span>
                <p data-scrub-scale className="relative font-display font-extrabold uppercase text-center leading-[0.95] text-5xl md:text-7xl">
                  <span className="text-stroke block">Stuck?</span><span className="text-orange block mt-2">→ Live.</span>
                </p>
              </div>
            </div>
          </article>
        </section>

        {/* Sticky filter */}
        <div className="sticky top-16 md:top-[72px] z-40 bg-ink/85 backdrop-blur-md border-y border-line">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-10 py-3.5 flex items-center gap-3 overflow-x-auto">
            <span className="hidden md:flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-mute shrink-0"><span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse-dot" />Filter</span>
            <div className="flex gap-2" role="tablist" aria-label="Filter case studies">
              {CASE_FILTERS.map((f) => (
                <button key={f.id} role="tab" aria-selected={filter === f.id} onClick={() => chooseFilter(f.id)} data-hover
                  className={`shrink-0 rounded-full px-5 py-2.5 text-[13px] font-semibold transition-all duration-300 ${filter === f.id ? "bg-orange text-white shadow-lg" : "border border-line text-cream/65 hover:border-orange hover:text-orange"}`}>
                  {f.label}
                </button>
              ))}
            </div>
            <span className="ml-auto shrink-0 text-[11px] uppercase tracking-[0.18em] text-mute" aria-live="polite">{shown.length} {shown.length === 1 ? "story" : "stories"}</span>
          </div>
        </div>

        {/* Stories grid */}
        <section id="stories" className="relative px-4 sm:px-6 md:px-10 py-16 md:py-24 max-w-[1500px] mx-auto w-full scroll-mt-24">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {shown.map((cs, i) => (
              <article key={cs.title}
                onClick={() => setPicked(cs)} role="button" tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setPicked(cs); } }}
                data-tilt data-cursor="Read" data-hover
                className="case-card spot-card group relative cursor-pointer rounded-[1.8rem] border border-line bg-coal/85 backdrop-blur overflow-hidden flex flex-col transition-colors duration-500 hover:border-orange/60">
                <div className={`relative h-36 sm:h-40 bg-gradient-to-br ${GRADS[i % GRADS.length]} overflow-hidden shrink-0`}>
                  {cs.img && <Image src={cs.img} alt="" fill sizes="(max-width: 768px) 92vw, 460px" className="object-cover opacity-90 transition-transform duration-[1300ms] group-hover:scale-[1.06]" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
                  <span data-bob className="absolute top-4 right-5 text-4xl select-none" aria-hidden>{cs.glyph}</span>
                  <span className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-3">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/85 bg-black/25 backdrop-blur-sm rounded-full px-3 py-1.5">{cs.industry}</span>
                  </span>
                </div>
                <div className="p-6 sm:p-7 flex flex-col flex-1">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-orange font-semibold">{cs.client}</p>
                  <h3 className="mt-2.5 font-display font-extrabold text-[1.3rem] leading-snug group-hover:text-orange transition-colors">{cs.title}</h3>
                  <p className="mt-3 text-sm text-mute leading-[1.75] line-clamp-3">{cs.desc}</p>
                  <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-orange/10 border border-orange/30 text-orange px-4 py-2 text-xs font-semibold w-max">✦ {cs.result}</p>
                  <div className="mt-auto pt-6 flex items-center justify-between gap-3">
                    <span className="flex flex-wrap gap-1.5">{cs.stack.slice(0, 3).map((t) => (<span key={t} className="text-[10px] border border-line rounded-full px-2.5 py-1 text-cream/60">{t}</span>))}</span>
                    <span className="text-[11px] uppercase tracking-[0.16em] text-orange font-semibold shrink-0"><RollText text="Read" /> →</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Rescue CTA */}
          <div data-anim="cinematic" className="mt-20 rounded-[2rem] border border-orange/30 bg-gradient-to-br from-orange-dim/50 via-coal to-coal px-7 py-10 sm:p-12 relative overflow-hidden">
            <span data-scrub-rotate aria-hidden className="absolute -right-8 -bottom-14 font-display font-extrabold text-[10rem] leading-none text-white/[0.05] select-none">✦</span>
            <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center relative">
              <div>
                <p data-scramble className="text-[11px] uppercase tracking-[0.28em] text-mute">Got a stuck or stalled project?</p>
                <h2 data-split className="mt-5 font-display font-extrabold uppercase leading-[1.0] text-3xl min-[420px]:text-5xl lg:text-6xl">
                  We've rescued what <span className="text-orange">bigger teams couldn't.</span>
                </h2>
                <p data-words className="mt-5 text-cream/70 leading-[1.85] max-w-xl">Tell us what's going on — a senior engineer will map the rescue: what to keep, what to rebuild, and what it takes to get to live.</p>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-4 shrink-0">
                <ArrowBtn href="/free-ai-audit">Get a free project audit</ArrowBtn>
                <Magnetic>
                  <a href={CALENDLY} target="_blank" rel="noreferrer" data-hover className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/25 px-7 py-3.5 text-sm font-semibold hover:border-orange hover:text-orange transition-colors">
                    <RollText text="Book a free call" /> ↗
                  </a>
                </Magnetic>
              </div>
            </div>
          </div>
          <div className="h-14 xl:h-0" aria-hidden />
        </section>
      </div>

      <div className="relative z-10"><Footer /></div>
      <CaseModal cs={picked} onClose={() => setPicked(null)} />
    </main>
  );
}
