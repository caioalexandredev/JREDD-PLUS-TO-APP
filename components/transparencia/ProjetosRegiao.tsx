import { useHydrated } from "@tanstack/react-router";
import { ReactNode } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import regionsMap from "./constantes/regionsMap-const";

export default function ProjetosRegiao() {
  return (
    <>
      <section className="px-6 py-10">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 rounded-3xl border border-border bg-card p-6 md:p-8">
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">06 · Distribuição</div>
            <h3 className="font-display text-2xl mt-1">Projetos ativos por região</h3>
            <div className="mt-4"><ChartShell height={280}>
              <BarChart data={regionsMap} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="projects" fill="var(--ocean)" name="Projetos" radius={[6, 6, 0, 0]} />
                <Bar dataKey="hectares" fill="var(--leaf)" name="Hectares (k)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ChartShell></div>
          </div>
          <div className="lg:col-span-5 rounded-3xl border border-border bg-gradient-hero text-primary-foreground p-8 flex flex-col justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] opacity-70 font-mono">07 · Governança</div>
              <h3 className="font-display text-3xl mt-2 leading-tight">Conformidade & auditoria</h3>
              <p className="mt-3 text-sm opacity-85 leading-relaxed">
                Todos os repasses passam por verificação independente. Contas e pareceres ficam públicos por
                <strong> 10 anos</strong>.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-8">
              <Pill label="Auditados" value="208" />
              <Pill label="Aprovados" value="94%" />
              <Pill label="Sanções" value="3" />
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

function Pill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-background/15 backdrop-blur border border-background/20 p-3">
      <div className="text-[10px] uppercase tracking-wider opacity-70">{label}</div>
      <div className="font-display text-2xl mt-0.5">{value}</div>
    </div>
  );
}