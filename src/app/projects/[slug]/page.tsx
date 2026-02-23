"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useMemo } from "react";
import NextImage from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
// import { supabase, Project, Plot } from "@/lib/supabase";
import { toast, Toaster } from "sonner";
import { 
  MapPin, ChevronRight, ShieldCheck, Phone, Download, 
  X, CheckCircle, ArrowLeft, Building2,
  TreePine, Droplets, Shield, Zap, Car, School, Map as MapIcon, 
  Layout, Box, Cuboid, Eye, Navigation, Compass as CompassIcon
} from "lucide-react";
import { ProjectHighlights } from "@/components/sections/ProjectHighlights";
import { LoanAssistance } from "@/components/sections/LoanAssistance";
declare global {
  interface Window {
    initSendOTP: any;
  }
}
interface IProject {
  _id: string;
  name: string;
  slug: string;
  description: string;
  location: string;
  price_per_sqyd: number;
  total_plots: number;
  available_plots: number;
  total_acres?: number;
  status: "ongoing" | "completed";
  approval_type: string;
  is_featured: boolean;
  hero_image?: string;
  amenities: string[];
  proximity: { label: string; value: string }[];
  layout_image?: string;
  google_embed_url?: string;
  Highlights: string[];
  brochure_url?: string;
}

// const TownshipLayout3D = dynamic(
//   () => import("@/components/3d/TownshipLayout3D").then((mod) => mod.TownshipLayout3D),
//   { 
//     ssr: false, 
//     loading: () => (
//       <div className="w-full h-[700px] bg-[#0a1628] rounded-[3.5rem] flex flex-col items-center justify-center gap-6 border border-white/10 overflow-hidden">
//         <div className="relative">
//           <div className="h-24 w-24 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
//           <div className="absolute inset-0 flex items-center justify-center">
//             <Cuboid className="h-8 w-8 text-amber-500 animate-pulse" />
//           </div>
//         </div>
//         <div className="text-center">
//           <div className="text-white font-black uppercase tracking-[0.3em] mb-2">Initializing 3D World</div>
//           <div className="text-white/30 text-[10px] font-bold uppercase tracking-widest">Loading Premium Assets & Layout</div>
//         </div>
//       </div>
//     ) 
//   }
// );

const projectImages: Record<string, string> = {
  "spark-vision": "https://images.unsplash.com/photo-1500382017468-9049fee74a62?auto=format&fit=crop&q=80&w=1200",
  "th-10-avp-bahupeta-dtcp": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200",
  "valley-view": "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=1200",
  "yadadri-icon": "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=1200",
  "star-city-phase-4": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
  "royal-enclave": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
  "tech-city": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200",
};

const defaultImage = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200";

