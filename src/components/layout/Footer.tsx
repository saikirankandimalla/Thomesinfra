"use client";

import React from "react";
import Link from "next/link";
import NextImage from "next/image";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <footer className="bg-[#0a1628] pt-24 pb-12 text-white border-t border-white/5" />;
  }

  return (
    <footer className="bg-[#0a1628] pt-24 pb-12 text-white overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-8">
            <div className="relative h-25 w-48 brightness-0 invert">
                <NextImage
                  src="https://thomesinfra.com/wp-content/uploads/2026/02/T-Homes-Logo-1.png"
                  alt="THomes Infra Logo"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
            </div>
            <p className="text-white/50 leading-relaxed">
              Leading the way in premium real estate developments in Hyderabad. Delivering excellence and trust since 2014.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-amber-500 hover:border-amber-500 hover:text-black transition-all group">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8 text-amber-400">Quick Links</h4>
            <ul className="space-y-4 text-white/50">
              <li><Link href="/about" className="hover:text-amber-400 transition-colors">About Us</Link></li>
              <li><Link href="/projects" className="hover:text-amber-400 transition-colors">Our Projects</Link></li>
              <li><Link href="/projects?filter=ongoing" className="hover:text-amber-400 transition-colors">Ongoing Projects</Link></li>
              <li><Link href="/contact" className="hover:text-amber-400 transition-colors">Contact Us</Link></li>
              <li><Link href="/admin" className="hover:text-amber-400 transition-colors">Admin Portal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8 text-amber-400">Our Presence</h4>
            <ul className="space-y-4 text-white/50">
              <li>Spark Vision @ Kondurg</li>
              <li>Spark City @ Balanagar</li>
              <li>Valley View @ Kadthal</li>
              <li>Yadadri Icon @ Raigiri</li>
              <li>Star City @ Bhongir</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8 text-amber-400">Newsletter</h4>
            <p className="text-white/50 mb-6">Subscribe to get updates on new project launches.</p>
            <div className="flex gap-2">
              <Input placeholder="Email" className="bg-white/5 border-transparent rounded-xl focus:border-amber-500 text-white" />
              <Button className="bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl px-6">Join</Button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/30">
          <p>© {mounted ? new Date().getFullYear() : "2024"} THomes Infra Pvt. Ltd. All Rights Reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
