import { motion } from "framer-motion";
import dimensions from "./constantes/dimensions-const";

export default function TransparenciaKPIs() {
  return (
    <>
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="01 · Indicadores" title="Resultados consolidados" />
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-3 mt-8">
            {dimensions.map((d, i) => (
              <motion.div
                key={d.key}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-2xl border border-border bg-card p-5 hover:shadow-elevated transition-shadow"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className={`h-2 w-2 rounded-full bg-${d.color}`} />
                  <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">{d.label}</span>
                </div>
                <div className="space-y-4">
                  {d.items.map((it) => (
                    <div key={it.label}>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{it.label}</div>
                      <div className="font-display text-2xl leading-tight mt-0.5">{it.value}</div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">{it.sub}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
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