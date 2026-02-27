"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function Contact() {
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      project: formData.get("project"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to submit");

      toast.success("Inquiry sent successfully! We will contact you soon.");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/50 skew-x-12 translate-x-1/2 z-0" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left: Contact Info */}
          <div className="lg:w-1/2">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-blue-900 font-bold uppercase tracking-widest text-sm mb-4 block"
            >
              Get in Touch
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-8"
            >
              Let's Secure Your <br />
              <span className="text-blue-900">Future Investment</span>
            </motion.h2>

            <div className="space-y-8 mt-12">
              {/* <div className="flex gap-6 group">
                <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-900 transition-colors duration-500">
                  <Phone className="h-6 w-6 text-blue-900 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-400 uppercase mb-1">Call Us</div>
                  <div className="text-lg font-bold text-gray-900">+91 91212 12121</div>
                </div>
              </div> */}

              {/* <div className="flex gap-6 group">
                <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-900 transition-colors duration-500">
                  <Mail className="h-6 w-6 text-blue-900 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-400 uppercase mb-1">Email Us</div>
                  <div className="text-lg font-bold text-gray-900">info@thomesinfra.com</div>
                </div>
              </div> */}

              <div className="flex gap-6 group">
                <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-900 transition-colors duration-500">
                  <MapPin className="h-6 w-6 text-blue-900 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-400 uppercase mb-1">Office</div>
                  <div className="text-sm font-bold text-gray-900">Flat No : 8-2-120/77/4B, 3rd floor, NVR Towers, <br /> Road No. 2, opp. NTR Memorial Trust Blood Bank, <br />Banjara Hills, Hyderabad, Telangana 500034</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="lg:w-1/2"
          >
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 h-32 w-32 bg-blue-50 rounded-full blur-3xl opacity-50" />
              
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Schedule a Site Visit</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-400 uppercase">Full Name</label>
                    <Input name="name" required  className="h-14 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-blue-900 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-400 uppercase">Phone Number</label>
                    <Input name="phone" required className="h-14 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-blue-900 transition-all" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 uppercase">Interest</label>
                  <Input name="project"  className="h-14 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-blue-900 transition-all" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 uppercase">Message</label>
                  <Textarea name="message" required  className="min-h-[150px] rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-blue-900 transition-all" />
                </div>

                <Button disabled={loading} className="w-full h-16 bg-blue-900 hover:bg-blue-800 text-white rounded-2xl text-lg font-bold shadow-xl shadow-blue-900/20">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Inquiry"
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
