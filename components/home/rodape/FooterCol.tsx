type LinkItem = {
  label: string;
  href: string;
};

export default function FooterCol({ title, links }: { title: string; links: LinkItem[] }) {
  return (
    <div className="md:col-span-3 md:justify-center">
      <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4 font-mono">
        {title}
      </div>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-sm text-foreground/80 hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}