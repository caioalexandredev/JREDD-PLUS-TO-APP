"use client";

import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroVisual from "./HeroVisual";

export default function Hero() {
 return (
    <section id="top" className="relative min-h-screen pt-28 pb-20 overflow-hidden grain">
      <HeroBackground />

      <div className="relative mx-auto max-w-7x1 px-6">
        <HeroContent />
        <HeroVisual />
      </div>      
    </section>
  );
}
