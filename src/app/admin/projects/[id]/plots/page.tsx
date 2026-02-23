"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import NextImage from "next/image";
import { supabase, Project, Plot } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, Plus, Save, Trash2, MapPin, 
  Ruler, Compass, IndianRupee, Loader2, MousePointer2, 
  Info,
  X
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

import { LayoutMappingTool } from "@/components/admin/LayoutMappingTool";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminPlotManagementPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  
  const [project, setProject] = React.useState<Project | null>(null);
  const [plots, setPlots] = React.useState<Plot[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [selectedPlot, setSelectedPlot] = React.useState<Plot | null>(null);

  function updatePlotDetail(id: string, field: string, value: any): void {
    setPlots(plots.map(plot => 
      plot.id === id 
        ? { ...plot, [field]: value }
        : plot
    ));
    
    setSelectedPlot(prev => 
      prev && prev.id === id 
        ? { ...prev, [field]: value }
        : prev
    );
  }

  async function saveAllPlots(): Promise<void> {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("plots")
        .upsert(plots, { onConflict: "id" });
      
      if (error) throw error;
      toast.success("All plots saved successfully!");
    } catch (error) {
      toast.error("Failed to save plots");
      console.error(error);
    } finally {
      setSaving(false);
    }
  }

  function removePlot(id: string): void {
    setPlots(plots.filter(plot => plot.id !== id));
    setSelectedPlot(null);
  }

  function fetchProjectAndPlots(): void {
    // Fetch project and plots data
  }

  const imageRef = useRef<HTMLDivElement>(null);

  function handleImageClick(e: React.MouseEvent<HTMLDivElement>): void {
    // Handle image click to add new plot
  }

  // ... rest of state and effects ...

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Button variant="ghost" onClick={() => router.back()} className="rounded-full h-12 w-12 p-0">
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <div>
              <h1 className="text-xl font-black text-gray-900 tracking-tight">{project?.name}</h1>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Plot Mapping Tool</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              onClick={saveAllPlots} 
              disabled={saving}
              className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl px-8 h-12 font-black shadow-lg shadow-emerald-500/20"
            >
              {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5 mr-2" />}
              SAVE ALL CHANGES
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="mapping" className="space-y-6">
          <TabsList className="bg-white p-1 rounded-xl border border-gray-200">
            <TabsTrigger value="mapping" className="rounded-lg font-bold">3D Mapping Tool</TabsTrigger>
            <TabsTrigger value="markers" className="rounded-lg font-bold">Classic Markers</TabsTrigger>
          </TabsList>

          <TabsContent value="mapping">
            {project && (
              <LayoutMappingTool 
                projectId={projectId} 
                layoutImageUrl={project.layout_image || ""} 
                existingPlots={plots}
                onSave={fetchProjectAndPlots}
              />
            )}
          </TabsContent>

          <TabsContent value="markers">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* ... existing marker editor code ... */}

              {/* Main Layout Editor */}
              <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden relative">
              <div className="bg-gray-900 p-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <MousePointer2 className="h-4 w-4 text-amber-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Click anywhere on layout to add a plot</span>
                </div>
                <div className="flex gap-4">
                   <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Available</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-yellow-400" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Sold</span>
                   </div>
                </div>
              </div>
              
              <div 
                ref={imageRef}
                onClick={handleImageClick}
                className="relative aspect-[16/9] bg-gray-50 cursor-crosshair overflow-hidden group"
              >
                <NextImage
                  src={project?.layout_image || "https://images.unsplash.com/photo-1500382017468-9049fee74a62?auto=format&fit=crop&q=80&w=1200"}
                  alt="Layout"
                  fill
                  className="object-contain p-8 transition-transform duration-500 group-hover:scale-[1.01]"
                />
                
                {/* Plot Markers */}

                {plots.map((plot) => (
                  <button
                    key={plot.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPlot(plot);
                    }}
                    className={`absolute w-8 h-8 md:w-10 md:h-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 shadow-2xl flex items-center justify-center transition-all z-10 ${
                      selectedPlot?.id === plot.id 
                        ? "border-amber-500 ring-4 ring-amber-500/30 scale-125 z-20" 
                        : "border-white"
                    } ${
                      plot.status === "available" ? "bg-green-500" :
                      plot.status === "sold" ? "bg-yellow-400" :
                      plot.status === "partially_sold" ? "bg-blue-600" :
                      "bg-red-600"
                    }`}
                    style={{
                      left: `${plot.position_x}%`,
                      top: `${plot.position_y}%`,
                    }}
                  >
                    <span className="text-[10px] font-black text-white">{plot.plot_number}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl flex items-start gap-4">
               <div className="bg-amber-100 p-2 rounded-lg">
                  <Info className="h-5 w-5 text-amber-700" />
               </div>
               <div>
                  <h4 className="font-bold text-amber-900 text-sm">Quick Instructions</h4>
                  <p className="text-amber-800/70 text-xs mt-1 leading-relaxed">
                    1. Click on the layout image to drop a new plot marker.<br/>
                    2. Select a marker to edit its number, area, and status in the sidebar.<br/>
                    3. Make sure to click "SAVE ALL CHANGES" when you're done to sync with the database.
                  </p>
               </div>
            </div>
          </div>

          {/* Sidebar Editor */}
          <div className="lg:col-span-1">
            <AnimatePresence mode="wait">
              {selectedPlot ? (
                <motion.div
                  key="editor"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-8 sticky top-28"
                >
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-black text-gray-900">Edit Plot</h3>
                    <Button variant="ghost" onClick={() => setSelectedPlot(null)} className="rounded-full h-10 w-10 p-0">
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Plot Number</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input 
                          value={selectedPlot.plot_number} 
                          onChange={(e) => updatePlotDetail(selectedPlot.id, "plot_number", e.target.value)}
                          className="h-12 pl-12 rounded-xl bg-gray-50 font-bold"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Area (Sq. Yds)</label>
                      <div className="relative">
                        <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input 
                          type="number"
                          value={selectedPlot.area_sqyds} 
                          onChange={(e) => updatePlotDetail(selectedPlot.id, "area_sqyds", parseFloat(e.target.value))}
                          className="h-12 pl-12 rounded-xl bg-gray-50 font-bold"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Facing</label>
                      <div className="relative">
                        <Compass className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <select 
                          value={selectedPlot.facing}
                          onChange={(e) => updatePlotDetail(selectedPlot.id, "facing", e.target.value)}
                          className="w-full h-12 pl-12 pr-4 rounded-xl bg-gray-50 border border-gray-200 font-bold"
                        >
                          <option value="East">East</option>
                          <option value="West">West</option>
                          <option value="North">North</option>
                          <option value="South">South</option>
                          <option value="North-East">North-East</option>
                          <option value="South-East">South-East</option>
                          <option value="North-West">North-West</option>
                          <option value="South-West">South-West</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Price</label>
                      <div className="relative">
                        <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input 
                          type="number"
                          value={selectedPlot.price} 
                          onChange={(e) => updatePlotDetail(selectedPlot.id, "price", parseFloat(e.target.value))}
                          className="h-12 pl-12 rounded-xl bg-gray-50 font-bold"
                        />
                      </div>
                    </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Category</label>
                        <select 
                          value={selectedPlot.category}
                          onChange={(e) => updatePlotDetail(selectedPlot.id, "category", e.target.value)}
                          className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 font-bold"
                        >
                          <option value="Elite">Elite (Yellow)</option>
                          <option value="Super Premium">Super Premium (Pink)</option>
                          <option value="Premium">Premium (Green)</option>
                          <option value="Standard">Standard (Blue)</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Status</label>

                      <select 
                        value={selectedPlot.status}
                        onChange={(e) => updatePlotDetail(selectedPlot.id, "status", e.target.value)}
                        className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 font-bold"
                      >
                        <option value="available">Available</option>
                        <option value="sold">Sold</option>
                        <option value="partially_sold">Partially Sold</option>
                        <option value="registered">Registered</option>
                        <option value="pending">Pending</option>
                      </select>
                    </div>

                    <Button 
                      variant="destructive" 
                      onClick={() => removePlot(selectedPlot.id)}
                      className="w-full h-14 rounded-xl font-black mt-8 shadow-lg shadow-red-500/10"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      DELETE MARKER
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-[2rem] shadow-sm border border-dashed border-gray-300 p-12 text-center sticky top-28"
                >
                  <div className="bg-gray-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MousePointer2 className="h-8 w-8 text-gray-300" />
                  </div>
                  <h3 className="font-black text-gray-900 mb-2">No Plot Selected</h3>
                  <p className="text-gray-400 text-xs leading-relaxed font-bold uppercase tracking-wider">
                    Click on a marker or the map to begin editing plot details
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
}

{/* function X({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
  );
}

function Info({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
  ) );  */}
