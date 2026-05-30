"use client";

import { motion } from "motion/react";
import HeroAction from "./HeroAction";

export default function HeroContent() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-leaf animate-pulse" />
          Plataforma oficial · Programa REDD+ Tocantins · v2026
        </div>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="mt-8 text-center font-display text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.95] tracking-[-0.03em] text-foreground"
      >
        Gestão ambiental,
        <br />
        <span className="text-gradient italic">acessível por dados.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25 }}
        className="mx-auto mt-6 max-w-2xl text-center text-lg text-muted-foreground leading-relaxed"
      >
        Centralizamos editais, submissão guiada, avaliação técnica com inteligência territorial e
        transparência pública dos créditos de carbono do Estado do Tocantins.
      </motion.p>

      <HeroAction />
    </>
  )
}