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
import { BLOG_POSTS, BLOG_FILTERS } from "@/lib/blogData";
import { CALENDLY } from "@/lib/data";
import { ArrowBtn, Magnetic, RevealLines, RollText } from "./ui";

gsap.registerPlugin(ScrollTrigger, Flip);
const PageScene = dynamic(() => import("./PageScene"), { ssr: false });

const GRADS = [
  "from-[#ff7a45] to-[#7a2408]", "from-[#5470b8] to-[#1d2c52]", "from-[#4d7d63] to-[#173527]",
  "from-[#c99b45] to-[#6b4a12]", "from-[#b4527d] to-[#571e38]", "from-[#3f8f8a] to-[#173f3c]",
  "from-[#779c46] to-[#33491a]", "from-[#cf8438] to-[#6e3e10]",
];

function Block({ b }) {
  if (b.h) return <h3 className="post-item mt-10 font-display font-extrabold text-2xl sm:text-[1.7rem] leading-tight">{b.h}</h3>;
  if (b.h3) return <h4 className="post-item mt-7 font-display font-bold text-lg text-orange">{b.h3}</h4>;
  if (b.p) return <p className="post-item mt-4 text-cream/75 leading-[1.9] text-[15px] sm:text-base">{b.p}</p>;
  if (b.ul) return (
    <ul className="post-item mt-4 space-y-2.5">
      {b.ul.map((li) => (<li key={li} className="flex gap-3 text-cream/75 leading-[1.8] text-[15px] sm:text-base"><span className="text-orange shrink-0 mt-0.5">✦</span><span>{li}</span></li>))}
    </ul>
  );
  if (b.ol) return (
    <ol className="post-item mt-4 space-y-3">
      {b.ol.map((li, i) => (<li key={li} className="flex gap-3.5 text-cream/75 leading-[1.8] text-[15px] sm:text-base"><span className="font-display font-extrabold text-orange shrink-0">{String(i + 1).padStart(2, "0")}</span><span>{li}</span></li>))}
    </ol>
  );
  if (b.q) return (
    <blockquote className="post-item mt-7 rounded-3xl border border-orange/35 bg-orange-dim/30 p-6 sm:p-7 font-display font-bold text-lg sm:text-xl leading-snug text-cream">
      <span className="text-orange block text-2xl leading-none mb-3">“</span>{b.q}
    </blockquote>
  );
  if (b.qa) return (
    <div className="post-item mt-10">
      <p className="text-[11px] uppercase tracking-[0.24em] text-mute flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-orange" /> Frequently asked questions <span className="h-px flex-1 bg-line" /></p>
      <div className="mt-5 space-y-4">
        {b.qa.map(([q, a]) => (
          <div key={q} className="rounded-3xl border border-line bg-white/[0.03] p-6">
            <p className="font-display font-bold text-[1.05rem] leading-snug">{q}</p>
            <p className="mt-2.5 text-sm text-cream/65 leading-[1.85]">{a}</p>
          </div>
        ))}
      </div>
    </div>
  );
  return null;
}

