"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/* Split text into masked words that rise one after another */
function splitWords(el) {
  const walk = (node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === 3) {
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
          const mask = document.createElement("span");
          mask.className = "word-mask";
          const word = document.createElement("span");
          word.className = "word";
          word.textContent = part;
          mask.appendChild(word);
          frag.appendChild(mask);
        });
        node.replaceChild(frag, child);
      } else if (child.nodeType === 1 && child.tagName !== "BR") walk(child);
    });
  };
  walk(el);
  return el.querySelectorAll(".word");
}

/* Split every text node inside an element into per-character spans */
function splitChars(el) {
  const walk = (node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === 3) {
        const frag = document.createDocumentFragment();
        [...child.textContent].forEach((ch) => {
          const span = document.createElement("span");
          span.className = "char";
          span.textContent = ch === " " ? "\u00A0" : ch;
          frag.appendChild(span);
        });
        node.replaceChild(frag, child);
      } else if (child.nodeType === 1 && child.tagName !== "BR") walk(child);
    });
  };
  walk(el);
  return el.querySelectorAll(".char");
}

const ANIMS = {
  rise: { from: { y: 50, opacity: 0 }, ease: "power3.out", dur: 1 },
  drop: { from: { y: -56, opacity: 0, rotation: -2 }, ease: "back.out(1.6)", dur: 0.95 },
  "slide-left": { from: { x: -84, opacity: 0 }, ease: "power3.out", dur: 1.05 },
  "slide-right": { from: { x: 84, opacity: 0 }, ease: "power3.out", dur: 1.05 },
  zoom: { from: { scale: 0.82, opacity: 0, y: 24 }, ease: "back.out(1.45)", dur: 0.95 },
  flip: { from: { rotationX: 62, y: 46, opacity: 0, transformPerspective: 900, transformOrigin: "50% 100%" }, ease: "power3.out", dur: 1.1 },
  rotate: { from: { rotation: -7, scale: 0.9, opacity: 0, transformOrigin: "0% 100%" }, ease: "back.out(1.5)", dur: 1 },
  blur: { from: { opacity: 0, filter: "blur(18px)", scale: 1.045 }, ease: "power2.out", dur: 1.2 },
  skew: { from: { skewY: 5, y: 56, opacity: 0 }, ease: "power3.out", dur: 1 },
  cinematic: {
    from: { clipPath: "inset(0 16% 0 16% round 26px)", scale: 0.94, opacity: 0, filter: "blur(10px)" },
    to: { clipPath: "inset(0 0% 0 0% round 26px)", scale: 1 },
    ease: "power2.inOut", dur: 1.5,
  },
  slam: { from: { scale: 1.3, y: -52, opacity: 0, filter: "blur(10px)" }, ease: "power4.out", dur: 0.7 },
  "zoom-out": { from: { scale: 1.22, opacity: 0, filter: "blur(8px)" }, ease: "power2.out", dur: 1.25 },
  "spin-in": { from: { rotation: -150, scale: 0.35, opacity: 0 }, ease: "back.out(1.8)", dur: 0.9 },
  "mask-left": { from: { clipPath: "inset(0 100% 0 0)", x: -34, opacity: 0 }, to: { clipPath: "inset(0 0% 0 0)", x: 0 }, ease: "power4.out", dur: 1.15 },
  "mask-right": { from: { clipPath: "inset(0 0 0 100%)", x: 34, opacity: 0 }, to: { clipPath: "inset(0 0 0 0%)", x: 0 }, ease: "power4.out", dur: 1.15 },
  "drop-bounce": { from: { y: -92, opacity: 0 }, ease: "bounce.out", dur: 1.15 },
};

