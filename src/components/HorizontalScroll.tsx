"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger client-side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Step {
  num: string;
  title: string;
  desc: string;
  tagline: string;
}

export default function HorizontalScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const steps: Step[] = [
    {
      num: "01",
      title: "AUDIT & IMMERSION",
      tagline: "Uncovering visual truths.",
      desc: "We dive deep into category codes, consumer behaviors, and brand history. We locate the tension points to discover opportunities for visual disruption.",
    },
    {
      num: "02",
      title: "STRATEGIC AUDACITY",
      tagline: "Bold positions win markets.",
      desc: "We define a future-proof brand position that breaks conventions. We build strategic frameworks that serve as robust foundations for creative design.",
    },
    {
      num: "03",
      title: "CREATIVE REBELLION",
      tagline: "Visceral visual designs.",
      desc: "We translate strategy into premium, jaw-dropping visual identities. Custom typography, bespoke bottle mockups, and vibrant digital layouts.",
    },
    {
      num: "04",
      title: "CATEGORY DOMINANCE",
      tagline: "Command category presence.",
      desc: "We orchestrate seamless global launches and activations, ensuring the brand identity stands tall and unbeatable in the real world.",
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    // Use GSAP MatchMedia for responsive animations (Desktop gets pinning, mobile scroll is native)
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Calculate scroll distance
      const scrollDistance = container.scrollWidth - window.innerWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1.0,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          invalidateOnRefresh: true,
        },
      });

      tl.to(container, {
        x: -scrollDistance,
        ease: "none",
      });

      return () => {
        tl.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative bg-black w-full min-h-screen lg:h-screen flex flex-col justify-center overflow-hidden border-t border-white/5"
    >
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:4rem_4rem] pointer-events-none" />

      {/* Title (Stays pinned above scrolling track) */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-6 md:px-12 pt-16 lg:pt-0 lg:absolute lg:top-16 lg:left-1/2 lg:-translate-x-1/2">
        <span className="text-xs font-semibold tracking-widest text-accent uppercase mb-2 block">
          METHODOLOGY
        </span>
        <h2 className="font-display font-black text-3xl md:text-5xl lg:text-6xl tracking-tighter text-[#F8F9FA] leading-tight">
          THE PROCESS
        </h2>
      </div>

      {/* Scrolling Panels Container */}
      <div className="relative w-full flex-grow flex items-center mt-12 lg:mt-0">
        <div
          ref={containerRef}
          className="flex flex-col lg:flex-row gap-8 lg:gap-16 px-6 md:px-12 lg:px-24 w-full lg:w-fit py-12 lg:py-0 overflow-y-auto lg:overflow-y-hidden scrollbar-none transform-gpu"
        >
          {steps.map((step) => (
            <div
              key={step.num}
              className="scroll-panel relative w-full lg:w-[480px] xl:w-[540px] flex-shrink-0 bg-bg-dark border border-white/5 hover:border-accent/40 rounded-2xl p-8 md:p-12 flex flex-col justify-between aspect-[16/11] lg:aspect-[16/12] transition-colors duration-500 shadow-2xl"
            >
              {/* Huge Background Number */}
              <div className="absolute top-2 right-6 font-display font-black text-[120px] md:text-[160px] leading-none text-stroke opacity-15 pointer-events-none select-none">
                {step.num}
              </div>

              {/* Tagline */}
              <div className="flex flex-col items-start gap-1">
                <span className="text-xs font-sans font-bold text-accent tracking-widest uppercase">
                  PHASE {step.num}
                </span>
                <h3 className="font-display font-black text-xl md:text-2xl lg:text-3xl text-[#F8F9FA] tracking-tight mt-4">
                  {step.title}
                </h3>
              </div>

              {/* Description copy */}
              <div className="mt-8 md:mt-12 flex flex-col items-start gap-3 z-10">
                <span className="font-sans text-xs md:text-sm font-semibold text-[#F8F9FA]/80 tracking-wide">
                  {step.tagline}
                </span>
                <p className="font-sans text-sm md:text-base text-[#8E9AA8] leading-relaxed text-left">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
