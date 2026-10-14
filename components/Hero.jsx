"use client";
import { CALENDLY, STATS } from "@/lib/data";
import { ArrowBtn, RevealLines } from "./ui";

export default function Hero({ loaded }) {
  const fade = (d) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(24px)",
    transition: `opacity .9s ease ${d}s, transform .9s cubic-bezier(.22,1,.36,1) ${d}s`,
  });

  return (
    <section id="top" className="relative min-h-[100svh] flex flex-col justify-end px-5 md:px-10 pt-32 pb-10 max-w-[1500px] mx-auto w-full">
      {/* top meta row */}
      <div style={fade(0.55)} className="absolute top-24 md:top-28 left-5 md:left-10 right-5 md:right-10 flex flex-wrap gap-3 items-center justify-between text-[11px] uppercase tracking-widest2 text-mute">
        <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot" /> Available for Q3 builds</span>
        <span className="hidden md:block">AI & Custom Software · Est. Lahore → Worldwide</span>
        <span>★ Top Rated Plus — Upwork</span>
      </div>

      <div className="relative">
        <p style={fade(0.35)} className="text-orange font-medium uppercase tracking-widest2 text-xs md:text-sm mb-5">
          ( We build — AI software & MVPs )
        </p>
        <h1 className="font-display font-extrabold uppercase leading-[0.92] tracking-tight text-[13.5vw] sm:text-[11vw] lg:text-[8.2rem] xl:text-[9.5rem]">
          <RevealLines loaded={loaded} lines={[
            <>Software</>,
            <>That <span className="text-stroke">Actually</span></>,
            <><span className="text-orange">Ships.</span> <span className="text-[0.35em] align-top font-body font-light normal-case tracking-normal text-mute hidden md:inline">in 4–8 weeks ↗</span></>,
          ]} />
        </h1>

        <div className="mt-8 md:mt-10 flex flex-col md:flex-row md:items-end gap-8 md:gap-14">
          <p data-scrub-words style={fade(0.7)} className="max-w-md text-base md:text-lg text-cream/75 leading-relaxed">
            A senior software agency for startups, SMEs and nonprofits. AI products, web & mobile apps —
            no junior hand-offs, no endless discovery. Just weekly demos and production-ready code.
          </p>
          <div style={fade(0.8)} className="flex flex-wrap items-center gap-4">
            <ArrowBtn href={CALENDLY} external>Book a free strategy call</ArrowBtn>
            <a href="#work" data-hover style={fade(0.85)} className="link-line text-sm font-medium text-cream/85 py-3">See the work ↓</a>
          </div>

          {/* rotating badge */}
          <div style={fade(0.9)} className="hidden lg:block ml-auto relative w-28 h-28 shrink-0" aria-hidden>
            <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow fill-cream/60 text-[8.2px] uppercase tracking-[0.22em]">
              <defs><path id="circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
              <text><textPath href="#circ">Senior engineers · No junior hand-offs · </textPath></text>
            </svg>
            <span className="absolute inset-0 grid place-items-center text-orange text-xl">↓</span>
          </div>
        </div>

        {/* stats */}
        <dl data-stagger style={fade(1)} className="mt-10 md:mt-16 grid grid-cols-2 md:grid-cols-4 border-t border-line">
          {STATS.map((s, i) => (
            <div key={s.l} className={`pt-5 pr-3 ${i % 2 === 0 ? "pl-0" : "pl-4"} md:pl-5 md:first:pl-0 border-line ${i % 2 === 0 ? "border-r" : ""} md:border-r md:last:border-r-0`}>
              <dd className="font-display font-extrabold text-[1.7rem] leading-none sm:text-4xl md:text-5xl"><span data-count={s.v}>0</span><span className="text-orange">{s.s}</span></dd>
              <dt className="mt-2 text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-mute leading-relaxed">{s.l}</dt>
            </div>
          ))}
        </dl>
      </div>

      {/* scroll cue */}
      <div style={fade(1.15)} className="absolute bottom-40 right-5 md:right-10 hidden md:flex flex-col items-center gap-3" aria-hidden>
        <span className="text-[10px] tracking-widest2 uppercase text-mute [writing-mode:vertical-rl]">Scroll</span>
        <span className="w-px h-14 bg-gradient-to-b from-orange to-transparent animate-scroll-line block" />
      </div>
    </section>
  );
}

export function LogoMarquee() {
  const items = ["Upwork — Top Rated Plus", "Fiverr — 5.0 ★", "Clutch — Verified", "100% Job Success", "150+ Projects Delivered", "US · UK · UAE · AU · CA"];
  const row = [...items, ...items];
  return (
    <section aria-label="Verified on trusted platforms" className="relative border-y border-line bg-ink/70 backdrop-blur-sm overflow-hidden py-5 marquee-paused">
      <div data-velocity className="flex w-max animate-marquee gap-0">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-6 px-6 whitespace-nowrap text-sm uppercase tracking-[0.18em] text-cream/60">
            {t} <span className="text-orange">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}

export function OrangeMarquee() {
  const items = ["AI Automation", "MVP Development", "Laravel", "Flutter", "QA & Testing", "Code Audit"];
  const row = [...items, ...items, ...items];
  return (
    <div aria-hidden className="relative bg-orange text-white overflow-hidden py-3.5 -rotate-1 scale-[1.02] my-4 shadow-[0_20px_60px_rgba(255,77,28,0.25)]">
      <div data-velocity className="flex w-max animate-marquee">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-6 px-6 whitespace-nowrap font-display font-bold uppercase tracking-wide text-lg">
            {t} <span>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
