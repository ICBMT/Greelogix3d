"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROBLEMS, SERVICES, PROCESS, WORK, TESTIMONIALS, STACK, FAQS, CALENDLY } from "@/lib/data";
import Link from "next/link";
import { SectionTag, ArrowBtn, Magnetic } from "./ui";

gsap.registerPlugin(ScrollTrigger);

/* ---------------- Problems ---------------- */
export function Problems() {
  return (
    <section className="relative px-4 sm:px-6 md:px-10 py-20 sm:py-28 md:py-40 max-w-[1500px] mx-auto w-full">
      <SectionTag index="01" label="Problems we solve" />
      <h2 data-split className="font-display font-extrabold uppercase text-[2rem] leading-[1.02] min-[420px]:text-4xl sm:text-6xl lg:text-7xl max-w-4xl">
        Sound familiar? <span className="text-stroke">We fix this</span> <span className="text-orange">every week.</span>
      </h2>
      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PROBLEMS.map((p, i) => (
          <article key={p.n} data-anim={["zoom", "drop-bounce", "flip", "mask-left", "rotate", "slam"][i % 6]} data-tilt data-delay={(i % 3) * 0.08} data-hover
            className="card-sheen spot-card group rounded-3xl border border-line bg-coal/80 backdrop-blur p-6 sm:p-7 md:p-8 transition-all duration-500 hover:-translate-y-2 hover:border-orange/50 hover:bg-smoke">
            <div className="flex items-start justify-between">
              <span data-glitch className="font-display font-extrabold text-stroke-faint text-4xl group-hover:text-orange group-hover:[-webkit-text-stroke:0px] transition-all duration-500">{p.n}</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-orange border border-orange/40 rounded-full px-3 py-1">{p.tag}</span>
            </div>
            <h3 className="mt-8 font-display font-bold text-xl md:text-2xl leading-tight">{p.t}</h3>
            <p data-words className="mt-3 text-sm leading-relaxed text-mute">{p.d}</p>
            <span className="mt-6 block h-px bg-line relative overflow-hidden"><span className="absolute inset-y-0 left-0 w-full bg-orange origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" /></span>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Services: pinned horizontal journey ---------------- */
export function Services() {
  const wrap = useRef(null);
  const track = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const el = track.current;
      const dist = () => el.scrollWidth - innerWidth + 80;
      const tween = gsap.to(el, {
        x: () => -dist(), ease: "none",
        scrollTrigger: { trigger: wrap.current, start: "top top", end: () => `+=${dist()}`, pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 },
      });
      return () => tween.scrollTrigger?.kill();
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="services" ref={wrap} className="relative overflow-hidden lg:min-h-screen flex flex-col justify-center py-20 sm:py-28 lg:py-24 w-full">
      <div data-anim="cinematic" className="px-4 sm:px-6 md:px-10 max-w-[1500px] mx-auto w-full">
        <SectionTag index="02" label="What we build" />
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 data-split className="font-display font-extrabold uppercase text-[2rem] leading-[1.02] min-[420px]:text-4xl sm:text-6xl lg:text-7xl">
            Built to <span className="text-orange">ship</span> <span className="text-stroke">→</span>
          </h2>
          <p data-words className="max-w-sm text-mute leading-relaxed hidden md:block">One senior team for AI products, web & mobile apps, MVPs — and the QA that gets them production-ready. Keep scrolling, the services travel with you.</p>
        </div>
      </div>

      <div ref={track} className="mt-10 md:mt-12 grid grid-cols-1 min-[560px]:grid-cols-2 gap-4 sm:gap-5 px-4 sm:px-6 md:px-10 w-full lg:flex lg:flex-row lg:w-max will-change-transform">
        {SERVICES.map((s) => (
          <article key={s.n} data-hover
            data-tilt className={`spot-card group relative w-full lg:shrink-0 lg:w-[400px] rounded-[2rem] border p-6 sm:p-8 md:p-9 flex flex-col min-h-[300px] sm:min-h-[340px] transition-colors duration-500 ${
              s.hot ? "bg-orange text-white border-orange" : "bg-coal/85 backdrop-blur border-line hover:border-orange/60"
            }`}>
            <div className="flex items-start justify-between">
              <span className={`font-display font-extrabold text-5xl ${s.hot ? "text-white/85" : "text-stroke-faint"}`}>{s.n}</span>
              <span className={`grid place-items-center w-11 h-11 rounded-full border transition-transform duration-500 group-hover:rotate-45 ${s.hot ? "border-white/40" : "border-line"}`}>
                <svg width="13" height="13" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </span>
            </div>
            {s.hot && <span className="absolute top-24 left-8 text-[10px] uppercase tracking-widest2 bg-white text-orange font-semibold rounded-full px-3 py-1">Most requested</span>}
            <h3 className="mt-auto pt-16 font-display font-extrabold uppercase text-2xl md:text-[1.7rem] leading-tight">{s.t}</h3>
            <p className={`mt-3 text-sm leading-relaxed ${s.hot ? "text-white/85" : "text-mute"}`}>{s.d}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {s.k.map((k) => (<span key={k} className={`text-[11px] rounded-full px-3 py-1 border ${s.hot ? "border-white/35 text-white/90" : "border-line text-cream/70"}`}>{k}</span>))}
            </div>
          </article>
        ))}
        {/* end card */}
        <div className="w-full min-[560px]:col-span-2 lg:col-span-1 lg:shrink-0 lg:w-[340px] rounded-[2rem] border border-dashed border-orange/50 grid place-items-center min-h-[280px] sm:min-h-[340px] p-8 text-center">
          <div>
            <p className="font-display font-bold text-2xl">Not sure where<br />to start?</p>
            <p className="text-mute text-sm mt-3 mb-6">Take the free 5-question readiness audit.</p>
            <ArrowBtn href="/free-ai-audit">Free AI audit</ArrowBtn>
          </div>
        </div>
      </div>
      <p className="lg:hidden text-center text-mute text-xs tracking-widest2 uppercase mt-8">08 services · One senior team</p>
    </section>
  );
}

/* ---------------- Process: stacking sticky cards ---------------- */
export function Process() {
  return (
    <section id="process" className="relative px-4 sm:px-6 md:px-10 py-20 sm:py-28 md:py-40 max-w-[1500px] mx-auto w-full">
      <SectionTag index="03" label="How we work" />
      <h2 data-split className="font-display font-extrabold uppercase text-[2rem] leading-[1.02] min-[420px]:text-4xl sm:text-6xl lg:text-7xl">
        First call → <span className="text-orange">production</span><br /><span className="text-stroke">in weeks</span>
      </h2>
      <div className="mt-16 space-y-5">
        {PROCESS.map((p, i) => (
          <article key={p.n} data-anim={i % 2 ? "slide-right" : "slide-left"} className="sticky rounded-[2rem] border border-line overflow-hidden"
            style={{ top: `calc(76px + ${i * 14}px)`, background: i % 2 ? "#101010" : "#0c0c0b" }}>
            <div className="grid md:grid-cols-[auto_1fr_auto] items-start md:items-center gap-5 md:gap-12 p-6 sm:p-8 md:p-12">
              <span className="font-display font-extrabold text-5xl sm:text-6xl md:text-8xl text-stroke-orange" data-anim="spin-in leading-none">{p.n}</span>
              <div>
                <h3 className="font-display font-extrabold uppercase text-2xl md:text-4xl">{p.t}</h3>
                <p data-words className="mt-3 text-mute leading-relaxed max-w-xl">{p.d}</p>
              </div>
              <span className="justify-self-start md:justify-self-auto text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-orange border border-orange/40 rounded-full px-4 py-2 md:whitespace-nowrap">{p.meta}</span>
            </div>
            <span className="block h-1 bg-orange/90" style={{ width: `${(i + 1) * 25}%` }} />
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Work / case study ---------------- */
function MockUI({ g, glyph }) {
  return (
    <div className={`relative h-48 sm:h-56 md:h-64 rounded-t-[1.4rem] bg-gradient-to-br ${g} overflow-hidden`} aria-hidden>
      <div className="absolute top-4 left-4 right-4 flex gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-white/30" /><span className="w-2.5 h-2.5 rounded-full bg-white/30" /><span className="w-2.5 h-2.5 rounded-full bg-orange" /></div>
      <span className="absolute -bottom-8 -right-2 text-[11rem] leading-none text-white/[0.07] font-display font-extrabold select-none">{glyph}</span>
      <div className="absolute left-5 right-8 top-14 space-y-2.5" data-parallax="-18">
        <div className="h-3 w-2/5 rounded bg-white/50" /><div className="h-2 w-3/5 rounded bg-white/25" /><div className="h-2 w-1/2 rounded bg-white/20" />
        <div className="flex gap-2 pt-2"><div className="h-14 w-1/3 rounded-xl bg-white/15 border border-white/20" /><div className="h-14 w-1/3 rounded-xl bg-orange/70" /><div className="h-14 w-1/3 rounded-xl bg-white/10 border border-white/15" /></div>
      </div>
    </div>
  );
}

export function Work() {
  return (
    <section id="work" className="relative px-4 sm:px-6 md:px-10 py-20 sm:py-28 md:py-40 max-w-[1500px] mx-auto w-full">
      <SectionTag index="04" label="Selected work" />
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 data-split className="font-display font-extrabold uppercase text-[2rem] leading-[1.02] min-[420px]:text-4xl sm:text-6xl lg:text-7xl">Real outcomes,<br /><span className="text-stroke">not fluff</span></h2>
        <div data-reveal>
          <p className="text-mute max-w-xs leading-relaxed">150+ products in production for founders in the US, UK, UAE, Australia & Canada.</p>
          <Link href="/portfolio" data-hover className="group mt-5 inline-flex items-center gap-3 text-sm font-semibold text-orange">
            View the full portfolio
            <span className="grid place-items-center w-9 h-9 rounded-full border border-orange/50 transition-transform duration-300 group-hover:rotate-45">↗</span>
          </Link>
        </div>
      </div>

      {/* Featured rescue case study */}
      <article data-anim="cinematic" data-hover className="card-sheen group mt-14 rounded-[2rem] border border-orange/35 bg-gradient-to-br from-orange-dim/60 via-coal to-coal overflow-hidden">
        <div className="grid lg:grid-cols-2">
          <div className="p-6 sm:p-8 md:p-12">
            <span className="text-[10px] uppercase tracking-widest2 bg-orange text-white font-semibold rounded-full px-3 py-1.5">Featured · EdTech Rescue</span>
            <h3 className="mt-7 font-display font-extrabold text-3xl md:text-[2.6rem] leading-[1.05]">We shipped what <span className="text-orange">70 engineers</span> couldn't.</h3>
            <p data-scrub-words className="mt-4 text-cream/70 leading-relaxed max-w-md">An education platform stuck in limbo with a previous vendor. We took over, stabilised the codebase, and shipped the core student & teacher experience — dead to live.</p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-6">
              {[["Dead → Live", "Rescued & shipped"], ["3", "Platforms stabilised"], ["70+", "Engineers replaced"]].map(([v, l]) => (
                <div key={l}><p className="font-display font-extrabold text-2xl md:text-3xl">{v}</p><p className="text-[11px] uppercase tracking-[0.18em] text-mute mt-1">{l}</p></div>
              ))}
            </div>
          </div>
          <div className="relative min-h-[220px] sm:min-h-[260px] bg-[radial-gradient(circle_at_70%_30%,rgba(255,77,28,0.35),transparent_60%)] grid place-items-center p-10">
            <p data-scrub-scale className="font-display font-extrabold uppercase text-center leading-[0.95] text-4xl min-[420px]:text-5xl md:text-7xl">
              <span className="text-stroke block">Stuck?</span><span className="text-orange block mt-2">→ Live.</span>
            </p>
            <span className="absolute bottom-6 right-8 text-mute text-xs tracking-widest2 uppercase">MTS · Case Study</span>
          </div>
        </div>
      </article>

      <div className="mt-5 grid md:grid-cols-3 gap-5">
        {WORK.map((w, i) => (
          <article key={w.t} data-anim={["flip", "mask-left", "mask-right"][i % 3]} data-delay={i * 0.1} data-hover
            className="group rounded-[1.6rem] border border-line bg-coal/85 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-cream/25">
            <MockUI g={w.g} glyph={w.glyph} />
            <div className="p-7">
              <p className="text-[11px] uppercase tracking-[0.2em] text-orange">{w.c}</p>
              <h3 className="mt-2 font-display font-extrabold text-2xl group-hover:text-orange transition-colors">{w.t}</h3>
              <p data-words className="mt-2.5 text-sm text-mute leading-relaxed">{w.d}</p>
              <div className="mt-5 flex flex-wrap gap-2">{w.tags.map((t) => (<span key={t} className="text-[11px] border border-line rounded-full px-3 py-1 text-cream/70">{t}</span>))}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Studio: why + numbers band ---------------- */
export function Studio() {
  const points = [
    { t: "Senior engineers only", d: "Led by experienced developers — no junior bait-and-switch, no outsourced surprises." },
    { t: "Production-first delivery", d: "Security, QA and architecture from sprint one — not bolted on before launch." },
    { t: "4-hour response guarantee", d: "A senior engineer replies within 4 business hours. Direct access, not a ticket queue." },
    { t: "Outcome-focused sprints", d: "Weekly demos, clear milestones, scope tied to business results — not vanity features." },
  ];
  return (
    <section id="studio" className="relative px-4 sm:px-6 md:px-10 py-20 sm:py-28 md:py-40 max-w-[1500px] mx-auto w-full">
      <SectionTag index="05" label="Why GreeLogix" />
      <h2 data-split className="font-display font-extrabold uppercase text-[2rem] leading-[1.02] min-[420px]:text-4xl sm:text-6xl lg:text-7xl max-w-4xl">
        Most agencies sell hours. <span className="text-orange">We sell shipped software.</span>
      </h2>
      <div className="mt-14 grid md:grid-cols-2 gap-4">
        {points.map((p, i) => (
          <article key={p.t} data-anim={i % 2 ? "br" : "bl"} data-delay={(i % 2) * 0.08} data-hover className="spot-card group rounded-3xl border border-line bg-coal/80 p-8 md:p-10 flex gap-6 transition-all duration-500 hover:border-orange/50 hover:-translate-y-1.5">
            <span data-bob className="font-display font-extrabold text-orange text-lg shrink-0 mt-1">✦</span>
            <div><h3 className="font-display font-bold text-xl md:text-2xl">{p.t}</h3><p className="mt-2.5 text-mute leading-relaxed text-[15px]">{p.d}</p></div>
          </article>
        ))}
      </div>

      {/* deliverables strip */}
      <div data-stagger data-proximity className="mt-5 rounded-3xl border border-line bg-smoke/70 px-8 py-7 flex flex-wrap items-center gap-x-10 gap-y-4 justify-between">
        {[["100%", "Code ownership"], ["Full", "Documentation"], ["90 days", "Free support"], ["Weekly", "Live demos"]].map(([v, l]) => (
          <p key={l} className="text-sm text-mute"><span className="font-display font-extrabold text-cream text-xl mr-2">{v}</span>{l}</p>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Testimonials + stack ---------------- */
export function Voices() {
  return (
    <section className="relative py-20 sm:py-28 md:py-36 overflow-hidden w-full">
      <div className="px-4 sm:px-6 md:px-10 max-w-[1500px] mx-auto w-full">
        <SectionTag index="06" label="Client voices" />
        <h2 data-split className="font-display font-extrabold uppercase text-[2rem] leading-[1.02] min-[420px]:text-4xl sm:text-6xl lg:text-7xl">Trusted by founders <span className="text-stroke">worldwide</span></h2>
      </div>
      <div className="mt-14 overflow-hidden marquee-paused" aria-label="Client testimonials">
        <div data-batch className="flex w-max animate-marquee-slow gap-4 sm:gap-5 px-4 sm:px-6">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <figure key={i} data-hover className="w-[85vw] max-w-[480px] sm:w-[480px] shrink-0 rounded-[1.8rem] border border-line bg-coal/85 backdrop-blur p-6 sm:p-8 md:p-10 flex flex-col">
              <span className="text-orange text-2xl" aria-hidden>★★★★★</span>
              <blockquote className="mt-5 text-lg md:text-xl leading-relaxed text-cream/90">“{t.q}”</blockquote>
              <figcaption className="mt-auto pt-8 flex items-center gap-4">
                <span className="w-11 h-11 rounded-full bg-orange/20 border border-orange/40 grid place-items-center font-display font-extrabold text-orange">{t.a[0]}</span>
                <span><span className="block font-semibold text-sm">{t.a}</span><span className="block text-xs text-mute mt-0.5">{t.r}</span></span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* tech stack river */}
      <div className="mt-20 border-y border-line py-6 overflow-hidden" aria-label="Our tech stack">
        <div data-velocity className="flex w-max animate-marquee gap-0">
          {[...STACK, ...STACK].map((s, i) => (
            <span key={i} className="flex items-center whitespace-nowrap px-5 font-display font-bold uppercase text-xl md:text-2xl text-cream/35 hover:text-orange transition-colors">
              {s}<span className="text-orange/60 text-sm ml-10">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="relative px-4 sm:px-6 md:px-10 py-20 sm:py-28 md:py-40 max-w-[1500px] mx-auto w-full">
      <SectionTag index="07" label="Questions" />
      <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12">
        <div>
          <h2 data-split className="font-display font-extrabold uppercase leading-[1.02] text-[2rem] min-[420px]:text-4xl sm:text-6xl">Before<br />you <span className="text-orange">book</span></h2>
          <p data-reveal className="mt-5 text-mute leading-relaxed max-w-sm">Straight answers, so you know exactly what you're getting before the first call. Still curious?</p>
          <div data-reveal className="mt-8"><ArrowBtn href={CALENDLY} external>Ask on a free call</ArrowBtn></div>
        </div>
        <div>
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} data-anim={i % 2 ? "right-far" : "left-far"} data-delay={i * 0.07} className={`border-b border-line ${i === 0 ? "border-t" : ""}`}>
                <button onClick={() => setOpen(isOpen ? -1 : i)} data-hover aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left group">
                  <span className={`font-display font-bold text-base min-[420px]:text-lg md:text-[1.35rem] leading-snug transition-colors ${isOpen ? "text-orange" : "group-hover:text-orange"}`}>{f.q}</span>
                  <span className={`shrink-0 grid place-items-center w-10 h-10 rounded-full border transition-all duration-500 ${isOpen ? "bg-orange border-orange rotate-45 text-white" : "border-line"}`}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  </span>
                </button>
                <div className="grid transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}>
                  <div className="overflow-hidden"><p className="pb-7 pr-10 text-mute leading-relaxed max-w-2xl">{f.a}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CTA + Footer ---------------- */
export function Footer() {
  const top = () => window.__lenis?.scrollTo(0, { duration: 1.6 });
  return (
    <footer id="cta" className="relative">
      <section className="px-4 sm:px-6 md:px-10 pt-20 sm:pt-28 md:pt-40 pb-14 md:pb-16 max-w-[1500px] mx-auto text-center relative w-full">
        <p data-reveal className="text-[11px] uppercase tracking-widest2 text-mute">( Next step — 30 minutes, no sales deck )</p>
        <h2 data-reveal className="mt-7 font-display font-extrabold uppercase leading-[0.92] text-[11.5vw] lg:text-[7.5rem]">
          Let's build<br /><span className="text-stroke">something</span> <span className="text-orange">real.</span>
        </h2>
        <p data-reveal className="mt-7 text-mute max-w-lg mx-auto leading-relaxed">Scope, timeline and cost range from a senior engineer — the same person who'll scope your build. Response within 4 business hours.</p>
        <div data-reveal className="mt-10 flex flex-wrap justify-center gap-4">
          <ArrowBtn href={CALENDLY} external>Book your free 30-min call</ArrowBtn>
          <Magnetic>
            <a href="/free-ai-audit" data-hover
              className="inline-flex items-center gap-3 rounded-full border border-cream/25 px-7 py-3.5 text-sm font-semibold hover:border-orange hover:text-orange transition-colors">
              Free AI audit <span aria-hidden>↗</span>
            </a>
          </Magnetic>
        </div>
        <div data-reveal className="mt-14 flex flex-wrap justify-center gap-3 text-[11px] uppercase tracking-[0.18em]">
          {[["Upwork", "Top Rated Plus · 100%"], ["Fiverr", "5.0 ★ · Level 2"], ["Clutch", "Verified Provider"]].map(([p, v]) => (
            <span key={p} className="border border-line rounded-full px-5 py-2.5 text-cream/70 bg-coal/70"><b className="text-cream">{p}</b> — {v}</span>
          ))}
        </div>
      </section>

      <div className="border-t border-line px-4 sm:px-6 md:px-10 py-8 max-w-[1500px] mx-auto w-full flex flex-wrap gap-5 items-center justify-between text-xs text-mute">
        <span>© {new Date().getFullYear()} GreeLogix — AI & Custom Software</span>
        <span className="hidden md:block">Lahore → US · UK · UAE · AU · CA</span>
        <button onClick={top} data-hover className="flex items-center gap-2 uppercase tracking-[0.2em] hover:text-orange transition-colors">Back to top <span className="grid place-items-center w-8 h-8 rounded-full border border-line">↑</span></button>
      </div>

      {/* giant wordmark */}
      <div aria-hidden className="overflow-hidden leading-none select-none pointer-events-none px-2">
        <p data-parallax="-30" data-velocity data-scrub-x className="font-display font-extrabold uppercase text-center whitespace-nowrap text-[13vw] text-stroke-faint hover:text-orange/10 transition-colors duration-700 translate-y-[18%]">
          GreeLogix
        </p>
      </div>
    </footer>
  );
}