const amenityIcons: Record<string, any> = {
  "Wide Roads": Car,
  "Underground Drainage": Droplets,
  "Parks": TreePine,
  "Security": Shield,
  "Electricity": Zap,
  "Schools": School,
};

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();
const [otpOpen, setOtpOpen] = useState(false);
const [otpVerified, setOtpVerified] = useState(false);
  const [mounted, setMounted] = React.useState(false);
   const [project, setProject] = useState<IProject | null>(null);
  const [plots, setPlots] = useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedPlot, setSelectedPlot] = useState<any | null>(null);


  async function fetchProject() {
    try {
      const response = await fetch(`/api/projects?slug=${slug}`);
      const projectData = await response.json();
      if (projectData && !projectData.error) {
        setProject(projectData);
        console.log("Fetched project:", projectData);
        
        // For now, plots might still be empty or we fetch them from another API
        const plotsResponse = await fetch(`/api/projects/${projectData._id}/plots`);
        if (plotsResponse.ok) {
          const plotsData = await plotsResponse.json();
          setPlots(plotsData);
        }
      }
    } catch (error) {
      console.error("Error fetching project:", error);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    setMounted(true);
    fetchProject();
  }, [slug]);
  useEffect(() => {
  const scriptId = "msg91-widget";

  if (!document.getElementById(scriptId)) {
    const script = document.createElement("script");

    script.id = scriptId;
    script.src = "https://verify.msg91.com/otp-provider.js";
    script.async = true;

    script.onload = () => {
      console.log("MSG91 widget loaded successfully");
    };

    script.onerror = () => {
      console.error("MSG91 widget failed to load");
    };

    document.body.appendChild(script);
  }
}, []);
useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/projects/slug/${slug}`);
        const data = await res.json();
        if (data && !data.error) {
          setProject(data);
          const plotsRes = await fetch(`/api/projects/${data._id}/plots`);
          if (plotsRes.ok) setPlots(await plotsRes.json());
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);
  const startOTPVerification = () => {
  if (!window.initSendOTP) {
    toast.error("OTP service not ready. Please refresh page.");
    return;
  }

  if (!project?.slug) {
    toast.error("Project not loaded");
    return;
  }

  window.initSendOTP({
    widgetId: "366271695963363335323530",
    tokenAuth: "494774TDaayJXaIdop69943abeP1",
    
    success: (data: any) => {
      console.log("OTP success:", data);

      localStorage.setItem("verifiedPhone", data.user);

      toast.success("Phone verified successfully");

      router.push(`/brochures/${project.slug}`);
    },

    failure: (error: any) => {
      console.error("OTP failed:", error);

      toast.error("OTP verification failed");
    }
  });
};
  if (!project) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-32 pb-20 container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <Link href="/projects">
            <Button className="rounded-full bg-amber-500 text-black">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Toaster position="top-center" />
      
      {/* Hero */}
      <section className="relative pt-20 pb-32 bg-[#0a1628] overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <NextImage
            src={projectImages[project.slug] || project.hero_image || defaultImage}
            alt={project.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/80 to-[#0a1628]/60" />
        
        <div className="container relative z-10 mx-auto px-4 pt-16">
          <Link href="/projects" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>

          <div className="flex flex-wrap items-start gap-4 mb-6">
            <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase ${
              project.status === "ongoing" ? "bg-emerald-500 text-white" : "bg-blue-500 text-white"
            }`}>
              {project.status}
            </span>
            <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-semibold flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              {project.approval_type}
            </span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black text-white mb-4 tracking-tighter">{project.name}</h1>
          
          <div className="flex items-center gap-2 text-white/60 text-xl mb-8">
            <MapPin className="h-5 w-5 text-amber-500" />
            {project.location}
          </div>

          <p className="text-xl text-white/70 max-w-3xl mb-12 leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-5 mb-16">

  {/* 3D TOUR */}
  {/* <Button
    onClick={() =>
      document
        .getElementById("3d-master-plan")
        ?.scrollIntoView({ behavior: "smooth" })
    }
    className="
      h-16 px-10 rounded-full
      bg-amber-500 hover:bg-amber-600
      text-black font-bold
      flex items-center gap-3
      transition-all duration-300
      hover:scale-105 hover:shadow-xl
      shadow-[0_20px_40px_-12px_rgba(245,158,11,0.5)]
    "
  >
    <Box className="h-6 w-6" />
    Interactive 3D Tour
  </Button> */}


  {/* EXPLORE LOCATION */}
  <Button
    onClick={() =>
      document
        .getElementById("location-map")
        ?.scrollIntoView({ behavior: "smooth" })
    }
    className="
      h-16 px-10 rounded-full
      bg-white/90 hover:bg-white
      text-gray-900 hover:text-blue-900
      font-semibold
      flex items-center gap-3
      transition-all duration-300
      hover:scale-105 hover:shadow-lg
      border border-gray-200
      backdrop-blur-md
    "
  >
    <MapIcon className="h-6 w-6" />
    Explore Location
  </Button>


  {/* DOWNLOAD BROCHURE */}
 <Button
  onClick={() => {

    const verified = localStorage.getItem("verifiedPhone");

    if (verified) {

      router.push(`/brochures/${project.slug}`);

    } else {

      startOTPVerification();

    }
  }}
    className="
      h-16 px-10 rounded-full
      bg-blue-900 hover:bg-blue-800
      text-white font-semibold
      flex items-center gap-3
      transition-all duration-300
      hover:scale-105 hover:shadow-xl
      shadow-[0_20px_40px_-12px_rgba(30,64,175,0.5)]
    "
  >
    {/* Download Icon SVG */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 16v-8m0 8l-3-3m3 3l3-3M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
      />
    </svg>

    Download Brochure
  </Button>

</div>


          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Total Plots", value: project.total_plots },
              { label: "Ready to Move", value: project.available_plots, highlight: true },
              // { label: "Estate Area", value: `${project.total_acres} Acres` },
              // { label: "Pricing From", value: `₹${project.price_per_sqyd?.toLocaleString()}/yd` },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10">
                <div className={`text-4xl font-black mb-2 ${stat.highlight ? "text-emerald-400" : "text-white"}`}>
                  {stat.value}
                </div>
                <div className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3D Master Plan Section */}
      {/* <section id="3d-master-plan" className="py-32 bg-[#f8f9fa] scroll-mt-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-1 w-12 bg-amber-500 rounded-full" />
                <span className="text-amber-600 font-black uppercase tracking-[0.3em] text-xs">Interactive Experience</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tighter leading-none">
                3D Master Plan
              </h2>
              <p className="text-gray-500 text-xl leading-relaxed">
                Explore our meticulously planned township in immersive 3D. Rotate, zoom, and select individual plots to view specific details and secure your investment instantly.
              </p>
            </div>
            <div className="flex flex-col items-end gap-4">
               <div className="flex items-center gap-6 px-8 py-4 bg-white rounded-full shadow-xl border border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Live Availability</span>
                  </div>
                  <div className="h-4 w-px bg-gray-200" />
                  <div className="text-sm font-black text-gray-900">{project.available_plots} Plots Remaining</div>
               </div>
            </div>
          </div>

          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full min-h-[700px]">
            <TownshipLayout3D 
              plots={plots}
              layoutImage={project.layout_image || undefined}
              onPlotSelect={setSelectedPlot}
              selectedPlot={selectedPlot}
            />
          </div>
        </div>
      </section> */}

      {/* Amenities */}
    <section className="py-28 bg-white border-y border-gray-100">
  <div className="container mx-auto px-6">

    {/* Header */}
    <div className="text-center max-w-2xl mx-auto mb-16">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="h-[2px] w-12 bg-amber-500 rounded-full" />
        <span className="text-amber-600 font-black uppercase tracking-[0.35em] text-xs">
          Lifestyle Features
        </span>
      </div>

      <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
        World-Class Amenities
      </h2>

      <p className="text-gray-500 text-lg">
        Designed to offer comfort, convenience, and a premium living experience.
      </p>
    </div>

    {/* Amenities checklist */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-6 max-w-5xl mx-auto">

      {project.amenities?.map((amenity) => {

        const Icon = amenityIcons[amenity] || Building2;

        return (
          <div
            key={amenity}
            className="
              group flex items-center gap-4
              py-3 px-4 rounded-xl
              hover:bg-amber-50/40
              transition-all duration-300
            "
          >

            {/* Tick circle */}
            <div
              className="
                flex items-center justify-center
                h-8 w-8 rounded-full
                bg-emerald-50
                border border-emerald-200
                group-hover:bg-emerald-500
                group-hover:border-emerald-500
                transition-all
              "
            >
              <CheckCircle
                className="
                  h-5 w-5 text-emerald-600
                  group-hover:text-white
                "
              />
            </div>

            {/* Amenity text */}
            <span
              className="
                text-gray-800 font-semibold
                tracking-wide
                group-hover:text-gray-900
                transition-colors
              "
            >
              {amenity}
            </span>

          </div>
        );
      })}

    </div>

  </div>
</section>

      {/* Project Highlights & Trust */}
      <ProjectHighlights />

      {/* Loan Assistance */}
      <LoanAssistance />

      {/* Location Map */}
      <section id="location-map" className="py-32 bg-gray-50 scroll-mt-20">
  <div className="container mx-auto px-4">

    {/* Header */}
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="h-1 w-12 bg-amber-500 rounded-full" />
          <span className="text-amber-600 font-black uppercase tracking-[0.3em] text-xs">
            Strategic Location
          </span>
        </div>

        <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tighter leading-none">
          Connect with Ease
        </h2>

        <p className="text-gray-500 text-xl flex items-center gap-2">
          <MapPin className="h-6 w-6 text-amber-500" />
          {project.location}
        </p>
      </div>

      {/* Navigate Button */}
      <Link
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.location)}`}
        target="_blank"
      >
        <Button className="h-16 rounded-full bg-black text-white font-black px-10 text-lg hover:scale-105 transition-all shadow-xl">
          Navigate to Site
        </Button>
      </Link>
    </div>


    {/* Map Container */}
    {project.google_embed_url ? (
      <div
        className="
          relative
          aspect-[21/9]
          w-full
          rounded-[4rem]
          overflow-hidden
          shadow-2xl
          border-8 border-white

          [&_iframe]:w-full
          [&_iframe]:h-full
          [&_iframe]:border-0
          [&_iframe]:grayscale
          hover:[&_iframe]:grayscale-0
          [&_iframe]:transition-all
          [&_iframe]:duration-700
        "
        dangerouslySetInnerHTML={{
          __html: project.google_embed_url,
        }}
      />
    ) : (
      <div className="aspect-[21/9] w-full rounded-[4rem] bg-gray-200 flex items-center justify-center border-8 border-white shadow-2xl">
        <p className="text-gray-400 font-semibold">
          Map not available
        </p>
      </div>
    )}

  </div>
</section>

      {/* CTA */}
      <section className="py-24 bg-[#0a1628] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-amber-500" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">Ready to secure your future?</h2>
          <p className="text-xl text-white/50 mb-12 max-w-2xl mx-auto">Join hundreds of happy families who have found their dream home with {project.name}. Schedule your site visit today.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/contact">
              <Button size="lg" className="h-20 rounded-[2rem] bg-amber-500 hover:bg-amber-600 text-black px-12 text-xl font-black shadow-[0_32px_64px_-12px_rgba(245,158,11,0.4)] transition-all hover:scale-105">
                Book Site Visit Now
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-20 rounded-[2rem] border-2 border-white/20 text-white hover:bg-white/10 px-12 text-xl font-black transition-all">
              <Phone className="mr-3 h-6 w-6 text-amber-500" />
              +91 91212 12121
            </Button>
          </div>
        </div>
        
        {/* Abstract shapes */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />
      </section>

      <Footer />
    </main>
  );
}

// "use client";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState, useMemo } from "react";
// import NextImage from "next/image";
// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import dynamic from "next/dynamic";
// import { Navbar } from "@/components/layout/Navbar";
// import { Footer } from "@/components/layout/Footer";
// import { Button } from "@/components/ui/button";
// import { supabase, Project, Plot } from "@/lib/supabase";
// import { toast, Toaster } from "sonner";
// import { 
//   MapPin, ChevronRight, ShieldCheck, Phone, Download, 
//   X, CheckCircle, ArrowLeft, Building2,
//   TreePine, Droplets, Shield, Zap, Car, School, Map as MapIcon, 
//   Layout, Box, Cuboid, Eye, Navigation, Compass as CompassIcon
// } from "lucide-react";
// import { ProjectHighlights } from "@/components/sections/ProjectHighlights";
// import { LoanAssistance } from "@/components/sections/LoanAssistance";
// declare global {
//   interface Window {
//     initSendOTP: any;
//   }
// }
// const TownshipLayout3D = dynamic(
//   () => import("@/components/3d/TownshipLayout3D").then((mod) => mod.TownshipLayout3D),
//   { 
//     ssr: false, 
//     loading: () => (
//       <div className="w-full h-[700px] bg-[#0a1628] rounded-[3.5rem] flex flex-col items-center justify-center gap-6 border border-white/10 overflow-hidden">
//         <div className="relative">
//           <div className="h-24 w-24 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
//           <div className="absolute inset-0 flex items-center justify-center">
//             <Cuboid className="h-8 w-8 text-amber-500 animate-pulse" />
//           </div>
//         </div>
//         <div className="text-center">
//           <div className="text-white font-black uppercase tracking-[0.3em] mb-2">Initializing 3D World</div>
//           <div className="text-white/30 text-[10px] font-bold uppercase tracking-widest">Loading Premium Assets & Layout</div>
//         </div>
//       </div>
//     ) 
//   }
// );

// const projectImages: Record<string, string> = {
//   "spark-vision": "https://images.unsplash.com/photo-1500382017468-9049fee74a62?auto=format&fit=crop&q=80&w=1200",
//   "th-10-avp-bahupeta-dtcp": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200",
//   "valley-view": "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=1200",
//   "yadadri-icon": "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=1200",
//   "star-city-phase-4": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
//   "royal-enclave": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
//   "tech-city": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200",
// };

// const defaultImage = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200";

// const amenityIcons: Record<string, any> = {
//   "Wide Roads": Car,
//   "Underground Drainage": Droplets,
//   "Parks": TreePine,
//   "Security": Shield,
//   "Electricity": Zap,
//   "Schools": School,
// };

// export default function ProjectDetailPage() {
//   const params = useParams();
//   const slug = params.slug as string;
//   const router = useRouter();
// const [otpOpen, setOtpOpen] = useState(false);
// const [otpVerified, setOtpVerified] = useState(false);
//   const [mounted, setMounted] = React.useState(false);
//   const [project, setProject] = React.useState<Project | null>(null);
//   const [plots, setPlots] = React.useState<Plot[]>([]);
//   const [loading, setLoading] = React.useState(true);
//   const [selectedPlot, setSelectedPlot] = React.useState<Plot | null>(null);

//   async function fetchProject() {
//     try {
//       const response = await fetch(`/api/projects?slug=${slug}`);
//       const projectData = await response.json();
//       if (projectData && !projectData.error) {
//         setProject(projectData);
        
//         // For now, plots might still be empty or we fetch them from another API
//         const plotsResponse = await fetch(`/api/projects/${projectData._id}/plots`);
//         if (plotsResponse.ok) {
//           const plotsData = await plotsResponse.json();
//           setPlots(plotsData);
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching project:", error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   React.useEffect(() => {
//     setMounted(true);
//     fetchProject();
//   }, [slug]);
 
//   if (!project) {
//     return (
//       <main className="min-h-screen bg-gray-50">
//         <Navbar />
//         <div className="pt-32 pb-20 container mx-auto px-4 text-center">
//                     <h1 className="text-4xl font-bold text-gray-900 mb-4">Project Coming Soon ...</h1>
//           <Link href="/projects">
//             <Button className="rounded-full bg-amber-500 text-black">
//               <ArrowLeft className="mr-2 h-4 w-4" />
//               Back to Projects
//             </Button>
//           </Link>
//         </div>
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-white">
//       <Navbar />
//       <Toaster position="top-center" />
      
//       {/* Hero */}
//       <section className="relative pt-20 pb-32 bg-[#0a1628] overflow-hidden">
//         <div className="absolute inset-0 opacity-30">
//           <NextImage
//             src={projectImages[project.slug] || project.hero_image || defaultImage}
//             alt={project.name}
//             fill
//             className="object-cover"
//           />
//         </div>
//         <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/80 to-[#0a1628]/60" />
        
//         <div className="container relative z-10 mx-auto px-4 pt-16">
//           <Link href="/projects" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors">
//             <ArrowLeft className="h-4 w-4" />
//             Back to Projects
//           </Link>

//           <div className="flex flex-wrap items-start gap-4 mb-6">
//             <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase ${
//               project.status === "ongoing" ? "bg-emerald-500 text-white" : "bg-blue-500 text-white"
//             }`}>
//               {project.status}
//             </span>
//             <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-semibold flex items-center gap-2">
//               <ShieldCheck className="h-4 w-4 text-emerald-400" />
//               {project.approval_type}
//             </span>
//           </div>

