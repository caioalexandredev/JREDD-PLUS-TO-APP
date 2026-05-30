import { Dispatch, SetStateAction } from "react";

export interface TabOption {
  value: string;
  label: string;
}

interface TabsProps {
  options: TabOption[];
  activeTab: string;
  onChange: Dispatch<SetStateAction<string>>;
  className?: string;
}

export default function Tabs({
  options,
  activeTab,
  onChange,
  className = ""
}: TabsProps) {
  return (
    <div className={`flex gap-1 p-1 bg-secondary rounded-xl w-fit ${className}`}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`text-sm px-4 py-2 rounded-lg transition-all ${activeTab === option.value
            ? "bg-card shadow-soft text-foreground"
            : "text-muted-foreground hover:text-foreground"
            }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}