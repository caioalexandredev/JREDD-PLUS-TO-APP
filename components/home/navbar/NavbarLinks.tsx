import Link from "next/link";
import navLinks from "@/config/nav.config";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  className?: string;
};


export default function NavbarLinks() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const darkHero = pathname === "/transparencia" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkBase = darkHero
    ? "px-3 py-1.5 text-sm text-background/70 hover:text-background rounded-full hover:bg-background/20 transition-colors whitespace-nowrap"
    : "px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-full hover:bg-secondary/70 transition-colors whitespace-nowrap";

  return (
    <div className="hidden md:flex items-center gap-0.5 flex-1 justify-center min-w-0">
      {navLinks.map((l) => (
        <Link key={l.href} href={l.href} className={linkBase}>
          {l.label}
        </Link>
      )
      )}
    </div>
  );
}