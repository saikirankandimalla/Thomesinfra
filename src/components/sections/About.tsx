"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, History, Award, Map as MapIcon } from "lucide-react";

const stats = [
  { label: "Completed Projects", value: "25+", icon: History },
  { label: "Acres Developed", value: "1000+", icon: MapIcon },
  { label: "Happy Clients", value: "10K+", icon: Users },
  { label: "Strong Teams", value: "2K+", icon: Award },
];

export function About() {
  return (
    <section
      id="about"
      className="relative py-28 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-20">

          {/* ================= LEFT CONTENT ================= */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <span className="text-blue-900 font-semibold uppercase tracking-[0.25em] text-xs mb-5 block">
              Our Story
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              Pioneering Excellence in{" "}
              <span className="text-blue-900 relative">
                Real Estate
                <span className="absolute -bottom-2 left-0 w-full h-3 bg-blue-200/60 -z-10 rounded-md"></span>
              </span>
            </h2>

            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              T Homes Infra Pvt. Ltd. was established in 2014 with a clear vision - to deliver quality
real estate solutions built on trust and long-term value. From the beginning, our focus
has been simple: choose the right locations, follow the right process, and protect the
buyer’s interest at every step. We believe real estate should be transparent, legally secure,
and guided by integrity. This commitment to clarity and disciplined development has
made us a trusted name for clear title residential plots on Warangal Highway and
reliable land investments across Telangana, including emerging growth zones like
Kondurg.
            </p>

   {/* <p className="text-lg text-gray-600 mb-10 leading-relaxed">
             We specialize in HMDA, DTCP, and YTDA-MUDA approved open plots, with a
strong portfolio of HMDA approved plots at Warangal Highway and carefully planned
layouts in Kondurg. With over 500 acres developed across these fast-growing corridors,
we identify high appreciation plots on Warangal Highway and other promising
locations by closely studying infrastructure expansion, connectivity upgrades, and long-
term growth indicators. For us, every project represents a strategic land investment
opportunity - not just a sale, but a secure foundation for families building assets that
grow stronger over time.
            </p> */}
        

            {/* ===== Stats Cards ===== */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition"
                >
                  <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                    <stat.icon className="h-5 w-5 text-blue-900" />
                  </div>

                  <div className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ================= RIGHT VISUAL ================= */}
          <div className="lg:w-1/2 relative">

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative aspect-square rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.25)]"
            >
              {/* VIDEO */}
              <video
                src="/VENTURE.webm"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-cover scale-105"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Glass Card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20 text-white shadow-lg"
              >
                <div className="text-xl font-semibold mb-1">
                  Building Futures Together
                </div>
                <div className="text-sm opacity-80">
                  Trusted by 10000+ Families
                </div>
              </motion.div>
            </motion.div>

            {/* Decorative background glows */}
            <div className="absolute -top-14 -right-14 h-52 w-52 bg-blue-200 rounded-full blur-3xl opacity-40 -z-10" />
            <div className="absolute -bottom-14 -left-14 h-64 w-64 bg-green-200 rounded-full blur-3xl opacity-40 -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
}