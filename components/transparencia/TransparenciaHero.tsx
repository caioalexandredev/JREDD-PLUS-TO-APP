import Link from "next/link";

export default function TransparenciaHero() {
    return (
        <>
     <section className="relative pt-36 pb-16 px-6 overflow-hidden bg-foreground text-background">
        <div className="absolute inset-0 opacity-60">
          <div className="absolute -top-32 left-1/4 h-[480px] w-[480px] rounded-full bg-ocean/40 blur-3xl" />
          <div className="absolute -bottom-32 right-1/4 h-[480px] w-[480px] rounded-full bg-leaf/40 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl">
          <Link href="/" className="font-mono text-[11px] uppercase tracking-[0.22em] text-background/60 hover:text-background transition-colors">
            ← JREDD+ TO
          </Link>
          <div className="mt-6 grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="text-xs uppercase tracking-[0.22em] text-background/50 font-mono">
                <span className="text-leaf">●</span> Portal da Transparência · dados ao vivo
              </div>
              <h1 className="mt-3 font-display text-5xl md:text-6xl tracking-[-0.02em] leading-[1.02]">
                Cada hectare, cada tonelada,
                <br /><em className="bg-linear-to-r from-mist via-ocean to-leaf bg-clip-text text-transparent not-italic">cada real</em> rastreável.
              </h1>
              <p className="mt-5 max-w-2xl text-background/70 leading-relaxed">
                Indicadores consolidados de conservação, carbono, impacto social, execução financeira e governança.
                Mapas, gráficos e registros públicos auditáveis em tempo real.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-2 text-xs text-background/70">
              <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-leaf animate-pulse" /> Sincronizado há 4 min · ciclo 2026</div>
              <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-ocean" /> Origem: SEMARH-TO · MRV TREES 2.0</div>
              <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-mist" /> Aderente à LAI · Lei nº 12.527/2011</div>
            </div>
          </div>
        </div>
      </section>   
        </>
    )
}