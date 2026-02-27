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
// // import { supabase, Project, Plot } from "@/lib/supabase";
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
// interface IProject {
//   _id: string;
//   name: string;
//   slug: string;
//   description: string;
//   location: string;
//   price_per_sqyd: number;
//   total_plots: number;
//   available_plots: number;
//   total_acres?: number;
//   status: "ongoing" | "completed";
//   approval_type: string;
//   is_featured: boolean;
//   hero_image?: string;
//   amenities: string[];
//   proximity: { label: string; value: string }[];
//   layout_image?: string;
//   google_embed_url?: string;
//   Highlights: string[];
//   brochure_url?: string;
// }

// // const TownshipLayout3D = dynamic(
// //   () => import("@/components/3d/TownshipLayout3D").then((mod) => mod.TownshipLayout3D),
// //   { 
// //     ssr: false, 
// //     loading: () => (
// //       <div className="w-full h-[700px] bg-[#0a1628] rounded-[3.5rem] flex flex-col items-center justify-center gap-6 border border-white/10 overflow-hidden">
// //         <div className="relative">
// //           <div className="h-24 w-24 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
// //           <div className="absolute inset-0 flex items-center justify-center">
// //             <Cuboid className="h-8 w-8 text-amber-500 animate-pulse" />
// //           </div>
// //         </div>
// //         <div className="text-center">
// //           <div className="text-white font-black uppercase tracking-[0.3em] mb-2">Initializing 3D World</div>
// //           <div className="text-white/30 text-[10px] font-bold uppercase tracking-widest">Loading Premium Assets & Layout</div>
// //         </div>
// //       </div>
// //     ) 
// //   }
// // );

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
//    const [project, setProject] = useState<IProject | null>(null);
//   const [plots, setPlots] = useState<any[]>([]);
//   const [loading, setLoading] = React.useState(true);
//   const [selectedPlot, setSelectedPlot] = useState<any | null>(null);


//   async function fetchProject() {
//     try {
//       const response = await fetch(`/api/projects?slug=${slug}`);
//       const projectData = await response.json();
//       if (projectData && !projectData.error) {
//         setProject(projectData);
//         console.log("Fetched project:", projectData);
        
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
//   useEffect(() => {
//   const scriptId = "msg91-widget";

//   if (!document.getElementById(scriptId)) {
//     const script = document.createElement("script");

//     script.id = scriptId;
//     script.src = "https://verify.msg91.com/otp-provider.js";
//     script.async = true;

//     script.onload = () => {
//       console.log("MSG91 widget loaded successfully");
//     };

//     script.onerror = () => {
//       console.error("MSG91 widget failed to load");
//     };

//     document.body.appendChild(script);
//   }
// }, []);
// useEffect(() => {
//     const load = async () => {
//       try {
//         const res = await fetch(`/api/projects/slug/${slug}`);
//         const data = await res.json();
//         if (data && !data.error) {
//           setProject(data);
//           const plotsRes = await fetch(`/api/projects/${data._id}/plots`);
//           if (plotsRes.ok) setPlots(await plotsRes.json());
//         }
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     load();
//   }, [slug]);
//   const startOTPVerification = () => {
//   if (!window.initSendOTP) {
//     toast.error("OTP service not ready. Please refresh page.");
//     return;
//   }

//   if (!project?.slug) {
//     toast.error("Project not loaded");
//     return;
//   }

//   window.initSendOTP({
//     widgetId: "366271695963363335323530",
//     tokenAuth: "494774TDaayJXaIdop69943abeP1",
    
//     success: (data: any) => {
//       console.log("OTP success:", data);

//       localStorage.setItem("verifiedPhone", data.user);

//       toast.success("Phone verified successfully");

//       router.push(`/brochures/${project.slug}`);
//     },

//     failure: (error: any) => {
//       console.error("OTP failed:", error);

//       toast.error("OTP verification failed");
//     }
//   });
// };
//   if (!project) {
//     return (
//       <main className="min-h-screen bg-gray-50">
//         <Navbar />
//         <div className="pt-32 pb-20 container mx-auto px-4 text-center">
//                     <h1 className="text-4xl font-bold text-gray-900 mb-4">Porject Details Coming Soon</h1>
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
//   {/* <Button
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
//   </Button> */}


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

//     const verified = localStorage.getItem("verifiedPhone");

//     if (verified) {

//       router.push(`/brochures/${project.slug}`);

//     } else {

//       startOTPVerification();

//     }
//   }}
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
//               // { label: "Estate Area", value: `${project.total_acres} Acres` },
//               // { label: "Pricing From", value: `₹${project.price_per_sqyd?.toLocaleString()}/yd` },
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
//       {/* <section id="3d-master-plan" className="py-32 bg-[#f8f9fa] scroll-mt-20 overflow-hidden">
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
//       </section> */}

//       {/* Amenities */}
//     <section className="py-28 bg-white border-y border-gray-100">
//   <div className="container mx-auto px-6">

//     {/* Header */}
//     <div className="text-center max-w-2xl mx-auto mb-16">
//       <div className="flex items-center justify-center gap-3 mb-4">
//         <div className="h-[2px] w-12 bg-amber-500 rounded-full" />
//         <span className="text-amber-600 font-black uppercase tracking-[0.35em] text-xs">
//           Lifestyle Features
//         </span>
//       </div>

//       <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
//         World-Class Amenities
//       </h2>

//       <p className="text-gray-500 text-lg">
//         Designed to offer comfort, convenience, and a premium living experience.
//       </p>
//     </div>

//     {/* Amenities checklist */}
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-6 max-w-5xl mx-auto">

//       {project.amenities?.map((amenity) => {

//         const Icon = amenityIcons[amenity] || Building2;

//         return (
//           <div
//             key={amenity}
//             className="
//               group flex items-center gap-4
//               py-3 px-4 rounded-xl
//               hover:bg-amber-50/40
//               transition-all duration-300
//             "
//           >

//             {/* Tick circle */}
//             <div
//               className="
//                 flex items-center justify-center
//                 h-8 w-8 rounded-full
//                 bg-emerald-50
//                 border border-emerald-200
//                 group-hover:bg-emerald-500
//                 group-hover:border-emerald-500
//                 transition-all
//               "
//             >
//               <CheckCircle
//                 className="
//                   h-5 w-5 text-emerald-600
//                   group-hover:text-white
//                 "
//               />
//             </div>

//             {/* Amenity text */}
//             <span
//               className="
//                 text-gray-800 font-semibold
//                 tracking-wide
//                 group-hover:text-gray-900
//                 transition-colors
//               "
//             >
//               {amenity}
//             </span>

//           </div>
//         );
//       })}

//     </div>

//   </div>
// </section>

//       {/* Project Highlights & Trust */}
//       <ProjectHighlights />

//       {/* Loan Assistance */}
//       <LoanAssistance />

