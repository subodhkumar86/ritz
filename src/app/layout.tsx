import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ritz Media World | 360-degree Digital Marketing & Creative Brand Agency",
  description:
    "Ritz Media World is a premium independent creative brand and digital marketing agency. We build impossible-to-ignore brands through metrics-driven strategy and media expansion.",
  keywords:
    "Ritz Media World, brand agency, digital marketing, Noida, performance marketing, creative agency, brand strategy, media strategy, visual identity",
  openGraph: {
    title: "Ritz Media World | 360-degree Digital Marketing & Creative Brand Agency",
    description:
      "Ritz Media World is a premium independent creative brand and digital marketing agency. We build impossible-to-ignore brands.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className="dark scroll-smooth">
      <body className="overflow-x-hidden bg-black font-sans text-[#F8F9FA] antialiased">
        {children}
      </body>
    </html>
  );
}
