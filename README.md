# GreeLogix 3D — Immersive Business Website

A scroll-driven, 3D business site for [GreeLogix](https://greelogix.com), inspired by
landonorris.com (pinned scroll journeys), otsuka-air.jp (calm, airy motion), mousham.design
(portfolio storytelling) and 3dlogogif.com (a 3D logo that travels with you).

## Stack
- **Next.js 14** (App Router) + **React 18**
- **Three.js** via React Three Fiber + drei — the GL monogram rebuilt in 3D, fixed behind
  the page: it drifts, spins and shrinks as you scroll without ever blocking content
- **GSAP + ScrollTrigger** — reveals, counters, parallax, pinned horizontal services
- **Lenis** — butter-smooth scrolling synced to GSAP's ticker
- **Tailwind CSS** — brand system: ink black, cream, GreeLogix orange `#ff4d1c`

## Experience map
Preloader (count-up + panel split) → hero with masked headline rise, live counters and a
rotating badge → platform marquee → problem cards → angled orange marquee → **pinned
horizontal services journey** (stacked grid on mobile) → sticky stacking process cards →
featured rescue case study + work cards with parallax mock-UIs → why-us + deliverables →
auto-scrolling testimonial river + tech-stack river → FAQ accordion → giant CTA, platform
badges, back-to-top and an outlined giant wordmark footer.

Details: custom cursor with magnetic buttons, scroll progress bar, hide-on-scroll header,
full-screen animated menu, film grain, custom scrollbar & selection, `prefers-reduced-motion`
support, fully responsive.

## Run
```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

Logo: `public/logo.png` (source: `images.png` in repo root).
Content & links (Calendly, audits, platforms) mirror greelogix.com.
