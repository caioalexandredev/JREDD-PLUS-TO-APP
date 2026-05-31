import { motion } from "framer-motion";
import steps from "./steps.data";

export default function SimuladorCard() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-3xl bg-card border border-border shadow-elevated overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-gradient-soft">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-destructive/40" />
              <div className="h-2.5 w-2.5 rounded-full bg-mist" />
              <div className="h-2.5 w-2.5 rounded-full bg-leaf/60" />
            </div>
            <span className="ml-3 font-mono text-[11px] text-muted-foreground">submissão/projeto-PRJ-2026-0418</span>
          </div>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Etapa 4 de 10</span>
        </div>

        <div className="p-6 sm:p-8">
          <div className="space-y-1">
            {steps.map((s, i) => (
              <div key={s.label} className="flex items-center gap-3 py-2.5">
                <div className="relative">
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-mono ${s.status === "done" ? "bg-gradient-hero text-primary-foreground" :
                    s.status === "current" ? "bg-card border-2 border-leaf text-leaf" :
                      "bg-secondary text-muted-foreground"
                    }`}>
                    {s.status === "done" ? "✓" : i + 1}
                  </div>
                  {s.status === "current" && <div className="absolute inset-0 rounded-full bg-leaf animate-pulse-ring" />}
                </div>
                <div className={`text-sm ${s.status === "pending" ? "text-muted-foreground" : "text-foreground"}`}>
                  {s.label}
                </div>
                {s.status === "current" && (
                  <div className="ml-auto text-[10px] uppercase tracking-wider text-leaf font-mono">em andamento</div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-gradient-mesh border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-medium">Aderência ao Edital TO-2026-018</div>
              <div className="font-mono text-sm text-leaf">82%</div>
            </div>
            <div className="h-2 rounded-full bg-secondary overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "82%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="h-full bg-gradient-hero rounded-full"
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-leaf" />
                CNPJ validado · certidões OK
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-destructive" />
                Falta carta de anuência
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}