//       {/* Location Map */}
//       <section id="location-map" className="py-32 bg-gray-50 scroll-mt-20">
//   <div className="container mx-auto px-4">

//     {/* Header */}
//     <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16">
//       <div>
//         <div className="flex items-center gap-3 mb-4">
//           <div className="h-1 w-12 bg-amber-500 rounded-full" />
//           <span className="text-amber-600 font-black uppercase tracking-[0.3em] text-xs">
//             Strategic Location
//           </span>
//         </div>

//         <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tighter leading-none">
//           Connect with Ease
//         </h2>

//         <p className="text-gray-500 text-xl flex items-center gap-2">
//           <MapPin className="h-6 w-6 text-amber-500" />
//           {project.location}
//         </p>
//       </div>

//       {/* Navigate Button */}
//       <Link
//         href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.location)}`}
//         target="_blank"
//       >
//         <Button className="h-16 rounded-full bg-black text-white font-black px-10 text-lg hover:scale-105 transition-all shadow-xl">
//           Navigate to Site
//         </Button>
//       </Link>
//     </div>


//     {/* Map Container */}
//     {project.google_embed_url ? (
//       <div
//         className="
//           relative
//           aspect-[21/9]
//           w-full
//           rounded-[4rem]
//           overflow-hidden
//           shadow-2xl
//           border-8 border-white

//           [&_iframe]:w-full
//           [&_iframe]:h-full
//           [&_iframe]:border-0
//           [&_iframe]:grayscale
//           hover:[&_iframe]:grayscale-0
//           [&_iframe]:transition-all
//           [&_iframe]:duration-700
//         "
//         dangerouslySetInnerHTML={{
//           __html: project.google_embed_url,
//         }}
//       />
//     ) : (
//       <div className="aspect-[21/9] w-full rounded-[4rem] bg-gray-200 flex items-center justify-center border-8 border-white shadow-2xl">
//         <p className="text-gray-400 font-semibold">
//           Map not available
//         </p>
//       </div>
//     )}

//   </div>
// </section>

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

// // "use client";
// // import { useRouter } from "next/navigation";
// // import React, { useEffect, useState, useMemo } from "react";
// // import NextImage from "next/image";
// // import Link from "next/link";
// // import { useParams } from "next/navigation";
// // import { motion, AnimatePresence } from "framer-motion";
// // import dynamic from "next/dynamic";
// // import { Navbar } from "@/components/layout/Navbar";
// // import { Footer } from "@/components/layout/Footer";
// // import { Button } from "@/components/ui/button";
// // import { supabase, Project, Plot } from "@/lib/supabase";
// // import { toast, Toaster } from "sonner";
// // import { 
// //   MapPin, ChevronRight, ShieldCheck, Phone, Download, 
// //   X, CheckCircle, ArrowLeft, Building2,
// //   TreePine, Droplets, Shield, Zap, Car, School, Map as MapIcon, 
// //   Layout, Box, Cuboid, Eye, Navigation, Compass as CompassIcon
// // } from "lucide-react";
// // import { ProjectHighlights } from "@/components/sections/ProjectHighlights";
// // import { LoanAssistance } from "@/components/sections/LoanAssistance";
// // declare global {
// //   interface Window {
// //     initSendOTP: any;
// //   }
// // }
// // const TownshipLayout3D = dynamic(
// //   () => import("@/components/3d/TownshipLayout3D").then((mod) => mod.TownshipLayout3D),
// //   { 
// //     ssr: false, 
// //     loading: () => (
// //       <div className="w-full h-[700px] bg-[#0a1628] rounded-[3.5rem] flex flex-col items-center justify-center gap-6 border border-white/10 overflow-hidden">
// //         <div className="relative">
// //           <div className="h-24 w-24 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
// //           <div className="absolute inset-0 flex items-center justify-center">
// //             <Cuboid className="h-8 w-8 text-amber-500 animate-pulse" />
// //           </div>
// //         </div>
// //         <div className="text-center">
// //           <div className="text-white font-black uppercase tracking-[0.3em] mb-2">Initializing 3D World</div>
// //           <div className="text-white/30 text-[10px] font-bold uppercase tracking-widest">Loading Premium Assets & Layout</div>
// //         </div>
// //       </div>
// //     ) 
// //   }
// // );

// // const projectImages: Record<string, string> = {
// //   "spark-vision": "https://images.unsplash.com/photo-1500382017468-9049fee74a62?auto=format&fit=crop&q=80&w=1200",
// //   "th-10-avp-bahupeta-dtcp": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200",
// //   "valley-view": "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=1200",
// //   "yadadri-icon": "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=1200",
// //   "star-city-phase-4": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
// //   "royal-enclave": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
// //   "tech-city": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200",
// // };

// // const defaultImage = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200";

// // const amenityIcons: Record<string, any> = {
// //   "Wide Roads": Car,
// //   "Underground Drainage": Droplets,
// //   "Parks": TreePine,
// //   "Security": Shield,
// //   "Electricity": Zap,
// //   "Schools": School,
// // };

// // export default function ProjectDetailPage() {
// //   const params = useParams();
// //   const slug = params.slug as string;
// //   const router = useRouter();
// // const [otpOpen, setOtpOpen] = useState(false);
// // const [otpVerified, setOtpVerified] = useState(false);
// //   const [mounted, setMounted] = React.useState(false);
// //   const [project, setProject] = React.useState<Project | null>(null);
// //   const [plots, setPlots] = React.useState<Plot[]>([]);
// //   const [loading, setLoading] = React.useState(true);
// //   const [selectedPlot, setSelectedPlot] = React.useState<Plot | null>(null);

// //   async function fetchProject() {
// //     try {
// //       const response = await fetch(`/api/projects?slug=${slug}`);
// //       const projectData = await response.json();
// //       if (projectData && !projectData.error) {
// //         setProject(projectData);
        
// //         // For now, plots might still be empty or we fetch them from another API
// //         const plotsResponse = await fetch(`/api/projects/${projectData._id}/plots`);
// //         if (plotsResponse.ok) {
// //           const plotsData = await plotsResponse.json();
// //           setPlots(plotsData);
// //         }
// //       }
// //     } catch (error) {
// //       console.error("Error fetching project:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }

// //   React.useEffect(() => {
// //     setMounted(true);
// //     fetchProject();
// //   }, [slug]);
 
// //   if (!project) {
// //     return (
// //       <main className="min-h-screen bg-gray-50">
// //         <Navbar />
// //         <div className="pt-32 pb-20 container mx-auto px-4 text-center">
// //                     <h1 className="text-4xl font-bold text-gray-900 mb-4">Project Coming Soon ...</h1>
// //           <Link href="/projects">
// //             <Button className="rounded-full bg-amber-500 text-black">
// //               <ArrowLeft className="mr-2 h-4 w-4" />
// //               Back to Projects
// //             </Button>
// //           </Link>
// //         </div>
// //       </main>
// //     );
// //   }

