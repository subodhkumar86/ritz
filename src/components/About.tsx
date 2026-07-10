"use client";

import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className="bg-[#f6f6f1] px-6 py-14 text-[#353535] md:px-10 md:py-16"
    >
      <div className="mx-auto max-w-[1120px]">
        <div className="flex flex-col items-center gap-12 md:flex-row md:items-start md:gap-20">
          <div className="flex shrink-0 justify-center md:w-[165px]">
            <Image
              src="/images/logo.png"
              alt="Ritz Media World"
              width={120}
              height={150}
              className="h-auto w-[110px] md:w-[120px]"
            />
          </div>

          <div className="flex-1 text-center">
            <p className="mx-auto max-w-[600px] text-[clamp(1.8rem,3vw,3rem)] leading-[1.08]">
              The world&apos;s largest independent brand agency, 17 years in the making.
            </p>

            <h2 className="mt-6 text-[clamp(2rem,2.9vw,3.25rem)] font-semibold uppercase leading-none tracking-[0.01em]">
              We Create Desire Through
            </h2>

            <div className="mt-4 font-display text-[clamp(4.6rem,11vw,8.4rem)] font-semibold uppercase leading-[0.88] tracking-[0.05em] text-[#3a3a3e]">
              <div className="flex items-center justify-center gap-2 md:gap-4">
                <span>Dis</span>
                <span className="inline-block h-[92px] w-[172px] rounded-[12px] bg-black md:h-[104px] md:w-[182px]" />
                <span>Rup</span>
              </div>
              <div>Tion</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
