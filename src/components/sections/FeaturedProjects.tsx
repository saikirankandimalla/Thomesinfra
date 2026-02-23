"use client";

import React, { useEffect, useState } from "react";
import NextImage from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { supabase, Project } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { MapPin, ShieldCheck, ChevronRight, ArrowRight } from "lucide-react";

const projectImages: Record<string, string> = {
  "spark-vision": "https://images.unsplash.com/photo-1500382017468-9049fee74a62?auto=format&fit=crop&q=80&w=800",
  "spark-city": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
  "valley-view": "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=800",
  "yadadri-icon": "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=800",
  "star-city-phase-4": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
  "royal-enclave": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
  "tech-city": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800",
};

const defaultImage = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800";

export function FeaturedProjects() {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
      setMounted(true);
      const fetchProjects = async () => {
        try {
          const response = await fetch("/api/projects?featured=true&status=ongoing");
          const data = await response.json();
          if (Array.isArray(data)) {
            setProjects(data);
          }
        } catch (error) {
          console.error("Failed to fetch projects:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchProjects();
    }, []);



  if (!mounted) {
    return <section className="py-24 bg-gray-50" />;
  }

  return (
    <section className="py-24 bg-gray-50" suppressHydrationWarning>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-amber-600 font-bold uppercase tracking-widest text-sm mb-4 block">Featured Projects</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              Premium <span className="text-amber-600">Investment</span> Opportunities
            </h2>
          </motion.div>
          <Link href="/projects">
            <Button variant="outline" className="rounded-full border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-bold px-8">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm animate-pulse">
                <div className="aspect-[4/3] bg-gray-200" />
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/projects/${project.slug}`}>
                  <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <NextImage
                          src={projectImages[project.slug] || project.hero_image || defaultImage}
                          alt={project.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="bg-amber-500 text-black px-3 py-1 rounded-full text-xs font-bold uppercase">
                          Featured
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full w-fit">
                          <ShieldCheck className="h-4 w-4 text-emerald-600" />
                          <span className="text-xs font-bold text-gray-900">{project.approval_type}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                        {project.name}
                      </h3>
                      <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
                        <MapPin className="h-4 w-4" />
                        {project.location}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div>
                          <span className="text-xs text-gray-500">Starting from</span>
                          <div className="text-lg font-black text-gray-900">
                            ₹{project.price_per_sqyd?.toLocaleString()}<span className="text-sm font-normal text-gray-500">/sq.yd</span>
                          </div>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-amber-500 flex items-center justify-center group-hover:bg-amber-600 transition-colors">
                          <ChevronRight className="h-5 w-5 text-black" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
