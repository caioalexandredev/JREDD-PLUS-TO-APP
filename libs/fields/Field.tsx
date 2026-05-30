import { ReactNode } from "react";

type Span = 2 | 3 | 4 | 6 | 8 | 12;

const spanClass: Record<Span, string> = { 2: "sm:col-span-2", 3: "sm:col-span-3", 4: "sm:col-span-4", 6: "sm:col-span-6", 8: "sm:col-span-8", 12: "sm:col-span-12" };

export default function Field({
  label,
  span = 12,
  required,
  hint,
  children
}: { label: string; span?: Span; required?: boolean; hint?: string; children: ReactNode }) {
  return (
    <div className={`col-span-12 ${spanClass[span]}`}>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs font-medium text-foreground/80">
          {label} {required && <span className="text-destructive">*</span>}
        </label>
        {hint}
      </div>
      {children}
    </div>
  );
}