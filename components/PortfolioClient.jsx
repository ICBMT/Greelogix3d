"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Cursor from "./Cursor";
import Header from "./Header";
import Smooth from "./Smooth";
import { Footer } from "./Sections";
import AnchorNav from "./AnchorNav";
import { PROJECTS, FILTERS, CALENDLY } from "@/lib/data";
import { ArrowBtn, Magnetic } from "./ui";

gsap.registerPlugin(ScrollTrigger);

const pad = (n) => String(n).padStart(2, "0");

/* Soft product visual — a browser window or a phone, drawn per project */
function Visual({ p }) {
  return (
    <div className={`relative overflow-hidden rounded-[1.8rem] sm:rounded-[2.2rem] bg-gradient-to-br ${p.g} aspect-[4/3] sm:aspect-[16/10] shadow-[0_30px_80px_rgba(20,16,8,0.18)]`} aria-hidden>
      <span className="absolute -top-10 -right-4 text-[12rem] sm:text-[16rem] leading-none font-display font-extrabold text-white/10 select-none">{p.glyph}</span>
      <span className="absolute top-5 left-6 text-[10px] uppercase tracking-[0.28em] text-white/75">{p.industry}</span>
      <div data-parallax="-22" className="absolute inset-0 grid place-items-center pt-8">
        {p.device === "phone" ? (
          <div className="w-[42%] max-w-[190px] aspect-[9/17] rounded-[1.6rem] bg-[#111110] p-2 shadow-2xl rotate-[-4deg]">
            <div className="w-full h-full rounded-[1.25rem] bg-[#faf8f2] p-3.5 flex flex-col gap-2 overflow-hidden">
              <span className="w-10 h-1.5 rounded-full bg-ink/15 mx-auto mb-1" />
              <span className="h-2.5 w-3/5 rounded bg-ink/70" /><span className="h-2 w-4/5 rounded bg-ink/20" /><span className="h-2 w-2/3 rounded bg-ink/15" />
              <span className="mt-2 h-16 rounded-xl bg-orange/85" />
              <span className="h-9 rounded-xl bg-ink/[0.07]" /><span className="h-9 rounded-xl bg-ink/[0.07]" /><span className="h-9 rounded-xl bg-ink/[0.05]" />
              <span className="mt-auto h-8 rounded-full bg-ink grid place-items-center"><span className="w-12 h-1.5 rounded bg-white/70" /></span>
            </div>
          </div>
        ) : (
          <div className="w-[76%] aspect-[16/10] rounded-xl bg-[#faf8f2] shadow-2xl rotate-[-2deg] overflow-hidden">
            <div className="flex items-center gap-1.5 px-3.5 h-8 bg-ink/[0.06] border-b border-ink/10">
              <span className="w-2 h-2 rounded-full bg-ink/20" /><span className="w-2 h-2 rounded-full bg-ink/20" /><span className="w-2 h-2 rounded-full bg-orange" />
              <span className="ml-3 h-3.5 flex-1 rounded-full bg-white border border-ink/10" />
            </div>
            <div className="p-4 sm:p-5 flex gap-4">
              <div className="hidden sm:flex flex-col gap-2 w-1/4"><span className="h-2 rounded bg-orange/80 w-4/5" /><span className="h-2 rounded bg-ink/20" /><span className="h-2 rounded bg-ink/15" /><span className="h-2 rounded bg-ink/15" /><span className="h-2 rounded bg-ink/10 w-2/3" /></div>
              <div className="flex-1 space-y-2.5">
                <span className="block h-3 w-2/5 rounded bg-ink/75" /><span className="block h-2 w-3/5 rounded bg-ink/20" />
                <span className="flex gap-2 pt-1"><span className="h-12 sm:h-16 flex-1 rounded-lg bg-orange/85" /><span className="h-12 sm:h-16 flex-1 rounded-lg bg-ink/[0.08]" /><span className="h-12 sm:h-16 flex-1 rounded-lg bg-ink/[0.05]" /></span>
                <span className="block h-2 w-1/2 rounded bg-ink/15" /><span className="block h-2 w-2/3 rounded bg-ink/10" />
              </div>
            </div>
          </div>
        )}
      </div>
      <span className="absolute bottom-5 right-6 font-display font-extrabold text-white/85 text-lg">{p.title}</span>
    </div>
  );
}

