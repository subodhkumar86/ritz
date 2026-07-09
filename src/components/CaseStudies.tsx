"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceCard {
  id: string;
  title: string;
  image: string;
  desc: string;
}

export default function CaseStudies() {
  const containerRef = useRef<HTMLDivElement>(null);

  const services: ServiceCard[] = [
    {
      id: "growth",
      title: "GROWTH",
      image: "/images/growth.png",
      desc: "Aggressive business scaling through metrics-driven 360° digital marketing, automation, and high-impact media placement.",
    },
    {
      id: "standout",
      title: "STAND OUT",
      image: "/images/standout.png",
      desc: "Bespoke packaging, premium typography, and strategic visual identities that make brands impossible to ignore.",
    },
    {
      id: "fandom",
      title: "FANDOM",
      image: "/images/fandom.png",
      desc: "Cultivating deep customer loyalty and emotional brand connections by unifying design, digital platforms, and community storytelling.",
    },
  ];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const cards = el.querySelectorAll(".service-card");

    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 60,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
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
        if (trigger.trigger && (trigger.trigger as HTMLElement).classList.contains("service-card")) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative w-full bg-[#F9F9FB] py-24 md:py-32 px-6 md:px-12 border-b border-black/5"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Centered Heading */}
        <div className="text-center mb-16 md:mb-24">
          <span className="text-xs font-sans font-bold tracking-widest text-[#E2B659] uppercase mb-4 block">
            OUR CAPABILITIES
          </span>
          <h2 className="font-display font-black text-3xl md:text-5xl lg:text-6xl text-[#0E1125] tracking-tighter leading-none">
            WHAT WE DELIVER
          </h2>
        </div>

        {/* 3-Column Service Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {services.map((service) => (
            <div
              key={service.id}
              className="service-card group flex flex-col items-start cursor-pointer rounded-2xl bg-white border border-black/5 overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] transform-gpu"
              data-cursor="view"
            >
              {/* Image Frame */}
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#F5F5F7]">
                {/* Dark sweep gradient overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors duration-500 z-10" />

                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-w-768px) 100vw, 33vw"
                  className="object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Bottom Overlay Info Container */}
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 z-20 flex flex-col justify-end transform translate-y-12 group-hover:translate-y-0 transition-transform duration-500 ease-out select-none">
                  {/* Title */}
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-[#F8F9FA] tracking-widest uppercase mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                    {service.title}
                  </h3>
                  
                  {/* Slide-up Description Description */}
                  <p className="font-sans text-xs sm:text-sm text-[#8E9AA8] opacity-0 group-hover:opacity-100 group-hover:text-white/90 transition-all duration-500 delay-75 leading-relaxed text-left">
                    {service.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
