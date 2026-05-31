import info from "@/config/app.info";
import pages from "@/config/pages.consts";
import Link from "next/link";

export default function HeaderLoginCadastro() {
  return <header className="flex items-center justify-between">
    <Link href={pages.home.path} className="lg:hidden flex items-center gap-2">
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-hero">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v20M2 12h20" strokeLinecap="round" /></svg>
      </span>
      <span className="font-display text-xl tracking-tight">{info.name}</span>
    </Link>
    <Link href={pages.home.path} className="ml-auto text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 transition-colors">
      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
      Voltar ao site
    </Link>
  </header>
}