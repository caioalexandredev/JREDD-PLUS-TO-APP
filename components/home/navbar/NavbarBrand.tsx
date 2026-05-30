import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavbarBrand() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const darkHero = pathname === "/transparencia" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a href="#top" className={`flex items-center gap-2 pl-3 pr-2 py-1 shrink-0 ${darkHero ? "text-background" : ""}`}>
      <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-hero">
        <span className="absolute inset-0 rounded-full bg-gradient-hero animate-pulse-ring" />
        <svg viewBox="0 0 24 24" className="relative h-3.5 w-3.5 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 2v20M2 12h20" strokeLinecap="round" />
        </svg>
      </span>
      <span className="font-display text-xl leading-none tracking-tight">JREDD+</span>
      <span className={`text-[10px] uppercase tracking-[0.18em] hidden sm:inline pl-0.5 pt-0.5 ${darkHero ? "text-background/50" : "text-muted-foreground"}`}>TO</span>
    </a>
  );
}