// //   return (
// //     <main className="min-h-screen bg-white">
// //       <Navbar />
// //       <Toaster position="top-center" />
      
// //       {/* Hero */}
// //       <section className="relative pt-20 pb-32 bg-[#0a1628] overflow-hidden">
// //         <div className="absolute inset-0 opacity-30">
// //           <NextImage
// //             src={projectImages[project.slug] || project.hero_image || defaultImage}
// //             alt={project.name}
// //             fill
// //             className="object-cover"
// //           />
// //         </div>
// //         <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/80 to-[#0a1628]/60" />
        
// //         <div className="container relative z-10 mx-auto px-4 pt-16">
// //           <Link href="/projects" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors">
// //             <ArrowLeft className="h-4 w-4" />
// //             Back to Projects
// //           </Link>

// //           <div className="flex flex-wrap items-start gap-4 mb-6">
// //             <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase ${
// //               project.status === "ongoing" ? "bg-emerald-500 text-white" : "bg-blue-500 text-white"
// //             }`}>
// //               {project.status}
// //             </span>
// //             <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-semibold flex items-center gap-2">
// //               <ShieldCheck className="h-4 w-4 text-emerald-400" />
// //               {project.approval_type}
// //             </span>
// //           </div>

// //           <h1 className="text-5xl md:text-8xl font-black text-white mb-4 tracking-tighter">{project.name}</h1>
          
// //           <div className="flex items-center gap-2 text-white/60 text-xl mb-8">
// //             <MapPin className="h-5 w-5 text-amber-500" />
// //             {project.location}
// //           </div>

// //           <p className="text-xl text-white/70 max-w-3xl mb-12 leading-relaxed">{project.description}</p>

// //         <div className="flex flex-wrap gap-5 mb-16">

// //   {/* 3D TOUR */}
// //   <Button
// //     onClick={() =>
// //       document
// //         .getElementById("3d-master-plan")
// //         ?.scrollIntoView({ behavior: "smooth" })
// //     }
// //     className="
// //       h-16 px-10 rounded-full
// //       bg-amber-500 hover:bg-amber-600
// //       text-black font-bold
// //       flex items-center gap-3
// //       transition-all duration-300
// //       hover:scale-105 hover:shadow-xl
// //       shadow-[0_20px_40px_-12px_rgba(245,158,11,0.5)]
// //     "
// //   >
// //     <Box className="h-6 w-6" />
// //     Interactive 3D Tour
// //   </Button>


// //   {/* EXPLORE LOCATION */}
// //   <Button
// //     onClick={() =>
// //       document
// //         .getElementById("location-map")
// //         ?.scrollIntoView({ behavior: "smooth" })
// //     }
// //     className="
// //       h-16 px-10 rounded-full
// //       bg-white/90 hover:bg-white
// //       text-gray-900 hover:text-blue-900
// //       font-semibold
// //       flex items-center gap-3
// //       transition-all duration-300
// //       hover:scale-105 hover:shadow-lg
// //       border border-gray-200
// //       backdrop-blur-md
// //     "
// //   >
// //     <MapIcon className="h-6 w-6" />
// //     Explore Location
// //   </Button>


// //   {/* DOWNLOAD BROCHURE */}
// //  <Button
// //   onClick={() => {
// //       router.push(`/ventures/${project.slug}.pdf`);
// //   }
   
// //   }
// //     className="
// //       h-16 px-10 rounded-full
// //       bg-blue-900 hover:bg-blue-800
// //       text-white font-semibold
// //       flex items-center gap-3
// //       transition-all duration-300
// //       hover:scale-105 hover:shadow-xl
// //       shadow-[0_20px_40px_-12px_rgba(30,64,175,0.5)]
// //     "
// //   >
// //     {/* Download Icon SVG */}
// //     <svg
// //       xmlns="http://www.w3.org/2000/svg"
// //       className="h-6 w-6"
// //       fill="none"
// //       viewBox="0 0 24 24"
// //       stroke="currentColor"
// //       strokeWidth={2}
// //     >
// //       <path
// //         strokeLinecap="round"
// //         strokeLinejoin="round"
// //         d="M12 16v-8m0 8l-3-3m3 3l3-3M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
// //       />
// //     </svg>

// //     Download Brochure
// //   </Button>

// // </div>


// //           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
// //             {[
// //               { label: "Total Plots", value: project.total_plots },
// //               { label: "Ready to Move", value: project.available_plots, highlight: true },
// //               { label: "Estate Area", value: `${project.total_acres} Acres` },
// //               { label: "Pricing From", value: `₹${project.price_per_sqyd?.toLocaleString()}/yd` },
// //             ].map((stat) => (
// //               <div key={stat.label} className="bg-white/5 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10">
// //                 <div className={`text-4xl font-black mb-2 ${stat.highlight ? "text-emerald-400" : "text-white"}`}>
// //                   {stat.value}
// //                 </div>
// //                 <div className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* 3D Master Plan Section */}
// //       <section id="3d-master-plan" className="py-32 bg-[#f8f9fa] scroll-mt-20 overflow-hidden">
// //         <div className="container mx-auto px-4">
// //           <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
// //             <div className="max-w-2xl">
// //               <div className="flex items-center gap-3 mb-4">
// //                 <div className="h-1 w-12 bg-amber-500 rounded-full" />
// //                 <span className="text-amber-600 font-black uppercase tracking-[0.3em] text-xs">Interactive Experience</span>
// //               </div>
// //               <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tighter leading-none">
// //                 3D Master Plan
// //               </h2>
// //               <p className="text-gray-500 text-xl leading-relaxed">
// //                 Explore our meticulously planned township in immersive 3D. Rotate, zoom, and select individual plots to view specific details and secure your investment instantly.
// //               </p>
// //             </div>
// //             <div className="flex flex-col items-end gap-4">
// //                <div className="flex items-center gap-6 px-8 py-4 bg-white rounded-full shadow-xl border border-gray-100">
// //                   <div className="flex items-center gap-2">
// //                     <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
// //                     <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Live Availability</span>
// //                   </div>
// //                   <div className="h-4 w-px bg-gray-200" />
// //                   <div className="text-sm font-black text-gray-900">{project.available_plots} Plots Remaining</div>
// //                </div>
// //             </div>
// //           </div>

// //           <div className="relative aspect-[16/9] md:aspect-[21/9] w-full min-h-[700px]">
// //             <TownshipLayout3D 
// //               plots={plots}
// //               layoutImage={project.layout_image || undefined}
// //               onPlotSelect={setSelectedPlot}
// //               selectedPlot={selectedPlot}
// //             />
// //           </div>
// //         </div>
// //       </section>

