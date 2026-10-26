"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import Cursor from "./Cursor";
import Header from "./Header";
import Smooth from "./Smooth";
import AnchorNav from "./AnchorNav";
import { Footer } from "./Sections";
import { BlogModal } from "./BlogClient";
import { BLOG_POSTS } from "@/lib/blogData";
import { CASE_STUDIES, CALENDLY } from "@/lib/data";
import { EXPLORE, COMPARE_LINKS, INTEGRATIONS, INDUSTRIES, SOLUTIONS, QA_SERVICES } from "@/lib/resourcesData";
import { ArrowBtn, Magnetic, RevealLines, RollText } from "./ui";

const PageScene = dynamic(() => import("./PageScene"), { ssr: false });
const CARD_ANIMS = ["flip", "mask-left", "zoom", "mask-right", "rotate", "perspective"];
const GRADS = [
  "from-[#ff7a45] to-[#7a2408]", "from-[#5470b8] to-[#1d2c52]", "from-[#4d7d63] to-[#173527]",
  "from-[#c99b45] to-[#6b4a12]", "from-[#b4527d] to-[#571e38]", "from-[#3f8f8a] to-[#173f3c]",
];

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

const MARQUEE = ["Guides & playbooks", "Comparisons", "Case studies", "AI integrations", "Industries", "Business solutions", "QA services"];
const COMPARE_POST_SLUGS = ["n8n-vs-zapier-vs-make-2026", "lovable-vs-cursor-vibe-coding-2026", "voice-ai-agents-vs-traditional-ivr"];
const PROOF_CLIENTS = ["MTS", "Kim & Co", "An EdTech founding team", "Jalebi", "The INCC", "A GCC fitness platform operator"];

