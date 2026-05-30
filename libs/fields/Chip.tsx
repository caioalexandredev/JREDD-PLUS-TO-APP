import { ReactNode } from "react";

export default function Chip({ children, active }: { children: ReactNode; active?: boolean }) {
    return (
        <button type="button" className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${active ? "bg-foreground text-background border-foreground" : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
            }`}>{children}</button>
    );
}