import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { TrustBadges } from "@/components/sections/TrustBadges";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Highlights } from "@/components/sections/Highlights";
import { Testimonials, Gallery } from "@/components/sections/Gallery";
import { VideoGallery } from "@/components/sections/VideoGallery";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";

export default function Home() {
  return (
    <main className="min-h-screen bg-white selection:bg-amber-500 selection:text-black">
      <Navbar />
      <Hero />
      <About />
      <TrustBadges />
      <FeaturedProjects />
      <Highlights />
      {/* <VideoGallery /> */}
      <Testimonials />
      <FAQ />
      <Contact />
      {/* <Gallery /> */}
      <Footer />
      <Toaster position="top-center" />
    </main>
  );
}