// //       {/* Amenities */}
// //       <section className="py-24 bg-white border-y border-gray-100">
// //         <div className="container mx-auto px-4">
// //           <div className="text-center max-w-2xl mx-auto mb-16">
// //             <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">World-Class Amenities</h2>
// //             <p className="text-gray-500">Everything you need for a modern, comfortable, and luxury lifestyle.</p>
// //           </div>
// //           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
// //             {project.amenities?.map((amenity) => {
// //               const Icon = amenityIcons[amenity] || Building2;
// //               return (
// //                 <div key={amenity} className="group bg-gray-50 p-8 rounded-[2.5rem] text-center transition-all hover:bg-white hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-2 border border-transparent hover:border-amber-100">
// //                   <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:bg-amber-500 group-hover:rotate-6 transition-all">
// //                     <Icon className="h-8 w-8 text-amber-600 group-hover:text-black transition-colors" />
// //                   </div>
// //                   <div className="text-xs font-black text-gray-900 uppercase tracking-widest">{amenity}</div>
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Project Highlights & Trust */}
// //       <ProjectHighlights />

// //       {/* Loan Assistance */}
// //       <LoanAssistance />

// //       {/* Location Map */}
// //       <section id="location-map" className="py-32 bg-gray-50 scroll-mt-20">
// //         <div className="container mx-auto px-4">
// //           <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16">
// //             <div>
// //               <div className="flex items-center gap-3 mb-4">
// //                 <div className="h-1 w-12 bg-amber-500 rounded-full" />
// //                 <span className="text-amber-600 font-black uppercase tracking-[0.3em] text-xs">Strategic Location</span>
// //               </div>
// //               <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tighter leading-none">Connect with Ease</h2>
// //               <p className="text-gray-500 text-xl flex items-center gap-2">
// //                 <MapPin className="h-6 w-6 text-amber-500" />
// //                 {project.location}
// //               </p>
// //             </div>
// //          <Link
// //   href={project.google_embed_url}
// //   target="_blank"
// //   rel="noopener noreferrer"
// // >
// //   <Button className="h-16 rounded-full bg-black text-white font-black px-10 text-lg hover:scale-105 transition-all shadow-xl">
// //     Navigate to Site
// //   </Button>
// // </Link>
// //           </div>
          
// //           <div className="aspect-[21/9] w-full bg-gray-200 rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white">
// //             <iframe
// //               width="100%"
// //               height="100%"
// //               style={{ border: 0 }}
// //               loading="lazy"
// //               allowFullScreen
// //               referrerPolicy="no-referrer-when-downgrade"
// //               src={`https://www.google.com/maps/embed/v1/place?key=REPLACE_WITH_YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(project.location)}`}
// //               className="grayscale contrast-125 hover:grayscale-0 transition-all duration-1000"
// //             />
// //             <div className="absolute inset-0 bg-slate-900/5 pointer-events-none" />
// //           </div>
// //         </div>
// //       </section>

// //       {/* CTA */}
// //       <section className="py-24 bg-[#0a1628] relative overflow-hidden">
// //         <div className="absolute top-0 left-0 w-full h-1 bg-amber-500" />
// //         <div className="container mx-auto px-4 text-center relative z-10">
// //           <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">Ready to secure your future?</h2>
// //           <p className="text-xl text-white/50 mb-12 max-w-2xl mx-auto">Join hundreds of happy families who have found their dream home with {project.name}. Schedule your site visit today.</p>
// //           <div className="flex flex-wrap justify-center gap-6">
// //             <Link href="/contact">
// //               <Button size="lg" className="h-20 rounded-[2rem] bg-amber-500 hover:bg-amber-600 text-black px-12 text-xl font-black shadow-[0_32px_64px_-12px_rgba(245,158,11,0.4)] transition-all hover:scale-105">
// //                 Book Site Visit Now
// //               </Button>
// //             </Link>
// //             <Button size="lg" variant="outline" className="h-20 rounded-[2rem] border-2 border-white/20 text-white hover:bg-white/10 px-12 text-xl font-black transition-all">
// //               <Phone className="mr-3 h-6 w-6 text-amber-500" />
// //               +91 91212 12121
// //             </Button>
// //           </div>
// //         </div>
        
// //         {/* Abstract shapes */}
// //         <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px]" />
// //         <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />
// //       </section>

// //       <Footer />
// //     </main>
// //   );
// // }

"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef, useCallback } from "react";
import NextImage from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";
import {
  MapPin, ShieldCheck, Phone, ArrowLeft, Building2,
  Car, School, ChevronLeft, ChevronRight, CheckCircle,
  Stethoscope, Plane, Train, Navigation, Send, User,
  Star, TrendingUp,
} from "lucide-react";
import { ProjectHighlights } from "@/components/sections/ProjectHighlights";

declare global {
  interface Window { initSendOTP: any; }
}

// ── Interface ─────────────────────────────────────────────────────────────────
interface IProject {
  _id: string;
  name: string;
  slug: string;
  description: string;
  location: string;
  price_per_sqyd: number;
  total_plots: number;
  available_plots: number;
  Totalacres?: number | string;        // DB stores as string "150"
  commercial_plots?: number | string;  // DB stores as string "10"
  residential_plots?: number | string; // DB stores as string "175"
  status: "ongoing" | "completed";
  approval_type: string;
  is_featured: boolean;
  hero_image?: string;
  gallery_images?: any;               // accept any shape from DB
  amenities: string[];
  proximity: { label: string; value: string; icon?: string }[];
  layout_image?: string;
  google_embed_url?: string;
  Highlights: string[];
  brochure_url?: string;
  youtube_videos?: any;               // DB stores as "" (empty string) or string[]
  WhychooseUs: string;
  WhychooseUspoints: string[];
}
const extractLatLng = (iframeHtml: string) => {
  const match = iframeHtml.match(/!2d([-.\d]+)!3d([-.\d]+)/);
  if (!match) return null;
  
  const lng = match[1];
  const lat = match[2];

  return { lat, lng };
};

// ── Normalise helpers — handle every possible DB shape ────────────────────────
function normaliseGallery(raw: any): string[] {
  console.log("[normaliseGallery] raw input:", JSON.stringify(raw));
  if (!raw) { console.log("[normaliseGallery] → null/undefined, return []"); return []; }
  if (!Array.isArray(raw)) { console.log("[normaliseGallery] → not an array, return []"); return []; }
  if (raw.length === 0) { console.log("[normaliseGallery] → empty array, return []"); return []; }
 
  const first = raw[0];
  console.log("[normaliseGallery] first element type:", typeof first, "value:", first);

  if (typeof first === "string") {
    const result = (raw as string[]).filter(Boolean);
    console.log("[normaliseGallery] → plain strings, result:", result);
    return result;
  }

  // {label, value} shape
  const result = (raw as { label?: string; value?: string }[])
    .map(g => g.value ?? "")
    .filter(Boolean);
  console.log("[normaliseGallery] → {label,value} objects, result:", result);
  return result;
}

