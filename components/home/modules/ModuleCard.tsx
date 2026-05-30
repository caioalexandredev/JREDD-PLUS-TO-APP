"use client";

import modules from "./data";
import { motion } from "framer-motion";

export default function ModuleCard() {
  return (
    <>
      <div className="grid gap-4 lg:grid-cols-12">
        {modules.map((m, i) => (
          <motion.a
            key={m.id}
            id={m.id}
            href={`#${m.id}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className={`group relative overflow-hidden rounded-3xl border border-border bg-card shadow-soft hover:shadow-elevated transition-all duration-500 hover:-translate-y-1 ${i === 0 ? "lg:col-span-7" : i === 1 ? "lg:col-span-5" : i === 2 ? "lg:col-span-5" : i === 3 ? "lg:col-span-4" : "lg:col-span-3"
              }`}
          >
            <div className="absolute inset-0 bg-gradient-mesh opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative p-8 sm:p-10 h-full flex flex-col">
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-muted-foreground">{m.num}</span>
                  <span className="h-px w-8 bg-border" />
                  <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{m.tag}</span>
                </div>
                <div className="h-10 w-10 rounded-xl bg-linear-to-br from-ocean/15 to-leaf/15 text-primary flex items-center justify-center group-hover:from-ocean/25 group-hover:to-leaf/25 transition-colors">
                  {m.icon}
                </div>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl tracking-[-0.02em]">{m.title}</h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">{m.desc}</p>

              <ul className="mt-8 space-y-2.5">
                {m.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-foreground/80">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-leaf shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8 flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                Explorar módulo
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </>
  )
}