import info from "@/config/app.info";
import Link from "next/link";


export default function CTA() {
    return (
        <section id="cadastrar" className="relative py-32 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-hero p-12 sm:p-20 text-primary-foreground grain">
          <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-leaf/30 blur-3xl animate-float-slow" />
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-ocean/30 blur-3xl animate-float-slow" style={{ animationDelay: "-5s" }} />

          <div className="relative">
            <div className="text-xs uppercase tracking-[0.22em] text-primary-foreground/60 mb-6 font-mono">
              <span>●</span> {info.name} · 2026
            </div>
            <h2 className="font-display text-5xl sm:text-7xl tracking-[-0.02em] leading-[0.98] max-w-3xl">
              Sua organização pode ser a próxima a
              <em className="block mt-2 bg-gradient-to-r from-mist via-background to-mist bg-clip-text text-transparent not-italic">restaurar o Cerrado</em>.
            </h2>
            <p className="mt-8 max-w-xl text-primary-foreground/80 text-lg leading-relaxed">
              Cadastre seu proponente, conheça os editais abertos e use a submissão guiada com simulador
              de aprovação em tempo real.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link href="/submeter" className="inline-flex items-center gap-2 rounded-full bg-background text-foreground px-7 py-4 text-sm font-medium hover:shadow-elevated transition-all hover:-translate-y-0.5">
                Começar submissão guiada
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <Link href="/login" className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 px-7 py-4 text-sm font-medium hover:bg-primary-foreground/10 transition-colors">
                Acessar plataforma
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
    )
}