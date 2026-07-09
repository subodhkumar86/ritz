"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "./Magnetic";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const shutterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    const titleContainer = titleContainerRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const scroll = scrollRef.current;
    const shutter = shutterRef.current;

    if (!el || !titleContainer || !title || !subtitle || !scroll || !shutter) return;

    const lines = title.querySelectorAll(".animate-line");

    const tl = gsap.timeline();

    // Fade and translate up items on page load
    tl.fromTo(
      shutter,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 0.05, duration: 2.0, ease: "power3.out" }
    )
      .fromTo(
        lines,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1.2,
          ease: "power4.out",
        },
        "-=1.5"
      )
      .fromTo(
        subtitle,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(
        scroll,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.2"
      );

    // Scroll-scrubbed Parallax effects
    const shutterParallax = gsap.to(shutter, {
      scale: 1.4,
      opacity: 0,
      rotation: 90,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    const textParallax = gsap.to(titleContainer, {
      yPercent: -20,
      opacity: 0.1,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      tl.kill();
      shutterParallax.scrollTrigger?.kill();
      shutterParallax.kill();
      textParallax.scrollTrigger?.kill();
      textParallax.kill();
    };
  }, []);

  const scrollToWork = () => {
    const workSection = document.getElementById("about");
    if (workSection) {
      workSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen flex flex-col justify-center items-center bg-[#0E1125] overflow-hidden px-6 md:px-12 select-none"
    >
      {/* Decorative subtle background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(226,182,89,0.035)_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none z-0" />

      {/* Giant Faint Camera Shutter Shading (Watermark) */}
      <div
        ref={shutterRef}
        className="absolute w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] flex items-center justify-center opacity-[0.05] pointer-events-none z-10"
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full fill-white"
        >
          <path d="M50 0 L65 35 L35 35 Z" />
          <path d="M100 50 L65 65 L65 35 Z" />
          <path d="M50 100 L35 65 L65 65 Z" />
          <path d="M0 50 L35 35 L35 65 Z" />
        </svg>
      </div>

      {/* Main Title Headings (with Parallax wrapper) */}
      <div
        ref={titleContainerRef}
        className="relative z-20 w-full max-w-6xl mx-auto flex flex-col items-center text-center transform-gpu"
      >
        <h1
          ref={titleRef}
          className="font-display font-black text-[9vw] sm:text-[7vw] lg:text-[5.5vw] leading-[1.0] tracking-tighter text-[#F8F9FA] flex flex-col items-center"
        >
          <div className="overflow-hidden h-fit py-1.5">
            <span className="animate-line block transform-gpu">
              17 YEARS OF
            </span>
          </div>
          <div className="overflow-hidden h-fit py-1.5">
            <span className="animate-line block transform-gpu">
              MAKING BRANDS
            </span>
          </div>
          <div className="overflow-hidden h-fit py-1.5">
            <span className="animate-line block transform-gpu">
              <span className="text-accent italic font-medium tracking-tight">IMPOSSIBLE</span> TO IGNORE
            </span>
          </div>
        </h1>

        {/* Subtitle statement */}
        <div className="mt-8 md:mt-10 max-w-2xl">
          <p
            ref={subtitleRef}
            className="font-sans italic text-sm md:text-base lg:text-lg text-[#8E9AA8] leading-relaxed transform-gpu"
          >
            "Fuelled by a magnetic culture of hustle and heart, backed by the belief that great ideas change the world"
          </p>
        </div>
      </div>

      {/* Scroll down button */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer"
        onClick={scrollToWork}
      >
        <Magnetic strength={0.4}>
          <button className="flex flex-col items-center p-3 focus:outline-none">
            <span className="text-[10px] font-sans font-bold tracking-widest text-[#F8F9FA]/40 hover:text-accent transition-colors duration-300 uppercase mb-4">
              SCROLL DOWN
            </span>
            <div className="w-[28px] h-[48px] border-2 border-white/20 hover:border-accent rounded-full p-1 flex justify-center transition-colors duration-300">
              <div className="w-1 h-1.5 bg-accent rounded-full animate-bounce mt-1" />
            </div>
          </button>
        </Magnetic>
      </div>
    </section>
  );
}
