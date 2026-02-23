"use client";
import { useState, useEffect } from "react";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { JSX } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  Users, History, Award, MapPin, Building2, Target, Eye, Heart, 
  ShieldCheck, BadgeCheck, Clock, Phone, ChevronRight, Facebook, Twitter, Linkedin, Instagram,
  Mail,
  Gem,
  HeartHandshake,
  TrendingUp
} from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const team = [
   {
    name: "N.Vykunta Rao",
    role: "Managing Director",
    image: "https://thomesinfra.com/wp-content/uploads/2026/01/Untitled-1-scaled-e1760606533590.webp",
    description: "Leading with vision and integrity to build a legacy of trust and quality."
  },
   {
    name: "GAMPA NAGESHWER RAO",
    role: "chief mentor",
    image: "https://thomesinfra.com/wp-content/uploads/2023/11/Gampa-2.png",
    description: "Guiding strategic vision with experience, clarity, and disciplined oversight."
  },
  {
   name: "B.RAJASHEKAR",
    role: "Vice President",
    image: "https://thomesinfra.com/wp-content/uploads/2026/01/1.png",
    description: "Crafting brand stories and building lasting relationships."
  }
 
 
  // {
  //   name: "KSD MURTHY",
  //   role: "BDM",
  //   image: "https://thomesinfra.com/wp-content/uploads/2026/01/3.png",
  //   description: "Crafting brand stories and building lasting relationships."
  // },
  // {
  //   name: "DESHWANT",
  //   role: "BDM",
  //   image: "https://thomesinfra.com/wp-content/uploads/2026/01/IMG-20241118-WA00142.jpg-scaled.jpeg",
  //   description: "Expert in project planning and strategic execution."
  // },
  // {
  //  name: "G. PRIYA",
  //   role: "BDM",
  //   image: "https://thomesinfra.com/wp-content/uploads/2026/01/5.png",
  //   description: "Crafting brand stories and building lasting relationships."
  // },
  // {
  //  name: "K. CHITRA",
  //   role: "BDM",
  //   image: "https://thomesinfra.com/wp-content/uploads/2025/10/NRJ0067-scaled.jpg",
  //   description: "Crafting brand stories and building lasting relationships."
  // },
  
  // {
  //    name: "SATYANARAYANA",
  //   role: "ACCOUNTAS",
  //   image: "https://thomesinfra.com/wp-content/uploads/2025/11/accounts1-2.jpg",
  //   description: "Crafting brand stories and building lasting relationships."
  // },
  // {
  //   name: "D V V B. MANIKANTA",
  //   role: "ACCOUNTS",
  //   image: "https://thomesinfra.com/wp-content/uploads/2026/01/7.png",
  //   description: "Ensuring quality standards across all development sites."
  // }
];


const stats = [
  { label: "Year Established", value: "2014", icon: History },
  { label: "Acres Developed", value: "500+", icon: MapPin },
  { label: "Happy Clients", value: "1000+", icon: Users },
  { label: "Projects Delivered", value: "20+", icon: Building2 },
];



const values = [
  {
    icon: HeartHandshake,
    title: "Customer First",
    description:
      "Every decision is filtered through the investor’s interest. We keep customer interest above all."
  },
  {
    icon: Gem,
    title: "Quality Without Compromise",
    description: "Development standards are never diluted."
  },
  {
    icon: Eye,
    title: "Visible Transparency & Accountability",
    description: "Information is open, accessible, and consistent."
  },
  
  {
    icon: Users,
    title: "Collaboration and Fairness",
    description: "Channel partners are collaborators, not intermediaries."
  },
  
  {
    icon: TrendingUp,
    title: "Responsible Growth",
    description: "We grow ethically and punctually. Timeliness is paramount."
  },
   {
    icon: ShieldCheck,
    title: "Trust Above All",
    description: "No shortcuts. No hidden facts. No dual pricing."
  }
];


