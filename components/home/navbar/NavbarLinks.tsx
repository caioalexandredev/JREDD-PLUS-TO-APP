import Link from "next/link";
import navLinks from "@/config/nav.config";

export default function NavbarLinks() {
  const linkBase = "px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-full hover:bg-secondary/70 transition-colors whitespace-nowrap";

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