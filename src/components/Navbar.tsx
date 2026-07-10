"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";

const navLinks = [
  { label: "WORK", href: "#work" },
  { label: "ABOUT", href: "#about" },
  { label: "GET IN TOUCH", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#11163f]/88 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1120px] items-center justify-between px-6 py-6 md:px-10">
        <a href="#" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Ritz Media World"
              width={170}
              height={30}
              className="h-6 w-auto object-contain"
            />
        </a>

        <div className="flex items-center gap-6 md:gap-10">
            <nav className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[11px] font-medium tracking-[0.18em] text-white/85 transition hover:text-[#dba845]"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <button
              type="button"
              aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center rounded-full text-white/92"
            >
              <Menu className="h-6 w-6" strokeWidth={2.25} />
            </button>
        </div>
      </div>
    </header>
  );
}
