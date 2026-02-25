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
  TreePine, Droplets, Shield, Zap, Car, School,
  ChevronLeft, ChevronRight, CheckCircle,
  Wifi, Dumbbell, ShoppingCart, Stethoscope, Plane, Train,
  Navigation, Send, User, Youtube,
  Star,
  TrendingUp
} from "lucide-react";
import { ProjectHighlights } from "@/components/sections/ProjectHighlights";

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
  Totalacres?: number;
  commercial_plots?: number;
  residential_plots?: number;
  status: "ongoing" | "completed";
  approval_type: string;
  is_featured: boolean;
  hero_image?: string;
  gallery_images?: string[];
  amenities: string[];
  proximity: { label: string; value: string; icon?: string }[];
  layout_image?: string;
  google_embed_url?: string;
  Highlights: string[];
  brochure_url?: string;
  youtube_videos?: string[];
  WhychooseUs: string;
  WhychooseUspoints: string[];
  
} 
const defaultWhychooseUs = "We provide premium DTCP approved layouts with clear titles and high growth potential.";
const defaultwhychooseUspoints = [ "DTCP Approved Layout",
    "Clear Legal Documentation",
    "Prime Growth Location",
    "High Return on Investment"
  ]
  const defaultVideos = [
    "https://www.youtube.com/watch?v=uH8RBFMHbvQ",
    "https://www.youtube.com/watch?v=03VP1nojFl4",
    "https://www.youtube.com/watch?v=K0ym5IHvszU",
    "https://www.youtube.com/watch?v=O_Ny-yf29_w",
    "https://www.youtube.com/watch?v=_WFL6_A5i4Q",
    "https://www.youtube.com/watch?v=2GBiSc2XpeY"
  ];
const projectImages: Record<string, string[]> = {
  "spark-vision": [
    "https://images.unsplash.com/photo-1500382017468-9049fee74a62?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1600",
  ],
  "default": [
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1600",
  ],
};

const amenityIconMap: Record<string, React.ElementType> = {
  "Wide Roads": Car,
  "Underground Drainage": Droplets,
  "Parks": TreePine,
  "Security": Shield,
  "Electricity": Zap,
  "Schools": School,
  "WiFi": Wifi,
  "Gym": Dumbbell,
  "Shopping": ShoppingCart,
  default: Building2,
};