//           <h1 className="text-5xl md:text-8xl font-black text-white mb-4 tracking-tighter">{project.name}</h1>
          
//           <div className="flex items-center gap-2 text-white/60 text-xl mb-8">
//             <MapPin className="h-5 w-5 text-amber-500" />
//             {project.location}
//           </div>

//           <p className="text-xl text-white/70 max-w-3xl mb-12 leading-relaxed">{project.description}</p>

//         <div className="flex flex-wrap gap-5 mb-16">

//   {/* 3D TOUR */}
//   <Button
//     onClick={() =>
//       document
//         .getElementById("3d-master-plan")
//         ?.scrollIntoView({ behavior: "smooth" })
//     }
//     className="
//       h-16 px-10 rounded-full
//       bg-amber-500 hover:bg-amber-600
//       text-black font-bold
//       flex items-center gap-3
//       transition-all duration-300
//       hover:scale-105 hover:shadow-xl
//       shadow-[0_20px_40px_-12px_rgba(245,158,11,0.5)]
//     "
//   >
//     <Box className="h-6 w-6" />
//     Interactive 3D Tour
//   </Button>


//   {/* EXPLORE LOCATION */}
//   <Button
//     onClick={() =>
//       document
//         .getElementById("location-map")
//         ?.scrollIntoView({ behavior: "smooth" })
//     }
//     className="
//       h-16 px-10 rounded-full
//       bg-white/90 hover:bg-white
//       text-gray-900 hover:text-blue-900
//       font-semibold
//       flex items-center gap-3
//       transition-all duration-300
//       hover:scale-105 hover:shadow-lg
//       border border-gray-200
//       backdrop-blur-md
//     "
//   >
//     <MapIcon className="h-6 w-6" />
//     Explore Location
//   </Button>


