import pages from "@/config/pages.consts";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavbarActions() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const loginBase = "hidden sm:inline-flex text-sm px-3 py-1.5 text-muted-foreground hover:text-foreground rounded-full transition-colors whitespace-nowrap";
  const ctaBase = "inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium hover:bg-foreground/90 transition-all hover:shadow-elevated whitespace-nowrap";

  return (
    <div className="ml-auto flex items-center gap-1.5 shrink-0">
      <Link href={pages.auth.path} className={loginBase}>
        Acessar
      </Link>
      <Link href={pages.auth.path} className={ctaBase}> 
        <span className="hidden sm:inline">Submeter projeto</span>
        <span className="sm:hidden">Submeter</span>
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </Link>
    </div>
  );
}