export default function Smooth({ ready }) {
  useEffect(() => {
    if (!ready) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, touchMultiplier: 1.4 });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const ctrl = new AbortController();
    const { signal } = ctrl;

    // Anchor navigation through Lenis
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const el = document.querySelector(a.getAttribute("href"));
      if (el) { e.preventDefault(); lenis.scrollTo(el, { offset: -70, duration: 1.4 }); }
    };
    document.addEventListener("click", onClick);

    // Signature reveal — rise + de-blur
    gsap.utils.toArray("[data-reveal]").forEach((el) => {
      gsap.fromTo(el, { y: 44, opacity: 0, filter: "blur(6px)" }, {
        y: 0, opacity: 1, filter: "blur(0px)", duration: 1.05, ease: "power3.out", clearProps: "filter",
        delay: parseFloat(el.dataset.delay || 0),
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    });

    // The animation vocabulary — every section speaks a different dialect
    Object.entries(ANIMS).forEach(([name, cfg]) => {
      gsap.utils.toArray(`[data-anim="${name}"]`).forEach((el) => {
        gsap.fromTo(el, cfg.from, {
          x: 0, y: 0, scale: 1, rotation: 0, rotationX: 0, skewY: 0, opacity: 1, filter: "blur(0px)",
          ...(cfg.to || {}),
          duration: cfg.dur, ease: cfg.ease, clearProps: "filter",
          delay: parseFloat(el.dataset.delay || 0),
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    });

    // Character-by-character headline entrances
    gsap.utils.toArray("[data-split]").forEach((el) => {
      const chars = splitChars(el);
      gsap.fromTo(chars, { y: "0.85em", opacity: 0, rotate: 4 }, {
        y: "0em", opacity: 1, rotate: 0, duration: 0.75, ease: "back.out(1.7)", stagger: 0.016, clearProps: "transform",
        scrollTrigger: { trigger: el, start: "top 86%" },
      });
    });

    // Glitch-flash entrances — a quick signal tear, then lock-in
    gsap.utils.toArray("[data-glitch]").forEach((el) => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 88%" } });
      tl.fromTo(el, { opacity: 0, x: 0 }, { opacity: 1, duration: 0.08 })
        .to(el, { x: -9, skewX: -7, duration: 0.055 })
        .to(el, { x: 7, skewX: 5, duration: 0.055 })
        .to(el, { x: -4, duration: 0.05 })
        .to(el, { x: 0, skewX: 0, duration: 0.09, ease: "power2.out", clearProps: "transform,opacity" });
    });

    // Batch cascades — grid children arrive one after another, slightly askew
    gsap.utils.toArray("[data-batch]").forEach((group) => {
      gsap.fromTo(group.children,
        { y: 48, opacity: 0, rotation: (i) => ((i % 3) - 1) * 2.2 },
        {
          y: 0, opacity: 1, rotation: 0, duration: 0.85, ease: "power3.out", stagger: 0.09, clearProps: "transform",
          scrollTrigger: { trigger: group, start: "top 86%" },
        });
    });

    // Word-by-word masked rises for lead paragraphs
    gsap.utils.toArray("[data-words]").forEach((el) => {
      const words = splitWords(el);
      gsap.fromTo(words, { yPercent: 115 }, {
        yPercent: 0, duration: 0.85, ease: "power3.out", stagger: 0.018,
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    });

    // Horizontal scrub — giant words drift sideways with the scroll
    gsap.utils.toArray("[data-scrub-x]").forEach((el) => {
      gsap.fromTo(el, { x: 56 }, {
        x: -56, ease: "none",
        scrollTrigger: { trigger: el.closest("section") || el, start: "top bottom", end: "bottom top", scrub: 1.2 },
      });
    });

    // Stagger groups — children cascade in one after another
    gsap.utils.toArray("[data-stagger]").forEach((group) => {
      gsap.fromTo(group.children, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.75, ease: "power3.out", stagger: 0.08,
        scrollTrigger: { trigger: group, start: "top 86%" },
      });
    });

    // Cinematic clip-wipe reveals
    gsap.utils.toArray("[data-wipe]").forEach((el) => {
      gsap.fromTo(el, { clipPath: "inset(0 0 100% 0 round 28px)" }, {
        clipPath: "inset(0 0 0% 0 round 28px)", duration: 1.25, ease: "power4.out",
        scrollTrigger: { trigger: el, start: "top 86%" },
      });
      const img = el.querySelector("[data-wipe-img]");
      if (img) gsap.fromTo(img, { scale: 1.22 }, {
        scale: 1, duration: 1.6, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 86%" },
      });
    });

    // Growing hairlines
    gsap.utils.toArray("[data-line]").forEach((el) => {
      gsap.fromTo(el, { scaleX: 0 }, {
        scaleX: 1, duration: 1.3, ease: "power3.inOut",
        scrollTrigger: { trigger: el, start: "top 90%" },
      });
    });

    // Parallax drift
    gsap.utils.toArray("[data-parallax]").forEach((el) => {
      gsap.to(el, {
        y: () => parseFloat(el.dataset.parallax) || -60, ease: "none",
        scrollTrigger: { trigger: el.closest("section") || el, start: "top bottom", end: "bottom top", scrub: 1 },
      });
    });

    // Animated counters
    gsap.utils.toArray("[data-count]").forEach((el) => {
      const end = parseFloat(el.dataset.count);
      const obj = { v: 0 };
      ScrollTrigger.create({
        trigger: el, start: "top 88%", once: true,
        onEnter: () => gsap.to(obj, { v: end, duration: 1.8, ease: "power2.out", onUpdate: () => (el.textContent = Math.round(obj.v)) }),
      });
    });

    // 3D tilt cards + cursor spotlight
    if (window.matchMedia("(hover: hover)").matches) {
      document.querySelectorAll("[data-tilt]").forEach((el) => {
        const rx = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power3.out" });
        const ry = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power3.out" });
        el.addEventListener("pointermove", (e) => {
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
          gsap.set(el, { transformPerspective: 850 });
          rx((0.5 - py) * 7); ry((px - 0.5) * 9);
          el.style.setProperty("--mx", `${px * 100}%`);
          el.style.setProperty("--my", `${py * 100}%`);
        }, { signal });
        el.addEventListener("pointerleave", () => { rx(0); ry(0); }, { signal });
      });
    }

    // Velocity skew — fast scrolling leans the marquees & giant words
    const skewSetters = gsap.utils.toArray("[data-velocity]").map((el) =>
      gsap.quickTo(el, "skewX", { duration: 0.45, ease: "power3.out" }));
    if (skewSetters.length) {
      lenis.on("scroll", ({ velocity }) => {
        const skew = gsap.utils.clamp(-7, 7, velocity * -0.55);
        skewSetters.forEach((set) => set(skew));
      });
    }

    const refresh = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      clearTimeout(refresh);
      ctrl.abort();
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [ready]);

  return null;
}
