"use client";

import React from "react";
import { motion } from "framer-motion";
import { Landmark, ShieldCheck, FileCheck, Building2 } from "lucide-react";
import Image from "next/image";
const bankApprovals = [
  { name: "HDFC Bank", logo: "https://cdn.brandfetch.io/idxQAAj1t_/idvhfX_wJX.svg?c=1dxbfHSJFAPEGdCLU4o5B" },
  { name: "SBI", logo: "https://cdn.brandfetch.io/id-3TXkPxs/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B" },
  { name: "ICICI Bank", logo: "https://cdn.brandfetch.io/idJHpX8apR/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B" },
  { name: "LIC HFL", logo: "/LICHFL.svg" },
  { name: "IDBI Bank", logo: "https://cdn.brandfetch.io/idCZx_hlov/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B" },
  { name: "AXIS Bank", logo: "https://cdn.brandfetch.io/id78YVtrRp/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B" },
];

const certifications = [
  { name: "HMDA Approved", icon: ShieldCheck, desc: "Hyderabad Metropolitan Development Authority" },
  { name: "DTCP Approved", icon: FileCheck, desc: "Directorate of Town and Country Planning" },
  { name: "RERA Registered", icon: Building2, desc: "Real Estate Regulatory Authority" },
  { name: "YTDA Approved", icon: Landmark, desc: "Yadagirigutta Temple Development Authority" },
];

export function TrustBadges() {
  return (
    <section className="py-20 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4">
        {/* SECTION HEADER */}
<div className="text-center mb-16">
  <motion.span
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    className="text-blue-900 font-bold uppercase tracking-widest text-sm mb-4 block"
  >
    Trust & Transparency
  </motion.span>

  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    className="text-3xl md:text-4xl font-bold text-gray-900"
  >
    Approved by Major{" "}
    <span className="text-blue-900">
      Financial Institutions
    </span>
  </motion.h2>
</div>


{/* BANK LOGOS GRID */}

<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-24">

  {bankApprovals.map((bank, index) => (
    <motion.div
      key={bank.name}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
     className="
  flex items-center justify-center
  p-6 bg-white rounded-2xl
  border border-border

  transition-all duration-300 ease-out

  hover:shadow-[0_0_25px_rgba(55,58,143,0.35)]
  hover:border-primary
  hover:-translate-y-1

  group
"

    >

      <div className="relative h-12 w-28">

        <Image
          src={bank.logo}
          alt={bank.name}
          fill
          className="
            object-contain
            opacity-100
            group-hover:opacity-100
            transition-all duration-300
          "
        />

      </div>

    </motion.div>
  ))}

</div>



{/* STATUTORY AUTHORITIES HEADER */}
<div className="text-center mb-12">

  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    className="text-3xl md:text-4xl font-bold text-gray-900"
  >
    Approved by{" "}
    <span className="text-blue-900">
      Government & Statutory Authorities
    </span>
  </motion.h2>

</div>


{/* CERTIFICATIONS GRID */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

  {certifications.map((cert, index) => (
    <motion.div
      key={cert.name}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="
        flex items-start gap-4
        p-6 rounded-2xl
        bg-blue-50/50
        border border-blue-100
        hover:shadow-md
        transition-all duration-300
      "
    >
      <div className="h-12 w-12 rounded-xl bg-blue-900 flex items-center justify-center shrink-0">
        <cert.icon className="h-6 w-6 text-white" />
      </div>

      <div>
        <h4 className="font-bold text-gray-900 mb-1">
          {cert.name}
        </h4>

        <p className="text-sm text-gray-500 leading-tight">
          {cert.desc}
        </p>
      </div>

    </motion.div>
  ))}

</div>


        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mt-12 text-gray-500 text-sm italic"
        >
          * All our projects are 100% legally verified and RERA compliant.
        </motion.p>
      </div>
    </section>
  );
}
