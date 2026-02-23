"use client";

import React from "react";
import { motion } from "framer-motion";
import { TreePine, Zap, Shield, TrendingUp, Map, Droplets } from "lucide-react";

const highlights = [
{
  title: "Trust Comes First",
  description: "Every project is fully government approved, legally verified, and RERA compliant. We believe clarity builds confidence.",
  icon: TreePine,
},
{
  title: "Locations Chosen with Foresight",
  description: "We identify growth corridors early by studying infrastructure plans, connectivity, and future development potential.",
  icon: Droplets,
},
{
  title: "Transparent Process",
  description: "From documentation to registration, everything is clear, guided, and straightforward. No hidden complications.",
  icon: Shield,
},
{
  title: "Integrity in Every Deal",
  description: "We follow disciplined planning, ethical practices, and responsible development in every project.",
  icon: TrendingUp,
},
  {
    title: "Long-Term Value Focus",
    description: "Our layouts are positioned for sustainable appreciation, not short-term hype.",
    icon: Map,
  },
  {
    title: "End-to-End Support",
    description: "From site visits to bank loans and registration, we guide you at every step.",
    icon: Zap,
  },
];

export function Highlights() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-blue-900 font-bold uppercase tracking-widest text-sm mb-4 block"
          >
            Premium Amenities
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900"
          >
            Why Choose <span className="text-blue-900">THomes Infra?</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 rounded-[2rem] bg-gray-50 border border-gray-100 hover:bg-blue-900 transition-all duration-500"
            >
              <div className="h-16 w-16 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm group-hover:bg-blue-800 transition-colors">
                <item.icon className="h-8 w-8 text-blue-900 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-white transition-colors">{item.title}</h3>
              <p className="text-gray-500 group-hover:text-blue-100 transition-colors leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
