import { motion } from "framer-motion";

export default function TransparenciaCaption() {
    return (
                  <div className="rounded-3xl border border-background/10 bg-background/5 p-8 flex flex-col">
            <div className="text-[10px] uppercase tracking-[0.2em] text-background/50">Painel REDD+ Tocantins</div>
            <div className="font-display text-2xl mt-1">Governança em destaque</div>

            <div className="mt-6 space-y-5 flex-1">
              {[
                { l: "Projetos auditados", v: "94%", w: 94 },
                { l: "Prestação de contas aprovada", v: "88%", w: 88 },
                { l: "Emissões evitadas (meta)", v: "71%", w: 71 },
                { l: "Conservação contínua", v: "82%", w: 82 },
              ].map((m, i) => (
                <div key={m.l}>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-background/70">{m.l}</span>
                    <span className="font-mono">{m.v}</span>
                  </div>
                  <div className="h-1 rounded-full bg-background/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${m.w}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full bg-gradient-to-r from-ocean to-leaf rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
    )
}