function normaliseProximity(raw: any): { label: string; value: string }[] {
  if (!raw || !Array.isArray(raw) || raw.length === 0) return [];
  if (typeof raw[0] === "string") return (raw as string[]).map(s => ({ label: s, value: "" }));
  return raw as { label: string; value: string }[];
}

function normaliseVideos(raw: any): string[] {
  console.log("[normaliseVideos] raw:", JSON.stringify(raw));
  if (!raw) return [];
  // DB stores as "" (empty string) — treat as no videos
  if (typeof raw === "string") return raw.trim() ? [raw.trim()] : [];
  if (!Array.isArray(raw)) return [];
  return (raw as string[]).filter(s => typeof s === "string" && s.trim().length > 0);
}

function normaliseNumber(val: any): number | undefined {
  if (val === undefined || val === null || val === "") return undefined;
  const n = Number(val);
  return isNaN(n) ? undefined : n;
}

// ── Defaults ──────────────────────────────────────────────────────────────────
const defaultWhychooseUs = "We provide premium DTCP approved layouts with clear titles and high growth potential.";
const defaultWhychooseUspoints = [
  "DTCP Approved Layout",
  "Clear Legal Documentation",
  "Prime Growth Location",
  "High Return on Investment",
];
const defaultVideos = [
  "https://www.youtube.com/watch?v=uH8RBFMHbvQ",
  "https://www.youtube.com/watch?v=03VP1nojFl4",
  "https://www.youtube.com/watch?v=K0ym5IHvszU",
  "https://www.youtube.com/watch?v=O_Ny-yf29_w",
  "https://www.youtube.com/watch?v=_WFL6_A5i4Q",
  "https://www.youtube.com/watch?v=2GBiSc2XpeY",
];
const projectImages: Record<string, string[]> = {
  "spark-vision": [
    "https://images.unsplash.com/photo-1500382017468-9049fee74a62?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1600",
  ],
  default: [
    "https://thomesinfra.com/wp-content/uploads/2024/05/DJI_0732-2-1-scaled.jpg",
    "https://thomesinfra.com/wp-content/uploads/2024/05/DJI_0674-2-1-scaled.jpg",
    "https://thomesinfra.com/wp-content/uploads/2024/05/DJI_0744-scaled.jpg",
    "https://thomesinfra.com/wp-content/uploads/2024/05/DJI_0874-1.jpg",
  ],
};

const proximityIconMap: Record<string, React.ElementType> = {
  School, Airport: Plane, Hospital: Stethoscope,
  Highway: Car, Metro: Train, Station: Train,
  default: Navigation,
};

