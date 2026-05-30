export default function TransparenciaHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
      <div>
        <div className="text-xs uppercase tracking-[0.22em] text-background/50 mb-4 font-mono">
          <span className="text-leaf">●</span> Portal da Transparência · ao vivo
        </div>
        <h2 className="font-display text-5xl sm:text-6xl tracking-[-0.02em] leading-[1.02]">
          O que cada real
          <br /><em className="bg-linear-to-r from-mist via-ocean to-leaf bg-clip-text text-transparent not-italic">investido</em> gerou.
        </h2>
      </div>
      <div className="flex items-center gap-2 text-xs text-background/60">
        <span className="h-1.5 w-1.5 rounded-full bg-leaf animate-pulse" />
        Atualizado há 4 minutos · ciclo REDD+ 2026
      </div>
    </div>
  )
}