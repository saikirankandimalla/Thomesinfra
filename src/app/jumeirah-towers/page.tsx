"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { 
  Building2, Shield, Home, Sparkles, Phone, Mail, MapPin, 
  ChevronRight, Play, ArrowRight, CheckCircle2, Users, 
  TreeDeciduous, Dumbbell, Car, Wifi, Baby, Coffee, 
  Sun, Moon, Heart, Star, Send, Menu, X, RotateCcw, ZoomIn, ZoomOut, ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const amenities = [
  { icon: Building2, title: "Clubhouse", desc: "Premium social & event space" },
  { icon: Dumbbell, title: "Fitness Center", desc: "State-of-the-art gym equipment" },
  { icon: Sun, title: "Terrace Lounge", desc: "Skyline views & relaxation" },
  { icon: TreeDeciduous, title: "Green Spaces", desc: "Landscaped gardens & parks" },
  { icon: Baby, title: "Play Area", desc: "Safe children's playground" },
  { icon: Car, title: "Covered Parking", desc: "Secure multi-level parking" },
  { icon: Shield, title: "24/7 Security", desc: "CCTV & gated access" },
  { icon: Wifi, title: "Smart Living", desc: "High-speed connectivity" },
];

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80", alt: "Tower Exterior" },
  { src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80", alt: "Living Room" },
  { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80", alt: "Modern Kitchen" },
  { src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80", alt: "Master Bedroom" },
  { src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80", alt: "Swimming Pool" },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80", alt: "Fitness Center" },
];

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#0a0f1a]/95 backdrop-blur-xl shadow-2xl" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-500/50 transition-all text-white/70 hover:text-amber-400"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:inline">Back to Home</span>
            </Link>
            <div className="hidden sm:flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-white font-bold text-lg tracking-tight">Jumeirah Towers</div>
                <div className="text-amber-400/80 text-xs font-medium -mt-0.5">Premium Living</div>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {["about", "3d-view", "amenities", "lifestyle", "gallery", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="px-4 py-2 text-sm font-medium text-white/70 hover:text-amber-400 transition-colors capitalize"
              >
                {item === "3d-view" ? "3D View" : item}
              </button>
            ))}
          </div>

          {/* <div className="flex items-center gap-3">
            <a href="tel:+919000080980" className="hidden sm:flex items-center gap-2 text-amber-400 font-semibold">
              <Phone className="w-4 h-4" />
              +91 900 008 0980
            </a>
            <Button 
              onClick={() => scrollTo("contact")}
              className="bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-full px-6"
            >
              Contact Sales
            </Button>
            <button 
              className="md:hidden text-white p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div> */}
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-[#0a0f1a]/98 backdrop-blur-xl border-t border-white/10"
        >
          <div className="px-4 py-6 flex flex-col gap-2">
              {["about", "3d-view", "amenities", "lifestyle", "gallery", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item)}
                  className="px-4 py-3 text-left text-white/80 hover:text-amber-400 hover:bg-white/5 rounded-xl transition-colors capitalize font-medium"
                >
                  {item === "3d-view" ? "3D View" : item}
                </button>
              ))}
            </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

