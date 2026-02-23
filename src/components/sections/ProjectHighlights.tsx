"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Users, History, Award, Map as MapIcon, 
  ShieldCheck, FileCheck, Landmark, Building2,
  TreePine, Droplets, Shield, Zap, Car, School,
  CheckCircle2, Star, BadgeCheck
} from "lucide-react";

const stats = [
  { label: "Years of Trust", value: "10+", icon: History },
  { label: "Acres Developed", value: "500+", icon: MapIcon },
  { label: "Happy Clients", value: "1000+", icon: Users },
  { label: "Success Rate", value: "100%", icon: Star },
];

const mainHighlights = [
  {
    title: "Clear Title & Spot Registration",
    description: "Legal verification and immediate ownership transfer process.",
    icon: FileCheck,
  },
  {
    title: "Gated Community",
    description: "Fully secured perimeter with controlled entry and exit points.",
    icon: ShieldCheck,
  },
  {
    title: "100% Vaastu Compliant",
    description: "Scientifically designed layouts following ancient Vaastu principles.",
    icon: BadgeCheck,
  },
  {
    title: "Strategic Location",
    description: "Excellent connectivity to highways and upcoming growth corridors.",
    icon: MapIcon,
  },
];

export function ProjectHighlights() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-amber-50 rounded-full blur-[120px] -z-10 opacity-50" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-50 rounded-full blur-[100px] -z-10 opacity-50" />

      <div className="container mx-auto px-4">
        {/* Trust Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="h-16 w-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-100 transition-colors">
                <stat.icon className="h-8 w-8 text-amber-600" />
              </div>
              <div className="text-4xl font-black text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-500 font-semibold uppercase tracking-wider text-xs">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left: Highlight Cards */}
          <div className="lg:w-1/2">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-amber-600 font-bold uppercase tracking-widest text-sm mb-4 block"
            >
              Project Benefits
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-black text-gray-900 mb-12 leading-tight"
            >
              Highlights that Make us <br />
              <span className="text-amber-500">Stand Out</span>
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {mainHighlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-amber-200 transition-all group"
                >
                  <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:bg-amber-500 transition-colors">
                    <item.icon className="h-6 w-6 text-amber-500 group-hover:text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Feature List */}
          <div className="lg:w-1/2 bg-[#0a1628] rounded-[3rem] p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Building2 size={200} />
            </div>
            
            <h3 className="text-3xl font-black mb-8 relative z-10">Premium Project Infrastructure</h3>
            
            <div className="space-y-6 relative z-10">
              {[
                "Modern Underground Drainage System",
                "Dedicated Electricity with Transformer",
                "Overhead Water Tank with Pipeline",
                "Avenue Plantation & Beautiful Parks",
                "Children's Play Area & Walking Tracks",
                "40' & 33' Wide Internal CC Roads",
                "Street Lighting for all Internal Roads"
              ].map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-lg text-white/80 group-hover:text-white transition-colors">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-amber-400 font-bold italic">
                * Our projects are strategically planned to ensure high appreciation and quality living.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
