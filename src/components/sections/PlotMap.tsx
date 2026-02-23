"use client";

import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import { PlotMapScene } from "@/components/3d/PlotMap3D";
import { Button } from "@/components/ui/button";
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { toast } from "sonner";

export function PlotMap() {
  const [selectedPlot, setSelectedPlot] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [step, setStep] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handlePlotClick = (id: string) => {
    setSelectedPlot(id);
    setStep(1);
  };

  const handleBook = () => {
    setIsBooking(true);
    setTimeout(() => {
      setStep(2);
      setIsBooking(false);
      toast.success("Booking request sent! Admin will approve shortly.");
    }, 2000);
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-blue-900 font-bold uppercase tracking-widest text-sm mb-4 block"
          >
            Interactive Layout
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Explore Your <span className="text-blue-900">Dream Plot</span> in 3D
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-green-500" />
              <span className="text-sm font-medium text-gray-600">Approved</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-red-500" />
              <span className="text-sm font-medium text-gray-600">Pending</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-white border border-gray-300" />
              <span className="text-sm font-medium text-gray-600">Available</span>
            </div>
          </div>
        </div>

        <div className="relative h-[600px] w-full rounded-[2rem] bg-gray-50 border border-gray-100 shadow-inner overflow-hidden">
          <Canvas shadows camera={{ position: [0, 5, 8], fov: 45 }}>
            <Suspense fallback={null}>
              <PlotMapScene onPlotClick={handlePlotClick} />
            </Suspense>
          </Canvas>

          {/* Floating UI Labels */}
          <div className="absolute top-8 left-8 flex flex-col gap-4">
            <div className="bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-sm border border-white/20">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-tighter mb-1">Project</div>
              <div className="text-lg font-bold text-blue-900">Star City Phase 4</div>
            </div>
          </div>

          <div className="absolute bottom-8 right-8">
            <div className="bg-blue-900 p-4 rounded-xl shadow-lg text-white max-w-[200px]">
              <div className="text-xs font-medium opacity-80 mb-2">Instructions</div>
              <div className="text-sm leading-snug">Hover to elevate plots. Click any plot to view details and start booking.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Plot Details Modal */}
      <AnimatePresence>
        {selectedPlot && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPlot(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Plot Details</h3>
                    <p className="text-blue-900 font-semibold">{selectedPlot}</p>
                  </div>
                  <button
                    onClick={() => setSelectedPlot(null)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="h-6 w-6 text-gray-400" />
                  </button>
                </div>

                <div className="space-y-6">
                  {step === 1 ? (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-2xl">
                          <div className="text-xs font-bold text-gray-400 uppercase mb-1">Area</div>
                          <div className="text-lg font-bold">200 Sq. Yds</div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-2xl">
                          <div className="text-xs font-bold text-gray-400 uppercase mb-1">Facing</div>
                          <div className="text-lg font-bold">East</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                        <Info className="h-5 w-5 text-blue-900" />
                        <p className="text-sm text-blue-900">This plot is currently <span className="font-bold uppercase">Available</span> for booking.</p>
                      </div>

                      <Button
                        onClick={handleBook}
                        disabled={isBooking}
                        className="w-full h-14 bg-blue-900 hover:bg-blue-800 text-white rounded-full text-lg font-bold shadow-xl"
                      >
                        {isBooking ? "Processing..." : "Book Plot Now"}
                      </Button>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                      >
                        <CheckCircle2 className="h-10 w-10 text-green-600" />
                      </motion.div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">Request Submitted!</h4>
                      <p className="text-gray-600 mb-8">Your booking request for {selectedPlot} is being processed. Our team will contact you shortly.</p>
                      
                      {/* Admin Approval Simulation */}
                      <div className="space-y-4">
                        <div className="text-xs font-bold text-gray-400 uppercase text-left">Approval Timeline</div>
                        <div className="relative pl-6 space-y-6 text-left">
                          <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gray-100" />
                          <div className="relative">
                            <div className="absolute left-[-23px] top-1 h-4 w-4 rounded-full bg-green-500 border-4 border-white" />
                            <div className="text-sm font-bold">Request Received</div>
                            <div className="text-xs text-gray-400">Today, 10:30 AM</div>
                          </div>
                          <div className="relative">
                            <div className="absolute left-[-23px] top-1 h-4 w-4 rounded-full bg-blue-500 border-4 border-white animate-pulse" />
                            <div className="text-sm font-bold">Document Verification</div>
                            <div className="text-xs text-gray-400">In Progress...</div>
                          </div>
                          <div className="relative opacity-40">
                            <div className="absolute left-[-23px] top-1 h-4 w-4 rounded-full bg-gray-300 border-4 border-white" />
                            <div className="text-sm font-bold">Final Approval</div>
                            <div className="text-xs text-gray-400">Pending</div>
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        onClick={() => setSelectedPlot(null)}
                        className="mt-10 text-blue-900 font-bold"
                      >
                        Close Modal
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
