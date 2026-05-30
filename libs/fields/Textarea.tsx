export default function Textarea(p: React.TextareaHTMLAttributes<HTMLTextAreaElement>) { 
    return <textarea {...p} className={inputCls + " min-h-[100px] resize-y"} />; 
}

const inputCls = "w-full bg-background border border-border rounded-lg px-3.5 py-2.5 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-ocean focus:ring-4 focus:ring-ocean/10 transition";