"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface MagneticProps {
  children: React.ReactElement;
  strength?: number;
}

export default function Magnetic({ children, strength = 0.35 }: MagneticProps) {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();
      // Calculate relative position to the center of the element
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      // Pull element towards cursor scaled by strength
      xTo(x * strength);
      yTo(y * strength);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return React.cloneElement(children as any, {
    ref: (node: HTMLElement | null) => {
      containerRef.current = node;
      // Also invoke the original ref if it exists
      const { ref: originalRef } = children as any;
      if (typeof originalRef === "function") {
        originalRef(node);
      } else if (originalRef) {
        originalRef.current = node;
      }
    },
  });
}