//   {/* DOWNLOAD BROCHURE */}
//  <Button
//   onClick={() => {
//       router.push(`/ventures/${project.slug}.pdf`);
//   }
   
//   }
//     className="
//       h-16 px-10 rounded-full
//       bg-blue-900 hover:bg-blue-800
//       text-white font-semibold
//       flex items-center gap-3
//       transition-all duration-300
//       hover:scale-105 hover:shadow-xl
//       shadow-[0_20px_40px_-12px_rgba(30,64,175,0.5)]
//     "
//   >
//     {/* Download Icon SVG */}
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       className="h-6 w-6"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//       strokeWidth={2}
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="M12 16v-8m0 8l-3-3m3 3l3-3M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
//       />
//     </svg>

//     Download Brochure
//   </Button>

// </div>


//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {[
//               { label: "Total Plots", value: project.total_plots },
//               { label: "Ready to Move", value: project.available_plots, highlight: true },
//               { label: "Estate Area", value: `${project.total_acres} Acres` },
//               { label: "Pricing From", value: `₹${project.price_per_sqyd?.toLocaleString()}/yd` },
//             ].map((stat) => (
//               <div key={stat.label} className="bg-white/5 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10">
//                 <div className={`text-4xl font-black mb-2 ${stat.highlight ? "text-emerald-400" : "text-white"}`}>
//                   {stat.value}
//                 </div>
//                 <div className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* 3D Master Plan Section */}
//       <section id="3d-master-plan" className="py-32 bg-[#f8f9fa] scroll-mt-20 overflow-hidden">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
//             <div className="max-w-2xl">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="h-1 w-12 bg-amber-500 rounded-full" />
//                 <span className="text-amber-600 font-black uppercase tracking-[0.3em] text-xs">Interactive Experience</span>
//               </div>
//               <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tighter leading-none">
//                 3D Master Plan
//               </h2>
//               <p className="text-gray-500 text-xl leading-relaxed">
//                 Explore our meticulously planned township in immersive 3D. Rotate, zoom, and select individual plots to view specific details and secure your investment instantly.
//               </p>
//             </div>
//             <div className="flex flex-col items-end gap-4">
//                <div className="flex items-center gap-6 px-8 py-4 bg-white rounded-full shadow-xl border border-gray-100">
//                   <div className="flex items-center gap-2">
//                     <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
//                     <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Live Availability</span>
//                   </div>
//                   <div className="h-4 w-px bg-gray-200" />
//                   <div className="text-sm font-black text-gray-900">{project.available_plots} Plots Remaining</div>
//                </div>
//             </div>
//           </div>

