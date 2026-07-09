"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import Magnetic from "./Magnetic";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const bgPanelRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Monitor scroll for header backdrop filter
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initialize GSAP fullscreen menu timeline
  useEffect(() => {
    const overlay = overlayRef.current;
    const bgPanel = bgPanelRef.current;
    const links = linksRef.current?.querySelectorAll(".menu-link");
    const details = detailsRef.current;

    if (!overlay || !bgPanel || !links || !details) return;

    // Set initial states
    gsap.set(overlay, { visibility: "hidden" });
    gsap.set(bgPanel, { yPercent: -100 });
    gsap.set(links, { y: 100, opacity: 0 });
    gsap.set(details, { opacity: 0, y: 30 });

    const tl = gsap.timeline({
      paused: true,
      onStart: () => {
        gsap.set(overlay, { visibility: "visible" });
        window.dispatchEvent(new CustomEvent("lock-scroll"));
      },
      onReverseComplete: () => {
        gsap.set(overlay, { visibility: "hidden" });
        window.dispatchEvent(new CustomEvent("unlock-scroll"));
      },
    });

    tl.to(bgPanel, {
      yPercent: 0,
      duration: 0.6,
      ease: "power4.out",
    })
      .to(
        links,
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.3"
      )
      .to(
        details,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.2"
      );

    timelineRef.current = tl;

    return () => {
      tl.kill();
    };
  }, []);

  // Toggle overlay menu open/close
  const toggleMenu = () => {
    if (!timelineRef.current) return;
    if (isOpen) {
      timelineRef.current.reverse();
    } else {
      timelineRef.current.play();
    }
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { label: "WORK", href: "#work" },
    { label: "ABOUT", href: "#about" },
    { label: "GET IN TOUCH", href: "#contact" },
  ];

  return (
    <>
      {/* Main Sticky Header */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b border-transparent ${
          isScrolled
            ? "bg-[#0E1125]/80 backdrop-blur-xl py-4 border-white/5"
            : "bg-transparent py-7"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Brand Logo Image */}
          <Magnetic strength={0.15}>
            <a href="#" className="flex items-center select-none transform-gpu group py-2">
              <Image
                src="/images/logo.png"
                alt="Ritz Media World Logo"
                width={180}
                height={36}
                className="h-6 md:h-8 w-auto object-contain brightness-100 group-hover:brightness-105 transition-all duration-300"
              />
            </a>
          </Magnetic>

          {/* Navigation Items (Desktop) & Hamburger Button */}
          <div className="flex items-center gap-8">
            <nav className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest text-[#F8F9FA]/80">
              {navLinks.map((link) => (
                <Magnetic key={link.label} strength={0.25}>
                  <a
                    href={link.href}
                    className="hover:text-accent transition-colors duration-300 py-2 select-none"
                  >
                    {link.label}
                  </a>
                </Magnetic>
              ))}
            </nav>

            {/* Menu Hamburger Trigger */}
            <Magnetic strength={0.3}>
              <button
                onClick={toggleMenu}
                aria-label="Toggle Menu"
                className="group relative w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/15 transition-all duration-300 pointer-events-auto"
              >
                <div className="flex flex-col gap-1.5 justify-center items-center w-5">
                  <span
                    className={`block h-[2px] w-5 bg-[#F8F9FA] transform transition-transform duration-300 ${
                      isOpen ? "rotate-45 translate-y-[8px]" : ""
                    }`}
                  />
                  <span
                    className={`block h-[2px] w-5 bg-[#F8F9FA] transition-opacity duration-200 ${
                      isOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`block h-[2px] w-5 bg-[#F8F9FA] transform transition-transform duration-300 ${
                      isOpen ? "-rotate-45 -translate-y-[8px]" : ""
                    }`}
                  />
                </div>
              </button>
            </Magnetic>
          </div>
        </div>
      </header>

      {/* Fullscreen Overlay Menu */}
      <div
        ref={overlayRef}
        className="fixed inset-0 w-full h-screen z-45 overflow-hidden invisible"
      >
        {/* Animated Background Panel */}
        <div
          ref={bgPanelRef}
          className="absolute inset-0 bg-[#0E1125] border-b border-white/5 w-full h-full flex flex-col justify-between px-6 md:px-16 pt-32 pb-12"
        >
          <div className="max-w-7xl mx-auto w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Links Column */}
            <div ref={linksRef} className="flex flex-col gap-4 md:gap-6">
              {navLinks.map((link, idx) => (
                <div key={link.label} className="overflow-hidden">
                  <a
                    href={link.href}
                    onClick={toggleMenu}
                    className="menu-link block text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tighter text-[#F8F9FA] hover:text-accent transition-colors duration-300 transform-gpu"
                  >
                    <span className="text-xs md:text-sm font-sans font-medium text-accent/50 mr-4 md:mr-6">
                      0{idx + 1}
                    </span>
                    {link.label}
                  </a>
                </div>
              ))}
            </div>

            {/* details / info column */}
            <div
              ref={detailsRef}
              className="flex flex-col justify-end h-full gap-8 lg:border-l lg:border-white/10 lg:pl-16 lg:pb-12"
            >
              <div>
                <span className="text-xs font-semibold text-accent tracking-widest block mb-3 uppercase">
                  HEADQUARTERS
                </span>
                <p className="text-[#F8F9FA]/80 text-sm md:text-base leading-relaxed">
                  Ritz Media World, Sector 62<br />
                  Noida, Uttar Pradesh 201301, India
                </p>
              </div>

              <div>
                <span className="text-xs font-semibold text-accent tracking-widest block mb-3 uppercase">
                  NEW BUSINESS ENQUIRIES
                </span>
                <a
                  href="mailto:hello@ritzmediaworld.com"
                  className="text-base md:text-lg lg:text-xl font-display font-medium text-[#F8F9FA] hover:underline"
                >
                  hello@ritzmediaworld.com
                </a>
              </div>

              <div>
                <span className="text-xs font-semibold text-accent tracking-widest block mb-3 uppercase">
                  FOLLOW US
                </span>
                <div className="flex gap-4 text-sm font-medium text-[#F8F9FA]/60">
                  {["Instagram", "LinkedIn", "Vimeo", "Facebook"].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="hover:text-accent transition-colors duration-300"
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto w-full flex justify-between items-center border-t border-white/5 pt-8 text-xs text-[#F8F9FA]/40 font-medium">
            <span>© 2026 RITZ MEDIA WORLD. ALL RIGHTS RESERVED.</span>
            <span className="hidden sm:inline">MAKING BRANDS IMPOSSIBLE TO IGNORE</span>
          </div>
        </div>
      </div>
    </>
  );
}
