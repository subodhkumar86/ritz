import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BULLETPROOF. | Global Brand Design & Creative Agency",
  description: "We are Bulletproof. An independent global brand creative agency. We build future-proof brands that make an impact, combining high-end strategy with premium visual identity.",
  keywords: "brand agency, creative design, design agency, brand strategy, visual identity, premium web design, product design",
  openGraph: {
    title: "BULLETPROOF. | Global Brand Design & Creative Agency",
    description: "We are Bulletproof. An independent global brand creative agency. We build future-proof brands that make an impact.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${plusJakartaSans.variable} dark scroll-smooth`}
    >
      <body className="bg-black text-[#F8F9FA] font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

