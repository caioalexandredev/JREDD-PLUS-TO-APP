import { motion } from "framer-motion";
import kpis from "./kpis.data";

export default function TransparenciaGrid() {
  return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-background/10 rounded-3xl overflow-hidden border border-background/10">
          {kpis.map((k, i) => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="bg-foreground p-6 sm:p-8 hover:bg-background/5 transition-colors group"
            >
              <div className="text-[10px] uppercase tracking-[0.2em] text-background/50">{k.label}</div>
              <div className="font-display text-4xl sm:text-5xl mt-3 tracking-[-0.02em]">{k.value}</div>
              <div className="mt-3 text-xs text-background/60 font-mono">{k.delta}</div>
            </motion.div>
          ))}
        </div>
    )
}