import { useMemo, useState } from "react";
import records from "./constantes/record-const";

export default function RegistroPublico() {

  const [region, setRegion] = useState<string>("Todas");
  const [type, setType] = useState<string>("Todos");
  const [status, setStatus] = useState<string>("Todos");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return records.filter((r) => {
      if (region !== "Todas" && r.region !== region) return false;
      if (type !== "Todos" && r.type !== type) return false;
      if (status !== "Todos" && r.status !== status) return false;
      if (term && !`${r.id} ${r.title} ${r.org}`.toLowerCase().includes(term)) return false;
      return true;
    });
  }, [q, region, type, status]);

  return (
    <>
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="08 · Registros públicos" title="Consultar projetos, contas e auditorias" />

          <div className="mt-8 glass rounded-2xl border border-border/60 shadow-soft p-3 md:p-4 sticky top-20 z-20">
            <div className="flex flex-col md:flex-row gap-3 md:items-center">
              <div className="relative flex-1 min-w-0">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" strokeLinecap="round" />
                </svg>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Buscar por ID, título ou organização…"
                  className="w-full h-11 pl-10 pr-3 rounded-xl bg-background border border-border focus:border-primary/40 focus:ring-2 focus:ring-primary/10 outline-none text-sm"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Select label="Tipo" value={type} onChange={setType} options={["Todos", "Projeto", "Prestação de contas", "Auditoria", "Edital"]} />
                <Select label="Região" value={region} onChange={setRegion} options={["Todas", "Norte", "Sudeste", "Leste", "Central", "Bico do Papagaio", "Sul", "Estadual"]} />
                <Select label="Status" value={status} onChange={setStatus} options={["Todos", "Aprovado", "Em execução", "Concluído", "Em análise", "Reprovado"]} />
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[10px] uppercase tracking-wider text-muted-foreground border-b border-border bg-secondary/40">
                    <th className="text-left font-medium px-4 py-3">ID</th>
                    <th className="text-left font-medium px-4 py-3">Tipo</th>
                    <th className="text-left font-medium px-4 py-3">Título</th>
                    <th className="text-left font-medium px-4 py-3 hidden md:table-cell">Organização</th>
                    <th className="text-left font-medium px-4 py-3 hidden lg:table-cell">Região</th>
                    <th className="text-left font-medium px-4 py-3">Valor</th>
                    <th className="text-left font-medium px-4 py-3">Status</th>
                    <th className="text-left font-medium px-4 py-3 hidden md:table-cell">Data</th>
                    <th className="text-right font-medium px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr key={r.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                      <td className="px-4 py-3 font-mono text-[11px] text-muted-foreground whitespace-nowrap">{r.id}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{r.type}</td>
                      <td className="px-4 py-3 max-w-[320px]">
                        <div className="font-medium truncate">{r.title}</div>
                        <div className="text-[11px] text-muted-foreground truncate md:hidden">{r.org}</div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{r.org}</td>
                      <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">{r.region}</td>
                      <td className="px-4 py-3 font-mono text-xs whitespace-nowrap">{r.value}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${statusClass(r.status)}`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap hidden md:table-cell">{r.date}</td>
                      <td className="px-4 py-3 text-right">
                        <button className="h-8 w-8 inline-flex items-center justify-center rounded-full bg-secondary hover:bg-gradient-hero hover:text-primary-foreground transition-colors">
                          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={9} className="px-4 py-12 text-center text-muted-foreground text-sm">
                        Nenhum registro encontrado para os filtros aplicados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-secondary/30 text-xs text-muted-foreground">
              <span>Exibindo <strong className="text-foreground">{filtered.length}</strong> de {records.length} registros</span>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 rounded-md hover:bg-card transition-colors">Exportar CSV</button>
                <button className="px-3 py-1.5 rounded-md hover:bg-card transition-colors">API pública</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
      <div>
        <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground font-mono">{eyebrow}</div>
        <h2 className="font-display text-4xl tracking-[-0.02em] mt-2">{title}</h2>
      </div>
    </div>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <label className="inline-flex items-center gap-2 h-11 px-3 rounded-xl bg-background border border-border text-sm hover:border-primary/30 transition-colors">
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="bg-transparent outline-none text-sm font-medium pr-1 cursor-pointer">
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

function statusClass(s: RecordItem["status"]) {
  switch (s) {
    case "Aprovado":
    case "Concluído":
      return "bg-leaf/15 text-leaf border-leaf/30";
    case "Em execução":
      return "bg-ocean/15 text-ocean border-ocean/30";
    case "Em análise":
      return "bg-mist/20 text-foreground/70 border-mist/40";
    case "Reprovado":
      return "bg-destructive/10 text-destructive border-destructive/30";
  }
}

type RecordItem = {
  id: string;
  type: "Projeto" | "Prestação de contas" | "Auditoria" | "Edital";
  title: string;
  org: string;
  region: string;
  value: string;
  status: "Aprovado" | "Em execução" | "Concluído" | "Em análise" | "Reprovado";
  date: string;
};