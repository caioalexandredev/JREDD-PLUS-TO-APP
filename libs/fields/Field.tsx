export default function Field({ label, hint, children }: { label: string; hint?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs font-medium text-foreground/80">{label}</label>
        {hint}
      </div>
      {children}
    </div>
  );
}