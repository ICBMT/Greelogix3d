"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Cursor from "./Cursor";
import Header from "./Header";
import Smooth from "./Smooth";
import AnchorNav from "./AnchorNav";
import { Footer } from "./Sections";
import { AI_LINKS } from "@/lib/aiData";
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

export default function AiTemplate({ page, hub = false }) {
  const [ready, setReady] = useState(false);
  useEffect(() => { const r = requestAnimationFrame(() => setReady(true)); return () => cancelAnimationFrame(r); }, []);

  const features = hub ? page.approach : page.features;
  const cases = hub ? page.opportunities : page.cases;
  const related = AI_LINKS.filter((l) => l.href !== page.path);

  const navItems = [
    { id: "top", label: "Intro" },
    { id: "features", label: hub ? "Approach" : "Features" },
    ...(cases ? [{ id: "cases", label: "In practice" }] : []),
    ...(hub ? [{ id: "pricing", label: "Pricing" }] : []),
    { id: "journey", label: "Journey" },
    { id: "stack", label: "Stack" },
    { id: "related", label: "Explore AI" },
    { id: "cta", label: "Start" },
  ];

  return (
    <main className="relative min-h-screen overflow-x-clip">
      <Cursor />
      <Smooth ready={ready} />
      <Header loaded={ready} />
      <AnchorNav items={navItems} />
      <PageScene variant="ai" />

      <div className="relative z-10">
        {/* ---------- Hero ---------- */}
        <section id="top" className="relative px-4 sm:px-6 md:px-10 pt-36 md:pt-44 pb-20 md:pb-28 max-w-[1500px] mx-auto w-full">
          <div aria-hidden className="pointer-events-none absolute -top-24 right-[4%] w-[30rem] h-[30rem] rounded-full bg-orange/[0.13] blur-3xl animate-drift" />
          <nav aria-label="Breadcrumb" className="relative flex flex-wrap items-center gap-2.5 text-[11px] uppercase tracking-[0.22em] text-mute">
            <Link href="/" className="hover:text-orange transition-colors">Home</Link>
            <span className="text-orange">/</span>
            {hub ? <span className="text-cream font-semibold">AI Solutions</span> : (
              <>
                <Link href="/ai-solutions" className="hover:text-orange transition-colors">AI Solutions</Link>
                <span className="text-orange">/</span>
                <span className="text-cream font-semibold">{page.name}</span>
              </>
            )}
          </nav>

          <p className="relative mt-12 inline-flex items-center gap-2.5 rounded-full border border-orange/40 bg-orange/10 px-5 py-2.5 text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-orange">
            <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse-dot" /> {page.eyebrow}
          </p>

          <h1 className="relative mt-8 font-display font-extrabold uppercase leading-[0.94] tracking-tight text-[11.5vw] min-[420px]:text-[9.5vw] lg:text-[6.8rem] xl:text-[8rem]">
            <RevealLines loaded={ready} lines={page.title.map((line, i) => (
              <span key={i} className={i === page.title.length - 1 ? "text-orange" : i === 1 && page.title.length > 2 ? "text-stroke" : ""}>{line}</span>
            ))} />
          </h1>

          <div className="relative mt-10 md:mt-12 grid lg:grid-cols-[1fr_auto] gap-10 items-end">
            <p data-scrub-words className="max-w-xl text-base md:text-lg text-cream/70 leading-[1.85]" style={{ opacity: ready ? 1 : 0, transition: "opacity .9s ease .55s" }}>
              {page.intro}
            </p>
            <div className="flex flex-wrap gap-4" style={{ opacity: ready ? 1 : 0, transition: "opacity .9s ease .7s" }}>
              <ArrowBtn href={CALENDLY} external>Book a free strategy call</ArrowBtn>
              <Magnetic>
                <Link href="/free-ai-audit" data-hover className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-7 py-3.5 text-sm font-semibold hover:border-orange hover:text-orange transition-colors">
                  <RollText text="Get your readiness score" /> ↗
                </Link>
              </Magnetic>
            </div>
          </div>

          <dl data-batch className="relative mt-14 md:mt-20 pt-8 border-t border-line grid grid-cols-2 md:grid-cols-4 gap-8">
            {page.stats.map(([v, l]) => (
              <div key={l}>
                <dd className="font-display font-extrabold text-4xl md:text-[2.9rem] leading-none text-cream">{v.includes("+") || v.includes("%") || v.includes("/") ? <>{v.replace(/[+%]/g, "")}<span className="text-orange">{v.match(/[+%]/)?.[0] || ""}</span>{v.includes("/") ? v.slice(v.indexOf("/")) : ""}</> : v}</dd>
                <dt className="mt-2.5 text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-mute leading-relaxed">{l}</dt>
              </div>
            ))}
          </dl>
        </section>

        {/* ---------- Features / Approach ---------- */}
        <Chapter id="features" num="01" label={hub ? "How we approach vertical AI" : page.featuresTitle || "What we build"}
          anim="left-far"
          title={hub ? <>Problems before <span className="text-orange">prompts.</span></> : <>Everything included, <span className="text-orange">nothing vague.</span></>}
          sub={hub ? "The same delivery pattern for every industry cluster — add a config, not a one-off page." : undefined}>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => {
              const inner = (
                <>
                  <div className="flex items-start justify-between gap-3">
                    <span data-glitch className="font-display font-extrabold text-stroke-faint text-4xl group-hover:text-orange group-hover:[-webkit-text-stroke:0px] transition-all duration-500">{String(i + 1).padStart(2, "0")}</span>
                    {f.badge && <span className="text-[10px] uppercase tracking-[0.16em] text-orange border border-orange/40 rounded-full px-3 py-1.5 whitespace-nowrap">{f.badge}</span>}
                    {f.href && <span className="grid place-items-center w-10 h-10 rounded-full border border-line transition-all duration-500 group-hover:bg-orange group-hover:border-orange group-hover:text-white group-hover:rotate-45 shrink-0"><svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg></span>}
                  </div>
                  <h3 className="mt-7 font-display font-extrabold text-[1.4rem] leading-tight group-hover:text-orange transition-colors">{f.t}</h3>
                  <p data-words className="mt-2.5 text-sm text-mute leading-[1.75]">{f.d}</p>
                  {f.points && (
                    <ul data-batch className="mt-5 space-y-2">
                      {f.points.map((pt) => (<li key={pt} className="flex gap-2.5 text-[13px] text-cream/75 leading-snug"><span className="text-orange shrink-0">✦</span>{pt}</li>))}
                    </ul>
                  )}
                  {f.href && <p className="mt-6 text-[11px] uppercase tracking-[0.18em] text-orange font-semibold"><RollText text="Explore this service" /> →</p>}
                </>
              );
              const cls = "spot-card card-sheen group relative rounded-[1.8rem] border border-line bg-coal/85 backdrop-blur p-7 sm:p-8 flex flex-col transition-colors duration-500 hover:border-orange/60";
              return f.href ? (
                <Link key={f.t} href={f.href} data-anim={CARD_ANIMS[i % CARD_ANIMS.length]} data-delay={(i % 3) * 0.08} data-tilt data-cursor="Open" className={cls}>{inner}</Link>
              ) : (
                <article key={f.t} data-anim={CARD_ANIMS[i % CARD_ANIMS.length]} data-delay={(i % 3) * 0.08} data-tilt data-hover className={cls}>{inner}</article>
              );
            })}
          </div>
        </Chapter>

        {/* ---------- In practice / Use cases ---------- */}
        {cases && (
          <Chapter id="cases" num="02" label={page.casesTitle || "Where it pays off"} anim="right-far"
            title={<>In practice, <span className="text-stroke">measured.</span></>}>
            <div className="mt-12 grid sm:grid-cols-2 gap-4">
              {cases.map((c, i) => (
                <article key={c.t} data-anim={i % 2 ? "br" : "bl"} data-delay={(i % 2) * 0.08} data-hover
                  className="group relative overflow-hidden rounded-[1.8rem] border border-line bg-gradient-to-br from-coal to-smoke p-7 sm:p-10 transition-all duration-500 hover:-translate-y-1.5 hover:border-orange/50">
                  <span data-scrub-scale className="font-display font-extrabold text-6xl sm:text-7xl leading-none text-orange block w-max">{c.m}</span>
                  <h3 className="mt-6 font-display font-extrabold text-2xl sm:text-[1.7rem] leading-tight">{c.t}</h3>
                  <p data-words className="mt-3 text-mute leading-[1.8] text-[15px] max-w-md">{c.d}</p>
                  <span className="mt-7 block h-px bg-line relative overflow-hidden"><span className="absolute inset-y-0 left-0 w-full bg-orange origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" /></span>
                </article>
              ))}
            </div>
          </Chapter>
        )}

        {/* ---------- Hub pricing ---------- */}
        {hub && page.pricing && (
          <Chapter id="pricing" num="03" label="Engagement tiers" anim="left-far" title={<>Honest <span className="text-orange">price bands.</span></>}>
            <div className="mt-12 grid md:grid-cols-3 gap-4">
              {page.pricing.map((tier, i) => (
                <article key={tier.t} data-anim={["mask-left", "cinematic", "mask-right"][i]} data-hover
                  className={`rounded-[1.8rem] border p-8 sm:p-9 flex flex-col ${i === 1 ? "bg-orange text-white border-orange" : "border-line bg-coal/85 hover:border-orange/50"} transition-all duration-500 hover:-translate-y-1.5`}>
                  <p className={`text-[10px] uppercase tracking-[0.24em] ${i === 1 ? "text-white/75" : "text-mute"}`}>{tier.t}</p>
                  <p className="mt-5 font-display font-extrabold text-3xl sm:text-4xl leading-none">{tier.price}</p>
                  <p className={`mt-4 text-sm leading-[1.8] ${i === 1 ? "text-white/85" : "text-mute"}`}>{tier.d}</p>
                </article>
              ))}
            </div>
          </Chapter>
        )}

        {/* ---------- Journey ---------- */}
        <Chapter id="journey" num={hub ? "04" : "03"} label="Typical timeline" anim={hub ? "right-far" : "left-far"}
          title={<>Week by week, <span className="text-orange">no black box.</span></>}
          sub="What happens after the first call — the same senior team from discovery to a measured production slice.">
          <div className="relative mt-16">
            <svg aria-hidden className="hidden lg:block absolute left-0 right-0 -top-10 w-full h-10 text-orange/40" viewBox="0 0 1200 60" preserveAspectRatio="none" fill="none">
              <path data-draw-path d="M0 40 C 200 6, 420 54, 640 24 S 1020 50, 1200 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <div className={`grid gap-10 sm:grid-cols-2 ${page.timeline.length > 3 ? "lg:grid-cols-4" : "lg:grid-cols-3"} lg:gap-6`}>
              {page.timeline.map((step, i) => (
                <article key={step.t} data-anim={i % 2 ? "br" : "bl"} data-delay={i * 0.09} className="relative">
                  <span data-anim="spin-in" data-delay={i * 0.08} className="relative z-10 grid place-items-center w-[52px] h-[52px] rounded-full bg-ink border-2 border-orange font-display font-extrabold text-orange text-sm">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-6 text-[10px] uppercase tracking-[0.24em] text-orange">{step.when}</p>
                  <h3 className="mt-2 font-display font-extrabold text-xl sm:text-2xl leading-tight">{step.t}</h3>
                  <ul className="mt-4 space-y-2">
                    {step.items.map((it) => (<li key={it} className="flex gap-2.5 text-sm text-mute leading-relaxed"><span className="text-orange mt-0.5">·</span>{it}</li>))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          {/* Challenges + why, side by side */}
          {(page.challenges || hub) && (
            <div className="mt-24 grid lg:grid-cols-2 gap-10 lg:gap-14">
              <div>
                <h3 data-split className="font-display font-extrabold uppercase text-3xl sm:text-4xl leading-tight">Problems we <span className="text-orange">solve</span></h3>
                <div className="mt-8 space-y-4">
                  {(page.challenges || [
                    { t: "Generic bots, vertical workflows", d: "Off-the-shelf chat widgets ignore how the industry actually routes work, exceptions, and compliance." },
                    { t: "Demo that never writes back", d: "The model answers in a sandbox but never updates the CRM, PMS, EHR, or ops tool of record." },
                    { t: "No owner after launch", d: "Prompts, APIs, and policies drift. Nobody is on the hook when the automation quietly degrades." },
                    { t: "Unclear when AI is the wrong tool", d: "Some workflows need better software, QA, or staffing — not an LLM bolted onto a broken process." },
                  ]).map((c, i) => (
                    <article key={c.t} data-anim={["mask-right", "cinematic", "flip", "mask-left"][i % 4]} data-tilt data-hover className="spot-card card-sheen rounded-3xl border border-line bg-coal/80 p-6 sm:p-7 transition-colors duration-500 hover:border-orange/50">
                      <h4 className="font-display font-bold text-lg sm:text-xl">{c.t}</h4>
                      <p className="mt-2 text-sm text-mute leading-[1.75]">{c.d}</p>
                    </article>
                  ))}
                </div>
              </div>
              <div>
                <h3 data-split className="font-display font-extrabold uppercase text-3xl sm:text-4xl leading-tight">Why <span className="text-stroke">GreeLogix</span></h3>
                <div className="mt-8 space-y-4">
                  {(page.why || [
                    { t: "Industry workflow first", d: "We map the operating process before choosing a model, vendor, or chatbot skin." },
                    { t: "Production integrations", d: "CRM, helpdesk, telephony, and ops write-back — not a widget that dumps transcripts into email." },
                    { t: "Honest no-go advice", d: "We will say when AI automation does not make sense and recommend software, QA, or process work instead." },
                    { t: "Same team for product and AI", d: "Laravel, React, n8n, and LLM systems from one accountable squad — including post-launch tuning." },
                  ]).map((w, i) => (
                    <article key={w.t} data-anim={i % 2 ? "br" : "bl"} data-delay={i * 0.06} data-hover className="group rounded-3xl border border-line bg-coal/80 p-6 sm:p-7 flex gap-5 transition-all duration-500 hover:border-orange/50 hover:-translate-y-1">
                      <span data-bob className="text-orange mt-1 shrink-0">✦</span>
                      <span><b className="font-display text-lg sm:text-xl block leading-snug">{w.t}</b><span className="text-sm text-mute leading-[1.75] block mt-1.5">{w.d}</span></span>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Chapter>

        {/* ---------- Stack ---------- */}
        <Chapter id="stack" num={hub ? "05" : "04"} label="Stack & scope" anim="right-far"
          title={<>Built on the stack <span className="text-stroke">you run.</span></>}
          sub="Production AI combines event triggers, idempotent steps, dead-letter queues for failures, and human-in-the-loop approvals for high-risk actions.">
          <div className="mt-12 grid md:grid-cols-3 gap-4">
            <div data-anim="tl" className="rounded-[1.8rem] border border-line bg-coal/80 p-7 sm:p-9">
              <h3 className="text-[11px] uppercase tracking-[0.24em] text-mute">Technologies</h3>
              <div data-stagger data-proximity className="mt-5 flex flex-wrap gap-2">
                {page.stack.map((t) => (<span key={t} data-hover className="rounded-full border border-line px-3.5 py-1.5 text-[13px] text-cream/75 hover:border-orange hover:text-orange transition-colors">{t}</span>))}
              </div>
              {page.proof && (
                <>
                  <h3 className="mt-9 text-[11px] uppercase tracking-[0.24em] text-mute">Verified work</h3>
                  <ul className="mt-4 space-y-2.5">
                    {page.proof.map((pr) => (<li key={pr}><Link href="/portfolio" data-hover className="link-line text-sm text-cream/80">{pr} →</Link></li>))}
                  </ul>
                </>
              )}
            </div>
            <div data-anim="zoom" className="rounded-[1.8rem] border border-line bg-coal/80 p-7 sm:p-9">
              <h3 className="text-[11px] uppercase tracking-[0.24em] text-mute">Industries served</h3>
              <ul data-batch className="mt-5">
                {(page.industries || ["SaaS", "E-commerce", "Healthcare", "Real estate", "Professional services", "Nonprofits"]).map((ind, i) => (
                  <li key={ind} className="flex items-center justify-between border-b border-line/60 py-3.5 font-display font-bold text-lg last:border-0">{ind}<span className="text-orange text-xs font-body">{String(i + 1).padStart(2, "0")}</span></li>
                ))}
              </ul>
            </div>
            <div data-anim="tr" className="rounded-[1.8rem] border border-orange/35 bg-gradient-to-b from-orange-dim/50 to-coal p-7 sm:p-9">
              <h3 className="text-[11px] uppercase tracking-[0.24em] text-orange">Security & trust</h3>
              <div className="mt-6 space-y-6">
                <p><b className="font-display text-lg block">Credential vaulting</b><span className="text-sm text-cream/65 leading-relaxed block mt-1.5">OAuth and API keys live in secure environment config — never hard-coded in exported workflow files.</span></p>
                <p><b className="font-display text-lg block">PII in LLM flows</b><span className="text-sm text-cream/65 leading-relaxed block mt-1.5">We scope what data enters prompts and logs; redaction and retention policies are defined per project.</span></p>
                <blockquote className="border-l-2 border-orange pl-4 text-sm text-cream/75 leading-relaxed italic">
                  “What a 70-engineer team could not deliver, a small senior team at GreeLogix shipped.”
                  <span className="block not-italic text-xs text-mute mt-2">— MTS EdTech Rescue · Dead → Live</span>
                </blockquote>
              </div>
            </div>
          </div>
        </Chapter>

        {/* ---------- Related AI pages ---------- */}
        <Chapter id="related" num={hub ? "06" : "05"} label="Explore the AI universe" anim="left-far"
          title={<>Keep <span className="text-orange">exploring.</span></>}>
          <div data-batch className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {related.map((l) => (
              <Link key={l.href} href={l.href} data-hover data-cursor="Open"
                className="group rounded-[1.6rem] border border-line bg-coal/80 p-6 sm:p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-orange/60">
                <span className="flex items-center justify-between">
                  <span className="font-display font-extrabold text-stroke-faint text-3xl group-hover:text-orange group-hover:[-webkit-text-stroke:0px] transition-all duration-500">✦</span>
                  <span className="grid place-items-center w-9 h-9 rounded-full border border-line transition-all duration-500 group-hover:bg-orange group-hover:border-orange group-hover:text-white group-hover:rotate-45"><svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg></span>
                </span>
                <h3 className="mt-6 font-display font-extrabold text-xl leading-tight group-hover:text-orange transition-colors">{l.label}</h3>
                <p className="mt-2 text-sm text-mute leading-relaxed">{l.desc}</p>
              </Link>
            ))}
          </div>
          <div className="h-14 xl:h-0" aria-hidden />
        </Chapter>
      </div>

      <div className="relative z-10"><Footer /></div>
    </main>
  );
}
