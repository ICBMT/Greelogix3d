"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Cursor from "./Cursor";
import Header from "./Header";
import Smooth from "./Smooth";
import AnchorNav from "./AnchorNav";
import { Footer } from "./Sections";
import { CALENDLY } from "@/lib/data";
import { ArrowBtn, Magnetic, RevealLines, RollText } from "./ui";

const PageScene = dynamic(() => import("./PageScene"), { ssr: false });
const CARD_ANIMS = ["flip", "mask-left", "zoom", "mask-right", "rotate", "perspective"];

function Chapter({ num, label, title, sub, children, id, anim }) {
  return (
    <section id={id} className="relative px-4 sm:px-6 md:px-10 py-20 md:py-32 max-w-[1500px] mx-auto w-full scroll-mt-20">
      <div className="max-w-3xl" data-anim={anim}>
        <p data-scramble className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-mute">
          <span className="grid place-items-center w-8 h-8 rounded-full border border-orange/50 text-orange font-bold text-[10px]">{num}</span>
          Chapter — {label}
          <span data-line className="h-px flex-1 bg-line origin-left" />
        </p>
        <h2 data-split data-split-mode={parseInt(num, 10) % 2 ? "random" : "edges"} className="mt-7 font-display font-extrabold uppercase leading-[1.0] text-[2rem] min-[420px]:text-5xl lg:text-6xl">{title}</h2>
        {sub && <p data-words className="mt-5 text-mute leading-[1.85] max-w-xl">{sub}</p>}
      </div>
      {children}
    </section>
  );
}

const PRINCIPLES = [
  { t: "Small senior teams", d: "Senior engineers who own the outcome — not a revolving door of juniors hiding behind a sales deck.", glyph: "⬡" },
  { t: "Weekly demos", d: "Working software in your hands every single week. Progress you can click and test — never status theatre.", glyph: "◷" },
  { t: "Milestone pricing", d: "Clear milestones agreed up front. Scope, timeline, and cost range come out of the very first 30-minute call.", glyph: "▦" },
  { t: "100% code ownership", d: "The code lives in your repository, and ownership is 100% yours when the engagement is paid in full.", glyph: "✦" },
];

const JOURNEY = [
  { when: "2019", t: "Founded in Lahore", d: "GreeLogix starts in Lahore, Pakistan, with one rule: senior engineers own the outcome, end to end." },
  { when: "The early years", t: "Rescue & modernization", d: "We cut our teeth on hard problems — including large rescue and modernization work for products other teams had stalled." },
  { when: "The practice widens", t: "Production AI & products", d: "A practice forms around production AI, custom software, Laravel and Flutter products — and QA that actually ships." },
  { when: "Today", t: "Partners on five fronts", d: "Clients across the US, UK, UAE, Australia, and Canada. 150+ products shipped, 75+ AI systems built, 90+ happy clients." },
];

const MARQUEE = ["Senior engineers only", "Weekly demos", "Milestone pricing", "100% code ownership", "Response within 4 business hours", "No sales deck"];

