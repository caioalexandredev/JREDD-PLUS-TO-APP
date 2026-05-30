import { Edital } from "@/mock/EditalData";
import { useState } from "react";
import { motion } from "motion/react";
import Field from "@/libs/fields/Field";

export default function NovoEditalModal({ onClose, onCreate }: { onClose: () => void; onCreate: (e: Edital) => void }) {
  const [form, setForm] = useState({
    title: "",
    theme: "Recuperação",
    region: "Norte",
    value: "",
    deadline: "30 dias",
    agency: "SEMARH-TO · Fundo JREDD+",
    modality: "Chamada pública concorrencial",
    summary: "",
  });
  const update = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const year = new Date().getFullYear();
    const seq = Math.floor(100 + Math.random() * 900);
    const numeric = Number(form.value.replace(/[^\d]/g, "")) || 1_000_000;
    const novo: Edital = {
      id: `TO-${year}-${seq}`,
      title: form.title || "Novo edital",
      region: form.region,
      value: numeric >= 1_000_000 ? `R$ ${(numeric / 1_000_000).toFixed(1)} mi` : `R$ ${(numeric / 1_000).toFixed(0)} mil`,
      valueNumber: numeric,
      deadline: form.deadline,
      deadlineDays: Number(form.deadline.replace(/\D/g, "")) || 30,
      theme: form.theme,
      status: "Aberto",
      publishedAt: new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" }),
      agency: form.agency,
      modality: form.modality,
      publicTarget: ["Associações", "Cooperativas"],
      summary: form.summary || "Resumo a ser publicado.",
      scope: [],
      eligibility: [],
      timeline: [],
      documents: [],
      contact: { name: "Coordenação JREDD+", email: "editais@jredd.to.gov.br", phone: "(63) 3218-0000" },
    };
    onCreate(novo);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 h-full" onClick={onClose}>
      <motion.div
        initial={{ y: 20, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-card border border-border rounded-3xl shadow-elevated overflow-hidden flex flex-col max-h-[90vh]"      >
        <div className="p-6 border-b border-border flex items-start justify-between gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground font-mono"><span className="text-destructive">●</span> Cadastro de edital</div>
            <h2 className="mt-2 font-display text-2xl tracking-[-0.01em]">Novo edital JREDD+</h2>
            <p className="mt-1 text-sm text-muted-foreground">Publique uma nova chamada para o portal de editais.</p>
          </div>
          <button onClick={onClose} className="h-9 w-9 inline-flex items-center justify-center rounded-full hover:bg-secondary transition-colors">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" /></svg>
          </button>
        </div>

        <form onSubmit={submit} className="p-6 max-h-[65vh] overflow-y-auto space-y-4">
          <div className="p-1 max-h-[55vh] overflow-y-auto space-y-4">
            <Field label="Título do edital">
              <input required value={form.title} onChange={(e) => update("title", e.target.value)} className={inputCls} placeholder="Ex.: Recuperação de nascentes — Bacia do Tocantins" />
            </Field>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Tema">
                <select value={form.theme} onChange={(e) => update("theme", e.target.value)} className={inputCls}>
                  {["Recuperação", "Agricultura", "Fogo", "Educação", "Conservação", "Carbono", "Bioeconomia"].map((t) => <option key={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="Região">
                <select value={form.region} onChange={(e) => update("region", e.target.value)} className={inputCls}>
                  {["Norte", "Sudeste", "Leste", "Central", "Bico do Papagaio", "Estadual"].map((r) => <option key={r}>{r}</option>)}
                </select>
              </Field>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Valor (R$)">
                <input value={form.value} onChange={(e) => update("value", e.target.value)} className={inputCls} placeholder="1.500.000" />
              </Field>
              <Field label="Prazo de inscrição">
                <input value={form.deadline} onChange={(e) => update("deadline", e.target.value)} className={inputCls} placeholder="30 dias" />
              </Field>
            </div>
            <Field label="Órgão proponente">
              <input value={form.agency} onChange={(e) => update("agency", e.target.value)} className={inputCls} />
            </Field>
            <Field label="Modalidade">
              <input value={form.modality} onChange={(e) => update("modality", e.target.value)} className={inputCls} />
            </Field>
            <Field label="Resumo">
              <textarea rows={4} value={form.summary} onChange={(e) => update("summary", e.target.value)} className={inputCls + " resize-none"} placeholder="Breve descrição da chamada, escopo e público-alvo." />
            </Field>
          </div>


          <div className="p-4 border-t border-border bg-secondary/30 flex items-center justify-end gap-2">            <button type="button" onClick={onClose} className="px-4 py-2 text-sm rounded-full hover:bg-secondary transition-colors">Cancelar</button>
            <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2 text-sm font-medium hover:bg-foreground/90 transition-all">
              Publicar edital
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

const inputCls = "w-full px-3 py-2.5 rounded-xl bg-secondary/60 border border-transparent text-sm focus:outline-none focus:border-ocean focus:bg-card transition-all";