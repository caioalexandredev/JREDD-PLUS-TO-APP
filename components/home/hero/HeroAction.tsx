import pages from "@/config/pages.consts";
import { motion } from "motion/react";
import Link from "next/link";

export default function HeroAction() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-3"
      >
        <Link
          href={pages.submeter.path}
          className="group inline-flex items-center gap-2 rounded-full bg-gradient-hero text-primary-foreground px-6 py-3.5 text-sm font-medium shadow-glow hover:shadow-elevated transition-all hover:-translate-y-0.5"
        >
          Iniciar submissão guiada
          <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </Link>
        <Link
          href={pages.auth.path}
          className="inline-flex items-center gap-2 rounded-full glass px-6 py-3.5 text-sm font-medium text-foreground hover:bg-white transition-all"
        >
          <svg className="h-4 w-4 text-ocean" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3" /></svg>
          Acessar plataforma
        </Link>
      </motion.div>
    </>
  )
}