function StoryCard({ p, index, open, onToggle }) {
  const flipped = index % 2 === 1;
  return (
    <article className="project-card relative border-t border-ink/10 py-12 sm:py-16 lg:py-20 first:border-t-0 first:pt-4">
      <span aria-hidden className="absolute -top-3 right-0 font-display font-extrabold text-[6rem] sm:text-[9rem] leading-none text-ink/[0.045] select-none pointer-events-none">{pad(index + 1)}</span>
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative">
        <div className={`lg:col-span-7 ${flipped ? "lg:order-2" : ""}`} data-hover><Visual p={p} /></div>
        <div className="lg:col-span-5">
          <p className="flex flex-wrap items-center gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-ink/50">
            <span className="text-orange font-semibold">Story {pad(index + 1)}</span><span aria-hidden>·</span><span>{p.industry}</span>
          </p>
          <h3 className="mt-4 font-display font-extrabold leading-[0.98] text-4xl min-[420px]:text-5xl xl:text-6xl">{p.title}</h3>
          <p className="mt-2 font-display font-bold text-orange text-lg">{p.sub}</p>
          <p className="mt-5 text-ink/65 leading-[1.85] max-w-md">{p.desc}</p>
          <blockquote className="mt-6 border-l-2 border-orange pl-4 text-ink/80 italic leading-relaxed max-w-md">“{p.note}”</blockquote>

          <div className="grid transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]" style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}>
            <div className="overflow-hidden">
              <p className="pt-7 text-[10px] uppercase tracking-[0.24em] text-ink/45">Inside the build</p>
              <ul className="mt-3 grid sm:grid-cols-2 gap-x-5 gap-y-2.5 max-w-md">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-sm text-ink/75 leading-snug"><span className="text-orange mt-0.5 shrink-0">✦</span>{f}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-2">
            {p.stack.map((s) => (<span key={s} className="text-[11px] rounded-full border border-ink/15 bg-white/50 px-3 py-1.5 text-ink/70">{s}</span>))}
          </div>
          <button onClick={onToggle} data-hover aria-expanded={open}
            className="group mt-8 inline-flex items-center gap-3 text-sm font-semibold text-ink">
            <span className={`grid place-items-center w-10 h-10 rounded-full border transition-all duration-500 ${open ? "bg-orange border-orange text-white rotate-45" : "border-ink/20 group-hover:border-orange group-hover:text-orange"}`}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </span>
            {open ? "Close the story" : "Read the story"}
            <span className="block h-px w-10 bg-ink/25 group-hover:bg-orange group-hover:w-14 transition-all duration-500" aria-hidden />
          </button>
        </div>
      </div>
    </article>
  );
}

const INTERLUDES = {
  2: { big: "75+ AI systems", small: "are already running in production — chatbots, tutors, analysers and automations among the stories below." },
  6: { big: "4–8 weeks", small: "is the typical distance between a first call and a shipped MVP. Most of these stories started exactly there." },
};

