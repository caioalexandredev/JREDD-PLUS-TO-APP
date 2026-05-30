export default function TransparenciaMaopVisulization() {
  return (
    <div className="lg:col-span-2 rounded-3xl border border-background/10 bg-background/5 p-8 relative overflow-hidden min-h-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-background/50">Distribuição territorial</div>
          <div className="font-display text-2xl mt-1">Tocantins · 139 municípios</div>
        </div>
        <div className="flex gap-2 text-[10px]">
          {[
            { label: "Em análise", color: "bg-mist" },
            { label: "Aprovado", color: "bg-ocean" },
            { label: "Em execução", color: "bg-leaf" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5 text-background/70 px-2 py-1 rounded-full bg-background/5">
              <span className={`h-1.5 w-1.5 rounded-full ${l.color}`} />{l.label}
            </div>
          ))}
        </div>
      </div>

      {/* Stylized map dots */}
      <div className="relative h-64">
        <svg viewBox="0 0 400 280" className="w-full h-full">
          <defs>
            <linearGradient id="state" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.55 0.12 220 / 0.15)" />
              <stop offset="100%" stopColor="oklch(0.52 0.11 165 / 0.15)" />
            </linearGradient>
          </defs>
          <path d="M180 20 L240 30 L260 70 L280 130 L260 180 L240 230 L200 260 L160 250 L130 210 L120 160 L130 100 L150 50 Z"
            fill="url(#state)" stroke="oklch(1 0 0 / 0.2)" strokeWidth="1" />
          {[
            { x: 200, y: 60, c: "leaf", r: 8 },
            { x: 230, y: 110, c: "ocean", r: 12 },
            { x: 180, y: 140, c: "leaf", r: 6 },
            { x: 210, y: 180, c: "leaf", r: 10 },
            { x: 160, y: 200, c: "mist", r: 5 },
            { x: 240, y: 200, c: "ocean", r: 7 },
            { x: 190, y: 230, c: "leaf", r: 9 },
            { x: 220, y: 80, c: "mist", r: 4 },
          ].map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={p.r + 6} fill={`oklch(${p.c === "leaf" ? "0.52 0.11 165" : p.c === "ocean" ? "0.55 0.12 220" : "0.75 0.05 195"} / 0.15)`} />
              <circle cx={p.x} cy={p.y} r={p.r} fill={`oklch(${p.c === "leaf" ? "0.52 0.11 165" : p.c === "ocean" ? "0.55 0.12 220" : "0.75 0.05 195"})`} />
            </g>
          ))}
        </svg>
      </div>
    </div>
  )
}