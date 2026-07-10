"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function Gallery() {
  return (
    <section className="bg-[#f2f2ed] px-6 py-18 text-[#353535] md:px-10 md:py-20">
      <div className="mx-auto max-w-[1120px]">
        <h2 className="text-center text-[clamp(3rem,6vw,5.5rem)] font-semibold uppercase leading-none tracking-[0.02em]">
          Think, Create, Celebrate
        </h2>

        <div className="mt-12 grid gap-3 md:grid-cols-[1.08fr_0.74fr_0.74fr] md:grid-rows-[204px_264px]">
          <div className="relative overflow-hidden rounded-[14px] md:row-span-2">
            <div className="relative aspect-[0.78] h-full">
              <Image src="/images/gallery_team_exact.png" alt="Team" fill className="object-cover" />
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[14px] md:col-span-2">
            <div className="relative aspect-[2.02] h-full">
              <Image src="/images/gallery_top_exact.png" alt="Awards collage" fill className="object-cover" />
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[14px] md:col-span-2">
            <div className="relative aspect-[1.7] h-full">
              <Image src="/images/gallery_group_exact.png" alt="Group celebration" fill className="object-cover" />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            type="button"
            className="inline-flex items-center gap-3 border border-[#747b93] px-8 py-3 text-[13px] uppercase tracking-[0.08em] text-[#303030]"
          >
            Load More Images
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
