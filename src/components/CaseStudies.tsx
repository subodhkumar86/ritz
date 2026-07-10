"use client";

import Image from "next/image";

export default function CaseStudies() {
  return (
    <section id="work" className="bg-[#f6f6f1] px-6 py-14 md:px-10 md:py-18">
      <div className="mx-auto max-w-[1340px]">
        <div className="overflow-hidden rounded-[28px]">
          <Image
            src="/images/figma-case-studies.png"
            alt="Featured case studies"
            width={1434}
            height={642}
            className="h-auto w-full"
            priority
          />
        </div>
      </div>
    </section>
  );
}