//           <div className="relative aspect-[16/9] md:aspect-[21/9] w-full min-h-[700px]">
//             <TownshipLayout3D 
//               plots={plots}
//               layoutImage={project.layout_image || undefined}
//               onPlotSelect={setSelectedPlot}
//               selectedPlot={selectedPlot}
//             />
//           </div>
//         </div>
//       </section>

//       {/* Amenities */}
//       <section className="py-24 bg-white border-y border-gray-100">
//         <div className="container mx-auto px-4">
//           <div className="text-center max-w-2xl mx-auto mb-16">
//             <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">World-Class Amenities</h2>
//             <p className="text-gray-500">Everything you need for a modern, comfortable, and luxury lifestyle.</p>
//           </div>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
//             {project.amenities?.map((amenity) => {
//               const Icon = amenityIcons[amenity] || Building2;
//               return (
//                 <div key={amenity} className="group bg-gray-50 p-8 rounded-[2.5rem] text-center transition-all hover:bg-white hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-2 border border-transparent hover:border-amber-100">
//                   <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:bg-amber-500 group-hover:rotate-6 transition-all">
//                     <Icon className="h-8 w-8 text-amber-600 group-hover:text-black transition-colors" />
//                   </div>
//                   <div className="text-xs font-black text-gray-900 uppercase tracking-widest">{amenity}</div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* Project Highlights & Trust */}
//       <ProjectHighlights />

