"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Cursor from "./Cursor";
import Header from "./Header";
import Smooth from "./Smooth";
import AnchorNav from "./AnchorNav";
import { Footer } from "./Sections";
import dynamic from "next/dynamic";
const PageScene = dynamic(() => import("./PageScene"), { ssr: false });
import { CALENDLY } from "@/lib/data";
import { ArrowBtn, Magnetic, RevealLines } from "./ui";

gsap.registerPlugin(ScrollTrigger);

export const AUDIT_NAV = [
  { id: "top", label: "Intro" },
  { id: "quiz", label: "The Audit" },
  { id: "challenges", label: "Challenges" },
  { id: "why", label: "Why Us" },
  { id: "timeline", label: "Timeline" },
  { id: "stack", label: "Stack" },
  { id: "faq", label: "FAQ" },
  { id: "cta", label: "Start" },
];

/* ---------------- The 5-question readiness quiz ---------------- */
const QUESTIONS = [
  {
    q: "What is your current tech stack?",
    hint: "Pick the closest match — we'll tailor the audit to your stack.",
    options: [
      { label: "Modern stack", desc: "React / Next + Node / Laravel + Postgres", risk: 0 },
      { label: "Mobile-first", desc: "Flutter or React Native + API backend", risk: 0 },
      { label: "Legacy / monolith", desc: "PHP, .NET or a custom CMS", risk: 2, flag: "Legacy architecture may hide scaling limits and unpatched dependencies." },
      { label: "Not sure / mix of tools", desc: "A bit of everything, honestly", risk: 3, flag: "An unclear stack picture usually means undocumented architecture decisions." },
    ],
  },
  {
    q: "How was the product built?",
    hint: "This tells us where the corners are usually cut.",
    options: [
      { label: "Senior in-house team", desc: "Reviewed, tested, documented", risk: 0 },
      { label: "Agency or freelancers", desc: "Delivered — but knowledge left with them", risk: 1 },
      { label: "AI builders", desc: "Lovable, Cursor, Bolt or v0", risk: 3, flag: "AI-generated code often ships with weak auth, exposed secrets and missing row-level security." },
      { label: "Inherited codebase", desc: "We took it over from someone else", risk: 2, flag: "Inherited code rarely comes with the reasoning behind its riskiest decisions." },
    ],
  },
  {
    q: "What's your biggest worry right now?",
    hint: "Be honest — this becomes priority one in your debrief.",
    options: [
      { label: "Security", desc: "Auth, API keys, encryption, access", risk: 3, flag: "Security anxiety is usually justified — exposed keys and weak auth are the costliest late finds." },
      { label: "Bugs & regressions", desc: "Every release breaks something else", risk: 2, flag: "Regressions every sprint point to missing automated tests and no release checklist." },
      { label: "Scaling", desc: "It works… until more users arrive", risk: 2, flag: "Scaling limits are cheapest to fix before your users find them for you." },
      { label: "Nothing keeps me up", desc: "It mostly works — I want a second opinion", risk: 0 },
    ],
  },
  {
    q: "Who is using it today?",
    hint: "Real users raise the stakes on every answer above.",
    options: [
      { label: "Just us, so far", desc: "Prototype, no external users yet", risk: 0 },
      { label: "Early users", desc: "Friends, beta testers, a pilot group", risk: 1 },
      { label: "Paying customers", desc: "Revenue depends on it working", risk: 2, flag: "With paying users, permission and payment bugs hit revenue and trust directly." },
      { label: "Investors are looking", desc: "Technical diligence is coming", risk: 2, flag: "Investor diligence will probe architecture, security and test coverage — better to know first." },
    ],
  },
  {
    q: "How soon do you need certainty?",
    hint: "Last one — your score is one click away.",
    options: [
      { label: "Before we launch", desc: "Weeks, not months", risk: 1 },
      { label: "Before fundraising", desc: "Diligence-proof, please", risk: 1 },
      { label: "Before we scale", desc: "Growth is planned this year", risk: 1 },
      { label: "No rush", desc: "I like knowing where I stand", risk: 0 },
    ],
  },
];

