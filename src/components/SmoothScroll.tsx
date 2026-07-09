"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger client-side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth exponential out easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Connect Lenis scroll events to GSAP ScrollTrigger updates
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // Tick function to update Lenis on every animation frame
    let rafId: number;
    const update = (time: number) => {
      lenis.raf(time * 1000); // lenis raf expects milliseconds
      rafId = requestAnimationFrame(update);
    };
    rafId = requestAnimationFrame(update);

    // Global scroll lock utilities for custom fullscreen navigation overlay
    const handleLockScroll = () => {
      lenis.stop();
    };
    const handleUnlockScroll = () => {
      lenis.start();
    };

    window.addEventListener("lock-scroll", handleLockScroll);
    window.addEventListener("unlock-scroll", handleUnlockScroll);

    return () => {
      window.removeEventListener("lock-scroll", handleLockScroll);
      window.removeEventListener("unlock-scroll", handleUnlockScroll);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

