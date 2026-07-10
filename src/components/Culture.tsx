"use client";

import Image from "next/image";

export default function Culture() {
  return (
    <>
      <section className="bg-[#f6f6f1] px-6 py-20 md:px-10">
        <div className="mx-auto max-w-[1120px]">
          <h2 className="overflow-hidden text-[clamp(3.4rem,10vw,7rem)] font-semibold uppercase leading-none tracking-[0.02em] text-[#343434]">
            HUSTLE <span className="text-[#b8b8b8]">&amp; HEART</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[560px] text-center text-xl leading-snug text-[#303030] md:text-[1.05rem]">
            Lorem ipsum dolor sit amet,
            <br />
            consectetur adipiscing elit, sed do ei...
          </p>

          <div className="mt-14 grid gap-4 md:grid-cols-[1.1fr_0.9fr_1fr_0.9fr]">
            <div className="relative aspect-[0.8] overflow-hidden bg-[#ddd]">
              <Image src="/images/growth.png" alt="Campaign poster" fill className="object-cover" />
            </div>
            <div className="flex aspect-[0.82] flex-col justify-between rounded-[18px] bg-[#121742] p-6 text-white">
              <div className="text-[2.1rem] font-medium uppercase leading-[0.95] md:text-[2.5rem]">
                News &amp;
                <br />
                Views
              </div>
              <div className="inline-flex w-fit items-center gap-2 border border-white/30 px-3 py-1.5 text-sm text-white/90">
                LinkedIn
                <span className="text-base">-&gt;</span>
              </div>
            </div>
            <div className="relative aspect-[0.8] overflow-hidden bg-[#ddd]">
              <Image src="/images/gallery_stage.png" alt="Audience event" fill className="object-cover" />
            </div>
            <div className="relative aspect-[0.8] overflow-hidden bg-[#ddd] grayscale">
              <Image src="/images/growth.png" alt="Poster monochrome" fill className="object-cover" />
            </div>
          </div>

          <div className="mt-7 flex justify-end pr-8">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#d0d0d0]" />
              <span className="h-2 w-8 rounded-full bg-[#8d8d8d]" />
              <span className="h-2 w-2 rounded-full bg-[#d0d0d0]" />
              <span className="h-2 w-2 rounded-full bg-[#d0d0d0]" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#8d3212]">
        <div className="mx-auto max-w-[1440px]">
          <Image
            src="/images/figma-services.png"
            alt="Services wall"
            width={1440}
            height={810}
            className="h-auto w-full"
          />
        </div>
      </section>
    </>
  );
}
