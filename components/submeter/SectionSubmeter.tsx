import { ReactNode } from "react";

export default function Section({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <section className="mt-8 first:mt-0">
      <div className="flex items-baseline justify-between mb-4">
        <h3 className="font-display text-xl tracking-tight">{title}</h3>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </div>
      <div className="rounded-2xl bg-card border border-border p-6 shadow-soft">{children}</div>
    </section>
  );
}