function HeroSection() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a]/60 via-[#0a0f1a]/40 to-[#0a0f1a] z-10" />
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
          alt="Jumeirah Towers"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-20 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 backdrop-blur-sm rounded-full text-amber-400 text-sm font-semibold border border-amber-500/30">
            <Sparkles className="w-4 h-4" />
            Premium Residential High-Rise in Mokila
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Jumeirah
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
            Towers
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-lg sm:text-xl md:text-2xl text-white/80 mb-10 max-w-3xl mx-auto font-light leading-relaxed"
        >
          Elegant residences in a gated community with world-class lifestyle amenities.
          Experience luxury living redefined.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button 
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            size="lg"
            className="bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-full px-10 py-7 text-lg shadow-[0_20px_50px_-12px_rgba(245,158,11,0.5)] hover:shadow-[0_25px_60px_-12px_rgba(245,158,11,0.6)] transition-all hover:scale-105"
          >
            Explore Project
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          {/* <Button 
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            size="lg"
            variant="outline"
            className="border-2 border-white/30 text-black hover:bg-white/10 rounded-full px-10 py-7 text-lg backdrop-blur-sm"
          >
            Contact Sales
            <Phone className="ml-2 w-5 h-5" />
          </Button> */}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-3 bg-amber-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function AboutSection() {
  const highlights = [
    { icon: Shield, title: "Gated Community", desc: "24/7 security & controlled access" },
    { icon: Sparkles, title: "Premium Finishes", desc: "Luxury interiors & fixtures" },
    { icon: Home, title: "Spacious Apartments", desc: "Thoughtfully designed layouts" },
    { icon: Building2, title: "Quality Construction", desc: "Built to last with premium materials" },
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-[#0a0f1a] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="text-amber-400 font-semibold text-sm tracking-widest uppercase mb-4 block">About The Project</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Where Luxury Meets
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600"> Community</span>
            </h2>
            <p className="text-lg text-white/60 max-w-3xl mx-auto leading-relaxed">
              Jumeirah Towers is a premium residential high-rise that blends modern architecture, 
              lifestyle comforts, and community living in Mokila. Designed for comfort, security, 
              and modern family living.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {highlights.map((item, index) => (
            <AnimatedSection key={item.title}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                className="group p-8 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-3xl border border-white/10 hover:border-amber-500/50 transition-all duration-500"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm">{item.desc}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function AmenitiesSection() {
  return (
    <section id="amenities" className="py-24 md:py-32 bg-[#080c14] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="text-amber-400 font-semibold text-sm tracking-widest uppercase mb-4 block">World-Class Amenities</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Everything You
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600"> Desire</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              From fitness to relaxation, we've curated premium amenities for an elevated lifestyle.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {amenities.map((amenity, index) => (
            <AnimatedSection key={amenity.title}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="group relative p-6 bg-gradient-to-br from-white/[0.08] to-transparent rounded-2xl border border-white/10 hover:border-amber-500/40 transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-500/30 transition-colors">
                    <amenity.icon className="w-6 h-6 text-amber-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{amenity.title}</h3>
                  <p className="text-sm text-white/50">{amenity.desc}</p>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function LifestyleSection() {
  const benefits = [
    { icon: Users, title: "Sense of Community", desc: "Connect with like-minded neighbors in a vibrant residential community." },
    { icon: Shield, title: "Safety & Security", desc: "Round-the-clock surveillance and gated entry for peace of mind." },
    { icon: MapPin, title: "Prime Connectivity", desc: "Easy access to schools, hospitals, shopping centers, and transport hubs." },
  ];

  return (
    <section id="lifestyle" className="py-24 md:py-32 bg-[#0a0f1a] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <div>
              <span className="text-amber-400 font-semibold text-sm tracking-widest uppercase mb-4 block">Lifestyle & Benefits</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Elevate Your
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600"> Everyday</span>
              </h2>
              <p className="text-lg text-white/60 mb-10 leading-relaxed">
                At Jumeirah Towers, every detail is designed to enhance your quality of life. 
                From seamless connectivity to a thriving community spirit, discover a lifestyle 
                that truly complements your aspirations.
              </p>

              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="flex gap-4"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-400/20 to-amber-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{benefit.title}</h3>
                      <p className="text-white/50 text-sm">{benefit.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-3xl blur-2xl" />
              <div className="relative rounded-3xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                  alt="Luxury Living"
                  width={600}
                  height={500}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

function WhyChooseSection() {
  const features = [
    { icon: Sparkles, title: "Luxury Comfort", desc: "Experience unparalleled luxury with premium finishes, spacious layouts, and attention to every detail." },
    { icon: Building2, title: "Modern Design", desc: "Contemporary architecture that stands out, with sustainable features and smart home integration." },
    { icon: Heart, title: "Community Living", desc: "A vibrant neighborhood where families thrive, with events, activities, and shared spaces." },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#080c14] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="text-amber-400 font-semibold text-sm tracking-widest uppercase mb-4 block">Why Choose Us</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              The Jumeirah
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600"> Difference</span>
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <AnimatedSection key={feature.title}>
              <motion.div
                whileHover={{ y: -10 }}
                className="group relative p-10 bg-gradient-to-br from-white/[0.06] to-transparent rounded-3xl border border-white/10 hover:border-amber-500/40 transition-all text-center"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-[0_20px_40px_-12px_rgba(245,158,11,0.4)]">
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-white/50 leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function Building3DSection() {
  const [building3DImage, setBuilding3DImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      const { data } = await supabase
        .from("jumeirah_settings")
        .select("value")
        .eq("key", "building_3d_image")
        .single();
      
      if (data?.value) {
        setBuilding3DImage(data.value);
      }
      setLoading(false);
    };
    fetchImage();
  }, []);

  useEffect(() => {
    if (!isAnimating) return;
    
    let angle = 0;
    const animate = () => {
      angle += 0.3;
      setRotation({
        x: Math.sin(angle * 0.01) * 5,
        y: Math.sin(angle * 0.02) * 15,
      });
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isAnimating]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || isAnimating) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotation({ x: -y * 20, y: x * 25 });
  };

  const handleMouseLeave = () => {
    if (!isAnimating) {
      setRotation({ x: 0, y: 0 });
    }
  };

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
    if (isAnimating) {
      setRotation({ x: 0, y: 0 });
    }
  };

  if (loading) {
    return (
      <section id="3d-view" className="py-24 md:py-32 bg-[#0a0f1a] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-[500px]">
            <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (!building3DImage) return null;

  return (
    <section id="3d-view" className="py-24 md:py-32 bg-[#0a0f1a] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <AnimatedSection>
          <div className="text-center mb-12">
            <span className="text-amber-400 font-semibold text-sm tracking-widest uppercase mb-4 block">3D Interactive View</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Explore The
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600"> Towers</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              {isAnimating ? "Auto-rotating 3D view" : "Move your cursor to rotate the building"}
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="relative" style={{ perspective: "1500px" }}>
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/30 via-amber-400/20 to-amber-500/30 rounded-[2rem] blur-3xl animate-pulse" />
            
            <div 
              ref={containerRef}
              className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0d1320] to-[#080c14] border border-white/10"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div 
                className="relative aspect-video md:aspect-[16/9] transition-transform duration-300 ease-out"
                style={{
                  transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(1.05)`,
                  transformStyle: "preserve-3d",
                }}
              >
                <Image
                  src={building3DImage}
                  alt="Jumeirah Towers 3D View"
                  fill
                  className="object-cover select-none pointer-events-none"
                  draggable={false}
                />
                
                <div 
                  className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-cyan-500/10 mix-blend-overlay"
                  style={{ transform: "translateZ(20px)" }}
                />
                
                <div 
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(${90 + rotation.y * 2}deg, rgba(245,158,11,0.15) 0%, transparent 50%, rgba(6,182,212,0.1) 100%)`,
                    transform: "translateZ(30px)",
                  }}
                />
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0f1a] via-[#0a0f1a]/80 to-transparent pointer-events-none" />
              
              <div className="absolute top-4 left-4 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-amber-500/30">
                <span className="text-amber-400 text-sm font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                  3D Interactive
                </span>
              </div>

              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <button
                  onClick={toggleAnimation}
                  className={`px-4 py-3 backdrop-blur-md rounded-xl border transition-all flex items-center gap-2 ${
                    isAnimating 
                      ? "bg-amber-500/20 border-amber-500/50 text-amber-400" 
                      : "bg-black/50 border-white/10 text-white/70 hover:text-amber-400 hover:border-amber-500/50"
                  }`}
                >
                  {isAnimating ? (
                    <>
                      <span className="w-3 h-3 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                      <span className="text-sm font-medium">Auto Rotate</span>
                    </>
                  ) : (
                    <>
                      <RotateCcw className="w-4 h-4" />
                      <span className="text-sm font-medium">Manual Mode</span>
                    </>
                  )}
                </button>
              </div>

              <div className="absolute bottom-4 left-4 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
                <span className="text-white/60 text-sm">
                  X: {rotation.x.toFixed(1)}° Y: {rotation.y.toFixed(1)}°
                </span>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-white/[0.08] to-transparent rounded-2xl p-6 border border-white/10 text-center">
                <div className="text-3xl font-bold text-amber-400 mb-1">G+14</div>
                <div className="text-white/50 text-sm">Floors</div>
              </div>
              <div className="bg-gradient-to-br from-white/[0.08] to-transparent rounded-2xl p-6 border border-white/10 text-center">
                <div className="text-3xl font-bold text-amber-400 mb-1">3 BHK</div>
                <div className="text-white/50 text-sm">Premium Units</div>
              </div>
              <div className="bg-gradient-to-br from-white/[0.08] to-transparent rounded-2xl p-6 border border-white/10 text-center">
                <div className="text-3xl font-bold text-amber-400 mb-1">360°</div>
                <div className="text-white/50 text-sm">View</div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-white/50 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-amber-400 text-xs">Move</span>
                </div>
                <span>Hover to rotate</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-amber-400 text-xs">Click</span>
                </div>
                <span>Toggle auto-rotate</span>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function GallerySection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="gallery" className="py-24 md:py-32 bg-[#0a0f1a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="text-amber-400 font-semibold text-sm tracking-widest uppercase mb-4 block">Visual Gallery</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              A Glimpse of
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600"> Luxury</span>
            </h2>
          </div>
        </AnimatedSection>

        <div className="relative">
          <div className="aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden relative">
            {galleryImages.map((img, index) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0 }}
                animate={{ opacity: index === activeIndex ? 1 : 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-transparent to-transparent" />
              </motion.div>
            ))}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {galleryImages.map((_, index) => (
                <Button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === activeIndex ? "bg-amber-400 w-8" : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-4">
            {galleryImages.map((img, index) => (
              <motion.button
                key={img.src}
                onClick={() => setActiveIndex(index)}
                whileHover={{ scale: 1.05 }}
                className={`relative aspect-square rounded-xl overflow-hidden ${
                  index === activeIndex ? "ring-2 ring-amber-400" : "opacity-60 hover:opacity-100"
                } transition-all`}
              >
                <Image src={img.src} alt={img.alt} fill className="object-cover" />
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          source: "Jumeirah Towers Page",
        }),
      });

      if (response.ok) {
        toast.success("Thank you! Our team will contact you shortly.");
        setFormData({ name: "", phone: "", email: "", message: "" });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#080c14] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16">
          <AnimatedSection>
            <div>
              <span className="text-amber-400 font-semibold text-sm tracking-widest uppercase mb-4 block">Get In Touch</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Start Your Journey
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600"> Today</span>
              </h2>
              <p className="text-lg text-white/60 mb-10">
                Ready to experience luxury living? Contact our sales team for exclusive offers, 
                site visits, and detailed project information.
              </p>

              <div className="space-y-6">
                {/* <a href="tel:+919000080980" className="flex items-center gap-4 group">
                  <div className="w-14 h-14 bg-amber-500/20 rounded-2xl flex items-center justify-center group-hover:bg-amber-500/30 transition-colors">
                    <Phone className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-white/50 text-sm">Call Us</div>
                    <div className="text-white text-xl font-bold">+91 900 008 0980</div>
                  </div>
                </a> */}

                {/* <a href="mailto:info@jumeirahtowers.in" className="flex items-center gap-4 group">
                  <div className="w-14 h-14 bg-amber-500/20 rounded-2xl flex items-center justify-center group-hover:bg-amber-500/30 transition-colors">
                    <Mail className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-white/50 text-sm">Email Us</div>
                    <div className="text-white text-xl font-bold">info@jumeirahtowers.in</div>
                  </div>
                </a> */}

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-amber-500/20 rounded-2xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-white/50 text-sm">Location</div>
                    <div className="text-white text-xl font-bold">Mokila, Hyderabad</div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <form onSubmit={handleSubmit} className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm p-8 md:p-10 rounded-3xl border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">Request a Callback</h3>
              
              <div className="space-y-5">
                <div>
                  <Input
                  
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 h-14 rounded-xl focus:border-amber-500"
                  />
                </div>
                <div>
                  <Input
                    type="tel"
                  
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 h-14 rounded-xl focus:border-amber-500"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 h-14 rounded-xl focus:border-amber-500"
                  />
                </div>
                <div>
                  <Textarea
                   
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl focus:border-amber-500 resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold rounded-xl text-lg shadow-[0_20px_40px_-12px_rgba(245,158,11,0.4)] transition-all hover:scale-[1.02]"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Submitting...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Request Brochure
                      <Send className="w-5 h-5" />
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className="py-12 bg-[#050810] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-white font-bold">Jumeirah Towers</div>
              <div className="text-white/40 text-xs">by T-Homes Infra</div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-white/50 text-sm">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <Link href="/projects" className="hover:text-amber-400 transition-colors">Projects</Link>
            <Link href="/about" className="hover:text-amber-400 transition-colors">About</Link>
            <Link href="/contact" className="hover:text-amber-400 transition-colors">Contact</Link>
          </div>

          <div className="text-white/30 text-sm">
            © 2025 T-Homes Infra. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

function MobileCTA() {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-gradient-to-t from-[#0a0f1a] via-[#0a0f1a]/95 to-transparent md:hidden"
    >
      {/* <div className="flex gap-3">
        <a href="tel:+919000080980" className="flex-1">
          <Button variant="outline" className="w-full h-14 border-amber-500/50 text-amber-400 rounded-xl font-bold">
            <Phone className="w-5 h-5 mr-2" />
            Call Now
          </Button>
        </a>
        <Button 
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          className="flex-1 h-14 bg-amber-500 hover:bg-amber-400 text-black rounded-xl font-bold"
        >
          Enquire Now
        </Button>
      </div> */}
    </motion.div>
  );
}

export default function JumeirahTowersPage() {
  return (
    <main className="min-h-screen bg-[#0a0f1a] selection:bg-amber-500 selection:text-black">
      <StickyNav />
      <HeroSection />
      <AboutSection />
      <Building3DSection />
      <AmenitiesSection />
      <LifestyleSection />
      <WhyChooseSection />
      <GallerySection />
      <ContactSection />
      <FooterSection />
      <MobileCTA />
    </main>
  );
}
