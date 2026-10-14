"use client";
import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import Header from "@/components/Header";
import Smooth from "@/components/Smooth";
import Hero, { LogoMarquee, OrangeMarquee } from "@/components/Hero";
import { Problems, Services, Process, Work, Studio, Voices, Faq, Footer } from "@/components/Sections";

const Scene3D = dynamic(() => import("@/components/Scene3D"), { ssr: false });

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const done = useCallback(() => setLoaded(true), []);

  return (
    <main className="relative">
      {!loaded && <Preloader onDone={done} />}
      <Cursor />
      <Smooth ready={loaded} />
      <Scene3D />
      <Header loaded={loaded} />

      <div className="relative z-10">
        <Hero loaded={loaded} />
        <LogoMarquee />
        <Problems />
        <OrangeMarquee />
        <Services />
        <Process />
        <Work />
        <Studio />
        <Voices />
        <Faq />
        <Footer />
      </div>
    </main>
  );
}