export default function ResourcesClient() {
  const [ready, setReady] = useState(false);
  const [picked, setPicked] = useState(null);
  useEffect(() => { const r = requestAnimationFrame(() => setReady(true)); return () => cancelAnimationFrame(r); }, []);

  const featuredGuide = BLOG_POSTS.find((p) => p.featured);
  const comparePosts = COMPARE_POST_SLUGS.map((s) => BLOG_POSTS.find((p) => p.slug === s)).filter(Boolean);
  const proof = CASE_STUDIES.filter((c) => PROOF_CLIENTS.includes(c.client));

  return (
    <main id="main" tabIndex={-1} className="relative min-h-screen overflow-x-clip">
      <Cursor />
      <Smooth ready={ready} />
      <Header loaded={ready} />
      <AnchorNav items={[{ id: "top", label: "Intro" }, { id: "explore", label: "Explore" }, { id: "guides", label: "Guides" }, { id: "proof", label: "Proof" }, { id: "cta", label: "Start" }]} />
      <PageScene variant="resources" />

      <div className="relative z-10">
        {/* ---------- Hero ---------- */}
        <section id="top" className="relative px-4 sm:px-6 md:px-10 pt-36 md:pt-44 pb-20 md:pb-28 max-w-[1500px] mx-auto w-full">
          <div aria-hidden className="pointer-events-none absolute -top-24 right-[4%] w-[30rem] h-[30rem] rounded-full bg-orange/[0.13] blur-3xl animate-drift" />
          <nav aria-label="Breadcrumb" className="relative flex items-center gap-2.5 text-[11px] uppercase tracking-[0.22em] text-mute">
            <Link href="/" className="hover:text-orange transition-colors">Home</Link><span className="text-orange">/</span><span className="text-cream font-semibold">Resources</span>
          </nav>
          <p className="relative mt-12 inline-flex items-center gap-2.5 rounded-full border border-orange/40 bg-orange/10 px-5 py-2.5 text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-orange">
            <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse-dot" /> Resource hub
          </p>
          <h1 className="relative mt-8 font-display font-extrabold uppercase leading-[0.94] tracking-tight text-[11.5vw] min-[420px]:text-[9.5vw] lg:text-[6.6rem] xl:text-[7.8rem]">
            <RevealLines loaded={ready} lines={[<>Guides, comparisons</>, <>& <span className="text-orange">verified proof.</span></>]} />
          </h1>
          <p data-scrub-words className="relative mt-10 max-w-xl text-base md:text-lg text-cream/70 leading-[1.85]" style={{ opacity: ready ? 1 : 0, transition: "opacity .9s ease .55s" }}>
            Everything GreeLogix publishes to help you plan, validate, and ship — engineering
            guides, decision comparisons, integrations, and verified project stories.
          </p>
          <div data-batch className="relative mt-10 flex flex-wrap gap-2.5" style={{ opacity: ready ? 1 : 0, transition: "opacity .9s ease .7s" }}>
            {["Upwork Top Rated Plus", "Fiverr Level 2 · 5.0★", "Clutch Verified Provider", "150+ projects delivered", "20+ Play Store apps"].map((b) => (
              <span key={b} className="inline-flex items-center gap-2 rounded-full bg-orange/10 border border-orange/30 text-orange px-4 py-2 text-xs font-semibold">✦ {b}</span>
            ))}
          </div>
          <dl data-batch className="relative mt-14 pt-8 border-t border-line grid grid-cols-2 md:grid-cols-4 gap-8">
            {[[15, "", "Guides & playbooks"], [16, "", "Verified case studies"], [8, "", "AI integrations"], [7, "", "Industries covered"]].map(([v, sfx, l]) => (
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

        {/* ---------- Explore ---------- */}
        <Chapter id="explore" num="01" label="Start here" anim="rise"
          title={<>Three doors, <span className="text-orange">all proof.</span></>}
          sub="The shortest paths through everything we publish — outcomes first, reading second, a score for your own stack third.">
          <div className="mt-12 grid md:grid-cols-3 gap-4">
            {EXPLORE.map((x, i) => (
              <Link key={x.t} href={x.href} data-anim={CARD_ANIMS[i % CARD_ANIMS.length]} data-delay={i * 0.08} data-tilt data-cursor="Open"
                className="spot-card card-sheen group relative rounded-[1.8rem] border border-line bg-coal/85 backdrop-blur p-8 sm:p-9 flex flex-col transition-colors duration-500 hover:border-orange/60">
                <div className="flex items-start justify-between gap-3">
                  <span data-bob className="text-4xl" aria-hidden>{x.glyph}</span>
                  <span className="grid place-items-center w-10 h-10 rounded-full border border-line transition-all duration-500 group-hover:bg-orange group-hover:border-orange group-hover:text-white group-hover:rotate-45"><svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg></span>
                </div>
                <h3 className="mt-8 font-display font-extrabold text-2xl sm:text-[1.7rem] leading-tight group-hover:text-orange transition-colors">{x.t}</h3>
                <p className="mt-2 text-sm text-mute leading-[1.75]">{x.d}</p>
                <p className="mt-7 text-[11px] uppercase tracking-[0.18em] text-orange font-semibold">{x.note} →</p>
              </Link>
            ))}
          </div>
        </Chapter>

        {/* ---------- Guides ---------- */}
        <Chapter id="guides" num="02" label="Guides & playbooks" anim="zoom"
          title={<>Read them <span className="text-stroke">right here.</span></>}
          sub="Every guide opens in the reading window — full text, frameworks, checklists and FAQs, no tab-hunting.">
          <article data-anim="cinematic" data-cursor="Read" data-hover onClick={() => setPicked(featuredGuide)} role="button" tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") setPicked(featuredGuide); }}
            className="card-sheen group relative mt-12 cursor-pointer rounded-[2rem] border border-orange/35 bg-gradient-to-br from-orange-dim/60 via-coal to-coal overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="p-7 sm:p-10 md:p-12">
                <span className="text-[10px] uppercase tracking-[0.22em] bg-orange text-white font-semibold rounded-full px-3.5 py-1.5">Featured guide · {featuredGuide.cat}</span>
                <h3 className="mt-7 font-display font-extrabold text-3xl sm:text-4xl leading-[1.06]">{featuredGuide.title}</h3>
                <p data-words className="mt-4 text-cream/70 leading-[1.85] max-w-lg">{featuredGuide.excerpt}</p>
                <p className="mt-8 inline-flex items-center gap-3 text-sm font-semibold text-orange">
                  <span className="grid place-items-center w-10 h-10 rounded-full border border-orange/50 transition-transform duration-500 group-hover:rotate-45">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  </span>
                  <RollText text="Open the guide" />
                </p>
              </div>
              <div className="relative min-h-[220px] lg:min-h-[380px] overflow-hidden">
                <Image src={featuredGuide.img} alt={featuredGuide.title} fill sizes="(max-width: 1024px) 92vw, 720px" data-zoom-img className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            </div>
          </article>

          <div className="mt-6 grid md:grid-cols-2 gap-3">
            {BLOG_POSTS.map((post, i) => (
              <button key={post.slug} onClick={() => setPicked(post)} data-hover data-cursor="Read" data-anim={i % 2 ? "mask-right" : "mask-left"}
                className="group w-full text-left rounded-3xl border border-line bg-coal/80 backdrop-blur p-5 sm:p-6 flex items-center gap-5 transition-colors duration-300 hover:border-orange/60">
                <span className="relative w-20 h-16 sm:w-24 sm:h-[4.5rem] rounded-2xl overflow-hidden shrink-0 hidden min-[420px]:block">
                  {post.img ? <Image src={post.img} alt={post.title} fill sizes="120px" className="object-cover" /> : <span className={`absolute inset-0 bg-gradient-to-br ${GRADS[i % GRADS.length]}`} />}
                  <span className="absolute inset-0 grid place-items-center text-2xl" aria-hidden>{post.img ? "" : post.glyph}</span>
                </span>
                <span className="min-w-0">
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-orange font-semibold">{post.cat} · {post.read} min read</span>
                  <span className="block mt-1.5 font-display font-bold leading-snug group-hover:text-orange transition-colors line-clamp-2">{post.title}</span>
                </span>
                <span className="ml-auto grid place-items-center w-9 h-9 shrink-0 rounded-full border border-line transition-all duration-500 group-hover:bg-orange group-hover:border-orange group-hover:text-white group-hover:rotate-45">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                </span>
              </button>
            ))}
          </div>
          <p className="mt-8">
            <Link href="/blog" data-hover className="inline-flex items-center gap-2 text-sm font-semibold text-orange"><RollText text="All blog articles" /> →</Link>
          </p>
        </Chapter>

        {/* ---------- Comparisons ---------- */}
        <Chapter id="compare" num="03" label="Comparisons" anim="right-far"
          title={<>Decision guides, <span className="text-orange">honest tradeoffs.</span></>}
          sub="The deep comparisons open right here; the head-to-head stack guides live on our comparison pages.">
          <div className="mt-12 grid md:grid-cols-3 gap-4">
            {comparePosts.map((post, i) => (
              <article key={post.slug} onClick={() => setPicked(post)} role="button" tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter") setPicked(post); }}
                data-anim={CARD_ANIMS[i % CARD_ANIMS.length]} data-delay={i * 0.08} data-tilt data-cursor="Read" data-hover
                className="spot-card group relative cursor-pointer rounded-[1.8rem] border border-line bg-coal/85 backdrop-blur overflow-hidden flex flex-col transition-colors duration-500 hover:border-orange/60">
                <div className="relative h-36 overflow-hidden shrink-0">
                  {post.img && <Image src={post.img} alt={post.title} fill sizes="(max-width: 768px) 92vw, 460px" data-zoom-img className="object-cover opacity-90" />}
                  {!post.img && <span className={`absolute inset-0 bg-gradient-to-br ${GRADS[i % GRADS.length]}`} />}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                  <span data-bob className="absolute top-4 right-5 text-3xl select-none" aria-hidden>{post.glyph}</span>
                  <span className="absolute bottom-4 left-5 text-[10px] uppercase tracking-[0.2em] text-white/85 bg-black/25 backdrop-blur-sm rounded-full px-3 py-1.5">{post.cat} · {post.read} min</span>
                </div>
                <div className="p-6 sm:p-7 flex flex-col flex-1">
                  <h3 className="font-display font-extrabold text-[1.2rem] leading-snug group-hover:text-orange transition-colors">{post.title}</h3>
                  <p className="mt-3 text-sm text-mute leading-[1.75] line-clamp-3">{post.excerpt}</p>
                  <p className="mt-auto pt-5 text-[11px] uppercase tracking-[0.16em] text-orange font-semibold"><RollText text="Read comparison" /> →</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {COMPARE_LINKS.map((c, i) => (
              <a key={c.url} href={c.url} target="_blank" rel="noreferrer" data-hover data-anim={i % 2 ? "br" : "bl"} data-delay={(i % 4) * 0.06}
                className="group rounded-3xl border border-line bg-coal/80 p-5 sm:p-6 transition-all duration-500 hover:border-orange/60 hover:-translate-y-1">
                <p className="font-display font-extrabold leading-tight">{c.a} <span className="text-orange">vs</span> {c.b}</p>
                <p className="mt-2 text-[13px] text-mute leading-relaxed">{c.d}</p>
                <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-orange font-semibold">On greelogix.com ↗</p>
              </a>
            ))}
          </div>
        </Chapter>

        {/* ---------- Proof ---------- */}
        <Chapter id="proof" num="04" label="Case studies" anim="left-far"
          title={<>Proof beats <span className="text-stroke">promises.</span></>}
          sub="Six of the sixteen verified stories — the full library, with what was broken and what changed, lives on the case studies page.">
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {proof.map((cs, i) => (
              <Link key={cs.title} href="/case-studies" data-anim={CARD_ANIMS[i % CARD_ANIMS.length]} data-delay={(i % 3) * 0.07} data-tilt data-cursor="Open"
                className="spot-card group relative rounded-[1.8rem] border border-line bg-coal/85 backdrop-blur overflow-hidden flex flex-col transition-colors duration-500 hover:border-orange/60">
                <div className="relative h-36 sm:h-40 overflow-hidden shrink-0">
                  {cs.img && <Image src={cs.img} alt={cs.title} fill sizes="(max-width: 768px) 92vw, 460px" data-zoom-img className="object-cover opacity-90" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
                  <span data-bob className="absolute top-4 right-5 text-3xl select-none" aria-hidden>{cs.glyph}</span>
                  <span className="absolute bottom-4 left-5 text-[10px] uppercase tracking-[0.2em] text-white/85 bg-black/25 backdrop-blur-sm rounded-full px-3 py-1.5">{cs.industry}</span>
                </div>
                <div className="p-6 sm:p-7 flex flex-col flex-1">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-orange font-semibold">{cs.client}</p>
                  <h3 className="mt-2.5 font-display font-extrabold text-[1.15rem] leading-snug group-hover:text-orange transition-colors line-clamp-2">{cs.title}</h3>
                  <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-orange/10 border border-orange/30 text-orange px-3.5 py-1.5 text-[11px] font-semibold w-max">✦ {cs.result}</p>
                </div>
              </Link>
            ))}
          </div>
          <p className="mt-8">
            <Link href="/case-studies" data-hover className="inline-flex items-center gap-2 text-sm font-semibold text-orange"><RollText text="All 16 case studies" /> →</Link>
          </p>
        </Chapter>

        {/* ---------- Plugged in ---------- */}
        <Chapter id="plugged" num="05" label="AI integrations & industries" anim="perspective"
          title={<>Plugged into <span className="text-orange">your stack.</span></>}
          sub="Production AI combines event triggers, idempotent steps, and human-in-the-loop approvals — inside the tools and industries you already run.">
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {INTEGRATIONS.map((x, i) => (
              <Link key={x.t} href="/ai-integration-services" data-anim={CARD_ANIMS[i % CARD_ANIMS.length]} data-delay={(i % 4) * 0.06} data-tilt data-hover
                className="spot-card group rounded-[1.6rem] border border-line bg-coal/85 backdrop-blur p-6 sm:p-7 transition-colors duration-500 hover:border-orange/60">
                <span data-bob className="text-3xl block" aria-hidden>{x.glyph}</span>
                <h3 className="mt-5 font-display font-extrabold text-lg leading-tight group-hover:text-orange transition-colors">{x.t}</h3>
                <p className="mt-2 text-[13px] text-mute leading-relaxed">{x.d}</p>
              </Link>
            ))}
          </div>
          <div data-anim="zoom" className="mt-4 rounded-[1.8rem] border border-line bg-coal/80 p-7 sm:p-9">
            <h3 className="text-[11px] uppercase tracking-[0.24em] text-mute">Industries served</h3>
            <ul data-batch className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10">
              {INDUSTRIES.map((ind, i) => (
                <li key={ind.t} className="border-b border-line/60 last:border-0 sm:last:border-b lg:[&:nth-last-child(-n+3)]:border-0">
                  <Link href="/ai-solutions" data-hover className="group flex items-center justify-between py-3.5">
                    <span><span className="font-display font-bold text-[1.05rem] group-hover:text-orange transition-colors">{ind.t}</span><span className="block text-xs text-mute mt-0.5">{ind.d}</span></span>
                    <span className="text-orange text-xs">{String(i + 1).padStart(2, "0")}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Chapter>

        {/* ---------- Start from a problem ---------- */}
        <Chapter id="problems" num="06" label="Business solutions" anim="zoom"
          title={<>Start from <span className="text-stroke">a problem.</span></>}
          sub="Most teams don't need 'AI' — they need a cost down, a queue cleared, or a launch unblocked. Pick the pain; we'll show the path.">
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SOLUTIONS.map((x, i) => (
              <Link key={x.t} href={x.href} data-anim={CARD_ANIMS[(i + 2) % CARD_ANIMS.length]} data-delay={(i % 4) * 0.06} data-tilt data-hover
                className="spot-card card-sheen group rounded-[1.6rem] border border-line bg-coal/85 backdrop-blur p-6 sm:p-7 transition-colors duration-500 hover:border-orange/60">
                <span data-bob className="text-3xl block" aria-hidden>{x.glyph}</span>
                <h3 className="mt-5 font-display font-extrabold text-lg leading-tight group-hover:text-orange transition-colors">{x.t}</h3>
                <p className="mt-2 text-[13px] text-mute leading-relaxed">{x.d}</p>
                <p className="mt-5 text-[11px] uppercase tracking-[0.16em] text-orange font-semibold">See the path →</p>
              </Link>
            ))}
          </div>
          <div data-anim="mask-left" className="mt-4 rounded-[1.8rem] border border-line bg-coal/80 p-7 sm:p-9">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 className="text-[11px] uppercase tracking-[0.24em] text-mute">QA testing services</h3>
              <Link href="/services" data-hover className="text-[11px] uppercase tracking-[0.18em] text-orange font-semibold"><RollText text="Explore QA & all services" /> →</Link>
            </div>
            <div data-stagger data-proximity className="mt-5 flex flex-wrap gap-2">
              {QA_SERVICES.map((q) => (
                <Link key={q} href="/services" data-hover className="rounded-full border border-line px-4 py-2 text-[13px] text-cream/80 hover:border-orange hover:text-orange transition-colors">{q}</Link>
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
                <p data-words className="mt-5 text-cream/70 leading-[1.85] max-w-xl">Scope, timeline, and cost range — no sales deck. Or start with the free readiness quiz if you are still evaluating your stack.</p>
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
      {picked && <BlogModal post={picked} onClose={() => setPicked(null)} onSwap={setPicked} />}
    </main>
  );
}
