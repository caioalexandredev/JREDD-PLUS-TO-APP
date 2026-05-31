"use client";

import info from "@/config/app.info";
import pages from "@/config/pages.consts";
import { getStoredUser, routeForProfile } from "@/libs/api";
import Link from "next/link";
import { MouseEvent } from "react";

export default function DashboardHeader({
  label,
  title,
  secondaryLink,
}: {
  label: string;
  title: string;
  secondaryLink?: { href: string; label: string };
}) {
  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const user = getStoredUser();
    if (!user) return;
    event.preventDefault();
    window.location.assign(routeForProfile(user.profile));
  };

  return (
    <header className="sticky top-0 z-30 glass border-b border-border">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center gap-4">
        <Link href={pages.home.path} onClick={handleLogoClick} className="flex items-center gap-2 shrink-0">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-hero">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v20M2 12h20" strokeLinecap="round" /></svg>
          </span>
          <span className="font-display text-xl tracking-tight">{info.name}</span>
        </Link>
        <div className="h-6 w-px bg-border hidden sm:block" />
        <div className="hidden sm:block">
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">{label}</div>
          <div className="text-sm font-medium leading-tight">{title}</div>
        </div>
        <div className="ml-auto flex items-center gap-3">
          {secondaryLink && (
            <Link href={secondaryLink.href} className="text-sm px-3 py-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors hidden sm:inline-flex">
              {secondaryLink.label}
            </Link>
          )}
          <Link href={pages.logout.path} className="text-sm px-3 py-2 rounded-full border border-border hover:bg-secondary transition-colors">Sair</Link>
        </div>
      </div>
    </header>
  );
}
