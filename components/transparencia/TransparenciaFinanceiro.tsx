import { useHydrated } from "@tanstack/react-router";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import executionByMonth from "./constantes/executionByMonth-const";
import { ReactNode } from "react";

export default function TransparenciaFinanceiro() {
  return (
    <>
      <section className="px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
              <div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">05 · Execução financeira</div>
                <h3 className="font-display text-2xl mt-1">Captado vs. executado — ciclo 2026</h3>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-ocean" /> Captado (R$ M)</span>
                <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-leaf" /> Executado (R$ M)</span>
              </div>
            </div>
            <ChartShell height={300}>
              <AreaChart data={executionByMonth} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--ocean)" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="var(--ocean)" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--leaf)" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="var(--leaf)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
                <Area type="monotone" dataKey="captado" stroke="var(--ocean)" strokeWidth={2} fill="url(#g1)" />
                <Area type="monotone" dataKey="executado" stroke="var(--leaf)" strokeWidth={2} fill="url(#g2)" />
              </AreaChart>
            </ChartShell>
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