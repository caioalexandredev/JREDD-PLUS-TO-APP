import { editais, Edital, statusColor } from "@/mock/EditalData";
import { useState } from "react";
import { motion } from "motion/react";
import pages from "@/config/pages.consts";
import Link from "next/link";
import ChevronRightIcon from "@/libs/fields/ChevronRightIcon";
import CloseIcon from "@/libs/icons/CloseIcon";
import SearchIcon from "@/libs/icons/SearchIcon";

function EditalListItem({ edital }: { edital: Edital }) {
  return (
    <button className="w-full text-left p-4 rounded-xl hover:bg-secondary/60 transition-colors group flex items-start gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-[10px] uppercase tracking-[0.16em] font-mono px-2 py-0.5 rounded-full border ${statusColor(edital.status)}`}>
            {edital.status}
          </span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">
            {edital.id} · {edital.region}
          </span>
        </div>
        <div className="mt-1.5 font-display text-base leading-snug">
          {edital.title}
        </div>
        <div className="mt-1 text-xs text-muted-foreground">
          {edital.theme} · Prazo: {edital.deadline} · {edital.value}
        </div>
      </div>
      <ChevronRightIcon />
    </button>
  );
}

export default function EditalSubmissionModal({ onClose }: { onClose: () => void }) {
  const [searchQuery, setSearchQuery] = useState("");

  const openEditais = editais.filter((edital) => edital.status === "Aberto" || edital.status === "Encerrando");

  const filteredList = openEditais.filter((edital) => {
    if (!searchQuery) return true;
    const searchString = `${edital.title} ${edital.theme} ${edital.region}`.toLowerCase();
    return searchString.includes(searchQuery.toLowerCase());
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 20, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-card border border-border rounded-3xl shadow-elevated overflow-hidden"
      >

        <div className="p-6 border-b border-border">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground font-mono">
                <span className="text-leaf">●</span> Nova submissão
              </div>
              <h2 className="mt-2 font-display text-2xl tracking-[-0.01em]">Escolha o edital</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Selecione um edital aberto para iniciar a submissão guiada em 10 etapas.
              </p>
            </div>
            <button
              onClick={onClose}
              className="h-9 w-9 inline-flex items-center justify-center rounded-full hover:bg-secondary transition-colors"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="relative mt-4">
            <SearchIcon />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              placeholder="Buscar edital por tema, região…"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary/60 border border-transparent text-sm focus:outline-none focus:border-ocean focus:bg-card transition-all"
            />
          </div>
        </div>

        <div className="max-h-[55vh] overflow-y-auto p-3">
          {filteredList.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground text-sm">
              Nenhum edital encontrado.
            </div>
          ) : (
            filteredList.map((edital) => (
              <EditalListItem key={edital.id} edital={edital} />
            ))
          )}
        </div>

        <div className="p-4 border-t border-border bg-secondary/30 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Não encontrou? <Link href={pages.editais.path} className="text-foreground underline">Ver todos os editais</Link>
          </span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-full hover:bg-card transition-colors"
          >
            Cancelar
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}