function band(score) {
  if (score >= 75) return { title: "Strong foundation", tone: "#34d399", text: "Your setup looks production-leaning. The debrief will confirm the details and catch what a quiz can't see." };
  if (score >= 55) return { title: "Close — with gaps", tone: "#ffb020", text: "A solid base with priority gaps. The debrief turns these flags into a ranked, costed fix list." };
  return { title: "Harden before you scale", tone: "#ff4d1c", text: "There are real risks to retire before more users arrive. The good news: every flag below is fixable, most of them fast." };
}

function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const cardRef = useRef(null);
  const numRef = useRef(null);

  const done = step >= QUESTIONS.length;

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(cardRef.current, { x: 44, opacity: 0 }, { x: 0, opacity: 1, duration: 0.55, ease: "power3.out" });
  }, [step]);

  useEffect(() => {
    if (!done || score === null) return;
    const obj = { v: 0 };
    gsap.to(obj, { v: score, duration: 1.6, ease: "power2.out", onUpdate: () => { if (numRef.current) numRef.current.textContent = Math.round(obj.v); } });
    const t = setTimeout(() => ScrollTrigger.refresh(), 600);
    return () => clearTimeout(t);
  }, [done, score]);

  const pick = (opt) => {
    const next = [...answers.slice(0, step), opt];
    setAnswers(next);
    if (step === QUESTIONS.length - 1) {
      const risk = next.reduce((a, o) => a + o.risk, 0);
      setScore(Math.round(100 - (risk / 15) * 65));
    }
    setStep(step + 1);
  };

  const restart = () => { setStep(0); setAnswers([]); setScore(null); };
  const result = score !== null ? band(score) : null;
  const flags = answers.filter((a) => a.flag);
  const circumference = 2 * Math.PI * 52;

  return (
    <div className="relative rounded-[2rem] border border-line bg-coal/85 backdrop-blur overflow-hidden">
      <div className="h-1.5 bg-white/[0.06]">
        <div className="h-full bg-gradient-to-r from-orange to-[#ffb020] transition-all duration-700 ease-out" style={{ width: `${(Math.min(step, 5) / 5) * 100}%` }} />
      </div>
      <div className="p-6 sm:p-10 md:p-12">
        {!done ? (
          <div ref={cardRef} key={step}>
            <div className="flex items-center justify-between gap-4">
              <p className="text-[11px] uppercase tracking-[0.24em] text-mute">Step {step + 1} of 5 · {Math.round(((step + 1) / 5) * 100)}% there</p>
              {step > 0 && <button onClick={() => setStep(step - 1)} data-hover className="text-xs text-mute hover:text-orange transition-colors shrink-0">← Back</button>}
            </div>
            <h3 className="mt-6 font-display font-extrabold text-3xl sm:text-4xl md:text-[2.6rem] leading-[1.05]">{QUESTIONS[step].q}</h3>
            <p className="mt-3 text-mute">{QUESTIONS[step].hint}</p>
            <div className="mt-8 grid sm:grid-cols-2 gap-3" role="radiogroup" aria-label={QUESTIONS[step].q}>
              {QUESTIONS[step].options.map((o) => (
                <button key={o.label} role="radio" aria-checked="false" onClick={() => pick(o)} data-hover
                  className="group text-left rounded-2xl border border-line bg-white/[0.03] p-5 transition-all duration-300 hover:border-orange hover:bg-orange/[0.08] hover:-translate-y-0.5">
                  <span className="flex items-center justify-between font-display font-bold text-base sm:text-lg">
                    {o.label}
                    <span className="grid place-items-center w-7 h-7 rounded-full border border-line text-orange transition-all duration-300 group-hover:bg-orange group-hover:text-white group-hover:rotate-45 shrink-0 ml-3">
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                    </span>
                  </span>
                  <span className="mt-1.5 block text-sm text-mute leading-relaxed">{o.desc}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div ref={cardRef}>
            <p className="text-[11px] uppercase tracking-[0.24em] text-mute">Your Production Readiness Score</p>
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-8 sm:gap-12">
              <div className="relative w-40 h-40 shrink-0" role="img" aria-label={`Readiness score ${score} out of 100`}>
                <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="9" />
                  <circle cx="60" cy="60" r="52" fill="none" stroke={result.tone} strokeWidth="9" strokeLinecap="round"
                    strokeDasharray={circumference}
                    style={{ strokeDashoffset: circumference - (circumference * (score ?? 0)) / 100, transition: "stroke-dashoffset 1.6s cubic-bezier(.22,1,.36,1)" }} />
                </svg>
                <span className="absolute inset-0 grid place-items-center text-center">
                  <span><b className="font-display font-extrabold text-5xl block leading-none"><span ref={numRef}>0</span></b><span className="text-[10px] uppercase tracking-[0.2em] text-mute">/ 100</span></span>
                </span>
              </div>
              <div>
                <h3 className="font-display font-extrabold text-3xl sm:text-4xl" style={{ color: result.tone }}>{result.title}</h3>
                <p className="mt-3 text-cream/70 leading-relaxed max-w-md">{result.text}</p>
                {flags.length > 0 && (
                  <ul className="mt-5 space-y-2.5 max-w-md">
                    {flags.map((f) => (<li key={f.flag} className="flex gap-2.5 text-sm text-cream/75 leading-relaxed"><span className="text-orange shrink-0 mt-0.5">⚑</span>{f.flag}</li>))}
                  </ul>
                )}
                <div className="mt-8 flex flex-wrap gap-4">
                  <ArrowBtn href={CALENDLY} external>Book my free 60-min debrief</ArrowBtn>
                  <button onClick={restart} data-hover className="text-sm font-medium text-mute hover:text-orange transition-colors py-3">Retake the quiz ↺</button>
                </div>
                <p className="mt-4 text-xs text-mute">Free · 2 minutes · No spam. A senior engineer — not a sales rep — runs your debrief.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- Chapters ---------------- */
function ChapterHead({ num, label, title, sub }) {
  return (
    <div className="max-w-3xl">
      <p data-reveal className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-mute">
        <span className="grid place-items-center w-8 h-8 rounded-full border border-orange/50 text-orange font-bold text-[10px]">{num}</span>
        Chapter — {label}
        <span className="h-px flex-1 bg-line" />
      </p>
      <h2 data-split className="mt-7 font-display font-extrabold uppercase leading-[1.0] text-[2rem] min-[420px]:text-5xl lg:text-6xl">{title}</h2>
      {sub && <p data-reveal className="mt-5 text-mute leading-[1.85] max-w-xl">{sub}</p>}
    </div>
  );
}

const CHALLENGES = [
  { t: "AI-generated code in production", d: "Lovable, Cursor, Bolt or v0 shipped fast — but auth, row-level security and secrets may not be production-ready.", glyph: "⌁" },
  { t: "Unknown technical debt", d: "No senior engineer has reviewed architecture, dependencies or scaling limits before the next funding round.", glyph: "◍" },
  { t: "Security anxiety", d: "Exposed API keys, weak auth or missing encryption discovered too late cost far more than an early audit.", glyph: "⚿" },
  { t: "Unclear fix priority", d: "Founders know something is wrong but can't rank security vs performance vs feature velocity.", glyph: "↕" },
];

const WHY = [
  { t: "Readiness Score in 2 minutes", d: "The quiz surfaces stack, bottleneck and timeline signals — so the debrief starts with context, not generic advice.", big: true },
  { t: "Senior engineer debrief", d: "60 minutes with a builder who has shipped Laravel, React, Flutter and AI systems. Not a sales rep reading a script." },
  { t: "Actionable remediation plan", d: "You leave with prioritised fixes: security patches, scaling steps, CI/CD gaps and realistic effort estimates." },
  { t: "A path to a full audit", d: "Need deeper review? We extend into a full code review & technical audit engagement — same team, no re-briefing.", big: true },
];

const TIMELINE = [
  { when: "Now", t: "2-minute quiz", items: ["Stack & bottleneck questions", "Production Readiness Score", "Flagged risk areas"] },
  { when: "Same day", t: "Contact & scheduling", items: ["Score emailed to you", "Debrief call booked", "Senior engineer assigned"] },
  { when: "Within 1 week", t: "60-min debrief", items: ["Findings walkthrough", "Priority fix list", "Effort & cost ranges"] },
  { when: "1–2 weeks", t: "Optional deep audit", items: ["Full code review", "Security scan", "Architecture report"] },
];

const FAQS = [
  { q: "Is the AI & code audit really free?", a: "Yes. The 5-question quiz, your Production Readiness Score and the 60-minute senior-engineer debrief cost nothing — and there's no obligation to continue with us afterwards." },
  { q: "Who is this audit for?", a: "Teams shipping Lovable, Cursor or Bolt prototypes to real users, founders facing investor technical diligence, products with regressions every sprint, and mobile apps that need device-matrix testing before store release." },
  { q: "What does the Readiness Score measure?", a: "Signals across your stack, how the product was built, your biggest risk area, who's using it today and your timeline — combined into a 0–100 production-readiness picture with flagged risk areas." },
  { q: "What happens on the debrief call?", a: "A senior engineer walks through your findings, ranks the fixes by business impact, and gives realistic effort and cost ranges. You leave with a prioritised remediation plan either way." },
  { q: "How is this different from a paid code review?", a: "The free audit is a 2-minute, signal-level review plus a debrief. A paid deep audit (typically 5–7 business days) is a full code review with security scanning and an architecture report on your actual codebase." },
];

export default function AuditClient() {
  const [ready, setReady] = useState(false);
  const [faqOpen, setFaqOpen] = useState(0);
  const lineRef = useRef(null);

  useEffect(() => { const r = requestAnimationFrame(() => setReady(true)); return () => cancelAnimationFrame(r); }, []);

  useEffect(() => {
    if (!ready || !lineRef.current) return;
    const tween = gsap.fromTo(lineRef.current, { scaleX: 0 }, {
      scaleX: 1, ease: "none",
      scrollTrigger: { trigger: "#timeline-track", start: "top 75%", end: "bottom 45%", scrub: 1 },
    });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, [ready]);

  return (
    <main className="relative min-h-screen overflow-x-clip">
      <Cursor />
      <Smooth ready={ready} />
      <Header loaded={ready} />
      <AnchorNav items={AUDIT_NAV} />
      <PageScene variant="audit" />

      <div className="relative z-10">
      {/* ---------- Hero / Intro ---------- */}
      <section id="top" className="relative px-4 sm:px-6 md:px-10 pt-36 md:pt-44 pb-20 md:pb-28 max-w-[1500px] mx-auto w-full">
        <div aria-hidden className="pointer-events-none absolute -top-24 right-[4%] w-[30rem] h-[30rem] rounded-full bg-orange/[0.14] blur-3xl animate-drift" />
        <nav aria-label="Breadcrumb" className="relative flex items-center gap-2.5 text-[11px] uppercase tracking-[0.22em] text-mute">
          <Link href="/" className="hover:text-orange transition-colors">Home</Link><span className="text-orange">/</span><span className="text-cream font-semibold">Free AI Audit</span>
        </nav>
        <p className="relative mt-12 flex flex-wrap gap-2.5 text-[10px] sm:text-[11px] uppercase tracking-[0.22em]">
          {["Free", "2 minutes", "No spam", "Senior engineer debrief"].map((c) => (
            <span key={c} className="rounded-full border border-line bg-white/[0.04] px-4 py-2 text-cream/75">{c}</span>
          ))}
        </p>
        <h1 className="relative mt-8 font-display font-extrabold uppercase leading-[0.94] tracking-tight text-[12.5vw] min-[420px]:text-[10.5vw] lg:text-[7.6rem] xl:text-[8.8rem]">
          <RevealLines loaded={ready} lines={[
            <>Free AI &</>,
            <><span className="text-stroke">Code</span> Audit</>,
            <><span className="text-orange">Know your</span> score.</>,
          ]} />
        </h1>
        <div className="relative mt-10 md:mt-12 grid lg:grid-cols-[1fr_auto] gap-10 items-end">
          <p className="max-w-xl text-base md:text-lg text-cream/70 leading-[1.85]" style={{ opacity: ready ? 1 : 0, transition: "opacity .9s ease .55s" }}>
            Answer 5 quick questions. Get your <b className="text-cream">Production Readiness Score</b> and a free
            60-minute debrief with a senior engineer — built for teams shipping with Lovable, Cursor, or legacy stacks.
          </p>
          <div className="flex flex-wrap gap-4" style={{ opacity: ready ? 1 : 0, transition: "opacity .9s ease .7s" }}>
            <ArrowBtn href="#quiz">Take the 2-minute audit ↓</ArrowBtn>
            <Magnetic>
              <a href={CALENDLY} target="_blank" rel="noreferrer" data-hover className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-7 py-3.5 text-sm font-semibold hover:border-orange hover:text-orange transition-colors">
                Prefer to talk first? ↗
              </a>
            </Magnetic>
          </div>
        </div>
        <div className="relative mt-14 flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.18em]" style={{ opacity: ready ? 1 : 0, transition: "opacity .9s ease .85s" }}>
          {[["Upwork", "Top Rated Plus"], ["Fiverr", "5.0 ★ Rating"], ["Clutch", "Verified Partner"]].map(([p, v]) => (
            <span key={p} className="border border-line rounded-full px-5 py-2.5 text-cream/65 bg-coal/60"><b className="text-cream">{p}</b> — {v}</span>
          ))}
        </div>
      </section>

      {/* ---------- Quiz chapter ---------- */}
      <section id="quiz" className="relative px-4 sm:px-6 md:px-10 py-20 md:py-32 max-w-[1500px] mx-auto w-full scroll-mt-20">
        <div aria-hidden className="pointer-events-none absolute top-1/3 -left-40 w-[26rem] h-[26rem] rounded-full bg-[#ffb020]/[0.07] blur-3xl animate-drift-slow" />
        <ChapterHead num="01" label="The audit" title={<>Five questions.<br /><span className="text-orange">One honest score.</span></>} sub="No email gate before your score, no 40-page PDF you'll never read. Just the signals a senior engineer would look for first — and a conversation about what to fix in what order." />
        <div data-anim="zoom" className="relative mt-12 max-w-4xl"><Quiz /></div>
      </section>

      {/* ---------- Challenges ---------- */}
      <section id="challenges" className="relative px-4 sm:px-6 md:px-10 py-20 md:py-32 max-w-[1500px] mx-auto w-full scroll-mt-20">
        <ChapterHead num="02" label="Common challenges" title={<>Problems we help<br />buyers <span className="text-stroke">solve</span></>} sub="Teams searching for a free AI or code audit usually need answers to these questions before committing budget." />
        <div className="mt-12 grid sm:grid-cols-2 gap-4">
          {CHALLENGES.map((c, i) => (
            <article key={c.t} data-delay={(i % 2) * 0.08} data-hover
              data-anim="flip" data-tilt className="card-sheen spot-card group rounded-[1.8rem] border border-line bg-coal/80 p-7 sm:p-9 transition-all duration-500 hover:-translate-y-1.5 hover:border-orange/50">
              <span className="font-display text-4xl text-orange/85 block transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110 origin-left w-max">{c.glyph}</span>
              <h3 className="mt-6 font-display font-bold text-xl sm:text-2xl leading-tight">{c.t}</h3>
              <p className="mt-3 text-mute leading-[1.8] text-[15px]">{c.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- Why (bento) ---------- */}
      <section id="why" className="relative px-4 sm:px-6 md:px-10 py-20 md:py-32 max-w-[1500px] mx-auto w-full scroll-mt-20">
        <div aria-hidden className="pointer-events-none absolute top-0 right-[10%] w-[24rem] h-[24rem] rounded-full bg-emerald-400/[0.06] blur-3xl animate-drift" />
        <ChapterHead num="03" label="Why GreeLogix" title={<>Why teams<br /><span className="text-orange">choose us</span></>} sub="150+ products shipped · Specialists in hardening AI-generated and rescued codebases." />
        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {WHY.map((w, i) => (
            <article key={w.t} data-anim="zoom" data-delay={(i % 3) * 0.07} data-hover
              className={`group rounded-[1.8rem] border p-7 sm:p-9 flex flex-col transition-all duration-500 hover:-translate-y-1.5 ${
                w.big ? "md:col-span-2 bg-gradient-to-br from-orange-dim/70 via-coal to-coal border-orange/35" : "border-line bg-coal/80 hover:border-orange/40"}`}>
              <span className="font-display font-extrabold text-stroke-faint text-4xl group-hover:text-orange group-hover:[-webkit-text-stroke:0px] transition-all duration-500">0{i + 1}</span>
              <h3 className="mt-8 font-display font-extrabold text-2xl sm:text-[1.7rem] leading-tight">{w.t}</h3>
              <p className="mt-3 text-mute leading-[1.8] text-[15px] max-w-lg">{w.d}</p>
            </article>
          ))}
          <div data-anim="rotate" className="rounded-[1.8rem] bg-orange text-white p-7 sm:p-9 flex flex-col justify-between overflow-hidden relative">
            <span aria-hidden className="absolute -right-6 -bottom-10 font-display font-extrabold text-[9rem] leading-none text-white/10 select-none">✓</span>
            <p className="font-display font-extrabold text-5xl sm:text-6xl leading-none"><span data-count={150}>0</span>+</p>
            <p className="mt-4 text-white/85 leading-relaxed text-[15px] relative">products shipped — including rescues of AI-generated codebases exactly like the ones this audit is built for.</p>
          </div>
        </div>
      </section>

      {/* ---------- Timeline ---------- */}
      <section id="timeline" className="relative px-4 sm:px-6 md:px-10 py-20 md:py-32 max-w-[1500px] mx-auto w-full scroll-mt-20">
        <ChapterHead num="04" label="Typical timeline" title={<>What to expect,<br /><span className="text-stroke">week by week</span></>} sub="What happens after you complete the free audit quiz — no black box, no waiting in the dark." />
        <div id="timeline-track" className="relative mt-16">
          <span className="hidden lg:block absolute left-0 right-0 top-[26px] h-px bg-white/10" aria-hidden />
          <span ref={lineRef} className="hidden lg:block absolute left-0 right-0 top-[26px] h-[2px] bg-orange origin-left" style={{ transform: "scaleX(0)" }} aria-hidden />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
            {TIMELINE.map((s, i) => (
              <article key={s.t} data-anim="drop" data-delay={i * 0.1} className="relative">
                <span className="relative z-10 grid place-items-center w-[52px] h-[52px] rounded-full bg-ink border-2 border-orange font-display font-extrabold text-orange">{pad2(i + 1)}</span>
                <p className="mt-6 text-[10px] uppercase tracking-[0.24em] text-orange">{s.when}</p>
                <h3 className="mt-2 font-display font-extrabold text-xl sm:text-2xl">{s.t}</h3>
                <ul className="mt-4 space-y-2">
                  {s.items.map((it) => (<li key={it} className="flex gap-2.5 text-sm text-mute leading-relaxed"><span className="text-orange mt-0.5">·</span>{it}</li>))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Stack chapter ---------- */}
      <section id="stack" className="relative px-4 sm:px-6 md:px-10 py-20 md:py-32 max-w-[1500px] mx-auto w-full scroll-mt-20">
        <div aria-hidden className="pointer-events-none absolute bottom-0 left-[20%] w-[26rem] h-[26rem] rounded-full bg-sky-400/[0.05] blur-3xl animate-drift-slow" />
        <ChapterHead num="05" label="Stack & scope" title={<>We audit the stack<br /><span className="text-orange">you actually run</span></>} sub="AI-generated scaffolds, monoliths and microservices — with findings mapped to your deployment target." />
        <div className="mt-12 grid md:grid-cols-3 gap-4">
          <div data-anim="slide-left" className="rounded-[1.8rem] border border-line bg-coal/80 p-7 sm:p-9">
            <h3 className="text-[11px] uppercase tracking-[0.24em] text-mute">Technologies</h3>
            <div data-stagger className="mt-5 flex flex-wrap gap-2">
              {["Laravel", "React / Next.js", "Flutter", "Node.js", "Supabase", "PostgreSQL", "OpenAI", "Lovable", "Cursor", "AWS"].map((s) => (
                <span key={s} data-hover className="rounded-full border border-line px-3.5 py-1.5 text-[13px] text-cream/75 hover:border-orange hover:text-orange transition-colors">{s}</span>
              ))}
            </div>
            <h3 className="mt-9 text-[11px] uppercase tracking-[0.24em] text-mute">Integrations</h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {["GitHub", "GitLab", "AWS", "Vercel", "Supabase", "Stripe", "HubSpot"].map((s) => (
                <span key={s} className="rounded-full bg-white/[0.05] px-3.5 py-1.5 text-[13px] text-cream/70">{s}</span>
              ))}
            </div>
          </div>
          <div data-anim="zoom" data-delay="0.08" className="rounded-[1.8rem] border border-line bg-coal/80 p-7 sm:p-9">
            <h3 className="text-[11px] uppercase tracking-[0.24em] text-mute">Industries served</h3>
            <ul className="mt-5 space-y-1">
              {["SaaS", "EdTech", "E-commerce", "Healthcare", "Fintech", "Marketplaces"].map((s, i) => (
                <li key={s} className="flex items-center justify-between border-b border-line/60 py-3 font-display font-bold text-lg last:border-0">
                  {s}<span className="text-orange text-xs font-body">0{i + 1}</span>
                </li>
              ))}
            </ul>
          </div>
          <div data-anim="slide-right" data-delay="0.16" className="rounded-[1.8rem] border border-orange/35 bg-gradient-to-b from-orange-dim/50 to-coal p-7 sm:p-9">
            <h3 className="text-[11px] uppercase tracking-[0.24em] text-orange">Security & compliance</h3>
            <div className="mt-6 space-y-6">
              <p><b className="font-display text-lg block">Confidential review</b><span className="text-sm text-cream/65 leading-relaxed block mt-1.5">Audit findings stay between your team and GreeLogix engineers — we never share codebase details publicly.</span></p>
              <p><b className="font-display text-lg block">No obligation</b><span className="text-sm text-cream/65 leading-relaxed block mt-1.5">The quiz and debrief are free. You choose whether to proceed with remediation or a paid deep audit.</span></p>
              <blockquote className="border-l-2 border-orange pl-4 text-sm text-cream/75 leading-relaxed italic">
                “What a 70-engineer team could not deliver, a small senior team at GreeLogix shipped.”
                <span className="block not-italic text-xs text-mute mt-2">— MTS EdTech Rescue · Dead → Live</span>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section id="faq" className="relative px-4 sm:px-6 md:px-10 py-20 md:py-32 max-w-[1500px] mx-auto w-full scroll-mt-20">
        <ChapterHead num="06" label="FAQ" title={<>Questions,<br /><span className="text-stroke">answered</span></>} />
        <div className="mt-12 max-w-4xl">
          {FAQS.map((f, i) => {
            const open = faqOpen === i;
            return (
              <div key={f.q} data-anim="skew" data-delay={i * 0.06} className={`border-b border-line ${i === 0 ? "border-t" : ""}`}>
                <button onClick={() => setFaqOpen(open ? -1 : i)} data-hover aria-expanded={open} className="w-full flex items-center justify-between gap-6 py-6 text-left group">
                  <span className={`font-display font-bold text-base min-[420px]:text-lg md:text-[1.35rem] leading-snug transition-colors ${open ? "text-orange" : "group-hover:text-orange"}`}>{f.q}</span>
                  <span className={`shrink-0 grid place-items-center w-10 h-10 rounded-full border transition-all duration-500 ${open ? "bg-orange border-orange rotate-45 text-white" : "border-line"}`}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  </span>
                </button>
                <div className="grid transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]" style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}>
                  <div className="overflow-hidden"><p className="pb-7 pr-4 sm:pr-10 text-mute leading-[1.85] max-w-2xl">{f.a}</p></div>
                </div>
              </div>
            );
          })}
        </div>
        <div data-reveal className="mt-14 flex flex-wrap gap-4">
          <ArrowBtn href="#quiz">Get my score — free ↓</ArrowBtn>
          <Magnetic>
            <a href={CALENDLY} target="_blank" rel="noreferrer" data-hover className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-7 py-3.5 text-sm font-semibold hover:border-orange hover:text-orange transition-colors">Book a strategy call ↗</a>
          </Magnetic>
        </div>
        {/* bottom room so the mobile anchor pill never covers content */}
        <div className="h-10 xl:h-0" aria-hidden />
      </section>

      </div>
      <div className="relative z-10"><Footer /></div>
    </main>
  );
}

const pad2 = (n) => String(n).padStart(2, "0");
