import { useHydrated } from "@tanstack/react-router";
import { ReactNode, useState } from "react";
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import regionsMap from "./constantes/regionsMap-const";
import themeAllocation from "./constantes/themeAllocation-const";
import carbonByYear from "./constantes/carbonByYear";

export default function TransparenciaMapaAlocacao() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <>
      <section className="px-6 py-10">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 rounded-3xl border border-border bg-card overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">02 · Mapa</div>
                <h3 className="font-display text-2xl mt-1">Distribuição territorial dos projetos</h3>
              </div>
              <div className="hidden md:flex items-center gap-3 text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-leaf" /> Ativo</span>
                <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-ocean" /> MRV</span>
                <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-mist" /> Em análise</span>
              </div>
            </div>
            <div className="relative aspect-[4/5] md:aspect-[5/4] bg-gradient-soft">
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
                <defs>
                  <linearGradient id="toFill" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="var(--ocean)" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="var(--leaf)" stopOpacity="0.22" />
                  </linearGradient>
                  <pattern id="grid" width="6" height="6" patternUnits="userSpaceOnUse">
                    <path d="M 6 0 L 0 0 0 6" fill="none" stroke="currentColor" strokeOpacity="0.08" strokeWidth="0.3" />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" className="text-foreground" />
                <path
                  d="M48 4 L62 6 L66 14 L60 22 L70 30 L78 38 L74 52 L80 62 L70 74 L60 82 L52 92 L40 94 L34 86 L28 76 L24 64 L30 54 L26 42 L34 30 L28 18 L36 10 Z"
                  fill="url(#toFill)"
                  stroke="var(--primary)"
                  strokeOpacity="0.4"
                  strokeWidth="0.4"
                />
                {regionsMap.map((r) => {
                  const radius = 2 + r.projects / 18;
                  const active = hovered === r.id;
                  return (
                    <g key={r.id} onMouseEnter={() => setHovered(r.id)} onMouseLeave={() => setHovered(null)} style={{ cursor: "pointer" }}>
                      <circle cx={r.x} cy={r.y} r={radius + 2} fill="var(--leaf)" opacity={active ? 0.25 : 0.12} />
                      <circle cx={r.x} cy={r.y} r={radius} fill="var(--leaf)" opacity={0.85} />
                      <circle cx={r.x} cy={r.y} r={0.6} fill="var(--background)" />
                      <text x={r.x + radius + 1.5} y={r.y + 0.8} fontSize="2.4" fill="var(--foreground)" opacity={active ? 1 : 0.7} className="font-mono">
                        {r.name}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {hovered && (
                <div className="absolute bottom-4 left-4 right-4 md:right-auto md:max-w-xs rounded-2xl bg-card/95 backdrop-blur border border-border p-4 shadow-elevated">
                  {(() => {
                    const r = regionsMap.find((x) => x.id === hovered)!;
                    return (
                      <>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">Região</div>
                        <div className="font-display text-xl">{r.name}</div>
                        <div className="grid grid-cols-3 gap-2 mt-3">
                          <Mini label="Projetos" value={`${r.projects}`} />
                          <Mini label="Investido" value={`R$ ${r.value}M`} />
                          <Mini label="Hectares" value={`${r.hectares}k`} />
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 grid gap-6">
            <div className="rounded-3xl border border-border bg-card p-6">
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">03 · Alocação</div>
              <h3 className="font-display text-2xl mt-1">Recursos por temática</h3>
              <div className="mt-4"><ChartShell height={260}>
                <PieChart>
                  <Pie data={themeAllocation} dataKey="value" nameKey="name" innerRadius={56} outerRadius={92} paddingAngle={2}>
                    {themeAllocation.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }}
                    formatter={(value) => [`${value}%`, "Alocação"]}
                  />
                </PieChart>
              </ChartShell></div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
                {themeAllocation.map((t) => (
                  <div key={t.name} className="flex items-center justify-between text-xs">
                    <span className="inline-flex items-center gap-2 text-foreground/80">
                      <span className="h-2 w-2 rounded-full" style={{ background: t.color }} />
                      {t.name}
                    </span>
                    <span className="font-mono text-muted-foreground">{t.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6">
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">04 · Carbono</div>
              <h3 className="font-display text-2xl mt-1">Evolução tCO₂e e estoque</h3>
              <div className="mt-4"><ChartShell height={200}>
                <LineChart data={carbonByYear} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="y" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
                  <Line type="monotone" dataKey="evit" stroke="var(--leaf)" strokeWidth={2.5} dot={{ r: 3 }} name="Emissões evitadas (k tCO₂e)" />
                  <Line type="monotone" dataKey="est" stroke="var(--ocean)" strokeWidth={2.5} dot={{ r: 3 }} name="Estoque protegido (MtCO₂e)" />
                </LineChart>
              </ChartShell></div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

function ChartShell({ height, children }: { height: number; children: ReactNode }) {
  const hydrated = useHydrated();
  if (!hydrated) return <div style={{ height }} className="rounded-xl bg-secondary/40 animate-pulse" />;
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">{children as any}</ResponsiveContainer>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[9px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="font-display text-lg leading-tight mt-0.5">{value}</div>
    </div>
  );
}