"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Building2, Home, BadgeCheck, Headset, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

export const LoanAssistance = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const floatingVariants = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left Content */}
          <div className="relative">
            <div className="absolute -left-4 -top-4 w-24 h-24 bg-blue-50 rounded-full blur-3xl opacity-60" />
            <div className="relative bg-white/40 backdrop-blur-md border border-white/20 p-8 md:p-12 rounded-[2rem] shadow-xl shadow-blue-500/5">
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-bold tracking-wide uppercase mb-6">
                Financing Support
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
                Easy Loan Facility <br />
                <span className="text-blue-600">Available</span>
              </h2>
              <p className="text-lg text-slate-500 mb-8 font-medium">
                Company Support for All Customers
              </p>

              <div className="space-y-4 mb-10">
                {[
                  "DTCP Approved Layout",
                  "Bank Loan Assistance Available",
                  "Company Guided Documentation Support",
                  "Fast Approval Process",
                  "Trusted Developer – Spark City",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-center gap-3 group"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className="text-slate-700 font-semibold">{item}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Button className="h-14 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-600/20 hover:scale-105 transition-all duration-300">
                  Check Loan Eligibility
                </Button>
                <Button variant="outline" className="h-14 px-8 rounded-2xl border-2 border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all duration-300">
                  Contact for Loan Support
                </Button>
              </div>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative lg:h-[600px] flex items-center justify-center">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[100px] opacity-40 animate-pulse" />
            
            {/* 3D-like Composition */}
            <div className="relative w-full max-w-lg aspect-square">
              {/* Central Map Illustration */}
              <motion.div
                variants={floatingVariants}
                animate="animate"
                className="absolute inset-0 bg-gradient-to-br from-white to-blue-50 rounded-[3rem] shadow-2xl border border-white p-8 flex flex-col justify-center items-center overflow-hidden"
              >
                {/* Simulated Grid/Map */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                  style={{ backgroundImage: 'radial-gradient(#1e40af 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
                />
                
                <div className="grid grid-cols-3 gap-4 w-full h-full opacity-20">
                   {[...Array(9)].map((_, i) => (
                     <div key={i} className="bg-slate-200 rounded-lg animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                   ))}
                </div>
              </motion.div>

              {/* Floating Icons */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  x: [0, 10, 0],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 w-32 h-32 bg-white rounded-3xl shadow-xl border border-blue-50 flex flex-col items-center justify-center p-4 z-10"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-2">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Bank Approved</span>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 25, 0],
                  x: [0, -15, 0],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 -left-12 w-28 h-28 bg-white rounded-3xl shadow-xl border border-blue-50 flex flex-col items-center justify-center p-4 z-10"
              >
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-2">
                  <BadgeCheck className="w-6 h-6 text-emerald-600" />
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">DTCP Certified</span>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, -30, 0],
                  x: [0, -20, 0],
                }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-8 left-1/4 w-36 h-36 bg-white rounded-3xl shadow-xl border border-blue-50 flex flex-col items-center justify-center p-4 z-10"
              >
                <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-2">
                  <Home className="w-8 h-8 text-amber-600" />
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Ready to Build</span>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 20, 0],
                  x: [0, 30, 0],
                }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-1/4 -right-12 w-40 h-24 bg-white rounded-3xl shadow-xl border border-blue-50 flex items-center gap-4 px-4 z-10"
              >
                <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center">
                  <Headset className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Agent Support</div>
                  <div className="text-[10px] text-slate-400">Available 24/7</div>
                </div>
              </motion.div>

              {/* Central Hero Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-32 h-32 bg-blue-600 rounded-[2rem] shadow-2xl shadow-blue-600/40 flex items-center justify-center rotate-12">
                    <Wallet className="w-16 h-16 text-white -rotate-12" />
                 </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
