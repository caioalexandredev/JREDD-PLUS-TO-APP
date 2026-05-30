export function Select({ children, ...p }: React.SelectHTMLAttributes<HTMLSelectElement>) {
    return <select {...p} className={inputCls}>{children}</select>;
}

const inputCls = "w-full bg-background border border-border rounded-lg px-3.5 py-2.5 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-ocean focus:ring-4 focus:ring-ocean/10 transition";