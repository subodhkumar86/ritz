"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    document.documentElement.classList.add("custom-cursor-active");

    const cursorDot = cursorDotRef.current;
    const cursorRing = cursorRingRef.current;

    if (!cursorDot || !cursorRing) return;

    gsap.set(cursorDot, { xPercent: -50, yPercent: -50 });
    gsap.set(cursorRing, { xPercent: -50, yPercent: -50 });

    const xToDot = gsap.quickTo(cursorDot, "x", { duration: 0.1, ease: "power3.out" });
    const yToDot = gsap.quickTo(cursorDot, "y", { duration: 0.1, ease: "power3.out" });
    const xToRing = gsap.quickTo(cursorRing, "x", { duration: 0.4, ease: "power3.out" });
    const yToRing = gsap.quickTo(cursorRing, "y", { duration: 0.4, ease: "power3.out" });

    const resetCursor = () => {
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
    };

    const handleMouseMove = (e: MouseEvent) => {
      xToDot(e.clientX);
      yToDot(e.clientY);
      xToRing(e.clientX);
      yToRing(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest("a, button, [role='button'], [data-cursor]");

      if (!interactiveEl) return;

      const cursorType = interactiveEl.getAttribute("data-cursor");

      if (cursorType === "view") {
        gsap.to(cursorRing, {
          width: 80,
          height: 80,
          backgroundColor: "rgba(226, 182, 89, 0.9)",
          borderColor: "rgba(226, 182, 89, 1)",
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(cursorDot, { scale: 0, duration: 0.2 });
        return;
      }

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
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest("a, button, [role='button'], [data-cursor]");

      if (!interactiveEl) return;

      const nextTarget = e.relatedTarget as HTMLElement | null;
      if (!nextTarget || !nextTarget.closest("a, button, [role='button'], [data-cursor]")) {
        resetCursor();
      }
    };

    const handleMouseDown = () => {
      gsap.to(cursorRing, { scale: 0.8, duration: 0.1 });
    };

    const handleMouseUp = () => {
      gsap.to(cursorRing, { scale: 1, duration: 0.15 });
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
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-accent"
      />
      <div
        ref={cursorRingRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] flex h-8 w-8 items-center justify-center rounded-full border border-white/50 transition-colors duration-200"
      />
    </>
  );
}
