"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TimelineItem {
  year: string;
  title: string;
  desc: string;
  image: string;
  isLogo?: boolean;
}

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const progressLineVRef = useRef<HTMLDivElement>(null);

  const milestones: TimelineItem[] = [
    {
      year: "2008",
      title: "Foundation",
      desc: "Ritz Media World launched with a mission to reimagine brand communication for India's growth markets.",
      image: "",
      isLogo: true,
    },
    {
      year: "2012",
      title: "Innovation Leadership",
      desc: "Pioneered centre-spread storytelling in Hindustan Times, setting new creative benchmarks for print.",
      image: "/images/news_clipping.png",
    },
    {
      year: "2016",
      title: "Digital Expansion",
      desc: "Scaled into 360° digital marketing, unifying performance, content, and automation for premium brands.",
      image: "/images/digital_globe.png",
    },
  ];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const columns = el.querySelectorAll(".timeline-col");
    const progressLine = progressLineRef.current;
    const progressLineV = progressLineVRef.current;

    // Animate columns fade & reveal
    gsap.fromTo(
      columns,
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      }
    );

    // GSAP MatchMedia for responsive progress line scroll scrub
    const mm = gsap.matchMedia();

    // Desktop: Horizontal progress bar scaleX scrub
    mm.add("(min-width: 768px)", () => {
      if (!progressLine) return;
      
      const tl = gsap.to(progressLine, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 60%",
          end: "bottom 80%",
          scrub: true,
        },
      });

      return () => tl.scrollTrigger?.kill();
    });

    // Mobile: Vertical progress bar scaleY scrub
    mm.add("(max-width: 767px)", () => {
      if (!progressLineV) return;

      const tl = gsap.to(progressLineV, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 60%",
          end: "bottom 70%",
          scrub: true,
        },
      });

      return () => tl.scrollTrigger?.kill();
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger && (trigger.trigger as HTMLElement).classList.contains("timeline-col")) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#F9F9FB] py-24 md:py-32 px-6 md:px-12 border-b border-black/5"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Title & Description Header */}
        <div className="text-center mb-16 md:mb-24 max-w-2xl">
          <span className="text-xs font-sans font-bold tracking-widest text-[#E2B659] uppercase mb-4 block">
            OUR TIMELINE
          </span>
          <h2 className="font-display font-black text-3xl md:text-5xl lg:text-6xl text-[#0E1125] tracking-tighter leading-none mb-6">
            17 YEARS OF BRAND EXCELLENCE
          </h2>
          <p className="font-sans text-sm md:text-base text-[#8E9AA8] leading-relaxed">
            From pioneering print innovations to 360° Digital Marketing, our journey reflects our commitment to excellence.
          </p>
        </div>

        {/* 3-Column Timeline Layout */}
        <div className="relative w-full max-w-5xl">
          {/* Desktop Horizontal Line */}
          <div className="absolute top-[125px] left-[16%] right-[16%] h-[2px] bg-black/5 hidden md:block z-0">
            <div
              ref={progressLineRef}
              className="w-full h-full bg-[#E2B659] origin-left transform scale-x-0"
            />
          </div>

          {/* Mobile Vertical Line */}
          <div className="absolute left-[36px] top-[40px] bottom-[40px] w-[2px] bg-black/5 block md:hidden z-0">
            <div
              ref={progressLineVRef}
              className="w-full h-full bg-[#E2B659] origin-top transform scale-y-0"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 w-full items-start relative z-10">
            {milestones.map((item, idx) => (
              <div
                key={item.year}
                className="timeline-col flex flex-row md:flex-col items-center md:items-center text-left md:text-center group transform-gpu gap-6 md:gap-0"
              >
                {/* Milestone graphic (Desktop & Mobile aligned) */}
                <div className="flex flex-col items-center md:mb-6">
                  {/* Year Label */}
                  <span className="font-display font-black text-2xl md:text-5xl text-[#0E1125] mb-2 md:mb-6 tracking-tight block">
                    {item.year}
                  </span>

                  {/* Circular Graphic Icon */}
                  <div className="relative w-16 h-16 md:w-28 md:h-28 rounded-full border-2 border-[#E2B659] bg-[#0E1125] flex items-center justify-center overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-300">
                    {item.isLogo ? (
                      <svg
                        viewBox="0 0 100 100"
                        className="w-8 h-8 md:w-12 md:h-12 fill-[#E2B659] animate-[spin_25s_linear_infinite]"
                      >
                        <path d="M50 0 L65 35 L35 35 Z" />
                        <path d="M100 50 L65 65 L65 35 Z" />
                        <path d="M50 100 L35 65 L65 65 Z" />
                        <path d="M0 50 L35 35 L35 65 Z" />
                      </svg>
                    ) : (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-w-768px) 64px, 112px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                </div>

                {/* Text Block */}
                <div className="flex flex-col items-start md:items-center">
                  <h3 className="font-display font-black text-lg md:text-xl text-[#0E1125] tracking-tight mb-2 md:mb-3">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-[#8E9AA8] leading-relaxed max-w-xs">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
