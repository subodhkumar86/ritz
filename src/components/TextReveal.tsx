"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface TextRevealProps {
  text: string;
  className?: string;
}

export default function TextReveal({ text, className = "" }: TextRevealProps) {
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = paragraphRef.current;
    if (!el) return;

    const words = el.querySelectorAll(".word-span");

    // Fade each word in from dim to bright as it scrolls through the viewport
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        end: "bottom 55%",
        scrub: true,
      },
    });

    tl.fromTo(
      words,
      {
        opacity: 0.15,
        color: "rgba(248, 249, 250, 0.15)",
        y: 2,
      },
      {
        opacity: 1,
        color: "rgba(248, 249, 250, 1)",
        y: 0,
        stagger: 0.05,
        ease: "power1.out",
      }
    );

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <p
      ref={paragraphRef}
      className={`flex flex-wrap font-sans text-xl md:text-3xl lg:text-4xl font-normal leading-[1.4] text-[#F8F9FA]/80 ${className}`}
    >
      {text.split(" ").map((word, index) => (
        <span
          key={index}
          className="word-span mr-[0.28em] mb-[0.1em] inline-block origin-bottom transform-gpu"
        >
          {word}
        </span>
      ))}
    </p>
  );
}