const proximityIconMap: Record<string, React.ElementType> = {
  "School": School,
  "Airport": Plane,
  "Hospital": Stethoscope,
  "Highway": Car,
  "Metro": Train,
  "Station": Train,
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
      {/* ── MAIN HERO ── */}
      <section className="relative w-full h-screen min-h-[680px] overflow-hidden">
        {/* Background images */}
        {images.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: i === activeIdx ? 1 : 0 }}
          >
            <NextImage src={src} alt={project.name} fill className="object-cover" priority={i === 0} />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>
        ))}

        {/* Navbar */}
        <div className="absolute top-0 inset-x-0 z-30">
          <Navbar />
        </div>

        {/* Hero text */}
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-6 pt-10">
          <Link href="/projects" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors text-sm">
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-5">
            <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
              project.status === "ongoing" ? "bg-emerald-500 text-white" : "bg-blue-500 text-white"
            }`}>
              {project.status}
            </span>
            <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs font-semibold flex items-center gap-2 border border-white/20">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              {project.approval_type}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-5xl font-black text-white tracking-tighter mb-4 italic leading-none drop-shadow-lg">
            {project.name}
          </h1>
          <p className="text-sm md:text-lg text-white/70 max-w-2xl mb-10 font-light italic leading-relaxed">
            {project.description}
          </p>

          <Button
            onClick={onBrochureClick}
            className="h-14 px-10 rounded-xl bg-[#3b3b98] hover:bg-[#2e2e7a] text-white font-bold text-base transition-all hover:scale-105 shadow-[0_20px_40px_-10px_rgba(59,59,152,0.5)]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-8m0 8l-3-3m3 3l3-3M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
            </svg>
            Download Brochure
          </Button>

          {/* Location pin */}
          <button
            onClick={onScrollToMap}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/80 hover:text-amber-400 transition-colors group"
          >
            <MapPin className="h-5 w-5 text-amber-500 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium underline underline-offset-4">{project.location}</span>
          </button>
        </div>
      </section>

      {/* ── THUMBNAIL STRIP (below hero, same dark bg) ── */}
      <div className="bg-[#0a0a0a] px-6 py-5">
        <div className="max-w-[1280px] mx-auto flex items-center gap-3 overflow-x-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => {
                goTo(i);
                if (timerRef.current) clearInterval(timerRef.current);
              }}
              className={`relative flex-shrink-0 rounded-xl overflow-hidden transition-all duration-300 border-2 ${
                i === activeIdx
                  ? "border-amber-400 opacity-100 scale-105 shadow-lg shadow-amber-500/30"
                  : "border-white/10 opacity-50 hover:opacity-80 hover:border-white/30"
              }`}
              style={{ width: 120, height: 72 }}
            >
              <NextImage src={src} alt={`Preview ${i + 1}`} fill className="object-cover" />
              {/* Active indicator bar */}
              {i === activeIdx && (
                <div className="absolute bottom-0 inset-x-0 h-1 bg-amber-400 rounded-b-xl" />
              )}
            </button>
          ))}

          {/* Dot indicators on the right */}
          <div className="ml-auto flex items-center gap-1.5 pl-4 flex-shrink-0">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`block rounded-full transition-all duration-300 ${
                  i === activeIdx ? "w-5 h-1.5 bg-amber-400" : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"
                }`}
              />
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

  const stats = [
    { label: "Total Acres", value: project.Totalacres ? `${project.Totalacres} Acres` : "—", sub: "Premium land area" },
    { label: "Total Plots", value: project.total_plots, sub: "Carefully planned" },
    { label: "Commercial Plots", value: project.commercial_plots ?? "—", sub: "150–300 sq yards" },
    { label: "Residential Plots", value: project.residential_plots ?? project.available_plots, sub: "200–400 sq yards" },
  ];

  useEffect(() => {
    const timer = setInterval(() => setActiveStatIdx(prev => (prev + 1) % stats.length), 3000);
    return () => clearInterval(timer);
  }, [stats.length]);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-amber-600 mb-3">Project Overview</p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-3">Numbers That Matter</h2>
          <button onClick={onScrollToMap} className="flex items-center gap-2 mx-auto text-gray-500 hover:text-amber-600 transition-colors text-sm font-medium">
            <MapPin className="h-4 w-4 text-amber-500" />
            {project.location}
            <span className="underline underline-offset-2 text-xs">View on map →</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT: stat tiles */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                onClick={() => setActiveStatIdx(i)}
                className={`cursor-pointer rounded-2xl p-7 border-2 transition-all duration-500 ${
                  i === activeStatIdx
                    ? "bg-[#3b3b98] border-[#3b3b98] text-white scale-105 shadow-xl shadow-[#3b3b98]/30"
                    : "bg-gray-50 border-gray-100 text-gray-800 hover:border-gray-200"
                }`}
              >
                <div className={`text-3xl font-black mb-1 ${i === activeStatIdx ? "text-white" : "text-gray-900"}`}>
                  {stat.value}
                </div>
                <div className={`font-bold text-sm mb-1 ${i === activeStatIdx ? "text-white/90" : "text-gray-700"}`}>
                  {stat.label}
                </div>
                <div className={`text-xs ${i === activeStatIdx ? "text-white/60" : "text-gray-400"}`}>
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: layout image with badge */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl border-4 border-white">
              {project.layout_image ? (
                <NextImage src={project.layout_image} alt="Layout" fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#3b3b98]/20 to-amber-100 flex items-center justify-center">
                  <Building2 className="h-20 w-20 text-[#3b3b98]/30" />
                </div>
              )}
            </div>
            {/* HMDA badge */}
            <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl px-5 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.2)] border border-gray-100 flex items-center gap-3 z-10">
              <ShieldCheck className="h-8 w-8 text-emerald-500" />
              <div>
                <div className="font-black text-gray-900 text-sm">{project.approval_type}</div>
                <div className="text-xs text-gray-400">Government Approved</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── AMENITIES SECTION ────────────────────────────────────────────────────────
function AmenitiesSection({ amenities }: { amenities: string[] }) {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActiveIdx(prev => (prev + 1) % amenities.length), 2800);
    return () => clearInterval(timer);
  }, [amenities.length]);

  const maxDisplay = Math.min(amenities.length, 7);
  const radius = 130;
  const startAngle = -90;
  const angleStep = 180 / Math.max(maxDisplay - 1, 1);

  return (
    <section className="py-24 bg-[#f8f8fc]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-amber-600 mb-3">
            Lifestyle Features
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            World-Class Amenities
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-4">
          {amenities.map((amenity) => (
            <div
              key={amenity}
              className="flex items-center gap-3 bg-white rounded-2xl px-5 py-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 hover:-translate-y-0.5 transition-all duration-200 group"
            >
              {/* Green tick */}
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-all duration-200">
                <svg
                  className="w-4 h-4 text-emerald-600 group-hover:text-white transition-colors duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              {/* Text */}
              <span className="text-gray-800 font-semibold text-sm leading-tight">
                {amenity}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── PROXIMITIES SECTION ──────────────────────────────────────────────────────
function ProximitiesSection({ proximity }: { proximity: { label: string; value: string }[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === "left" ? -280 : 280, behavior: "smooth" });
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-amber-600 mb-3">Connectivity</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Proximity Highlights</h2>
          </div>
          <div className="flex gap-2">
            <button onClick={() => scroll("left")} className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-[#3b3b98] hover:text-[#3b3b98] transition-all">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={() => scroll("right")} className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-[#3b3b98] hover:text-[#3b3b98] transition-all">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable cards */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory pt-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {proximity.map((item, i) => {
            const keys = Object.keys(proximityIconMap);
            const matchedKey = keys.find(k => item.label.toLowerCase().includes(k.toLowerCase())) || "default";
            const Icon = proximityIconMap[matchedKey];
            return (
              <div
                key={i}
                className="flex-shrink-0 snap-start w-60 bg-gray-50 rounded-3xl p-7 border-2 border-gray-100 hover:border-[#3b3b98]/30 hover:shadow-lg hover:-translate-y-1 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#3b3b98]/10 flex items-center justify-center mb-5 group-hover:bg-[#3b3b98] transition-colors">
                  <Icon className="h-7 w-7 text-[#3b3b98] group-hover:text-white transition-colors" />
                </div>
                <div className="font-black text-gray-900 text-base mb-1">{item.label}</div>
                <div className="text-amber-600 font-bold text-sm">{item.value}</div>
              </div>
            );
          })}
        </div>

        {/* Map animation strip */}
        <div className="mt-12 relative h-20 rounded-2xl bg-gradient-to-r from-[#3b3b98]/5 via-[#3b3b98]/10 to-[#3b3b98]/5 border border-[#3b3b98]/10 overflow-hidden flex items-center px-6">
          <MapPin className="h-5 w-5 text-amber-500 flex-shrink-0" />
          <div className="flex-1 mx-4 relative h-0.5 bg-[#3b3b98]/20 overflow-hidden rounded-full">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#3b3b98] to-amber-400 rounded-full"
              style={{
                animation: "slideRight 2s ease-in-out infinite",
                width: "40%",
              }}
            />
          </div>
          <MapPin className="h-5 w-5 text-[#3b3b98] flex-shrink-0" />
          <style jsx>{`
            @keyframes slideRight {
              0% { left: -40%; }
              100% { left: 100%; }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}

