"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export default function Smooth({ ready }) {
  useEffect(() => {
    if (!ready) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, touchMultiplier: 1.4 });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Anchor navigation through Lenis
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const el = document.querySelector(a.getAttribute("href"));
      if (el) { e.preventDefault(); lenis.scrollTo(el, { offset: -70, duration: 1.4 }); }
    };
    document.addEventListener("click", onClick);

    // Generic reveals
    gsap.utils.toArray("[data-reveal]").forEach((el) => {
      gsap.fromTo(el, { y: 44, opacity: 0, filter: "blur(6px)" }, {
        y: 0, opacity: 1, filter: "blur(0px)", duration: 1.05, ease: "power3.out", clearProps: "filter",
        delay: parseFloat(el.dataset.delay || 0),
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    });
    // Cinematic clip-wipe reveals (images/sections unveil top-to-bottom)
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

    const refresh = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      clearTimeout(refresh);
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [ready]);

  return null;
}
