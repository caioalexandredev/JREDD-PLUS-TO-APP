export default function UploadBox({ label, formats }: { label: string; formats?: string }) {
  return (
    <div className="group relative rounded-xl border border-dashed border-border bg-background/50 hover:border-ocean/50 hover:bg-ocean/2 transition-all p-5 flex items-center gap-4 cursor-pointer">
      <div className="h-10 w-10 rounded-lg bg-linear-to-br from-ocean/15 to-leaf/15 flex items-center justify-center text-primary">
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 5v14M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium">{label}</div>
        <div className="text-[11px] text-muted-foreground mt-0.5">{formats ?? "PDF, JPG ou PNG · até 20MB"}</div>
      </div>
      <div className="text-xs text-muted-foreground group-hover:text-primary transition-colors">Selecionar</div>
    </div>
  );
}