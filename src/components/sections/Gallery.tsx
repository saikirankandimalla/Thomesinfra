"use client";

import React from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Asgar Ali Sayed",
    role: "IT Professional",
    content: "Thomes conducts their weekly meeting here every Thursday to update their Business Associates regarding the Existing Ventures, New Ventures, Business Plans for upliftment of all the Associates.",
    rating: 5,
  },
  {
    name: "sai prabhakar",
    role: "Business Owner",
    content: "A place for motivation and achieving success in life. Employment creation and motivating people to invest in lands for their well being and future.",
    rating: 5,
  },
  {
    name: "Vinay Goud",
    role: "Investor",
    content: "Top most nd fastest growing Corporate Real estate company in Hyd",
    rating: 5,
  },
];

export function Testimonials() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-blue-900 font-bold uppercase tracking-widest text-sm mb-4 block"
          >
            Client Success
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900"
          >
            Trusted by <span className="text-blue-900">10000+ Families</span>
          </motion.h2>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((t, i) => (
              <div key={i} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.33%] px-4">
                <div className="bg-gray-50 p-8 rounded-[2rem] h-full flex flex-col border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all">
                  <div className="mb-6 flex justify-between items-start">
                    <div className="flex gap-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <Quote className="h-8 w-8 text-blue-900/10" />
                  </div>
                  <p className="text-gray-600 mb-8 flex-grow leading-relaxed italic">"{t.content}"</p>
                  <div>
                    <div className="font-bold text-gray-900">{t.name}</div>
                    <div className="text-sm text-gray-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const galleryImages = [
  "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1591389052853-40166a39d8b7?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1448630360428-654566395e1e?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1475855581690-80accde3ae2b?auto=format&fit=crop&q=80&w=800",
];

export function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-blue-900 font-bold uppercase tracking-widest text-sm mb-4 block"
          >
            Visual Journey
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900"
          >
            Our <span className="text-blue-900">Developed Projects</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {galleryImages.map((src, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 1 : -1 }}
              className="relative aspect-square rounded-3xl overflow-hidden shadow-lg group"
            >
              <img src={src} alt="Project Gallery" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center shadow-xl">
                  <Star className="h-6 w-6 text-blue-900" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
