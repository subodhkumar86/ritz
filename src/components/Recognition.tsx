"use client";

import Image from "next/image";

export default function Recognition() {
  return (
    <section className="bg-[#141a46] px-6 py-14 md:px-10 md:py-18">
      <div className="mx-auto max-w-[1440px]">
        <Image
          src="/images/figma-awards.png"
          alt="Awards and company recognition"
          width={1440}
          height={1024}
          className="h-auto w-full"
        />
      </div>
    </section>
  );
}
