import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import CaseStudies from "@/components/CaseStudies";
import Gallery from "@/components/Gallery";
import Timeline from "@/components/Timeline";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      
      {/* Main scrolling section container with light & dark layers */}
      <div className="relative z-10 w-full min-h-screen shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
        <Hero />
        <About />
        <CaseStudies />
        <Gallery />
        <Timeline />
      </div>
      
      {/* Sticky footer revealed as the main container scrolls away */}
      <Footer />
    </SmoothScroll>
  );
}

