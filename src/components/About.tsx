"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLDivElement>(null);
  const title2Ref = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const miniCanvasRef = useRef<HTMLCanvasElement>(null);

  // Entrance reveals
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const logo = logoRef.current;
    const title1 = title1Ref.current;
    const title2 = title2Ref.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      logo,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )
      .fromTo(
        title1,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      )
      .fromTo(
        title2,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" },
        "-=0.4"
      );

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  // Interactive Mini-Canvas constellation particles inside the 'DISRUP' text mask
  useEffect(() => {
    const canvas = miniCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
      });
    }

    const mouse = { x: -1000, y: -1000, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.active = false;
    };

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    let frameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Render lines connecting close particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        
        // Physics update
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Boundaries check
        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Mouse repelling physics
        if (mouse.active) {
          const dx = p1.x - mouse.x;
          const dy = p1.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 40) {
            const force = (40 - dist) / 40;
            p1.x += (dx / dist) * force * 3;
            p1.y += (dy / dist) * force * 3;
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#E2B659";
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 35) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(226, 182, 89, ${0.4 - dist / 35})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full bg-[#F9F9FB] py-24 md:py-36 px-6 md:px-12 overflow-hidden flex flex-col items-center justify-center border-b border-black/5"
    >
      <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.015)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto flex flex-col items-center text-center">
        {/* Ritz Logo Header */}
        <div ref={logoRef} className="flex flex-col items-center gap-4 mb-12">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-[#E2B659] bg-[#0E1125]">
              <svg
                viewBox="0 0 100 100"
                className="w-7 h-7 fill-[#E2B659] animate-[spin_30s_linear_infinite]"
              >
                <path d="M50 0 L65 35 L35 35 Z" />
                <path d="M100 50 L65 65 L65 35 Z" />
                <path d="M50 100 L35 65 L65 65 Z" />
                <path d="M0 50 L35 35 L35 65 Z" />
              </svg>
            </div>
            <div className="flex flex-col items-start font-display text-lg font-black tracking-widest leading-none">
              <span className="text-[#D4AF37]">RITZ MEDIA</span>
              <span className="text-[#0E1125]">WORLD</span>
            </div>
          </div>
          <p
            ref={title1Ref}
            className="font-sans text-xs md:text-sm font-bold text-[#8E9AA8] tracking-widest uppercase mt-2 max-w-lg leading-relaxed"
          >
            The world's largest independent brand agency, 17 years in the making.
          </p>
        </div>

        {/* Mission Statement Split-Text */}
        <div
          ref={title2Ref}
          className="w-full flex flex-col items-center select-none text-[#0E1125]"
        >
          <span className="font-sans text-xs md:text-sm font-bold tracking-widest text-[#E2B659] uppercase mb-4">
            OUR MISSION
          </span>
          <h2 className="font-display font-black text-[5vw] sm:text-[4vw] lg:text-[3.5vw] leading-[1.1] tracking-tighter max-w-4xl flex flex-col items-center">
            <span>WE CREATE DESIRE THROUGH</span>
            <span className="flex items-center justify-center flex-wrap gap-2 sm:gap-4 mt-2">
              <span>DIS</span>
              {/* Dynamic Animated Mask Block with Canvas */}
              <span className="relative inline-block w-24 h-12 sm:w-36 sm:h-16 bg-[#0E1125] rounded-xl overflow-hidden shadow-md group transform hover:scale-105 transition-transform duration-300">
                <canvas
                  ref={miniCanvasRef}
                  className="absolute inset-0 w-full h-full cursor-crosshair opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#E2B659] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </span>
              <span>RUP</span>
            </span>
            <span className="mt-2 block">TION</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