export function BlogModal({ post, onClose, onSwap }) {
  const backdrop = useRef(null);
  const panel = useRef(null);
  const first = useRef(true);

  useEffect(() => {
    const prevFocus = document.activeElement;
    window.__lenis?.stop();
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    addEventListener("keydown", onKey);
    const tl = gsap.timeline();
    tl.fromTo(backdrop.current, { opacity: 0 }, { opacity: 1, duration: 0.35 })
      .fromTo(panel.current, { y: 90, scale: 0.94, opacity: 0, clipPath: "inset(6% 4% 6% 4% round 28px)" },
        { y: 0, scale: 1, opacity: 1, clipPath: "inset(0% 0% 0% 0% round 28px)", duration: 0.65, ease: "power4.out" }, "-=0.12")
      .fromTo(".post-item", { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, stagger: 0.05, ease: "power3.out" }, "-=0.25");
    panel.current?.querySelector('[aria-label^="Close"]')?.focus({ preventScroll: true });
    return () => { removeEventListener("keydown", onKey); document.body.style.overflow = ""; window.__lenis?.start(); tl.kill(); if (prevFocus && typeof prevFocus.focus === "function") prevFocus.focus({ preventScroll: true }); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (panel.current) panel.current.scrollTop = 0;
    gsap.fromTo(".post-item", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.04, ease: "power3.out" });
  }, [post.slug]);

  const close = () => gsap.timeline({ onComplete: onClose })
    .to(panel.current, { y: 60, opacity: 0, scale: 0.96, duration: 0.32, ease: "power3.in" })
    .to(backdrop.current, { opacity: 0, duration: 0.28 }, "-=0.12");

  const related = [
    ...BLOG_POSTS.filter((p) => p.cat === post.cat && p.slug !== post.slug),
    ...BLOG_POSTS.filter((p) => p.cat !== post.cat && p.slug !== post.slug),
  ].slice(0, 3);

  return (
    <div className="fixed inset-0 z-[95] flex items-end sm:items-center justify-center p-0 sm:p-6" role="dialog" aria-modal="true" aria-label={post.title}>
      <div ref={backdrop} onClick={close} className="absolute inset-0 bg-black/75 backdrop-blur-md" />
      <div ref={panel} className="relative w-full max-w-3xl max-h-[92svh] sm:max-h-[86svh] overflow-y-auto overscroll-contain rounded-t-[1.8rem] sm:rounded-[1.8rem] border border-line bg-[#0d0d0c] shadow-[0_50px_140px_rgba(0,0,0,0.7)]">
        <div className="sticky top-0 z-10 bg-[#0d0d0c]/90 backdrop-blur-md border-b border-line px-6 sm:px-10 py-5 flex items-center justify-between gap-4">
          <p className="flex items-center gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-mute">
            <span className="text-xl" aria-hidden>{post.glyph}</span> {post.cat} · {post.read} min read
          </p>
          <button onClick={close} data-hover aria-label="Close article" className="grid place-items-center w-11 h-11 shrink-0 rounded-full border border-line hover:border-orange hover:text-orange hover:rotate-90 transition-all duration-500">
            <svg width="13" height="13" viewBox="0 0 12 12" fill="none"><path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
          </button>
        </div>
        <div className="px-6 sm:px-10 py-8 sm:py-10">
          {post.img ? (
            <div className="post-item relative rounded-3xl overflow-hidden aspect-[16/8] mb-8">
              <Image src={post.img} alt={post.title} fill sizes="(max-width: 768px) 92vw, 720px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
            </div>
          ) : (
            <div className={`post-item relative rounded-3xl overflow-hidden aspect-[16/6] mb-8 bg-gradient-to-br ${GRADS[BLOG_POSTS.indexOf(post) % GRADS.length]} grid place-items-center`}>
              <span className="text-7xl sm:text-8xl select-none" aria-hidden>{post.glyph}</span>
              <span className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
            </div>
          )}
          <p className="post-item flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-orange text-white px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em]">{post.cat}</span>
            <span className="rounded-full border border-line px-3.5 py-1.5 text-[10px] uppercase tracking-[0.18em] text-cream/70">{post.date}</span>
            <span className="rounded-full border border-line px-3.5 py-1.5 text-[10px] uppercase tracking-[0.18em] text-cream/70">{post.read} min read</span>
          </p>
          <h3 className="post-item mt-6 font-display font-extrabold leading-[1.05] text-3xl min-[420px]:text-[2.5rem]">{post.title}</h3>
          <p className="post-item mt-5 text-cream/70 leading-[1.85] text-base sm:text-lg border-l-2 border-orange pl-5">{post.excerpt}</p>

          <div className="mt-2">
            {post.body.map((b, i) => (<Block key={i} b={b} />))}
          </div>

          <div className="post-item mt-12 rounded-3xl border border-orange/35 bg-orange-dim/30 p-6 sm:p-7">
            <p className="text-[10px] uppercase tracking-[0.24em] text-orange">Ready to put this into action?</p>
            <p className="mt-2.5 font-display font-extrabold text-2xl leading-tight">Tell us what you're working on — we'll come back with a clear plan.</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <ArrowBtn href={CALENDLY} external>Book a free call</ArrowBtn>
              <Magnetic>
                <Link href="/free-ai-audit" data-hover className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-7 py-3.5 text-sm font-semibold hover:border-orange hover:text-orange transition-colors">
                  <RollText text="Get your readiness score" /> ↗
                </Link>
              </Magnetic>
            </div>
          </div>

          <p className="post-item mt-12 text-[11px] uppercase tracking-[0.24em] text-mute flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-orange" /> Keep reading <span className="h-px flex-1 bg-line" /></p>
          <div className="post-item mt-5 space-y-3 pb-4">
            {related.map((r) => (
              <button key={r.slug} onClick={() => onSwap(r)} data-hover data-cursor="Read" className="group w-full text-left rounded-3xl border border-line bg-white/[0.03] p-5 sm:p-6 flex items-center gap-5 transition-colors duration-300 hover:border-orange/60">
                <span className="text-3xl shrink-0" aria-hidden>{r.glyph}</span>
                <span className="min-w-0">
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-orange font-semibold">{r.cat} · {r.read} min</span>
                  <span className="block mt-1.5 font-display font-bold leading-snug group-hover:text-orange transition-colors">{r.title}</span>
                </span>
                <span className="ml-auto grid place-items-center w-9 h-9 shrink-0 rounded-full border border-line transition-all duration-500 group-hover:bg-orange group-hover:border-orange group-hover:text-white group-hover:rotate-45">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BlogClient() {
  const [ready, setReady] = useState(false);
  const [filter, setFilter] = useState("all");
  const [picked, setPicked] = useState(null);
  const flipState = useRef(null);
  useEffect(() => { const r = requestAnimationFrame(() => setReady(true)); return () => cancelAnimationFrame(r); }, []);

  const shown = BLOG_POSTS.filter((p) => filter === "all" || p.cat === filter);
  const featured = BLOG_POSTS.find((p) => p.featured);
  const cluster = ["ai-prototype-to-production-hardening-checklist-2026", "ai-mvp-in-4-weeks-playbook", "rag-architecture-guide-2026", "ai-phone-agents-replacing-call-centers", "n8n-vs-zapier-vs-make-2026", "how-ai-chatbots-cut-customer-support-costs"]
    .map((slug) => BLOG_POSTS.find((p) => p.slug === slug)).filter(Boolean);

  const chooseFilter = (id) => {
    if (id === filter) return;
    flipState.current = Flip.getState(".post-card");
    setFilter(id);
  };
  useLayoutEffect(() => {
    if (!flipState.current) return;
    const state = flipState.current; flipState.current = null;
    Flip.from(state, {
      targets: ".post-card", duration: 0.8, ease: "power3.inOut", stagger: 0.04, absolute: true,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 40, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out", delay: 0.1 }),
      onComplete: () => ScrollTrigger.refresh(),
    });
    const t = setTimeout(() => ScrollTrigger.refresh(), 700);
    return () => clearTimeout(t);
  }, [filter]);

  // The AI cluster — a pinned gallery that slides sideways as you scroll
  const hWrap = useRef(null);
  const hTrack = useRef(null);
  useEffect(() => {
    const wrap = hWrap.current, track = hTrack.current;
    if (!wrap || !track) return;
    // Reduced motion: no pin/scrub — the section falls back to native horizontal scroll.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const dist = () => Math.max(track.scrollWidth - wrap.clientWidth, 0);
    const tween = gsap.to(track, {
      x: () => -dist(), ease: "none",
      scrollTrigger: { trigger: wrap, start: "top top", end: () => "+=" + dist(), pin: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true },
    });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, []);

  return (
    <main id="main" tabIndex={-1} className="relative min-h-screen overflow-x-clip">
      <Cursor />
      <Smooth ready={ready} />
      <Header loaded={ready} />
      <AnchorNav items={[{ id: "top", label: "Intro" }, { id: "featured", label: "Latest" }, { id: "articles", label: "Articles" }, { id: "cta", label: "Start" }]} />
      <PageScene variant="blog" />

      <div className="relative z-10">
        {/* Hero */}
        <section id="top" className="relative px-4 sm:px-6 md:px-10 pt-36 md:pt-44 pb-20 md:pb-28 max-w-[1500px] mx-auto w-full">
          <div aria-hidden className="pointer-events-none absolute -top-24 right-[4%] w-[30rem] h-[30rem] rounded-full bg-orange/[0.13] blur-3xl animate-drift" />
          <nav aria-label="Breadcrumb" className="relative flex items-center gap-2.5 text-[11px] uppercase tracking-[0.22em] text-mute">
            <Link href="/" className="hover:text-orange transition-colors">Home</Link><span className="text-orange">/</span><span className="text-cream font-semibold">Blog</span>
          </nav>
          <p className="relative mt-12 inline-flex items-center gap-2.5 rounded-full border border-orange/40 bg-orange/10 px-5 py-2.5 text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-orange">
            <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse-dot" /> The GreeLogix Blog
          </p>
          <h1 className="relative mt-8 font-display font-extrabold uppercase leading-[0.94] tracking-tight text-[11.5vw] min-[420px]:text-[9.5vw] lg:text-[6.6rem] xl:text-[7.8rem]">
            <RevealLines loaded={ready} lines={[<>AI insights for</>, <><span className="text-orange">builders</span> & operators.</>]} />
          </h1>
          <p data-scrub-words className="relative mt-10 max-w-xl text-base md:text-lg text-cream/70 leading-[1.85]" style={{ opacity: ready ? 1 : 0, transition: "opacity .9s ease .55s" }}>
            Hands-on playbooks, ROI breakdowns, and tool comparisons from an agency that ships AI
            products every week. No hype, just what works. Open any article to read it right here.
          </p>
          <dl data-batch className="relative mt-14 pt-8 border-t border-line grid grid-cols-2 md:grid-cols-4 gap-8">
            {[[15, "", "Deep-dive articles"], [11, "", "Categories"], [9, "", "Avg. minutes a read"], [0, "", "Hype — just what works"]].map(([v, sfx, l]) => (
              <div key={l}>
                <dd className="font-display font-extrabold text-4xl md:text-5xl"><span data-count={v}>0</span><span className="text-orange">{sfx}</span></dd>
                <dt className="mt-2 text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-mute">{l}</dt>
              </div>
            ))}
          </dl>
        </section>

        {/* Featured latest article */}
        <section id="featured" className="relative px-4 sm:px-6 md:px-10 pb-20 md:pb-28 max-w-[1500px] mx-auto w-full scroll-mt-20">
          <article data-anim="cinematic" data-cursor="Read" data-hover onClick={() => setPicked(featured)} role="button" tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") setPicked(featured); }}
            className="card-sheen group relative cursor-pointer rounded-[2rem] border border-orange/35 bg-gradient-to-br from-orange-dim/60 via-coal to-coal overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="p-7 sm:p-10 md:p-14">
                <span className="text-[10px] uppercase tracking-[0.22em] bg-orange text-white font-semibold rounded-full px-3.5 py-1.5">Latest · {featured.cat} · {featured.date}</span>
                <h2 className="mt-8 font-display font-extrabold text-3xl sm:text-4xl leading-[1.06]">{featured.title}</h2>
                <p data-words className="mt-5 text-cream/70 leading-[1.85] max-w-lg">{featured.excerpt}</p>
                <div className="mt-8 flex flex-wrap gap-2.5">
                  <span className="rounded-full border border-orange/40 text-orange px-4 py-2 text-xs font-semibold">{featured.read} min read</span>
                  <span className="rounded-full border border-line px-4 py-2 text-xs text-cream/70">10-point protocol inside</span>
                </div>
                <p className="mt-9 inline-flex items-center gap-3 text-sm font-semibold text-orange">
                  <span className="grid place-items-center w-10 h-10 rounded-full border border-orange/50 transition-transform duration-500 group-hover:rotate-45">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  </span>
                  <RollText text="Read the article" />
                </p>
              </div>
              <div className="relative min-h-[240px] lg:min-h-[430px] overflow-hidden">
                <Image src={featured.img} alt={featured.title} fill sizes="(max-width: 1024px) 92vw, 720px" data-zoom-img className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span data-bob className="absolute top-5 right-6 text-4xl select-none" aria-hidden>{featured.glyph}</span>
                <p className="absolute bottom-6 left-6 right-6">
                  <span className="block text-[10px] uppercase tracking-[0.24em] text-white/70">The GreeLogix Blog</span>
                  <span className="block mt-2 font-display font-extrabold text-3xl md:text-4xl leading-tight">Fresh off the build floor</span>
                </p>
              </div>
            </div>
          </article>
        </section>

        {/* AI cluster — pinned horizontal gallery */}
        <section ref={hWrap} aria-label="The AI cluster" className="hwrap-scroll relative overflow-hidden border-y border-line bg-coal/40 py-20 md:py-24">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-10 flex items-center gap-3">
            <p data-scramble className="text-[11px] uppercase tracking-[0.28em] text-mute shrink-0">The AI cluster</p>
            <span data-line className="h-px flex-1 bg-line origin-left" />
            <span className="hidden sm:block text-[11px] uppercase tracking-[0.18em] text-orange shrink-0">Keep scrolling — it slides sideways</span>
          </div>
          <div ref={hTrack} className="mt-10 flex w-max gap-4 px-4 sm:px-6 md:px-10 will-change-transform">
            {cluster.map((post, i) => (
              <button key={post.slug} onClick={() => setPicked(post)} data-hover data-cursor="Read"
                className="group relative w-[78vw] sm:w-[30rem] shrink-0 text-left rounded-[1.8rem] border border-line bg-coal/90 overflow-hidden transition-colors duration-500 hover:border-orange/60">
                <span className="relative block h-52 sm:h-60 overflow-hidden">
                  {post.img && <Image src={post.img} alt={post.title} fill sizes="(max-width: 768px) 80vw, 480px" className="object-cover" />}
                  <span className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute top-4 left-5 text-[10px] uppercase tracking-[0.2em] text-white/85 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1.5">{post.cat}</span>
                  <span aria-hidden className="absolute bottom-3 right-5 font-display font-extrabold text-stroke text-5xl">{String(i + 1).padStart(2, "0")}</span>
                </span>
                <span className="block p-6 sm:p-7">
                  <span className="block font-display font-extrabold text-xl sm:text-2xl leading-tight group-hover:text-orange transition-colors line-clamp-2">{post.title}</span>
                  <span className="mt-3 block text-sm text-mute leading-[1.75] line-clamp-2">{post.excerpt}</span>
                  <span className="mt-5 flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-[0.16em] text-cream/50">{post.read} min read</span>
                    <span className="text-[11px] uppercase tracking-[0.16em] text-orange font-semibold"><RollText text="Read" /> →</span>
                  </span>
                </span>
              </button>
            ))}
            <a href="#articles" data-hover className="group grid place-items-center w-[62vw] sm:w-[24rem] shrink-0 rounded-[1.8rem] border border-dashed border-orange/40 bg-orange/[0.06] text-center p-8 transition-colors duration-500 hover:border-orange">
              <span>
                <span className="block font-display font-extrabold text-3xl leading-tight">All 15<br />articles</span>
                <span className="mt-3 block text-[11px] uppercase tracking-[0.18em] text-orange font-semibold">Browse the grid ↓</span>
              </span>
            </a>
          </div>
        </section>

        {/* Sticky filter */}
        <div className="sticky top-16 md:top-[72px] z-40 bg-ink/85 backdrop-blur-md border-y border-line">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-10 py-3.5 flex items-center gap-3 overflow-x-auto">
            <span className="hidden md:flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-mute shrink-0"><span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse-dot" />Filter</span>
            <div className="flex gap-2" role="tablist" aria-label="Filter articles by category">
              {BLOG_FILTERS.map((f) => (
                <button key={f.id} role="tab" aria-selected={filter === f.id} onClick={() => chooseFilter(f.id)} data-hover
                  className={`shrink-0 inline-flex items-center justify-center min-h-11 rounded-full px-5 py-2.5 text-[13px] font-semibold transition-all duration-300 ${filter === f.id ? "bg-orange text-white shadow-lg" : "border border-line text-cream/65 hover:border-orange hover:text-orange"}`}>
                  {f.label}
                </button>
              ))}
            </div>
            <span className="ml-auto shrink-0 text-[11px] uppercase tracking-[0.18em] text-mute" aria-live="polite">{shown.length} {shown.length === 1 ? "article" : "articles"}</span>
          </div>
        </div>

        {/* Articles grid */}
        <section id="articles" className="relative px-4 sm:px-6 md:px-10 py-16 md:py-24 max-w-[1500px] mx-auto w-full scroll-mt-24">
          <div data-proximity="0.045" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {shown.map((post) => {
              const gi = BLOG_POSTS.indexOf(post);
              return (
                <article key={post.slug}
                  onClick={() => setPicked(post)} role="button" tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setPicked(post); } }}
                  data-tilt data-cursor="Read" data-hover
                  className="post-card spot-card group relative cursor-pointer rounded-[1.8rem] border border-line bg-coal/85 backdrop-blur overflow-hidden flex flex-col transition-colors duration-500 hover:border-orange/60">
                  <div className={`relative h-36 sm:h-40 bg-gradient-to-br ${GRADS[gi % GRADS.length]} overflow-hidden shrink-0`}>
                    {post.img && <Image src={post.img} alt={post.title} fill sizes="(max-width: 768px) 92vw, 460px" data-zoom-img className="object-cover opacity-90" />}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
                    <span data-scrub-rotate aria-hidden className="absolute -right-3 -top-6 font-display font-extrabold text-[6.5rem] leading-none text-white/[0.07] select-none">{post.glyph}</span>
                    <span data-bob className="absolute top-4 right-5 text-4xl select-none" aria-hidden>{post.glyph}</span>
                    <span className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-3">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-white/85 bg-black/25 backdrop-blur-sm rounded-full px-3 py-1.5">{post.date}</span>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-white/85 bg-black/25 backdrop-blur-sm rounded-full px-3 py-1.5">{post.read} min</span>
                    </span>
                  </div>
                  <div className="p-6 sm:p-7 flex flex-col flex-1">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-orange font-semibold">{post.cat}</p>
                    <h3 className="mt-2.5 font-display font-extrabold text-[1.25rem] leading-snug group-hover:text-orange transition-colors">{post.title}</h3>
                    <p className="mt-3 text-sm text-mute leading-[1.75] line-clamp-3">{post.excerpt}</p>
                    <div className="mt-auto pt-6 flex items-center justify-between gap-3">
                      <span className="text-[11px] uppercase tracking-[0.16em] text-cream/50">{post.read} min read</span>
                      <span className="text-[11px] uppercase tracking-[0.16em] text-orange font-semibold shrink-0"><RollText text="Read article" /> →</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* CTA */}
          <div id="cta" data-anim="cinematic" className="mt-20 scroll-mt-24 rounded-[2rem] border border-orange/30 bg-gradient-to-br from-orange-dim/50 via-coal to-coal px-7 py-10 sm:p-12 relative overflow-hidden">
            <span data-scrub-rotate aria-hidden className="absolute -right-8 -bottom-14 font-display font-extrabold text-[10rem] leading-none text-white/[0.05] select-none">✦</span>
            <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center relative">
              <div>
                <p data-scramble className="text-[11px] uppercase tracking-[0.28em] text-mute">Ready to put this into action?</p>
                <h2 data-split className="mt-5 font-display font-extrabold uppercase leading-[1.0] text-3xl min-[420px]:text-5xl lg:text-6xl">
                  Reading is step one. <span className="text-orange">Shipping is the game.</span>
                </h2>
                <p data-words className="mt-5 text-cream/70 leading-[1.85] max-w-xl">Every playbook above is something we ship for clients weekly. Tell us what you're working on and we'll come back with a clear plan.</p>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-4 shrink-0">
                <ArrowBtn href={CALENDLY} external>Book a free call</ArrowBtn>
                <Magnetic>
                  <Link href="/free-ai-audit" data-hover className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/25 px-7 py-3.5 text-sm font-semibold hover:border-orange hover:text-orange transition-colors">
                    <RollText text="Get your readiness score" /> ↗
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