// ─── HERO CAROUSEL ────────────────────────────────────────────────────────────
function HeroCarousel({ images, project, onScrollToMap, onBrochureClick }: {
  images: string[];
  project: IProject;
  onScrollToMap: () => void;
  onBrochureClick: () => void;
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const goTo = useCallback((idx: number) => {
    setActiveIdx((idx + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    timerRef.current = setInterval(() => goTo(activeIdx + 1), 3000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [activeIdx, goTo]);

  return (
    <div className="bg-[#0a0a0a]">
      <section className="relative w-full h-screen min-h-[680px] overflow-hidden">
        {images.map((src, i) => (
          <div key={i} className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: i === activeIdx ? 1 : 0 }}>
            <NextImage src={src} alt={project.name} fill className="object-cover" priority={i === 0} />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>
        ))}

        <div className="absolute top-0 inset-x-0 z-30"><Navbar /></div>

        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4 md:px-6 pt-10">
          <Link href="/projects" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors text-sm">
            <ArrowLeft className="h-4 w-4" /> Back to Projects
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-5">
            <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${project.status === "ongoing" ? "bg-emerald-500 text-white" : "bg-blue-500 text-white"}`}>
              {project.status}
            </span>
            <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs font-semibold flex items-center gap-2 border border-white/20">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> {project.approval_type}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-black text-white tracking-tighter mb-4 italic leading-none drop-shadow-lg">
            {project.name}
          </h1>
          <p className="text-sm md:text-lg text-white/70 max-w-2xl mb-10 font-light italic leading-relaxed px-2">
            {project.description}
          </p>
          <Button onClick={onBrochureClick} className="h-12 md:h-14 px-7 md:px-10 rounded-xl bg-[#3b3b98] hover:bg-[#2e2e7a] text-white font-bold text-sm md:text-base transition-all hover:scale-105 shadow-[0_20px_40px_-10px_rgba(59,59,152,0.5)]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-8m0 8l-3-3m3 3l3-3M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
            </svg>
            Download Brochure
          </Button>
          <button onClick={onScrollToMap} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/80 hover:text-amber-400 transition-colors group">
            <MapPin className="h-5 w-5 text-amber-500 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium underline underline-offset-4">{project.location}</span>
          </button>
        </div>
      </section>

      {/* Thumbnail strip */}
      <div className="bg-[#0a0a0a] px-4 md:px-6 py-4 md:py-5">
        <div className="max-w-[1280px] mx-auto flex items-center gap-2 md:gap-3 overflow-x-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {images.map((src, i) => (
            <button key={i} onClick={() => { goTo(i); if (timerRef.current) clearInterval(timerRef.current); }}
              className={`relative flex-shrink-0 rounded-xl overflow-hidden transition-all duration-300 border-2 ${i === activeIdx ? "border-amber-400 opacity-100 scale-105 shadow-lg shadow-amber-500/30" : "border-white/10 opacity-50 hover:opacity-80 hover:border-white/30"}`}
              style={{ width: 80, height: 52 }}>
              <NextImage src={src} alt={`Preview ${i + 1}`} fill className="object-cover" />
              {i === activeIdx && <div className="absolute bottom-0 inset-x-0 h-1 bg-amber-400 rounded-b-xl" />}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-1.5 pl-3 flex-shrink-0">
            {images.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} className={`block rounded-full transition-all duration-300 ${i === activeIdx ? "w-5 h-1.5 bg-amber-400" : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── STATS SECTION ────────────────────────────────────────────────────────────
function StatsSection({ project, onScrollToMap }: { project: IProject; onScrollToMap: () => void }) {
  const [activeStatIdx, setActiveStatIdx] = useState(0);
  const totalAcres       = normaliseNumber(project.Totalacres);
  const commercialPlots  = normaliseNumber(project.commercial_plots);
  const residentialPlots = normaliseNumber(project.residential_plots);

  const stats = [
    { label: "Total Acres",       value: totalAcres        ? `${totalAcres} Acres` : "—", sub: "Premium land area"    },
    { label: "Total Plots",       value: project.total_plots  || "—",                      sub: "Carefully planned"   },
    { label: "Commercial Plots",  value: commercialPlots   ?? "—",                          sub: "150–300 sq yards"   },
    { label: "Residential Plots", value: residentialPlots  ?? project.available_plots ?? "—", sub: "200–400 sq yards" },
  ];

  useEffect(() => {
    const t = setInterval(() => setActiveStatIdx(p => (p + 1) % stats.length), 3000);
    return () => clearInterval(t);
  }, [stats.length]);

  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-amber-600 mb-3">Project Overview</p>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight mb-3">Numbers That Matter</h2>
          <button onClick={onScrollToMap} className="flex items-center gap-2 mx-auto text-gray-500 hover:text-amber-600 transition-colors text-sm font-medium">
            <MapPin className="h-4 w-4 text-amber-500" />
            {project.location}
            <span className="underline underline-offset-2 text-xs">View on map →</span>
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {stats.map((stat, i) => (
              <div key={stat.label} onClick={() => setActiveStatIdx(i)}
                className={`cursor-pointer rounded-2xl p-5 md:p-7 border-2 transition-all duration-500 ${i === activeStatIdx ? "bg-[#3b3b98] border-[#3b3b98] text-white scale-105 shadow-xl shadow-[#3b3b98]/30" : "bg-gray-50 border-gray-100 text-gray-800 hover:border-gray-200"}`}>
                <div className={`text-2xl md:text-3xl font-black mb-1 ${i === activeStatIdx ? "text-white" : "text-gray-900"}`}>{stat.value}</div>
                <div className={`font-bold text-xs md:text-sm mb-1 ${i === activeStatIdx ? "text-white/90" : "text-gray-700"}`}>{stat.label}</div>
                <div className={`text-xs ${i === activeStatIdx ? "text-white/60" : "text-gray-400"}`}>{stat.sub}</div>
              </div>
            ))}
          </div>
          <div className="relative mt-6 lg:mt-0">
           <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
  <NextImage
    src={project.layout_image || "https://thomesinfra.com/wp-content/uploads/2023/11/DJI_0474.jpg"}
    alt="Layout"
    width={0}
    height={0}
    sizes="100vw"
    className="w-full h-auto"
  />
</div>
            <div className="absolute -bottom-4 -right-2 md:-bottom-5 md:-right-5 bg-white rounded-2xl px-4 md:px-5 py-2 md:py-3 shadow-[0_10px_30px_rgba(0,0,0,0.2)] border border-gray-100 flex items-center gap-2 md:gap-3 z-10">
              <ShieldCheck className="h-6 w-6 md:h-8 md:w-8 text-emerald-500" />
              <div>
                <div className="font-black text-gray-900 text-xs md:text-sm">{project.approval_type}</div>
                <div className="text-xs text-gray-400">Government Approved</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── AMENITIES ────────────────────────────────────────────────────────────────
function AmenitiesSection({ amenities }: { amenities: string[] }) {
  return (
    <section className="py-14 md:py-24 bg-[#f8f8fc]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-amber-600 mb-3">Lifestyle Features</p>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">World-Class Amenities</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {amenities.map((amenity) => (
            <div key={amenity} className="flex items-center gap-3 bg-white rounded-2xl px-4 md:px-5 py-3 md:py-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 hover:-translate-y-0.5 transition-all duration-200 group">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-all duration-200">
                <svg className="w-4 h-4 text-emerald-600 group-hover:text-white transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-gray-800 font-semibold text-sm leading-tight">{amenity}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROXIMITIES ─────────────────────────────────────────────────────────────
function ProximitiesSection({ proximity }: { proximity: { label: string; value: string }[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: "left" | "right") =>
    scrollRef.current?.scrollBy({ left: dir === "left" ? -280 : 280, behavior: "smooth" });

  return (
    <section className="py-14 md:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="flex items-end justify-between mb-8 md:mb-12">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-amber-600 mb-2 md:mb-3">Connectivity</p>
            <h2 className="text-2xl md:text-5xl font-black text-gray-900 tracking-tight">Proximity Highlights</h2>
          </div>
          <div className="flex gap-2">
            <button onClick={() => scroll("left")} className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-[#3b3b98] hover:text-[#3b3b98] transition-all">
              <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
            </button>
            <button onClick={() => scroll("right")} className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-[#3b3b98] hover:text-[#3b3b98] transition-all">
              <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
            </button>
          </div>
        </div>
        <div ref={scrollRef} className="flex gap-4 md:gap-5 overflow-x-auto pb-4 snap-x snap-mandatory pt-2" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {proximity.map((item, i) => {
            const keys = Object.keys(proximityIconMap).filter(k => k !== "default");
            const matchedKey = keys.find(k => item.label.toLowerCase().includes(k.toLowerCase())) ?? "default";
            const Icon = proximityIconMap[matchedKey] as React.ElementType;
            return (
              <div key={i} className="flex-shrink-0 snap-start w-52 md:w-60 bg-gray-50 rounded-3xl p-5 md:p-7 border-2 border-gray-100 hover:border-[#3b3b98]/30 hover:shadow-lg hover:-translate-y-1 transition-all group">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#3b3b98]/10 flex items-center justify-center mb-4 md:mb-5 group-hover:bg-[#3b3b98] transition-colors">
                  <Icon className="h-6 w-6 md:h-7 md:w-7 text-[#3b3b98] group-hover:text-white transition-colors" />
                </div>
                <div className="font-black text-gray-900 text-sm md:text-base mb-1">{item.label}</div>
                {item.value && <div className="text-amber-600 font-bold text-xs md:text-sm">{item.value}</div>}
              </div>
            );
          })}
        </div>
        <div className="mt-8 md:mt-12 relative h-16 md:h-20 rounded-2xl bg-gradient-to-r from-[#3b3b98]/5 via-[#3b3b98]/10 to-[#3b3b98]/5 border border-[#3b3b98]/10 overflow-hidden flex items-center px-4 md:px-6">
          <MapPin className="h-4 w-4 md:h-5 md:w-5 text-amber-500 flex-shrink-0" />
          <div className="flex-1 mx-3 md:mx-4 relative h-0.5 bg-[#3b3b98]/20 overflow-hidden rounded-full">
            <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#3b3b98] to-amber-400 rounded-full" style={{ animation: "slideRight 2s ease-in-out infinite", width: "40%" }} />
          </div>
          <MapPin className="h-4 w-4 md:h-5 md:w-5 text-[#3b3b98] flex-shrink-0" />
          <style jsx>{`@keyframes slideRight { 0% { left: -40%; } 100% { left: 100%; } }`}</style>
        </div>
      </div>
    </section>
  );
}

// ─── MAP + CONTACT ────────────────────────────────────────────────────────────
function ExploreLayoutSection({ project }: { project: IProject }) {
  const [formData, setFormData] = React.useState({
    name: "", phone: "", project: project.name,
    message: `interested in ${project.name} located at ${project.location}. Please provide more details.`,
  });
  const [submitting, setSubmitting] = useState(false);
const coords = extractLatLng(project.google_embed_url);

const directionsUrl = coords
  ? `https://www.google.com/maps/dir/?api=1&destination=${coords.lat},${coords.lng}`
  : "https://www.google.com/maps/dir//T+HOMES+INFRA+PRIVATE+LIMITED,+Flat+No+:+8-2-120%2F77%2F4B,+3rd+floor,+NVR+Towers,+Road+No.+2,+opp.+NTR+Memorial+Trust+Blood+Bank,+Banjara+Hills,+Hyderabad,+Telangana+500034/@17.4242362,78.4255312,669m/data=!3m1!1e3!4m8!4m7!1m0!1m5!1m1!1s0x3bcb9737e4038e9f:0xcb609b5821acadb1!2m2!1d78.4255312!2d17.4242362?entry=ttu&g_ep=EgoyMDI2MDIyMy4wIKXMDSoASAFQAw%3D%3D";
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result?.error || "Failed");
      toast.success("Inquiry sent successfully!");
      setFormData({ name: "", phone: "", project: project.name, message: "" });
    } catch {
      toast.error("Failed to send inquiry");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="location-map" className="py-14 md:py-24 bg-[#f8f8fc] scroll-mt-20">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="mb-8 md:mb-12">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-amber-600 mb-3">Strategic Location</p>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight mb-3">Explore Location</h2>
          <p className="text-gray-500 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-amber-500" /> {project.location}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          <div className="lg:col-span-3 order-2 lg:order-1">
            <div className="rounded-3xl overflow-hidden border-4 border-white shadow-2xl aspect-video">
              {project.google_embed_url ? (
                <div className="w-full h-full [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:border-0" dangerouslySetInnerHTML={{ __html: project.google_embed_url }} />
              ) : (
               <div
  className="w-full h-full [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:border-0"
  dangerouslySetInnerHTML={{
    __html: `
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2731.138050523078!2d78.4255312!3d17.4242362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9737e4038e9f%3A0xcb609b5821acadb1!2sT%20HOMES%20INFRA%20PRIVATE%20LIMITED!5e1!3m2!1sen!2sin!4v1772110980620!5m2!1sen!2sin"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    `,
  }}
/>          )}
            </div>
            <div className="mt-4 flex justify-end">
             <Link href={directionsUrl} target="_blank">
  <Button className="rounded-full bg-[#3b3b98] hover:bg-[#2e2e7a] text-white font-bold px-6 h-11 shadow-lg">
    <Navigation className="h-4 w-4 mr-2" />
    Navigate to Site
  </Button>
</Link>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-6 md:p-7 shadow-xl border border-gray-100 order-1 lg:order-2">
            <h3 className="text-xl font-black text-gray-900 mb-1">Quick Enquiry</h3>
            <p className="text-gray-400 text-sm mb-6">We'll get back within 2 hours</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input required placeholder="Your Name" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#3b3b98] text-sm font-medium placeholder:text-gray-400 transition-colors" />
              </div> 
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input required type="tel" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#3b3b98] text-sm font-medium placeholder:text-gray-400 transition-colors" />
              </div>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select value={formData.project} onChange={e => setFormData(p => ({ ...p, project: e.target.value }))} className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#3b3b98] text-sm font-medium text-gray-700 transition-colors appearance-none bg-white">
                  <option value={project.name}>{project.name}</option>
                </select>
              </div>
              <Button type="submit" disabled={submitting} className="w-full h-12 rounded-xl bg-[#3b3b98] hover:bg-[#2e2e7a] text-white font-bold shadow-lg transition-all hover:scale-[1.02]">
                {submitting ? "Submitting..." : <><Send className="h-4 w-4 mr-2" />Submit Enquiry</>}
              </Button>
            </form>
            <div className="mt-6 pt-5 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-400 mb-2">Or call us directly</p>
              <a href="tel:+919121212121" className="text-[#3b3b98] font-black text-sm hover:underline">+91 91212 12121</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── YOUTUBE CAROUSEL ─────────────────────────────────────────────────────────
function YouTubeCarousel({ videos }: { videos: string[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx] = useState(0);
  if (!videos.length) return null;

  const getEmbedId = (url: string) => {
    const match = url.match(/(?:v=|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match?.[1] ?? url;
  };
  const scroll = (dir: "left" | "right") =>
    scrollRef.current?.scrollBy({ left: dir === "left" ? -420 : 420, behavior: "smooth" });

  return (
    <section className="py-14 md:py-24 bg-[#0a0a14] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="flex items-end justify-between mb-8 md:mb-12">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-amber-500 mb-3">Video Gallery</p>
            <h2 className="text-2xl md:text-5xl font-black text-white tracking-tight">See It in Action</h2>
          </div>
          <div className="flex gap-2">
            <button onClick={() => scroll("left")} className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-white/20 text-white flex items-center justify-center hover:border-amber-400 hover:text-amber-400 transition-all">
              <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
            </button>
            <button onClick={() => scroll("right")} className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-white/20 text-white flex items-center justify-center hover:border-amber-400 hover:text-amber-400 transition-all">
              <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
            </button>
          </div>
        </div>
        <div ref={scrollRef} className="flex gap-4 md:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {videos.map((video, i) => (
            <div key={i} className="flex-shrink-0 snap-start w-72 md:w-96 rounded-3xl overflow-hidden border-2 border-white/10 hover:border-amber-400/50 transition-all hover:shadow-2xl hover:shadow-amber-500/10" style={{ aspectRatio: "16/9" }}>
              <iframe src={`https://www.youtube.com/embed/${getEmbedId(video)}?rel=0`} title={`Video ${i + 1}`} className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-6">
          {videos.map((_, i) => (
            <span key={i} className={`block rounded-full transition-all duration-300 ${i === activeIdx ? "w-6 h-1.5 bg-amber-400" : "w-1.5 h-1.5 bg-white/20"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── WHY CHOOSE US ────────────────────────────────────────────────────────────
const iconList: React.ElementType[] = [ShieldCheck, TrendingUp, MapPin, Star];

function WhyChooseUsSection({ title, points = [] }: { title?: string; points?: string[] }) {
  if (!title && points.length === 0) return null;
  return (
    <section className="py-14 md:py-24 bg-gradient-to-b from-white to-[#f8f8fc]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="text-center mb-10 md:mb-16">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-amber-600 mb-3">Why Choose Us</p>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight mb-6">Your Trusted Investment Partner</h2>
          {title && <p className="max-w-3xl mx-auto text-gray-600 text-base md:text-lg leading-relaxed font-medium">{title}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {points.slice(0, 4).map((point, i) => {
            const Icon = (iconList[i] ?? CheckCircle) as React.ElementType;
            return (
              <div key={i} className="group bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#3b3b98]/30 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 md:w-14 md:h-14 mb-5 md:mb-6 rounded-2xl bg-[#3b3b98]/10 flex items-center justify-center group-hover:bg-[#3b3b98] transition-colors duration-300">
                  <Icon className="h-6 w-6 md:h-7 md:w-7 text-[#3b3b98] group-hover:text-white transition-colors" />
                </div>
                <p className="text-gray-800 font-semibold leading-relaxed text-sm md:text-base">{point}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function ProjectDetailPage() {
  const params = useParams();
  const slug   = params.slug as string;
  const router = useRouter();

  const [project, setProject] = useState<IProject | null>(null);
  const [loading, setLoading] = useState(true);

  const scrollToMap = () =>
    document.getElementById("location-map")?.scrollIntoView({ behavior: "smooth" });

  // MSG91 OTP widget
  useEffect(() => {
    const styleId = "iti-flags-override";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `.iti__flag { background-image: url("/static/flags@2x.png") !important; }`;
      document.head.appendChild(style);
    }
    const scriptId = "msg91-widget";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://verify.msg91.com/otp-provider.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Fetch project
  useEffect(() => {
    const load = async () => {
      try {
        console.log("[page] fetching /api/projects/slug/" + slug);
        const res = await fetch(`/api/projects/slug/${slug}`);
        console.log("[page] response status:", res.status);

        if (res.ok) {
          const data = await res.json();
          console.log("[page] raw API response:", JSON.stringify(data, null, 2));
          console.log("[page] gallery_images from API:", JSON.stringify(data?.gallery_images));
          console.log("[page] gallery_images type:", typeof data?.gallery_images);
          console.log("[page] gallery_images isArray:", Array.isArray(data?.gallery_images));

          if (data && !data.error) {
            setProject(data);
            return;
          }
        }

        // fallback
        const res2 = await fetch(`/api/projects?slug=${slug}`);
        const data2 = await res2.json();
        console.log("[page] fallback API response gallery_images:", JSON.stringify(data2?.gallery_images));
        if (data2 && !data2.error) setProject(data2);
      } catch (err) {
        console.error("[page] Failed to load project:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  // OTP verification
  const startOTPVerification = () => {
    if (!window.initSendOTP) { toast.error("OTP service not ready. Please refresh the page."); return; }
    const OriginalXHR = window.XMLHttpRequest;
    class PatchedXHR extends OriginalXHR {
      private _url = "";
      open(method: string, url: string | URL, async?: boolean, u?: string | null, p?: string | null) {
        this._url = url.toString();
        super.open(method, url as string, async ?? true, u, p);
      }
      send(body?: Document | XMLHttpRequestBodyInit | null) {
        if (this._url.includes("db-ip.com")) {
          setTimeout(() => {
            Object.defineProperty(this, "status",       { get: () => 200 });
            Object.defineProperty(this, "responseText", { get: () => JSON.stringify({ countryCode: "IN" }) });
            Object.defineProperty(this, "readyState",   { get: () => 4 });
            this.onreadystatechange?.(new Event("readystatechange"));
            if (typeof this.onload === "function") this.onload(new ProgressEvent("load"));
          }, 0);
          return;
        }
        super.send(body);
      }
    }
    (window as any).XMLHttpRequest = PatchedXHR;
    const restoreXHR = () => { (window as any).XMLHttpRequest = OriginalXHR; };

    window.initSendOTP({
      widgetId: "366271695963363335323530",
      tokenAuth: "494774TDaayJXaIdop69943abeP1",
      success: (data: any) => {
        restoreXHR();
        localStorage.setItem("verifiedPhone", data?.mobile || data?.user || "");
        toast.success("Phone verified successfully!");
        if (project?.brochure_url) router.push(project.brochure_url);
        else if (project?.slug) router.push(`/brochures/${project.slug}`);
      },
      failure: (error: any) => {
        restoreXHR();
        toast.error(error?.message || error?.description || "OTP verification failed.");
      },
    });
  };

  const handleBrochureClick = () => {
    if (localStorage.getItem("verifiedPhone")) {
      if (project?.brochure_url) router.push(project.brochure_url);
      else if (project?.slug) router.push(`/brochures/${project.slug}`);
    } else {
      startOTPVerification();
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-16 w-16 border-4 border-[#3b3b98]/20 border-t-[#3b3b98] rounded-full animate-spin" />
          <p className="text-gray-400 font-semibold">Loading project...</p>
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-32 pb-20 container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Project Details Coming Soon</h1>
          <Link href="/projects">
            <Button className="rounded-full bg-amber-500 text-black">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  // ── Derive all display values ─────────────────────────────────────────────
  console.log("[page] project.gallery_images before normalise:", JSON.stringify(project.gallery_images));
  const gallery = normaliseGallery(project.gallery_images);
  console.log("[page] normalised gallery:", gallery);

  const heroImages = gallery.length > 0
    ? gallery
    : (projectImages[project.slug] ?? projectImages.default);

  console.log("[page] final heroImages:", heroImages);
  console.log("[page] using DB gallery?", gallery.length > 0);

  const normalisedProximity = normaliseProximity(project.proximity);

  const sampleVideos = (() => {
    const vids = normaliseVideos(project.youtube_videos);
    return vids.length > 0 ? vids : defaultVideos;
  })();

  const whychooseus      = project.WhychooseUs || defaultWhychooseUs;
  const whychooseuspoints = project.WhychooseUspoints?.length > 0
    ? project.WhychooseUspoints
    : defaultWhychooseUspoints;

  return (
    <main className="min-h-screen bg-white">
      <Toaster position="top-center" />

      <HeroCarousel images={heroImages} project={project} onScrollToMap={scrollToMap} onBrochureClick={handleBrochureClick} />
      <StatsSection project={project} onScrollToMap={scrollToMap} />
      {project.amenities?.length > 0 && <AmenitiesSection amenities={project.amenities} />}
      <ProjectHighlights highlights={project.Highlights} />
      <WhyChooseUsSection title={whychooseus} points={whychooseuspoints} />
      {normalisedProximity.length > 0 && <ProximitiesSection proximity={normalisedProximity} />}
      <ExploreLayoutSection project={project} />
      <YouTubeCarousel videos={sampleVideos} />

      {/* CTA Gallery */}
      <section className="py-14 md:py-24 bg-[#0a1628] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-amber-500" />
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 text-center relative z-10">
          <p className="text-base md:text-xl text-white/50 mb-10 md:mb-16 max-w-2xl mx-auto">
            Join hundreds of happy families who have found their dream home with {project.name}. Schedule your site visit today.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
            {heroImages.map((img, i) => (
              <div key={i} className="relative group rounded-2xl overflow-hidden border border-white/10 hover:border-amber-400/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/10">
                <div className="relative aspect-[4/3]">
                  <NextImage src={img} alt={`Gallery ${i + 1}`} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}