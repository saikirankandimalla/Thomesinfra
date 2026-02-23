"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, ShieldCheck, BadgeCheck, Play, MapPin, Building, Award } from "lucide-react";

// Replace with your video URL
const heroVideoUrl = "https://thomesinfra.com/wp-content/uploads/2026/01/designarena_video_7ggsvwsm.mp4";

const heroVideos = [
  "/videos/logo_intro.mp4",
  "https://thomesinfra.com/wp-content/uploads/2026/01/designarena_video_buq7jux9.mp4",
  "https://thomesinfra.com/wp-content/uploads/2026/01/designarena_video_buq7jux9.mp4",
];

// const heroImages = [
//   "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&h=800&fit=crop",
//   "https://images.unsplash.com/photo-1512917774080-9b274b3e4e0a?w=1200&h=800&fit=crop",
//   "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop",
// ];

const stats = [
  { value: "500+", label: "Acres Developed", icon: MapPin },
  { value: "1000+", label: "Happy Families", icon: Building },
  { value: "20+", label: "Projects", icon: Award },
];

export function Hero() {
  const [currentImage, setCurrentImage] = React.useState(0);
  const [mounted, setMounted] = React.useState(false);

 const [currentVideo, setCurrentVideo] = React.useState(0);

React.useEffect(() => {
  setMounted(true);

  const interval = setInterval(() => {
    setCurrentVideo((prev) => (prev + 1) % heroVideos.length);
  }, 60000); // 60 seconds per video

  return () => clearInterval(interval);
}, []);


  if (!mounted) {
    return <section className="relative min-h-screen w-full bg-[#0a1628]" />;
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0a1628]" suppressHydrationWarning>
      {/* Background Image Slider */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
           <video
  src={heroVideoUrl[currentImage]}
  autoPlay
  muted
  loop
  playsInline
 
  className="object-cover"
 
/>
<div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/95 via-[#0a1628]/70 to-[#0a1628]/40" />
<motion.video
  key={currentVideo}
  src={heroVideos[currentVideo]}
  autoPlay
  muted
  loop
  playsInline
  className="absolute inset-0 w-full h-full object-cover"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 1 }}
/>
          </motion.div>
        </AnimatePresence>
      </div>
      <AnimatePresence mode="wait">
  <motion.video
    key={currentVideo}
    src={heroVideos[currentVideo]}
    autoPlay
    muted
    loop
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1 }}
  />
</AnimatePresence>


      {/* Animated Grid Pattern */}
      {/* <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div> */}

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {mounted && [...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/30 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="container relative z-10 mx-auto flex min-h-screen flex-col justify-center px-4 pt-24 pb-16">
        <div className="max-w-4xl">
          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 flex flex-wrap gap-3"
          >
            {/* <div className="flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-emerald-400 backdrop-blur-md">
              <ShieldCheck className="h-4 w-4" />
              Government Approved Plots
            </div>
            <div className="flex items-center gap-2 rounded-full bg-amber-500/20 border border-amber-500/30 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-amber-400 backdrop-blur-md">
              <BadgeCheck className="h-4 w-4" />
              HMDA / DTCP / YTDA
            </div> */}
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter">
              <span className="block">ELITE</span>
              <span className="block mt-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
                  REALTY
                </span>
              </span>
              <span className="block mt-2 text-white/90">VENTURES</span>
            </h1> */}
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 text-xl md:text-2xl text-white/60 max-w-2xl leading-relaxed font-light"
          >
            {/* Premium government-approved plots in Hyderabad's fastest-growing corridors. 
            Your gateway to <span className="text-amber-400 font-medium">secure investments</span> and exceptional returns. */}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 flex flex-wrap gap-4"
          >
            {/* <Link href="/projects">
              <Button size="lg" className="h-16 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 px-10 text-lg font-bold text-black shadow-2xl shadow-amber-500/30 transition-all hover:scale-105">
                Explore Projects
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="h-16 rounded-full border-2 border-white/30 bg-white/5 backdrop-blur-sm px-10 text-lg font-semibold text-white hover:bg-white/10 hover:border-white/50 transition-all">
                Book a Visit
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link> */}
          </motion.div>
        </div>

        {/* Stats Bar
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-white/5 backdrop-blur-md"
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center md:justify-between py-8 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="flex items-center gap-4 text-center md:text-left"
                >
                  <div className="h-14 w-14 rounded-2xl bg-amber-500/20 flex items-center justify-center">
                    <stat.icon className="h-7 w-7 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-3xl md:text-4xl font-black text-white">{stat.value}</div>
                    <div className="text-sm text-white/50 font-medium uppercase tracking-wider">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
              <div className="hidden lg:flex items-center gap-4">
                <Link href="/contact">
                  <Button className="h-14 rounded-full bg-white text-[#0a1628] hover:bg-white/90 px-8 font-bold">
                    Schedule Free Visit
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div> */}

        {/* Image Indicators */}
        {/* <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3 z-20">
          {heroVideoUrl.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              type="button"
              title={`Go to slide ${index + 1}`}
              aria-label={`Go to slide ${index + 1}`}
              className={`w-2 h-8 rounded-full transition-all ${
                currentImage === index 
                  ? 'bg-amber-400 h-12' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div> */}
      </div>
    </section>
  );
}
