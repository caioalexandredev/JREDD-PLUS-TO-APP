export interface IDemonstrationTableValues {
  l: string;
  v: string;
}

type Props = {
  values?: IDemonstrationTableValues[];
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  light?: boolean;
}

const gridColsMap: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
};

const lightMode = "mt-10 grid gap-px bg-border rounded-2xl overflow-hidden border border-border";
const darkMode = "mt-12 grid gap-px bg-primary-foreground/10 rounded-2xl overflow-hidden border border-primary-foreground/10";

export default function DemonstrationTable({
  values = [],
  cols = 3,
  light = false
}: Props) {

  const gridClass = gridColsMap[cols] || gridColsMap[3];
  const layoutCn = light ? lightMode : darkMode;
  return (
    <div className={ layoutCn + ` ${gridClass}`}>
      {values.map((s) => (
        <div key={s.l} className={light ? "bg-card p-5" : "bg-primary/40 backdrop-blur p-5"}>
          <div className="text-[10px] uppercase tracking-[0.18em] opacity-60">{s.l}</div>
          <div className="font-display text-3xl mt-1">{s.v}</div>
        </div>
      ))}
    </div>
  );
}