export default function PortfolioClient() {
  const [ready, setReady] = useState(false);
  const [filter, setFilter] = useState("all");
  const [openSlug, setOpenSlug] = useState("Jalebi");
  const listRef = useRef(null);

  useEffect(() => { const r = requestAnimationFrame(() => setReady(true)); return () => cancelAnimationFrame(r); }, []);

  const shown = PROJECTS.filter((p) => filter === "all" || p.cats.includes(filter));

  useEffect(() => {
    if (!listRef.current) return;
    gsap.fromTo(listRef.current.querySelectorAll(".project-card"),
      { y: 36, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.85, stagger: 0.07, ease: "power3.out", overwrite: true, clearProps: "transform" });
    const t = setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => clearTimeout(t);
  }, [filter]);

  useEffect(() => { const t = setTimeout(() => ScrollTrigger.refresh(), 520); return () => clearTimeout(t); }, [openSlug]);

  const fade = (d) => ({
    opacity: ready ? 1 : 0,
    transform: ready ? "translateY(0)" : "translateY(26px)",
    transition: `opacity .9s ease ${d}s, transform .95s cubic-bezier(.22,1,.36,1) ${d}s`,
  });

  return (
    <main className="relative bg-[#f3efe7] text-[#141310] overflow-x-clip min-h-screen">
      <Cursor />
      <Smooth ready={ready} />
      <Header loaded={ready} light />
      <AnchorNav light items={[
        { id: "top", label: "Intro" }, { id: "stories", label: "Stories" },
        { id: "build", label: "Studio" }, { id: "cta", label: "Start" },
      ]} />

      {/* drifting air */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-drift absolute -top-32 right-[8%] w-[34rem] h-[34rem] rounded-full bg-orange/[0.13] blur-3xl" />
        <div className="animate-drift-slow absolute top-[38%] -left-52 w-[30rem] h-[30rem] rounded-full bg-[#ffb59d]/35 blur-3xl" />
        <div className="animate-drift absolute top-[72%] right-[-10rem] w-[28rem] h-[28rem] rounded-full bg-[#c8d8c0]/40 blur-3xl" />
      </div>

      <div className="relative">
        {/* ---------- Hero ---------- */}
        <section id="top" className="relative px-4 sm:px-6 md:px-10 pt-32 md:pt-44 pb-16 md:pb-24 max-w-[1500px] mx-auto w-full">
          <span aria-hidden className="hidden xl:block absolute right-10 top-44 text-[10px] uppercase tracking-[0.4em] text-ink/40 [writing-mode:vertical-rl]">Selected work — scroll gently ↓</span>
          <nav style={fade(0.05)} aria-label="Breadcrumb" className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.22em] text-ink/50">
            <Link href="/" className="hover:text-orange transition-colors">Home</Link><span className="text-orange">/</span><span className="text-ink font-semibold">Portfolio</span>
          </nav>

          <h1 className="mt-10 font-display font-extrabold uppercase leading-[0.94] tracking-tight text-[13vw] min-[420px]:text-[11vw] lg:text-[7.8rem] xl:text-[9rem]">
            <span className="block overflow-hidden"><span className="block" style={{ transform: ready ? "translateY(0)" : "translateY(110%)", transition: "transform 1.1s cubic-bezier(.22,1,.36,1) .1s" }}>Products</span></span>
            <span className="block overflow-hidden"><span className="block" style={{ transform: ready ? "translateY(0)" : "translateY(110%)", transition: "transform 1.1s cubic-bezier(.22,1,.36,1) .2s" }}>we've <span className="text-transparent" style={{ WebkitTextStroke: "1.5px #141310" }}>truly</span></span></span>
            <span className="block overflow-hidden"><span className="block text-orange" style={{ transform: ready ? "translateY(0)" : "translateY(110%)", transition: "transform 1.1s cubic-bezier(.22,1,.36,1) .3s" }}>Shipped.</span></span>
          </h1>

          <div className="mt-10 md:mt-14 grid lg:grid-cols-[1.2fr_auto] gap-10 items-end">
            <p style={fade(0.45)} className="max-w-xl text-base md:text-lg leading-[1.85] text-ink/65">
              From AI-powered SaaS platforms to consumer mobile apps — real products, designed, built and shipped
              for founders and businesses worldwide. Ten stories below. Take your time; each one opens up.
            </p>
            <div style={fade(0.55)} className="flex flex-wrap gap-4">
              <ArrowBtn href="#stories" dark>Start reading ↓</ArrowBtn>
              <Magnetic>
                <a href={CALENDLY} target="_blank" rel="noreferrer" data-hover className="inline-flex items-center gap-2 rounded-full border border-ink/25 px-7 py-3.5 text-sm font-semibold hover:border-orange hover:text-orange transition-colors">
                  Start a project ↗
                </a>
              </Magnetic>
            </div>
          </div>

          <dl style={fade(0.65)} className="mt-14 md:mt-20 pt-8 border-t border-ink/10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[[150, "+", "Projects delivered"], [75, "+", "AI solutions built"], [90, "+", "Happy clients"], [20, "+", "Apps on Play Store"]].map(([v, s, l]) => (
              <div key={l}>
                <dd className="font-display font-extrabold text-4xl md:text-5xl"><span data-count={v}>0</span><span className="text-orange">{s}</span></dd>
                <dt className="mt-2 text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-ink/50">{l}</dt>
              </div>
            ))}
          </dl>
          <p style={fade(0.75)} className="mt-8 text-xs uppercase tracking-[0.2em] text-ink/45">Clients across US · UK · UAE · Australia · Canada</p>
        </section>

        {/* ---------- Sticky filter ---------- */}
        <div id="stories" className="sticky top-16 md:top-[72px] z-40 bg-[#f3efe7]/85 backdrop-blur-md border-y border-ink/10">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-10 py-3.5 flex items-center gap-3 overflow-x-auto">
            <span className="hidden md:flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-ink/50 shrink-0"><span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse-dot" />Browse</span>
            <div className="flex gap-2" role="tablist" aria-label="Filter projects">
              {FILTERS.map((f) => (
                <button key={f.id} role="tab" aria-selected={filter === f.id} onClick={() => setFilter(f.id)} data-hover
                  className={`shrink-0 rounded-full px-5 py-2.5 text-[13px] font-semibold transition-all duration-300 ${filter === f.id ? "bg-ink text-[#f3efe7] shadow-lg" : "border border-ink/20 text-ink/65 hover:border-orange hover:text-orange"}`}>
                  {f.label}
                </button>
              ))}
            </div>
            <span className="ml-auto shrink-0 text-[11px] uppercase tracking-[0.18em] text-ink/50" aria-live="polite">
              {shown.length} {shown.length === 1 ? "story" : "stories"}
            </span>
          </div>
        </div>

        {/* ---------- Stories ---------- */}
        <section className="relative px-4 sm:px-6 md:px-10 max-w-[1500px] mx-auto w-full pb-8" aria-label="Project stories">
          <div className="pt-12 sm:pt-16 flex flex-wrap items-end justify-between gap-5">
            <h2 data-reveal className="font-display font-extrabold uppercase leading-[1.02] text-[2rem] min-[420px]:text-4xl sm:text-5xl lg:text-6xl">
              Selected <span className="text-orange">work</span>
            </h2>
            <p data-reveal className="max-w-xs text-sm leading-relaxed text-ink/55">A curated selection across SaaS, AI, mobile and web. Open a story to see what went inside.</p>
          </div>

          <div ref={listRef}>
            {shown.map((p, i) => (
              <div key={p.slug}>
                <StoryCard p={p} index={i} open={openSlug === p.slug} onToggle={() => setOpenSlug(openSlug === p.slug ? null : p.slug)} />
                {INTERLUDES[i] && filter === "all" && (
                  <aside data-reveal className="my-4 rounded-[2rem] bg-ink text-[#f3efe7] px-7 py-10 sm:p-12 grid md:grid-cols-[auto_1fr] items-center gap-6 overflow-hidden relative">
                    <span aria-hidden className="absolute -right-8 -bottom-14 font-display font-extrabold text-[10rem] leading-none text-white/[0.05] select-none">✦</span>
                    <p className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-orange whitespace-nowrap">{INTERLUDES[i].big}</p>
                    <p className="text-[#f3efe7]/70 leading-[1.85] max-w-md relative">{INTERLUDES[i].small}</p>
                  </aside>
                )}
              </div>
            ))}
          </div>

          {shown.length === 0 && <p className="py-24 text-center text-ink/50">No stories here yet — try another shelf.</p>}
          <p className="py-14 text-center text-[11px] uppercase tracking-[0.28em] text-ink/40">— plus 140 more products we can't show here —</p>
        </section>

        {/* ---------- What we build / why ---------- */}
        <section id="build" className="relative px-4 sm:px-6 md:px-10 pb-24 md:pb-36 max-w-[1500px] mx-auto w-full scroll-mt-24">
          <div className="grid lg:grid-cols-2 gap-5">
            <div data-reveal className="rounded-[2rem] border border-ink/10 bg-white/55 backdrop-blur p-7 sm:p-10">
              <p className="text-[10px] uppercase tracking-[0.26em] text-ink/50 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-orange" />What we build</p>
              <h3 className="mt-5 font-display font-extrabold text-3xl sm:text-4xl leading-tight">End-to-end, across every layer of the stack.</h3>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {["AI & Automation", "Mobile Apps", "Web & SaaS", "UI/UX Design"].map((t, i) => (
                  <p key={t} className="rounded-2xl border border-ink/10 bg-[#f3efe7] px-5 py-4 font-display font-bold flex items-center gap-3"><span className="text-orange text-sm">0{i + 1}</span>{t}</p>
                ))}
              </div>
            </div>
            <div data-reveal className="rounded-[2rem] border border-ink/10 bg-white/55 backdrop-blur p-7 sm:p-10">
              <p className="text-[10px] uppercase tracking-[0.26em] text-ink/50 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-orange" />Why clients choose us</p>
              <ul className="mt-6 space-y-6">
                {[
                  ["5★ rated on Upwork", "Top Rated Plus agency with a 100% Job Success Score across 90+ completed contracts."],
                  ["Fast delivery", "MVPs in 4–8 weeks, complex builds in 6–10 — without cutting corners."],
                  ["US & EU timezone overlap", "Daily standups, async updates and overlap hours with US, UK and UAE clients."],
                ].map(([t, d]) => (
                  <li key={t} className="flex gap-4"><span className="text-orange mt-1 shrink-0">✦</span><span><b className="font-display text-lg block">{t}</b><span className="text-sm text-ink/60 leading-relaxed block mt-1">{d}</span></span></li>
                ))}
              </ul>
            </div>
          </div>

          <div data-reveal className="mt-16 md:mt-24 text-center">
            <p className="text-[11px] uppercase tracking-[0.28em] text-ink/45">( Your product could be story Nº 151 )</p>
            <p className="mt-5 font-display font-extrabold uppercase leading-[0.98] text-4xl min-[420px]:text-6xl lg:text-7xl">Have a project<br /><span className="text-orange">in mind?</span></p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <ArrowBtn href={CALENDLY} external dark>Tell us what you're building</ArrowBtn>
              <Magnetic>
                <Link href="/" data-hover className="inline-flex items-center gap-2 rounded-full border border-ink/25 px-7 py-3.5 text-sm font-semibold hover:border-orange hover:text-orange transition-colors">← Back to home</Link>
              </Magnetic>
            </div>
            <p className="mt-5 text-xs text-ink/45">We reply within 4 business hours — with a plan, timeline and honest estimate.</p>
          </div>
        </section>
        <div className="h-12 xl:h-0" aria-hidden />
      </div>

      {/* ---------- Dark footer (shared with home) ---------- */}
      <div className="relative bg-ink text-cream rounded-t-[2rem] sm:rounded-t-[2.5rem] overflow-hidden">
        <Footer />
      </div>
    </main>
  );
}
