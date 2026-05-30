export interface IDemonstrationTableValues {
  l: string; v: string
}

type Props = {
  values?: IDemonstrationTableValues[]
}

export default function DemonstrationTable({
  values = []
}: Props) {
  return <div className="mt-12 grid grid-cols-3 gap-px bg-primary-foreground/10 rounded-2xl overflow-hidden border border-primary-foreground/10">
    {values.map((s) => (
      <div key={s.l} className="bg-primary/40 backdrop-blur p-4">
        <div className="text-[10px] uppercase tracking-[0.18em] opacity-60">{s.l}</div>
        <div className="font-display text-2xl mt-1">{s.v}</div>
      </div>
    ))}
  </div>
}