// ─── MAP + CONTACT SECTION ────────────────────────────────────────────────────
function ExploreLayoutSection({ project }: { project: IProject }) {
  const [formData, setFormData] = React.useState({
  name: "",
  phone: "",
  project: project.name,
  message: `interested in ${project.name} located at ${project.location}. Please provide more details.`,
});
  const [submitting, setSubmitting] = useState(false);

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setSubmitting(true);

  const data = {
    name: formData.name,
    phone: formData.phone,
    project: formData.project,
    message: formData.message,
  };

  try {
    const response = await fetch("/api/inquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result?.error || "Failed");
    }

    toast.success("Inquiry sent successfully!");

    setFormData({
      name: "",
      phone: "",
      project: project.name,
      message: "",
    });

  } catch (err) {
    console.error(err);
    toast.error("Failed to send inquiry");
  } finally {
    setSubmitting(false);
  }
};
  return (
    <section id="location-map" className="py-24 bg-[#f8f8fc] scroll-mt-20">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="mb-12">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-amber-600 mb-3">Strategic Location</p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-3">Explore Location</h2>
          <p className="text-gray-500 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-amber-500" />
            {project.location}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Map 75% */}
          <div className="lg:col-span-3">
            <div className="rounded-3xl overflow-hidden border-4 border-white shadow-2xl aspect-video">
              {project.google_embed_url ? (
                <div
                  className="w-full h-full [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:border-0"
                  dangerouslySetInnerHTML={{ __html: project.google_embed_url }}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 font-semibold">
                  Map not available
                </div>
              )}
            </div>
            <div className="mt-4 flex justify-end">
              <Link
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.location)}`}
                target="_blank"
              >
                <Button className="rounded-full bg-[#3b3b98] hover:bg-[#2e2e7a] text-white font-bold px-6 h-11 shadow-lg">
                  <Navigation className="h-4 w-4 mr-2" />
                  Navigate to Site
                </Button>
              </Link>
            </div>
          </div>

          {/* Contact form 25% */}
          <div className="bg-white rounded-3xl p-7 shadow-xl border border-gray-100">
            <h3 className="text-xl font-black text-gray-900 mb-1">Quick Enquiry</h3>
            <p className="text-gray-400 text-sm mb-6">We'll get back within 2 hours</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#3b3b98] text-sm font-medium placeholder:text-gray-400 transition-colors"
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  required
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#3b3b98] text-sm font-medium placeholder:text-gray-400 transition-colors"
                />
              </div>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  value={formData.project}
                  onChange={e => setFormData(p => ({ ...p, project: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#3b3b98] text-sm font-medium text-gray-700 transition-colors appearance-none bg-white"
                >
                  <option value={project.name}>{project.name}</option>
                  
                </select>
              </div>
              <Button
                type="submit"
                disabled={submitting}
                className="w-full h-12 rounded-xl bg-[#3b3b98] hover:bg-[#2e2e7a] text-white font-bold shadow-lg transition-all hover:scale-[1.02]"
              >
                {submitting ? "Submitting..." : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Enquiry
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-5 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-400 mb-2">Or call us directly</p>
              <a href="tel:+919121212121" className="text-[#3b3b98] font-black text-sm hover:underline">
                +91 91212 12121
              </a>
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
  const [activeIdx, setActiveIdx] = useState(0);

  if (!videos || videos.length === 0) return null;

  const getEmbedId = (url: string) => {
    const match = url.match(/(?:v=|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match?.[1] ?? url;
  };

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === "left" ? -420 : 420, behavior: "smooth" });
    }
  };

  return (
    <section className="py-24 bg-[#0a0a14] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-amber-500 mb-3">Video Gallery</p>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">See It in Action</h2>
          </div>
          <div className="flex gap-2">
            <button onClick={() => scroll("left")} className="w-10 h-10 rounded-full border-2 border-white/20 text-white flex items-center justify-center hover:border-amber-400 hover:text-amber-400 transition-all">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={() => scroll("right")} className="w-10 h-10 rounded-full border-2 border-white/20 text-white flex items-center justify-center hover:border-amber-400 hover:text-amber-400 transition-all">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {videos.map((video, i) => {
            const embedId = getEmbedId(video);
            return (
              <div
                key={i}
                className="flex-shrink-0 snap-start w-96 rounded-3xl overflow-hidden border-2 border-white/10 hover:border-amber-400/50 transition-all hover:shadow-2xl hover:shadow-amber-500/10"
                style={{ aspectRatio: "16/9" }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${embedId}?rel=0`}
                  title={`Video ${i + 1}`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            );
          })}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {videos.map((_, i) => (
            <span key={i} className={`block rounded-full transition-all duration-300 ${i === activeIdx ? "w-6 h-1.5 bg-amber-400" : "w-1.5 h-1.5 bg-white/20"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface Props {
  title?: string;
  points?: string[];
}

const iconList = [
  ShieldCheck,
  TrendingUp,
  MapPin,
  Star,
];

export function WhyChooseUsSection({
  title,
  points = [],
}: Props) {

  if (!title && (!points || points.length === 0)) return null;

  return (
    <section className="py-24 bg-gradient-to-b from-white to-[#f8f8fc]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">

        {/* Header */}
        <div className="text-center mb-16">

          <p className="text-xs font-black uppercase tracking-[0.35em] text-amber-600 mb-3">
            Why Choose Us
          </p>

          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-6">
            Your Trusted Investment Partner
          </h2>

          
            <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed font-medium">
              {title}
            </p>
        

        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {points.slice(0, 4).map((point, i) => {

            const Icon = iconList[i] || CheckCircle;

            return (
              <div
                key={i}
                className="
                  group
                  bg-white
                  rounded-3xl
                  p-8
                  border border-gray-100
                  shadow-sm
                  hover:shadow-xl
                  hover:border-[#3b3b98]/30
                  transition-all duration-300
                  hover:-translate-y-1
                "
              >

                {/* Icon */}
                <div className="
                  w-14 h-14 mb-6
                  rounded-2xl
                  bg-[#3b3b98]/10
                  flex items-center justify-center
                  group-hover:bg-[#3b3b98]
                  transition-colors duration-300
                ">
                  <Icon className="h-7 w-7 text-[#3b3b98] group-hover:text-white transition-colors"/>
                </div>

                {/* Text */}
                <p className="text-gray-800 font-semibold leading-relaxed">
                  {point}
                </p>

              </div>
            );

          })}

        </div>

      </div>
    </section>
  );
}
// ─── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();

  const [project, setProject] = useState<IProject | null>(null);
  const [loading, setLoading] = useState(true);

  const scrollToMap = () => {
    document.getElementById("location-map")?.scrollIntoView({ behavior: "smooth" });
  };

 // ── Load MSG91 OTP widget + flag image fix ────────────────────────────────
useEffect(() => {
  // 1. Self-hosted flags proxy override (fixes tracking prevention block)
  const styleId = "iti-flags-override";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      .iti__flag {
        background-image: url("/static/flags@2x.png") !important;
      }
      @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
        .iti__flag {
          background-image: url("/static/flags@2x.png") !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // 2. Load MSG91 widget script
  const scriptId = "msg91-widget";
  if (!document.getElementById(scriptId)) {
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://verify.msg91.com/otp-provider.js";
    script.async = true;
    document.body.appendChild(script);
  }
}, []);

// ── Fetch project data ────────────────────────────────────────────────────
useEffect(() => {
  const load = async () => {
    try {
      const res = await fetch(`/api/projects/slug/${slug}`);
      if (res.ok) {
        const data = await res.json();
        if (data && !data.error) {
          setProject(data);
          return;
        }
      }
      // Fallback
      const res2 = await fetch(`/api/projects?slug=${slug}`);
      const data2 = await res2.json();
      if (data2 && !data2.error) setProject(data2);
    } catch (err) {
      console.error("Failed to load project:", err);
    } finally {
      setLoading(false);
    }
  };
  load();
}, [slug]);

// ── OTP Verification ──────────────────────────────────────────────────────
const startOTPVerification = () => {
  if (!window.initSendOTP) {
    toast.error("OTP service not ready. Please refresh the page.");
    return;
  }

  // Patch XHR to intercept & fake the db-ip.com geo lookup (CORS fix)
  const OriginalXHR = window.XMLHttpRequest;

  class PatchedXHR extends OriginalXHR {
    private _url: string = "";

    open(
      method: string,
      url: string | URL,
      async?: boolean,
      username?: string | null,
      password?: string | null
    ): void {
      this._url = url.toString();
      super.open(method, url as string, async ?? true, username, password);
    }

    send(body?: Document | XMLHttpRequestBodyInit | null): void {
      if (this._url.includes("db-ip.com")) {
        // Fake a successful IN country response — no network call made
        setTimeout(() => {
          Object.defineProperty(this, "status", { get: () => 200 });
          Object.defineProperty(this, "responseText", {
            get: () => JSON.stringify({ countryCode: "IN" }),
          });
          Object.defineProperty(this, "readyState", { get: () => 4 });
          this.onreadystatechange?.(new Event("readystatechange"));
          if (typeof this.onload === "function") {
            this.onload(new ProgressEvent("load"));
          }
        }, 0);
        return;
      }
      super.send(body);
    }
  }

  (window as any).XMLHttpRequest = PatchedXHR;

  const restoreXHR = () => {
    (window as any).XMLHttpRequest = OriginalXHR;
  };

  window.initSendOTP({
    widgetId: "366271695963363335323530",
    tokenAuth: "494774TDaayJXaIdop69943abeP1",
    success: (data: any) => {
      restoreXHR();

      const phone = data?.mobile || data?.user || "";
      localStorage.setItem("verifiedPhone", phone);
      toast.success("Phone verified successfully!");

      if (project?.brochure_url) {
        router.push(project.brochure_url);
      } else if (project?.slug) {
        router.push(`/brochures/${project.slug}`);
      }
    },
    failure: (error: any) => {
      restoreXHR();

      const message =
        error?.message ||
        error?.description ||
        "OTP verification failed. Please try again.";
      toast.error(message);
    },
  });
};

// ── Brochure click handler ────────────────────────────────────────────────
const handleBrochureClick = () => {
  const verified = localStorage.getItem("verifiedPhone");
  if (verified) {
    if (project?.brochure_url) {
      router.push(project.brochure_url);
    } else if (project?.slug) {
      router.push(`/brochures/${project.slug}`);
    }
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Porject Details Coming Soon</h1>
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

  const heroImages = (project.gallery_images && project.gallery_images.length > 0)
    ? project.gallery_images
    : projectImages[project.slug] ?? projectImages.default;

  const sampleVideos = project.youtube_videos && project.youtube_videos.length > 0
    ? project.youtube_videos
    : defaultVideos;
    const whychooseus = project.WhychooseUs ? project.WhychooseUs.split("|") : defaultWhychooseUs;
   const whychooseuspoints =
  project.WhychooseUspoints && project.WhychooseUspoints.length > 0
    ? project.WhychooseUspoints
    : defaultwhychooseUspoints;
  return (
    <main className="min-h-screen bg-white">
      <Toaster position="top-center" />

      {/* 1. Hero */}
      <HeroCarousel
        images={heroImages}
        project={project}
        onScrollToMap={scrollToMap}
        onBrochureClick={handleBrochureClick}
      />

      {/* 2. Project Stats */}
      <StatsSection project={project} onScrollToMap={scrollToMap} />
 
      {/* 3. Amenities */}
      {project.amenities?.length > 0 && (
        <AmenitiesSection amenities={project.amenities} />
      )}

      {/* Project Highlights */}
      <ProjectHighlights highlights={project.Highlights} />
        {/* Why Choose Us */}
      <WhyChooseUsSection title={whychooseus} points={whychooseuspoints} />

      {/* Loan Assistance */}
      {/* <LoanAssistance /> */}

      {/* 4. Proximities */}
      {project.proximity?.length > 0 && (
        <ProximitiesSection proximity={project.proximity} />
      )}

      {/* 5. Explore Layout + Contact */}
      <ExploreLayoutSection project={project} />
    
      {/* 6. YouTube Videos */}
      {sampleVideos.length > 0 && (
        <YouTubeCarousel videos={sampleVideos} />
      )}

      {/* CTA */}
     <section className="py-24 bg-[#0a1628] relative overflow-hidden">

  {/* top accent line */}
  <div className="absolute top-0 left-0 w-full h-1 bg-amber-500" />

  <div className="max-w-[1280px] mx-auto px-6 md:px-8 text-center relative z-10">

    {/* text */}
    <p className="text-xl text-white/50 mb-16 max-w-2xl mx-auto">
      Join hundreds of happy families who have found their dream home with {project.name}. Schedule your site visit today.
    </p>


    {/* IMAGE GRID */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

      {heroImages.map((img, i) => (

        <div
          key={i}
          className="
            relative
            group
            rounded-2xl
            overflow-hidden
            border border-white/10
            hover:border-amber-400/50
            transition-all duration-300
            hover:-translate-y-1
            hover:shadow-2xl hover:shadow-amber-500/10
          "
        >

          {/* image */}
          <div className="relative aspect-[4/3]">

            <NextImage
              src={img}
              alt={`Gallery ${i + 1}`}
              fill
              className="
                object-cover
                transition-transform duration-500
                group-hover:scale-110
              "
            />

          </div>

          {/* overlay */}
          <div className="
            absolute inset-0
            bg-gradient-to-t from-black/60 via-transparent to-transparent
            opacity-0 group-hover:opacity-100
            transition-opacity duration-300
          " />

        </div>

      ))}

    </div>

  </div>

</section>

      <Footer />
    </main>
  );
}