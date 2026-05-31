"use client";

import pages from "@/config/pages.consts";
import { editais } from "@/mock/EditalData";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";
import Step5 from "./steps/Step5";
import Step6 from "./steps/Step6";

const steps = [
  { n: "01", t: "Identificação do proponente", s: "Dados da instituição e representante legal" },
  { n: "02", t: "Caracterização do projeto", s: "Nome, categoria, linha temática e justificativa" },
  { n: "03", t: "Localização e área", s: "Georreferenciamento e diagnóstico MapBiomas" },
  { n: "04", t: "Público beneficiado", s: "Quantitativos e perfil socioeconômico" },
  { n: "05", t: "Plano de execução", s: "Objetivos, atividades e cronograma" },
  { n: "06", t: "Declarações e submissão", s: "Termos obrigatórios e assinatura digital" },
] as const;

export default function Submeter(): React.ReactNode {
  const edital = editais[0];
  const projectTitle = edital?.title ?? "Recuperação de nascentes — Bacia do Tocantins";
  const editalCode = edital?.id ?? "TO-2026-018";
  const [current, setCurrent] = useState(0);
  const [completed, setCompleted] = useState<Set<number>>(new Set([0, 1]));

  const progress = useMemo(() => {
    const base = (current / (steps.length - 1)) * 60;
    return Math.min(95, base + completed.size * 3);
  }, [current, completed]);

  const next = () => {
    setCompleted((c) => new Set(c).add(current));
    setCurrent((i) => Math.min(steps.length - 1, i + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const prev = () => setCurrent((i) => Math.max(0, i - 1));

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 glass border-b border-border">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center gap-4">
          <Link href={pages.painel.path} className="flex items-center gap-2 shrink-0">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-hero">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v20M2 12h20" strokeLinecap="round" /></svg>
            </span>
            <span className="font-display text-xl tracking-tight hidden sm:inline">JREDD+</span>
          </Link>
          <div className="h-6 w-px bg-border hidden sm:block" />
          <div className="hidden sm:block min-w-0">
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">Edital {editalCode} · Rascunho</div>
            <div className="text-sm font-medium leading-tight truncate max-w-105">{projectTitle}</div>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-leaf animate-pulse" />
              <span className="text-muted-foreground">Auto-salvo há 12s</span>
            </div>
            <button className="text-sm px-3 py-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors hidden sm:inline-flex">
              Salvar rascunho
            </button>
            <Link href={pages.logout.path} className="text-sm px-3 py-2 rounded-full border border-border hover:bg-secondary transition-colors">Sair</Link>
          </div>
        </div>
        <div className="h-0.5 bg-border/50">
          <motion.div className="h-full bg-gradient-hero" initial={false} animate={{ width: `${progress}%` }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} />
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10 grid lg:grid-cols-12 gap-10">
        <aside className="lg:col-span-3">
          <div className="lg:sticky lg:top-24">
            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground mb-4 font-mono">Etapas · {current + 1}/10</div>
            <nav className="space-y-1">
              {steps.map((s, i) => {
                const isDone = completed.has(i) && i !== current;
                const isCurrent = i === current;
                return (
                  <button
                    key={s.n}
                    onClick={() => setCurrent(i)}
                    className={`w-full text-left flex items-start gap-3 p-3 rounded-xl transition-all ${isCurrent ? "bg-card shadow-soft border border-border" : "hover:bg-secondary/60 border border-transparent"
                      }`}
                  >
                    <div className="relative shrink-0">
                      <div className={`h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-mono ${isDone ? "bg-gradient-hero text-primary-foreground" :
                        isCurrent ? "bg-card border-2 border-leaf text-leaf" :
                          "bg-secondary text-muted-foreground"
                        }`}>
                        {isDone ? "✓" : s.n}
                      </div>
                      {isCurrent && <div className="absolute inset-0 rounded-full bg-leaf animate-pulse-ring" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className={`text-sm leading-tight ${isCurrent ? "font-medium text-foreground" : "text-foreground/80"}`}>{s.t}</div>
                      <div className="text-[11px] text-muted-foreground mt-0.5 truncate">{s.s}</div>
                    </div>
                  </button>
                );
              })}
            </nav>

            <div className="mt-8 rounded-2xl bg-gradient-mesh border border-border p-5">
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono">Simulador de aprovação</div>
              <div className="mt-3 flex items-baseline justify-between">
                <div className="font-display text-3xl text-gradient">{Math.round(progress)}%</div>
                <div className="text-xs text-leaf font-medium">Alta</div>
              </div>
              <div className="mt-3 h-1.5 rounded-full bg-secondary overflow-hidden">
                <motion.div animate={{ width: `${progress}%` }} className="h-full bg-gradient-hero rounded-full" />
              </div>
              <div className="mt-4 space-y-1.5 text-[11px] text-muted-foreground">
                <div className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-leaf" /> CNPJ e certidões validadas</div>
                <div className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-leaf" /> Documentos jurídicos OK</div>
                <div className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-destructive" /> Falta carta de anuência</div>
              </div>
            </div>
          </div>
        </aside>

        <main className="lg:col-span-9 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-xs text-muted-foreground">Etapa {steps[current].n}</span>
                <span className="h-px w-12 bg-border" />
                <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{steps[current].s}</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl tracking-[-0.02em] leading-[1.02]">
                {steps[current].t}
              </h1>

              <div className="mt-10">
                {current === 0 && <Step1 />}
                {current === 1 && <Step2 />}
                {current === 2 && <Step3 />}
                {current === 3 && <Step4 />}
                {current === 4 && <Step5 />}
                {current === 5 && <Step6 />}
              </div>

              <div className="mt-12 flex items-center justify-between gap-4 pt-6 border-t border-border">
                <button
                  onClick={prev}
                  disabled={current === 0}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  Etapa anterior
                </button>
                <div className="text-xs text-muted-foreground hidden sm:block">
                  {current + 1} de {steps.length}
                </div>
                {current < steps.length - 1 ? (
                  <button onClick={next} className="inline-flex items-center gap-2 rounded-full bg-gradient-hero text-primary-foreground px-6 py-3 text-sm font-medium shadow-glow hover:shadow-elevated transition-all hover:-translate-y-0.5">
                    Continuar para {steps[current + 1].t.split(" ")[0].toLowerCase()}
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                ) : (
                  <button className="inline-flex items-center gap-2 rounded-full bg-leaf text-primary-foreground px-6 py-3 text-sm font-medium shadow-glow hover:shadow-elevated transition-all hover:-translate-y-0.5">
                    Submeter projeto
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