export default function AboutClient() {
  const [ready, setReady] = useState(false);
  useEffect(() => { const r = requestAnimationFrame(() => setReady(true)); return () => cancelAnimationFrame(r); }, []);

  return (
    <main className="relative min-h-screen overflow-x-clip">
      <Cursor />
      <Smooth ready={ready} />
      <Header loaded={ready} />
      <AnchorNav items={[{ id: "top", label: "Intro" }, { id: "story", label: "Story" }, { id: "model", label: "Model" }, { id: "founder", label: "Founder" }, { id: "journey", label: "Journey" }, { id: "cta", label: "Start" }]} />
      <PageScene variant="about" />

      <div className="relative z-10">
        {/* ---------- Hero ---------- */}
        <section id="top" className="relative px-4 sm:px-6 md:px-10 pt-36 md:pt-44 pb-20 md:pb-28 max-w-[1500px] mx-auto w-full">
          <div aria-hidden className="pointer-events-none absolute -top-24 right-[4%] w-[30rem] h-[30rem] rounded-full bg-orange/[0.13] blur-3xl animate-drift" />
          <nav aria-label="Breadcrumb" className="relative flex items-center gap-2.5 text-[11px] uppercase tracking-[0.22em] text-mute">
            <Link href="/" className="hover:text-orange transition-colors">Home</Link><span className="text-orange">/</span><span className="text-cream font-semibold">About</span>
          </nav>
          <p className="relative mt-12 inline-flex items-center gap-2.5 rounded-full border border-orange/40 bg-orange/10 px-5 py-2.5 text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-orange">
            <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse-dot" /> About GreeLogix — Founded 2019 · Lahore → the world
          </p>
          <h1 className="relative mt-8 font-display font-extrabold uppercase leading-[0.94] tracking-tight text-[11.5vw] min-[420px]:text-[9.5vw] lg:text-[6.6rem] xl:text-[7.8rem]">
            <RevealLines loaded={ready} lines={[<>Senior engineers.</>, <><span className="text-orange">150+</span> products shipped.</>]} />
          </h1>
          <div className="relative mt-10 md:mt-12 grid lg:grid-cols-[1fr_auto] gap-10 items-end">
            <p data-scrub-words className="max-w-xl text-base md:text-lg text-cream/70 leading-[1.85]" style={{ opacity: ready ? 1 : 0, transition: "opacity .9s ease .55s" }}>
              Senior engineers building production AI and custom software for founders and operators
              worldwide — with weekly demos and clear ownership.
            </p>
            <div className="flex flex-wrap gap-4" style={{ opacity: ready ? 1 : 0, transition: "opacity .9s ease .7s" }}>
              <ArrowBtn href={CALENDLY} external>Book a free 30-min call</ArrowBtn>
              <Magnetic>
                <Link href="/case-studies" data-hover className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-7 py-3.5 text-sm font-semibold hover:border-orange hover:text-orange transition-colors">
                  <RollText text="See verified project work" /> ↗
                </Link>
              </Magnetic>
            </div>
          </div>
          <dl data-batch className="relative mt-14 md:mt-20 pt-8 border-t border-line grid grid-cols-2 md:grid-cols-4 gap-8">
            {[[150, "+", "Products shipped"], [75, "+", "AI systems built"], [90, "+", "Happy clients"], [2019, "", "Founded in Lahore"]].map(([v, sfx, l]) => (
              <div key={l}>
                <dd className="font-display font-extrabold text-4xl md:text-5xl"><span data-count={v}>0</span><span className="text-orange">{sfx}</span></dd>
                <dt className="mt-2 text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-mute">{l}</dt>
              </div>
            ))}
          </dl>
        </section>

        {/* ---------- Marquee divider ---------- */}
        <div aria-hidden className="relative overflow-hidden border-y border-orange/40 bg-orange text-white -rotate-1 scale-[1.02] my-4">
          <div data-gsap-marquee="30" className="flex w-max will-change-transform">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex items-center gap-10 pr-10 py-3.5" aria-hidden={copy === 1}>
                {MARQUEE.map((w) => (
                  <span key={w + copy} className="flex items-center gap-10 font-display font-extrabold uppercase tracking-wide text-lg md:text-xl whitespace-nowrap">{w}<span className="text-white/60">✦</span></span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ---------- Origin story ---------- */}
        <Chapter id="story" num="01" label="Origin" anim="rise"
          title={<>Started in Lahore. <span className="text-orange">Built for the world.</span></>}>
          <div className="mt-12 grid lg:grid-cols-[1.25fr_1fr] gap-10 lg:gap-16 items-start">
            <div data-anim="rise">
              <p data-scrub-words className="text-lg md:text-xl text-cream/85 leading-[1.9]">
                GreeLogix was founded in 2019 in Lahore, Pakistan, to give international founders and
                operators something rare in offshore delivery: senior engineers who own the outcome —
                not a revolving door of juniors behind a sales deck.
              </p>
              <p data-words className="mt-7 text-cream/65 leading-[1.9]">
                We cut our teeth on hard problems — including large rescue and modernization work —
                then built a practice around production AI, custom software, Laravel and Flutter
                products, and QA that ships. Today we partner with clients across the US, UK, UAE,
                Australia, and Canada.
              </p>
              <p data-words className="mt-6 text-cream/65 leading-[1.9]">
                The model has stayed the same: small senior teams, weekly demos, milestone pricing,
                and 100% code ownership for the client when the engagement is paid in full. When you
                book a call, you talk to an engineer who will actually scope and guide the build.
              </p>
              <svg aria-hidden className="mt-10 w-full h-8 text-orange/40 hidden md:block" viewBox="0 0 600 40" preserveAspectRatio="none" fill="none">
                <path data-draw-path d="M0 28 C 140 6, 300 36, 450 14 S 560 22, 600 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <aside data-anim="zoom" className="relative rounded-[2rem] border border-line bg-coal/85 backdrop-blur p-8 sm:p-10 overflow-hidden lg:sticky lg:top-28">
              <span data-scrub-rotate aria-hidden className="absolute -right-8 -top-10 font-display font-extrabold text-[9rem] leading-none text-white/[0.05] select-none">✦</span>
              <p data-scrub-scale className="relative font-display font-extrabold leading-none text-7xl md:text-8xl">2019</p>
              <p className="relative mt-3 text-[11px] uppercase tracking-[0.24em] text-orange">Founded — Lahore, Pakistan</p>
              <p className="relative mt-6 text-sm text-cream/65 leading-[1.85]">Now partnering with founders and operators across five regions:</p>
              <div data-stagger data-proximity className="relative mt-5 flex flex-wrap gap-2">
                {["United States", "United Kingdom", "UAE", "Australia", "Canada"].map((c) => (
                  <span key={c} data-hover className="rounded-full border border-line px-4 py-2 text-[13px] text-cream/80 hover:border-orange hover:text-orange transition-colors">{c}</span>
                ))}
              </div>
              <p className="relative mt-7 pt-6 border-t border-line text-sm text-cream/65 leading-[1.8]">
                <span className="text-orange font-semibold">The founding rule still runs the company:</span>{" "}
                the person who scopes your build is an engineer who will actually build it.
              </p>
            </aside>
          </div>
        </Chapter>

        {/* ---------- The model ---------- */}
        <Chapter id="model" num="02" label="The model" anim="zoom"
          title={<>The model <span className="text-stroke">never changed.</span></>}
          sub="Four commitments from 2019 that still decide how every engagement runs — whether it's a rescue, an MVP, or a production AI system.">
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PRINCIPLES.map((c, i) => (
              <article key={c.t} data-anim={CARD_ANIMS[i % CARD_ANIMS.length]} data-delay={(i % 4) * 0.07} data-tilt data-hover
                className="spot-card card-sheen group relative rounded-[1.8rem] border border-line bg-coal/85 backdrop-blur p-7 sm:p-8 flex flex-col transition-colors duration-500 hover:border-orange/60">
                <div className="flex items-start justify-between gap-3">
                  <span data-glitch className="font-display font-extrabold text-stroke-faint text-4xl group-hover:text-orange group-hover:[-webkit-text-stroke:0px] transition-all duration-500">{String(i + 1).padStart(2, "0")}</span>
                  <span data-bob className="text-2xl text-orange" aria-hidden>{c.glyph}</span>
                </div>
                <h3 className="mt-7 font-display font-extrabold text-[1.35rem] leading-tight group-hover:text-orange transition-colors">{c.t}</h3>
                <p data-words className="mt-2.5 text-sm text-mute leading-[1.75]">{c.d}</p>
              </article>
            ))}
          </div>
          <div data-anim="cinematic" className="mt-4 rounded-[2rem] border border-orange/30 bg-gradient-to-br from-orange-dim/50 via-coal to-coal px-7 py-9 sm:p-11 relative overflow-hidden">
            <span data-scrub-rotate aria-hidden className="absolute -right-8 -bottom-14 font-display font-extrabold text-[9rem] leading-none text-white/[0.05] select-none">◎</span>
            <div className="relative grid lg:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <p data-scramble className="text-[11px] uppercase tracking-[0.28em] text-mute">No bait-and-switch</p>
                <h3 data-split data-split-mode="edges" className="mt-4 font-display font-extrabold uppercase leading-[1.02] text-3xl min-[420px]:text-4xl lg:text-5xl">
                  You talk to the engineer <span className="text-orange">who scopes it.</span>
                </h3>
                <p data-words className="mt-4 text-cream/70 leading-[1.85] max-w-xl">When you book a call, Abuzer — founder and senior engineer — scopes and guides the build himself. Engineers you'll actually work with, not a sales bench.</p>
              </div>
              <ArrowBtn href={CALENDLY} external>Book a free call</ArrowBtn>
            </div>
          </div>
        </Chapter>

        {/* ---------- Founder ---------- */}
        <Chapter id="founder" num="03" label="The team" anim="perspective"
          title={<>Engineers you'll <span className="text-orange">actually work with.</span></>}>
          <article data-anim="cinematic" className="card-sheen relative mt-12 rounded-[2rem] border border-line bg-coal/85 backdrop-blur overflow-hidden">
            <div className="grid lg:grid-cols-[auto_1fr] gap-10 lg:gap-14 p-8 sm:p-12 items-center">
              <div className="relative mx-auto lg:mx-0 w-52 h-52 sm:w-64 sm:h-64 shrink-0">
                <span aria-hidden className="absolute inset-0 rounded-full border border-dashed border-orange/40 animate-[spin_28s_linear_infinite]" />
                <span aria-hidden className="absolute inset-4 rounded-full border border-line" />
                <span aria-hidden className="absolute inset-0 grid place-items-center">
                  <span data-scrub-scale className="grid place-items-center w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-orange to-[#7a2408] font-display font-extrabold text-6xl sm:text-7xl text-white shadow-[0_24px_60px_rgba(255,77,28,0.35)]">A</span>
                </span>
                <span data-bob aria-hidden className="absolute -top-1 right-4 grid place-items-center w-11 h-11 rounded-full bg-ink border border-orange/50 text-orange text-lg">✦</span>
                <span data-bob aria-hidden className="absolute bottom-3 -left-1 grid place-items-center w-10 h-10 rounded-full bg-ink border border-line text-base">⬡</span>
              </div>
              <div>
                <p data-scramble className="text-[11px] uppercase tracking-[0.28em] text-mute">Founder & Senior Engineer</p>
                <h3 className="mt-4 font-display font-extrabold text-4xl sm:text-5xl leading-none">Abuzer</h3>
                <p data-words className="mt-5 text-cream/70 leading-[1.85] max-w-xl">
                  You'll talk to Abuzer — the senior engineer who'll scope your build. Founder-led
                  scoping, senior-engineer delivery: response within 4 business hours, and no
                  commitment on the first call.
                </p>
                <div data-stagger data-proximity className="mt-7 flex flex-wrap gap-2">
                  {["AI product builds", "Laravel & backend architecture", "MVP scoping & delivery", "Technical audits"].map((x) => (
                    <span key={x} data-hover className="rounded-full border border-line px-4 py-2 text-[13px] text-cream/80 hover:border-orange hover:text-orange transition-colors">{x}</span>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-x-10 gap-y-5">
                  <div><p className="font-display font-extrabold text-2xl md:text-3xl">150<span className="text-orange">+</span></p><p className="text-[11px] uppercase tracking-[0.18em] text-mute mt-1">Projects delivered</p></div>
                  <div><p className="font-display font-extrabold text-2xl md:text-3xl">20<span className="text-orange">+</span></p><p className="text-[11px] uppercase tracking-[0.18em] text-mute mt-1">Play Store apps</p></div>
                  <div><p className="font-display font-extrabold text-2xl md:text-3xl">4<span className="text-orange">h</span></p><p className="text-[11px] uppercase tracking-[0.18em] text-mute mt-1">Response window</p></div>
                </div>
                <div data-batch className="mt-8 pt-7 border-t border-line flex flex-wrap gap-2.5">
                  {["Upwork Top Rated Plus", "Fiverr Level 2 · 5.0★", "Clutch Verified Provider"].map((b) => (
                    <span key={b} className="inline-flex items-center gap-2 rounded-full bg-orange/10 border border-orange/30 text-orange px-4 py-2 text-xs font-semibold">✦ {b}</span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </Chapter>

        {/* ---------- Journey ---------- */}
        <Chapter id="journey" num="04" label="The road so far" anim="right-far"
          title={<>2019 → <span className="text-orange">today.</span></>}
          sub="From a Lahore founding rule to a practice shipping production AI and software on five fronts.">
          <div className="relative mt-16">
            <svg aria-hidden className="hidden lg:block absolute left-0 right-0 -top-10 w-full h-10 text-orange/40" viewBox="0 0 1200 60" preserveAspectRatio="none" fill="none">
              <path data-draw-path d="M0 40 C 200 6, 420 54, 640 24 S 1020 50, 1200 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {JOURNEY.map((step, i) => (
                <article key={step.t} data-anim={i % 2 ? "br" : "bl"} data-delay={i * 0.09} className="relative">
                  <span data-anim="spin-in" data-delay={i * 0.08} className="relative z-10 grid place-items-center w-[52px] h-[52px] rounded-full bg-ink border-2 border-orange font-display font-extrabold text-orange text-sm">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-6 text-[10px] uppercase tracking-[0.24em] text-orange">{step.when}</p>
                  <h3 className="mt-2 font-display font-extrabold text-xl sm:text-2xl leading-tight">{step.t}</h3>
                  <p data-words className="mt-3 text-sm text-mute leading-[1.8]">{step.d}</p>
                </article>
              ))}
            </div>
          </div>
        </Chapter>

        {/* ---------- CTA ---------- */}
        <section id="cta" className="relative px-4 sm:px-6 md:px-10 pb-24 md:pb-32 max-w-[1500px] mx-auto w-full scroll-mt-20">
          <div data-anim="cinematic" className="rounded-[2rem] border border-orange/30 bg-gradient-to-br from-orange-dim/50 via-coal to-coal px-7 py-10 sm:p-12 relative overflow-hidden">
            <span data-scrub-rotate aria-hidden className="absolute -right-8 -bottom-14 font-display font-extrabold text-[10rem] leading-none text-white/[0.05] select-none">✦</span>
            <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center relative">
              <div>
                <p data-scramble className="text-[11px] uppercase tracking-[0.28em] text-mute">Next step</p>
                <h2 data-split className="mt-5 font-display font-extrabold uppercase leading-[1.0] text-3xl min-[420px]:text-5xl lg:text-6xl">
                  Get a senior engineer's take <span className="text-orange">in 30 minutes.</span>
                </h2>
                <p data-words className="mt-5 text-cream/70 leading-[1.85] max-w-xl">Scope, timeline, and cost range — no sales deck. Or start with the free readiness quiz if you're still evaluating your stack.</p>
                <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.18em] text-mute">
                  <span>Senior engineers only</span><span className="text-orange">·</span><span>Response within 4 business hours</span><span className="text-orange">·</span><span>No commitment on first call</span>
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
          </div>
          <div className="h-14 xl:h-0" aria-hidden />
        </section>
      </div>

      <div className="relative z-10"><Footer /></div>
    </main>
  );
}
