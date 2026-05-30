"use client";

import { motion } from "motion/react";
import heroImage from "@/assets/hero-cerrado.jpg";
import StatChip from "./StatChip";
import Image from "next/image";

export default function HeroVisual() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto mt-20 max-w-6xl"
      >
        <div className="relative aspect-video overflow-hidden rounded-3xl shadow-elevated ring-1 ring-border">
          <Image
            src={heroImage}
            alt="Vista aérea do Cerrado em Tocantins"
            width={1920}
            height={1080}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-primary/60 via-primary/10 to-transparent" />

          {/* Floating stat chips */}
          <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between">
            <div className="flex flex-wrap gap-2 justify-end">
              <StatChip label="Carbono evitado" value="148.2k tCO₂e" trend="+12%" />
            </div>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="text-primary-foreground/95">
                <div className="text-[11px] uppercase tracking-[0.2em] opacity-70">Visualização territorial</div>
                <div className="font-display text-2xl sm:text-3xl mt-1">Bico do Papagaio · Cerrado preservado</div>
              </div>
              <div className="flex gap-2">
                <StatChip label="Projetos ativos" value="237" />
                <StatChip label="Municípios" value="78 / 139" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom indicator row */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 px-2">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="font-mono">01 / 05</span>
            <span className="h-px w-8 bg-border" />
            <span className="uppercase tracking-[0.2em]">Tecnologia · Natureza · Governança</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-leaf" />
            Dados sincronizados com MapBiomas em tempo real
          </div>
        </div>
      </motion.div>
    </>
  )
}