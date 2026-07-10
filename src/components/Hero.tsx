"use client";

export default function Hero() {
  return (
    <section className="bg-[#11163f] px-6 pb-20 pt-28 text-white md:px-10 md:pb-24 md:pt-32">
      <div className="relative mx-auto max-w-[1120px] overflow-hidden">
        <div className="relative min-h-[560px] px-8 py-10 md:px-14 md:py-14">
          <div className="grid grid-cols-1 gap-y-2 text-center font-display text-[clamp(3.6rem,8vw,6.3rem)] font-medium uppercase leading-[0.96] tracking-[0.02em] md:grid-cols-3">
            <span>17</span>
            <span>Years</span>
            <span className="text-[#dba845]">Of</span>
            <span>Making</span>
            <span>Brands</span>
            <span />
            <span>
              <span className="text-[#dba845]">Im</span>possible
            </span>
            <span>To</span>
            <span>Ignore</span>
          </div>

          <p className="mx-auto mt-7 max-w-[720px] text-center text-xl italic leading-snug text-white/92 md:text-[1.1rem]">
            Fuelled by a magnetic culture of hustle and heart,
            <br className="hidden md:block" />
            backed by the belief that great ideas change the world
          </p>

          <div className="pointer-events-none absolute bottom-[-6%] left-1/2 h-[280px] w-[280px] -translate-x-1/2 opacity-[0.18] md:h-[340px] md:w-[340px]">
            <div className="shutter-mark absolute inset-0" />
          </div>
        </div>
      </div>
    </section>
  );
}