const timeline = [
  { year: "2014", title: "Company Founded", description: "T Homes Infra Pvt Ltd established in Hyderabad with a vision to deliver quality real estate." },
  { year: "2015", title: "Star City Phase 1", description: "Successfully launched and delivered our first project in Bhongir." },
  { year: "2017", title: "500+ Plots Sold", description: "Crossed the milestone of 500 happy customers across multiple projects." },
  { year: "2019", title: "Expansion to Yadadri", description: "Expanded operations to Yadadri region with YTDA approved projects." },
  { year: "2021", title: "1000+ Families", description: "Reached 1000+ satisfied families and 20+ successful project deliveries." },
  { year: "2024", title: "Premium Ventures", description: "Launching premium projects in IT corridors and metro-connected areas." },
];

export default function AboutPage() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Banner */}
      <section className="relative pt-20 pb-32 bg-[#0a1628] overflow-hidden">
        <div className="absolute inset-0 opacity-0">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200"
            alt="Building"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/90 to-[#0a1628]/70" />
        
        <div className="container relative z-10 mx-auto px-4 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-amber-500/20 text-amber-400 text-sm font-semibold mb-6">
              About Us
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              Built with Integrity.,<br />
              <span className="text-amber-400">Grown with Purpose.</span>
            </h1>
            <p className="text-xl text-white/60 leading-relaxed">
              {/* Since 2014, T Homes Infra has been transforming the real estate landscape of Hyderabad 
              with premium, government-approved plots that deliver exceptional value and growth. */}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-16 z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 text-center"
              >
                <div className="h-14 w-14 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-7 w-7 text-amber-600" />
                </div>
                <div className="text-3xl font-black text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-amber-600 font-bold uppercase tracking-widest text-sm mb-4 block">Our Story</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                A Decade of Excellence in <span className="text-amber-600">Real Estate</span>
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Since 2014, we have been shaping land investments with clarity, discipline, and long-
term vision. What began as a focused real estate initiative in Hyderabad has grown into
a trusted name in government-approved plotted developments, offering HMDA,
DTCP, and YTDA-MUDA approved open plots across carefully selected growth
corridors.
                </p>
                <p>
                 We identify the right locations, secure the right approvals, and create opportunities that
stand the test of time - delivering secure, high-potential assets for families seeking long-
term value.
                </p>
               
              </div>
              <Link href="/projects">
                <Button className="mt-10 h-14 rounded-full bg-amber-500 hover:bg-amber-600 text-black px-8 font-bold">
                  View Our Projects
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000"
                  alt="Real Estate Development"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-amber-500 text-black p-8 rounded-3xl shadow-xl max-w-xs">
                <div className="text-5xl font-black mb-2">10+</div>
                <div className="text-lg font-semibold">Years of Trust & Excellence</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100"
            >
              <div className="h-16 w-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
              To create wealth for tomorrow through transparent, responsible land ownership. 
Grow as a regionally rooted and globally respected real estate developers with presence across geographies, and in a million hearts. 
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#0a1628] p-10 rounded-3xl text-white"
            >
              <div className="h-16 w-16 bg-amber-500 rounded-2xl flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
              <p className="text-white/70 text-lg leading-relaxed">
               To identify future growth locations early and make them available for long-term ownership, 
while ensuring its safety, transparency and value.   


              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
    
<section className="py-24 bg-white">
  <div className="container mx-auto px-4 text-center">
    <span className="text-amber-600 font-bold uppercase tracking-widest text-sm mb-4 block">
      What We Stand For
    </span>

    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16">
      Our Core Values
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {values.map((value) => (
        <div
          key={value.title}
          className="group p-8 rounded-3xl bg-gray-50 hover:bg-amber-500 transition-all duration-300 shadow-sm hover:shadow-xl"
        >
          {value.icon && (
            <div className="h-14 w-14 mx-auto mb-6 rounded-2xl bg-white flex items-center justify-center shadow-sm group-hover:bg-amber-400 transition-all">
              <value.icon className="h-7 w-7 text-amber-600 group-hover:text-black transition-colors" />
            </div>
          )}

          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-black transition-colors">
            {value.title}
          </h3>

          <p className="text-gray-600 group-hover:text-black/80 leading-relaxed transition-colors">
            {value.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Leadership Messages */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-amber-600 font-bold uppercase tracking-widest text-sm mb-4 block">Our Leadership</h2>
            {/* <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Messages From Our Directors</h2> */}
          </div>
          <div className="space-y-24">
            {/* MD Section */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-12 gap-12 items-center"
            >
              <div className="lg:col-span-5">
                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl group">
                  <Image
                    src="https://thomesinfra.com/wp-content/uploads/2025/10/NRJ0403-scaled.jpg"
                    alt="Mr.Vykunta Rao. - MD"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-8 left-8">
                    <div className="text-white text-3xl font-bold">Mr.Vykunta Rao</div>
                    <div className="text-amber-400 font-medium">Chairman & Managing Director</div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7 space-y-8">
                <div className="relative">
                  <div className="absolute -top-10 -left-6 text-amber-500/10 text-[12rem] font-serif leading-none select-none">"</div>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                    Transforming the Vision of <span className="text-amber-600">Land Ownership</span> Into Reality
                  </h3>
                </div>
                <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                  <p>
                    Mr. Vykunta Rao founded T Homes Infra in 2014 with a clear belief - that owning land
is not just an investment, but a step toward stability, dignity, and happiness. He
strongly believes that every family deserves a place to call their own, and that secure land
ownership is the foundation of long-term peace of mind.

With a disciplined approach and deep understanding of Hyderabad’s growth corridors,
he focuses on identifying the right locations before they become crowded or overpriced.
His leadership is built on integrity, transparency, and responsible development. Under
his guidance, T Homes Infra has grown steadily by prioritizing legal clarity, thoughtful
planning, and customer trust.

                  </p>
                  <p>
                    For him, success is not measured only in acres developed, but in the number of families
who feel secure and confident in their investment.
                  </p>
                </div>
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-amber-500 flex items-center justify-center text-black font-bold">NVR</div>
                    <div>
                      <div className="font-bold text-gray-900">Mr.Vykunta Rao.</div>
                      <div className="text-sm text-gray-500">Managing Director, T Homes Infra</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CEO/ED Section */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-12 gap-12 items-center"
            >
              <div className="lg:col-span-7 order-2 lg:order-1 space-y-8 text-right">
                <div className="relative">
                  <div className="absolute -top-10 -right-6 text-amber-500/10 text-[12rem] font-serif leading-none select-none">"</div>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                    Committed to <span className="text-amber-600">Excellence</span> and Customer Growth
                  </h3>
                </div>
                <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                  <p>
                    With years of experience and deep industry insight, Mr. Gampa Nageshwer Rao plays a
                    vital role in guiding the strategic direction of the company. As Chief Mentor, he
                    rovides clarity, foresight, and disciplined oversight across all major decisions and
                    developments.
                  </p>
                  <p>
                    He strongly believes that real estate must be built on compliance, responsibility, and
                    long-term thinking. His mentorship ensures that every project maintains high standards
                    of legal accuracy, structured planning, and sustainable growth.
                    By combining experience with practical wisdom, he helps the organization stay focused
                    on what truly matters - protecting customer trust and delivering lasting value.
                  </p>
                </div>
                <div className="pt-6 border-t border-gray-200 flex justify-end">
                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <div className="font-bold text-gray-900">Gampa Nageshwer Rao</div>
                      <div className="text-sm text-gray-500">Chief Mentor</div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-amber-500 flex items-center justify-center text-black font-bold">GNR</div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5 order-1 lg:order-2">
                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl group">
                  <Image
                    src="https://thomesinfra.com/wp-content/uploads/2025/10/NRJ0643-scaled.jpg"
                    alt="Gampa Nageshwer Rao - Chief Mentor"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-8 right-8 text-right">
                    <div className="text-white text-3xl font-bold">Gampa Nageshwer Rao</div>
                    <div className="text-amber-400 font-medium">Chief Mentor</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-amber-600 font-bold uppercase tracking-widest text-sm mb-4 block">Our Team</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">The Minds Behind <span className="text-amber-600">T Homes</span></h2>
            </div>
            <p className="text-gray-500 max-w-md text-lg">
              Our dedicated professionals bring decades of experience to ensure your investment is in safe hands.
            </p>
          </div>

          <div className="relative px-12">
            <Carousel
              setApi={setApi}
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 2000,
                  stopOnInteraction: true,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent>
                {team.map((member, index) => (
                  <CarouselItem key={member.name} className="md:basis-1/2 lg:basis-1/3 pl-6">
                    <motion.div 
                      className="group bg-gray-50 rounded-[2.5rem] p-4 h-full border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:bg-white cursor-pointer"
                      whileHover={{ y: -10 }}
                      onClick={() => {
                        api?.plugins().autoplay?.stop();
                      }}
                    >
                      <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-6">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* <div className="absolute top-6 right-6 bg-black/50 backdrop-blur-md text-white px-4 py-1 rounded-full text-xs font-bold">
                          {String(index + 1).padStart(2, '0')} / {String(team.length).padStart(2, '0')}
                        </div> */}
                      </div>
                      <div className="px-4 pb-6 text-center">
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
                        <p className="text-amber-600 font-semibold mb-4 text-sm uppercase tracking-wider">{member.role}</p>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                          {member.description}
                        </p>
                        {/* <div className="flex items-center justify-center gap-4">
                          {[{ Icon: Linkedin, name: "LinkedIn" }, { Icon: Twitter, name: "Twitter" }, { Icon: Facebook, name: "Facebook" }].map((social, i) => (
                            <button key={i} type="button" title={`Visit ${social.name}`} className="h-10 w-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all">
                              <social.Icon className="h-4 w-4" />
                            </button>
                          ))}
                        </div> */}
                         {/* <div className="flex items-center justify-center gap-4">
                          {[ { Icon:Mail, name: "Mail" }].map((social, i) => (
                            <button key={i} type="button" title={`Visit ${social.name}`} className="h-10 w-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all">
                              <social.Icon className="h-4 w-4" />
                            </button>
                          ))}
                        </div> */}
                      </div> 
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              {/* <div className="flex items-center justify-center gap-8 mt-12">
                <CarouselPrevious className="static translate-y-0 h-14 w-14 bg-white border-2 border-gray-100 text-gray-900 hover:bg-amber-500 hover:border-amber-500 transition-all shadow-lg" />
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-black text-gray-900">
                    {String(current).padStart(2, '0')}
                  </span>
                  <div className="w-12 h-[2px] bg-amber-500" />
                  <span className="text-xl font-bold text-gray-400">
                    {String(count).padStart(2, '0')}
                  </span>
                </div>
                <CarouselNext className="static translate-y-0 h-14 w-14 bg-white border-2 border-gray-100 text-gray-900 hover:bg-amber-500 hover:border-amber-500 transition-all shadow-lg" />
              </div> */}
            </Carousel>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-[#0a1628]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-amber-400 font-bold uppercase tracking-widest text-sm mb-4 block">Our Journey</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Milestones & Achievements</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-8 mb-12 last:mb-0"
              >
                <div className="w-24 flex-shrink-0 text-right">
                  <span className="text-2xl font-black text-amber-400">{item.year}</span>
                </div>
                <div className="relative flex-1 pb-12 border-l-2 border-white/20 pl-8">
                  <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-amber-500" />
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/60">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-amber-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
            Ready to Start Your Investment Journey?
          </h2>
          <p className="text-xl text-black/70 mb-10 max-w-2xl mx-auto">
            Join 1000+ families who have trusted T Homes Infra for their real estate investments.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/projects">
              <Button size="lg" className="h-16 rounded-full bg-black hover:bg-gray-900 text-white px-10 text-lg font-bold">
                Explore Projects
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="h-16 rounded-full border-2 border-black text-black hover:bg-black/10 px-10 text-lg font-bold">
                <Phone className="mr-2 h-5 w-5" />
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
