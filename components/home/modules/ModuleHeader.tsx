export function ModuleHeader() {
    return (
        <>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground mb-4 font-mono">
              <span className="text-leaf">●</span> Arquitetura da plataforma
            </div>
            <h2 className="font-display text-5xl sm:text-6xl tracking-[-0.02em] leading-[1.02]">
              Cinco módulos.
              <br /><span className="text-gradient italic">Uma jornada contínua</span> do edital à prestação de contas.
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm">
            Cada módulo conversa com o próximo. Os dados gerados na submissão alimentam a avaliação,
            que alimenta a execução, que alimenta a transparência pública.
          </p>
        </div>
        </>
    )
}