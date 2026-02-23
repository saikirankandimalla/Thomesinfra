"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ExternalLink, MapPin, Building2, Calendar, CheckCircle } from "lucide-react";

const ongoingProjects = [
  {
    id: "th-20",
    title: "Spark Vision",
    location: "Kondurg",
    approval: "DTCP Approved",
    image: "https://images.unsplash.com/photo-1500382017468-9049fee74a62?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "th-19",
    title: "Spark City",
    location: "Balanagar",
    approval: "MUDA Approved",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "th-18",
    title: "Valley View",
    location: "Kadthal",
    approval: "DTCP Approved",
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "th-08",
    title: "Yadadri Icon",
    location: "Raigiri",
    approval: "YTDA Approved",
    image: "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=800",
  },
];

const completedProjects = [
  { year: "2014-2016", title: "HMDA Star City", location: "Bhongir" },
  { year: "2016-2018", title: "Star City 4", location: "Chinnakandukuru" },
  { year: "2018-2020", title: "Raigiri Phase I", location: "YTDA Area" },
  { year: "2020-2022", title: "Buddha Hills", location: "HMDA Area" },
];

function ProjectCard({ project }: { project: typeof ongoingProjects[0] }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative aspect-[4/5] w-full rounded-3xl bg-white shadow-xl overflow-hidden cursor-pointer group"
    >
      <div
        style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}
        className="absolute inset-4 rounded-2xl overflow-hidden bg-gray-100"
      >
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      <div
        style={{ transform: "translateZ(100px)" }}
        className="absolute bottom-8 left-8 right-8 text-white"
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-blue-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
            {project.approval}
          </span>
        </div>
        <h3 className="text-2xl font-bold mb-1">{project.title}</h3>
        <div className="flex items-center gap-1 text-gray-300 text-sm">
          <MapPin className="h-3 w-3" />
          {project.location}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="ongoing" className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-blue-900 font-bold uppercase tracking-widest text-sm mb-4 block"
            >
              Our Portfolio
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-gray-900"
            >
              Ongoing <span className="text-blue-900">Elite Projects</span>
            </motion.h2>
          </div>
          <p className="max-w-md text-gray-500 text-lg">
            Strategically located developments designed to provide maximum appreciation and luxury lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {ongoingProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        <div id="completed" className="relative">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-blue-900 font-bold uppercase tracking-widest text-sm mb-4 block"
            >
              History of Trust
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-gray-900"
            >
              Successfully <span className="text-blue-900">Delivered</span>
            </motion.h2>
          </div>

          <div className="max-w-4xl mx-auto">
            {completedProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-8 mb-12 last:mb-0 group"
              >
                <div className="hidden md:block w-32 text-right">
                  <span className="text-xl font-bold text-blue-900 opacity-40 group-hover:opacity-100 transition-opacity">
                    {project.year}
                  </span>
                </div>
                <div className="relative flex-1 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-100 transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                      <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                        <MapPin className="h-3 w-3" />
                        {project.location}
                      </div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
