"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#12173d]">
      <div className="mx-auto max-w-[1440px]">
        <Image
          src="/images/figma-footer.png"
          alt="Ritz Media World footer"
          width={1440}
          height={649}
          className="h-auto w-full"
        />
      </div>
    </footer>
  );
}
