"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Only initialize custom cursor on desktop devices (non-touch)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);
    document.documentElement.classList.add("custom-cursor-active");

    const cursorDot = cursorDotRef.current;
    const cursorRing = cursorRingRef.current;

    if (!cursorDot || !cursorRing) return;

    // Set initial positions
    gsap.set(cursorDot, { xPercent: -50, yPercent: -50 });
    gsap.set(cursorRing, { xPercent: -50, yPercent: -50 });

    // GSAP quickTo for ultra-smooth lag-behind physical motion
    const xToDot = gsap.quickTo(cursorDot, "x", { duration: 0.1, ease: "power3.out" });
    const yToDot = gsap.quickTo(cursorDot, "y", { duration: 0.1, ease: "power3.out" });
    const xToRing = gsap.quickTo(cursorRing, "x", { duration: 0.4, ease: "power3.out" });
    const yToRing = gsap.quickTo(cursorRing, "y", { duration: 0.4, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      xToDot(e.clientX);
      yToDot(e.clientY);
      xToRing(e.clientX);
      yToRing(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if target or parent has custom cursor attributes
      const interactiveEl = target.closest("a, button, [role='button'], [data-cursor]");
      
      if (interactiveEl) {
        setIsHovered(true);
        const cursorType = interactiveEl.getAttribute("data-cursor");
        
        if (cursorType === "view") {
          setCursorText("VIEW");
          gsap.to(cursorRing, {
            width: 80,
            height: 80,
            backgroundColor: "rgba(226, 182, 89, 0.9)",
            borderColor: "rgba(226, 182, 89, 1)",
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(cursorDot, { scale: 0, duration: 0.2 });
        } else {
          // Standard hover on links/buttons
          gsap.to(cursorRing, {
            width: 50,
            height: 50,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderColor: "rgba(255, 255, 255, 0.8)",
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(cursorDot, {
            scale: 1.5,
            backgroundColor: "#E2B659",
            duration: 0.2,
          });
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest("a, button, [role='button'], [data-cursor]");
      
      if (interactiveEl) {
        const nextTarget = e.relatedTarget as HTMLElement;
        if (!nextTarget || !nextTarget.closest("a, button, [role='button'], [data-cursor]")) {
          setIsHovered(false);
          setCursorText("");
          gsap.to(cursorRing, {
            width: 32,
            height: 32,
            backgroundColor: "transparent",
            borderColor: "rgba(248, 249, 250, 0.5)",
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(cursorDot, {
            scale: 1,
            backgroundColor: "#E2B659",
            duration: 0.2,
          });
        }
      }
    };

    const handleMouseDown = () => {
      gsap.to(cursorRing, { scale: 0.8, duration: 0.1 });
    };

    const handleMouseUp = () => {
      gsap.to(cursorRing, { scale: 1.0, duration: 0.15 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[9999]"
      />
      {/* Outer Ring */}
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 w-8 h-8 border border-white/50 rounded-full pointer-events-none z-[9998] flex items-center justify-center transition-colors duration-200"
      >
        {cursorText && (
          <span className="text-[10px] font-display font-bold tracking-widest text-black select-none">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
}
