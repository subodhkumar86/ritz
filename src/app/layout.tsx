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
  title: "Ritz Media World | 360° Digital Marketing & Creative Brand Agency",
  description: "Ritz Media World is a premium independent creative brand and digital marketing agency. We build impossible-to-ignore brands through metrics-driven strategy and media expansion.",
  keywords: "Ritz Media World, brand agency, digital marketing, Noida, performance marketing, creative agency, brand strategy, media strategy, visual identity",
  openGraph: {
    title: "Ritz Media World | 360° Digital Marketing & Creative Brand Agency",
    description: "Ritz Media World is a premium independent creative brand and digital marketing agency. We build impossible-to-ignore brands.",
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

