import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import CaseStudies from "@/components/CaseStudies";
import Gallery from "@/components/Gallery";
import Timeline from "@/components/Timeline";
import Recognition from "@/components/Recognition";
import Culture from "@/components/Culture";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />

      <div className="relative z-10 w-full min-h-screen">
        <Hero />
        <About />
        <CaseStudies />
        <Gallery />
        <Timeline />
        <Recognition />
        <Culture />
      </div>

      <Footer />
    </SmoothScroll>
  );
}

