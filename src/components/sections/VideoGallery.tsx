"use client";

import * as React from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Play, Youtube } from "lucide-react";

const videos = [
  {
    id: "kmrnbG8fCLM",
    title: "",
    description: "Complete walkthrough of our premium real estate project."
  },
  {
    id: "IxcrHyLJI_0",
    title: "",
    description: "Explore the project layout and planning in detailed 3D view."
  },
  {
    id: "_WFL6_A5i4Q",
    title: "Site Development Progress",
    description: "Real site development and infrastructure progress update."
  },
  {
    id: "rlFcuYzEnUs",
    title: "",
    description: "Customer experience and project highlights."
  }
];

export function VideoGallery() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-amber-600 font-bold uppercase tracking-widest text-sm mb-4 block"
            >
              Experience in Motion
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-black text-gray-900 leading-tight"
            >
              Project <span className="text-amber-600">Video Gallery</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-500 mt-4 text-lg"
            >
              Watch real project walkthroughs, 3D layouts and development progress videos.
            </motion.p>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex gap-6">

              {videos.map((video, i) => (
                <div
                  key={i}
                  className="flex-[0_0_90%] md:flex-[0_0_45%] lg:flex-[0_0_31%] min-w-0"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative aspect-video rounded-[2rem] overflow-hidden bg-gray-100 shadow-xl border border-gray-200"
                  >
                    <iframe
                      src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&loop=1&playlist=${video.id}&controls=0&modestbranding=1&rel=0`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      className="absolute inset-0 w-full h-full pointer-events-none grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:via-transparent transition-all duration-500" />

                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-8 w-8 rounded-full bg-amber-500 flex items-center justify-center text-black">
                          <Play className="h-4 w-4 fill-current" />
                        </div>
                        <h3 className="text-white font-bold text-lg line-clamp-1">
                          {video.title}
                        </h3>
                      </div>

                      <p className="text-white/60 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {video.description}
                      </p>
                    </div>

                    <div className="absolute top-6 right-6 h-10 w-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                      <Youtube className="h-5 w-5" />
                    </div>
                  </motion.div>
                </div>
              ))}

            </div>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center mt-12 gap-2">
            {videos.map((_, i) => (
              <div key={i} className="h-1.5 w-8 rounded-full bg-gray-200 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="h-full bg-amber-500"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
