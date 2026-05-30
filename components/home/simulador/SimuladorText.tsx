export default function SimuladorText() {
  return (
    <>
      <div>
        <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground mb-4 font-mono">
          <span className="text-leaf">●</span> Diferencial 2026
        </div>
        <h2 className="font-display text-5xl sm:text-6xl tracking-[-0.02em] leading-[1.02]">
          Simulador de
          <br /><span className="text-gradient italic">aprovação ao vivo</span>.
        </h2>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          Enquanto o proponente preenche, o sistema calcula pendências, critérios não atendidos e
          nível de aderência ao edital. A submissão deixa de ser uma aposta.
        </p>

        <div className="mt-10 grid grid-cols-3 gap-3">
          {[
            { label: "Aderência", value: "82%", tone: "leaf" },
            { label: "Pendências", value: "3", tone: "ocean" },
            { label: "Probabilidade", value: "Alta", tone: "primary" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-4">
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{s.label}</div>
              <div className="font-display text-3xl mt-1 text-gradient">{s.value}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}