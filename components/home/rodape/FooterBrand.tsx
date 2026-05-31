export default function FooterBrand() {
    return (
        <div className="md:col-span-5">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-hero">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v20M2 12h20" strokeLinecap="round"/></svg>
              </span>
              <span className="font-display text-2xl tracking-tight">JREDD+ Tocantins</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground max-w-sm leading-relaxed">
              Plataforma oficial para democratizar o acesso a fundos de créditos de carbono no Estado do Tocantins, com transparência total na gestão de impacto ambiental.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-leaf animate-pulse" />
              Sistema operacional · v2026.04
            </div>
          </div>
    )
}