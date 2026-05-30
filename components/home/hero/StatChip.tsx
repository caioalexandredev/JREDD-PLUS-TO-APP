export default function StatChip({ label, value, trend }: { label: string; value: string; trend?: string }) {
  return (
    <div className="glass-dark rounded-2xl px-4 py-3 text-primary-foreground min-w-35">
      <div className="text-[10px] uppercase tracking-[0.18em] opacity-70">{label}</div>
      <div className="mt-1 flex items-baseline gap-1.5">
        <div className="font-display text-2xl">{value}</div>
        {trend && <div className="text-[11px] text-leaf font-mono">{trend}</div>}
      </div>
    </div>
  );
}