//       {/* Loan Assistance */}
//       <LoanAssistance />

//       {/* Location Map */}
//       <section id="location-map" className="py-32 bg-gray-50 scroll-mt-20">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16">
//             <div>
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="h-1 w-12 bg-amber-500 rounded-full" />
//                 <span className="text-amber-600 font-black uppercase tracking-[0.3em] text-xs">Strategic Location</span>
//               </div>
//               <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tighter leading-none">Connect with Ease</h2>
//               <p className="text-gray-500 text-xl flex items-center gap-2">
//                 <MapPin className="h-6 w-6 text-amber-500" />
//                 {project.location}
//               </p>
//             </div>
//          <Link
//   href={project.google_embed_url}
//   target="_blank"
//   rel="noopener noreferrer"
// >
//   <Button className="h-16 rounded-full bg-black text-white font-black px-10 text-lg hover:scale-105 transition-all shadow-xl">
//     Navigate to Site
//   </Button>
// </Link>
//           </div>
          
//           <div className="aspect-[21/9] w-full bg-gray-200 rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white">
//             <iframe
//               width="100%"
//               height="100%"
//               style={{ border: 0 }}
//               loading="lazy"
//               allowFullScreen
//               referrerPolicy="no-referrer-when-downgrade"
//               src={`https://www.google.com/maps/embed/v1/place?key=REPLACE_WITH_YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(project.location)}`}
//               className="grayscale contrast-125 hover:grayscale-0 transition-all duration-1000"
//             />
//             <div className="absolute inset-0 bg-slate-900/5 pointer-events-none" />
//           </div>
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="py-24 bg-[#0a1628] relative overflow-hidden">
//         <div className="absolute top-0 left-0 w-full h-1 bg-amber-500" />
//         <div className="container mx-auto px-4 text-center relative z-10">
//           <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">Ready to secure your future?</h2>
//           <p className="text-xl text-white/50 mb-12 max-w-2xl mx-auto">Join hundreds of happy families who have found their dream home with {project.name}. Schedule your site visit today.</p>
//           <div className="flex flex-wrap justify-center gap-6">
//             <Link href="/contact">
//               <Button size="lg" className="h-20 rounded-[2rem] bg-amber-500 hover:bg-amber-600 text-black px-12 text-xl font-black shadow-[0_32px_64px_-12px_rgba(245,158,11,0.4)] transition-all hover:scale-105">
//                 Book Site Visit Now
//               </Button>
//             </Link>
//             <Button size="lg" variant="outline" className="h-20 rounded-[2rem] border-2 border-white/20 text-white hover:bg-white/10 px-12 text-xl font-black transition-all">
//               <Phone className="mr-3 h-6 w-6 text-amber-500" />
//               +91 91212 12121
//             </Button>
//           </div>
//         </div>
        
//         {/* Abstract shapes */}
//         <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px]" />
//         <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />
//       </section>

//       <Footer />
//     </main>
//   );
// }
