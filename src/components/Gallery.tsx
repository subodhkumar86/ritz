"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "./Magnetic";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const items = el.querySelectorAll(".gallery-item");

    gsap.fromTo(
      items,
      {
        opacity: 0,
        scale: 0.95,
        y: 40,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger && (trigger.trigger as HTMLElement).classList.contains("gallery-item")) {
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
        {/* Title */}
        <div className="text-center mb-16 md:mb-24">
          <span className="text-xs font-sans font-bold tracking-widest text-[#E2B659] uppercase mb-4 block">
            GALLERY
          </span>
          <h2 className="font-display font-black text-3xl md:text-5xl lg:text-6xl text-[#0E1125] tracking-tighter leading-none">
            THINK, CREATE, CELEBRATE
          </h2>
        </div>

        {/* Staggered Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full max-w-6xl items-start">
          {/* Left Column (Large Vertical Team Award Photo) - spans 5 cols */}
          <div className="lg:col-span-5 gallery-item w-full">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-black/5 bg-[#F5F5F7] shadow-sm group cursor-pointer transform-gpu">
              <Image
                src="/images/gallery_team.png"
                alt="Ritz Media Team Award"
                fill
                sizes="(max-w-1024px) 100vw, 40vw"
                className="object-cover transform scale-100 group-hover:scale-103 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
            </div>
          </div>

          {/* Right Column (Split cards) - spans 7 cols */}
          <div className="lg:col-span-7 flex flex-col gap-6 w-full">
            {/* Top split row */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
              {/* Gold award plaque (square-ish) - spans 5/12 of right cols */}
              <div className="sm:col-span-5 gallery-item w-full">
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-black/5 bg-[#F5F5F7] shadow-sm group cursor-pointer transform-gpu">
                  <Image
                    src="/images/gallery_trophy.png"
                    alt="Gold Plaque Trophy"
                    fill
                    sizes="(max-w-1024px) 100vw, 20vw"
                    className="object-cover transform scale-100 group-hover:scale-103 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
                </div>
              </div>

              {/* Stage presentation (vertical-ish) - spans 7/12 of right cols */}
              <div className="sm:col-span-7 gallery-item w-full">
                <div className="relative aspect-[4/5] sm:aspect-square md:aspect-[4/5] w-full overflow-hidden rounded-2xl border border-black/5 bg-[#F5F5F7] shadow-sm group cursor-pointer transform-gpu">
                  <Image
                    src="/images/gallery_stage.png"
                    alt="Award Presentation Stage"
                    fill
                    sizes="(max-w-1024px) 100vw, 30vw"
                    className="object-cover transform scale-100 group-hover:scale-103 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
                </div>
              </div>
            </div>

            {/* Bottom wide row (Group photo on stage) */}
            <div className="gallery-item w-full">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-black/5 bg-[#F5F5F7] shadow-sm group cursor-pointer transform-gpu">
                <Image
                  src="/images/gallery_group.png"
                  alt="Team Celebration on Stage"
                  fill
                  sizes="(max-w-1024px) 100vw, 60vw"
                  className="object-cover transform scale-100 group-hover:scale-103 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Load More Button */}
        <div className="mt-16 md:mt-24">
          <Magnetic strength={0.25}>
            <button
              className="flex items-center gap-2 px-8 py-4 border-2 border-[#0E1125]/15 hover:border-[#E2B659] hover:bg-[#0E1125] hover:text-[#F8F9FA] rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer text-[#0E1125]"
              data-cursor="click"
            >
              LOAD MORE IMAGES
              <span className="font-display font-medium leading-none text-sm">↗</span>
            </button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
