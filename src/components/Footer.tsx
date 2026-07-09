"use client";

import Magnetic from "./Magnetic";

export default function Footer() {
  const socialLinks = [
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Vimeo", href: "#" },
    { label: "Facebook", href: "#" },
  ];

  const quickLinks = [
    { label: "Select Work", href: "#work" },
    { label: "About Agency", href: "#about" },
    { label: "Our Journey", href: "#process" },
    { label: "Milestones", href: "#timeline" },
  ];

  const awards = [
    { title: "Best Integrated Marketing Agency", year: "2024", body: "RRM Awards" },
    { title: "Outstanding Print Creative Launch", year: "2022", body: "HT Media Awards" },
    { title: "Digital Campaign Innovation Gold", year: "2023", body: "India Growth Markets" },
  ];

  return (
    <footer
      id="contact"
      className="relative lg:sticky lg:bottom-0 lg:left-0 w-full bg-[#0E1125] text-[#F8F9FA] z-0 overflow-hidden border-t border-white/5"
    >
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(226,182,89,0.015)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 md:pt-32 pb-12 flex flex-col justify-between min-h-[500px] md:min-h-[600px]">
        {/* Main call to Action */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-start select-none">
            <span className="text-xs font-semibold tracking-widest text-accent uppercase mb-3 block">
              AWARDS & COMPANY RECOGNITION
            </span>
            <h2 className="font-display font-black text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter text-[#F8F9FA]">
              LET'S TALK<br />
              <span className="text-stroke hover:text-accent transition-colors duration-300">BRANDS.</span>
            </h2>
          </div>

          <div className="flex justify-start lg:justify-end items-center">
            {/* Magnetic Giant Circle CTA Button */}
            <Magnetic strength={0.4}>
              <button
                className="w-36 h-36 md:w-48 md:h-48 rounded-full bg-accent border border-accent hover:bg-transparent hover:text-accent text-[#0E1125] flex items-center justify-center font-display font-bold text-sm md:text-base tracking-widest uppercase transition-all duration-500 shadow-lg cursor-pointer transform-gpu"
                data-cursor="click"
              >
                GET IN<br />TOUCH
              </button>
            </Magnetic>
          </div>
        </div>

        {/* Footer Awards & Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mt-16 md:mt-24 pt-12 border-t border-white/5">
          {/* Awards Column */}
          <div className="flex flex-col items-start gap-4">
            <span className="text-xs font-bold text-accent tracking-widest uppercase">
              RECOGNITIONS
            </span>
            <div className="flex flex-col gap-3">
              {awards.map((award, i) => (
                <div key={i} className="text-left">
                  <span className="text-[10px] font-sans font-bold text-[#8E9AA8] tracking-widest block uppercase">
                    {award.year} — {award.body}
                  </span>
                  <span className="text-sm font-semibold text-white/95 mt-1 block leading-tight">
                    {award.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col items-start gap-4">
            <span className="text-xs font-bold text-accent tracking-widest uppercase">
              EXPLORE
            </span>
            <div className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-[#8E9AA8] hover:text-[#F8F9FA] transition-colors duration-300 font-medium"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Socials Column */}
          <div className="flex flex-col items-start gap-4">
            <span className="text-xs font-bold text-accent tracking-widest uppercase">
              CONNECT
            </span>
            <div className="flex flex-col gap-2.5">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-[#8E9AA8] hover:text-[#F8F9FA] transition-colors duration-300 font-medium"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Noida Coordinates */}
          <div className="flex flex-col items-start gap-4">
            <span className="text-xs font-bold text-accent tracking-widest uppercase">
              ADDRESS
            </span>
            <p className="text-sm text-[#8E9AA8] leading-relaxed text-left">
              Ritz Media World, Sector 62
              <br />
              Noida, Uttar Pradesh 201301, India
              <br />
              +91 999 999 9999
            </p>
            <a
              href="mailto:hello@ritzmediaworld.com"
              className="text-sm font-semibold text-[#F8F9FA] hover:text-accent transition-colors mt-2"
            >
              hello@ritzmediaworld.com
            </a>
          </div>
        </div>

        {/* Legal Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-16 pt-8 border-t border-white/5 text-[10px] text-[#F8F9FA]/40 font-semibold tracking-widest">
          <span>© 2026 RITZ MEDIA WORLD. ALL RIGHTS RESERVED.</span>
          <span className="hidden sm:inline">MAKING BRANDS IMPOSSIBLE TO IGNORE</span>
        </div>
      </div>
    </footer>
  );
}
