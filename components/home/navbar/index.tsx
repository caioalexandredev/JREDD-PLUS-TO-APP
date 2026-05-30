"use client";

import NavbarBrand from "./NavbarBrand";
import NavbarLinks from "./NavbarLinks";
import NavbarActions from "./NavbarActions";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4">
      <nav className={`flex items-center gap-1 sm:gap-2 rounded-full transition-all duration-500 w-full max-w-5xl ${scrolled ? "glass shadow-soft px-2 py-2" : "px-3 py-2.5 bg-transparent"
        }`}
      >
        <NavbarBrand />
        <NavbarLinks />
        <NavbarActions />
      </nav>
    </header>
  );
}