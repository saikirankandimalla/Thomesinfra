"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Send, ChevronRight, MessageCircle } from "lucide-react";
import { toast, Toaster } from "sonner";
import { supabase } from "@/lib/supabase";

export default function ContactPage() {
  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      toast.error("Please fill in required fields");
      return;
    }

    setSubmitting(true);

    const { error } = await supabase.from("inquiries").insert([{
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      message: formData.message,
      status: "new"
    }]);

    if (error) {
      toast.error("Failed to submit. Please try again.");
    } else {
      toast.success("Thank you! We'll contact you shortly.");
      setFormData({ name: "", phone: "", email: "", message: "" });
    }

    setSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Toaster position="top-center" />
      
      {/* Hero */}
      <section className="relative pt-20 pb-32 bg-[#0a1628] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200"
            alt="Contact"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/80 to-[#0a1628]" />
        
        <div className="container relative z-10 mx-auto px-4 pt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-amber-500/20 text-amber-400 text-sm font-semibold mb-6">
              Get in Touch
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
              Let's Build Your <span className="text-amber-400">Future</span>
            </h1>
            <p className="text-xl text-white/60">
              Have questions about our projects? Want to schedule a site visit? 
              Our team is here to help you find the perfect investment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      {/* <section className="relative -mt-16 z-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {[ */}
              {/* // { icon: Phone, title: "Call Us", value: "+91 91212 12121", subtitle: "Mon-Sat, 9AM-7PM" }, */}
              {/* // { icon: Mail, title: "Email Us", value: "info@thomesinfra.com", subtitle: "We reply within 24 hours" }, */}
              {/* { icon: MapPin, title: "Visit Us", value: "Flat No : 8-2-120/77/4B, 3rd floor, NVR Towers, Road No. 2, opp. NTR Memorial Trust Blood Bank,Banjara Hills, Hyderabad, Telangana 500034", subtitle: "Banjara Hills, Hyderabad" }, */}
            {/* ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100"
              >
                <div className="h-14 w-14 bg-amber-50 rounded-2xl flex items-center justify-center mb-4">
                  <item.icon className="h-7 w-7 text-amber-600" />
                </div>
                <div className="text-sm text-gray-500 mb-1">{item.title}</div>
                <div className="text-lg font-bold text-gray-900">{item.value}</div>
                <div className="text-sm text-gray-400">{item.subtitle}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Contact Form & Map */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
              <p className="text-gray-500 mb-8">Fill out the form and our team will get back to you within 24 hours.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Full Name *</label>
                    <Input
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="h-14 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Phone Number *</label>
                    <Input
                      placeholder="+91 00000 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="h-14 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Email Address</label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-14 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Your Message</label>
                  <Textarea
                    placeholder="I'm interested in..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="min-h-[150px] rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-16 rounded-full bg-amber-500 hover:bg-amber-600 text-black font-bold text-lg"
                >
                  {submitting ? "Sending..." : "Send Message"}
                  <Send className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </motion.div>

            {/* Office Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-[#0a1628] rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Head Office</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <MapPin className="h-6 w-6 text-amber-400 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">T Homes Infra Pvt. Ltd.</div>
                      {/* <div className="text-sm font-bold text-gray-900">Flat No : 8-2-120/77/4B, 3rd floor, NVR Towers, <br /> Road No. 2, opp. NTR Memorial Trust Blood Bank, <br />Banjara Hills, Hyderabad, Telangana 500034</div>
                */}
                      <div className="text-sm-white/60">Flat No : 8-2-120/77/4B, 3rd floor, NVR Towers, <br /> Road No. 2, opp. NTR Memorial Trust Blood Bank</div>
                      <div className="text-white/60">Banjara Hills, Hyderabad, Telangana 500034</div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Clock className="h-6 w-6 text-amber-400 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">Working Hours</div>
                      <div className="text-white/60">Monday - Saturday: 9:00 AM - 7:00 PM</div>
                      <div className="text-white/60">Sunday: By Appointment Only</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="bg-amber-50 rounded-3xl p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-14 w-14 bg-amber-500 rounded-2xl flex items-center justify-center">
                    <MessageCircle className="h-7 w-7 text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">WhatsApp Us</h3>
                    <p className="text-gray-500">Quick responses on WhatsApp</p>
                  </div>
                </div>
                <Button className="w-full h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold">
                  Chat on WhatsApp
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div> */}

              <div className="aspect-video rounded-3xl overflow-hidden bg-gray-100 group relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.74040687041!2d78.42295627369023!3d17.42424130174528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9737e4038e9f%3A0xcb609b5821acadb1!2sT%20HOMES%20INFRA%20PRIVATE%20LIMITED!5e0!3m2!1sen!2sin!4v1771480336045!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="transition-opacity duration-300"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-amber-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
            Ready to Invest in Your Future?
          </h2>
          <p className="text-xl text-black/70 mb-10 max-w-2xl mx-auto">
            Schedule a free site visit and see our premium plots firsthand.
          </p>
          <Link href="/projects">
            <Button size="lg" className="h-16 rounded-full bg-black hover:bg-gray-900 text-white px-10 text-lg font-bold">
              Explore Our Projects
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
