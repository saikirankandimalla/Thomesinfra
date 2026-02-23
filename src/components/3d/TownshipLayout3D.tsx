"use client";

import React, { useRef, useState, useMemo, Suspense, useEffect } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { 
  OrbitControls, 
  Text, 
  Environment, 
  ContactShadows,
  PerspectiveCamera,
  Float,
  useTexture,
  Center,
  BakeShadows,
  SoftShadows
} from "@react-three/drei";
import * as THREE from "three";
import { Plot as PlotType } from "@/lib/supabase";
import { Phone, MapPin, Ruler, Compass, IndianRupee, X, Check, ArrowRight, MousePointer2, Box, Eye, Navigation, Cuboid, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingForm } from "@/components/sections/BookingForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

interface Plot3DProps {
  plot: PlotType;
  onSelect: (plot: PlotType) => void;
  isSelected: boolean;
  groundSize: { width: number; height: number };
}

const statusColors: Record<string, string> = {
  available: "#22c55e", // Green
  sold: "#facc15", // Yellow
  partially_sold: "#2563eb", // Blue
  registered: "#ef4444", // Red
  pending: "#f97316", // Orange
};

function Plot3D({ plot, onSelect, isSelected, groundSize }: Plot3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  const color = statusColors[plot.status] || statusColors.available;
  const isClickable = true; // All plots are now clickable to see details

  // Create shape from points
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    const points = (plot as any).points || [];
    
    // Map pixel coordinates to 3D world coordinates
    // Assuming 0,0 is center of ground plane in 3D
    const mapX = (x: number) => (x / 1200) * groundSize.width - groundSize.width / 2;
    const mapY = (y: number) => -((y / 800) * groundSize.height - groundSize.height / 2);

    if (points.length > 0) {
      s.moveTo(mapX(points[0].x), mapY(points[0].y));
      for (let i = 1; i < points.length; i++) {
        s.lineTo(mapX(points[i].x), mapY(points[i].y));
      }
      s.lineTo(mapX(points[0].x), mapY(points[0].y));
    } else {
      // Fallback to rect
      const w = ((plot as any).width || 50) / 1200 * groundSize.width;
      const h = ((plot as any).height || 50) / 800 * groundSize.height;
      const x = ((plot as any).position_x || 0) / 1200 * groundSize.width - groundSize.width / 2;
      const y = -(((plot as any).position_y || 0) / 800 * groundSize.height - groundSize.height / 2);
      
      s.moveTo(x, y);
      s.lineTo(x + w, y);
      s.lineTo(x + w, y - h);
      s.lineTo(x, y - h);
      s.lineTo(x, y);
    }
    return s;
  }, [plot, groundSize]);

  const extrudeSettings = useMemo(() => ({
    steps: 1,
    depth: 0.25,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.05,
    bevelSegments: 5
  }), []);

  useFrame((state) => {
    if (meshRef.current) {
      const targetZ = hovered || isSelected ? 0.5 : 0.05;
      meshRef.current.position.z = THREE.MathUtils.lerp(
        meshRef.current.position.z,
        targetZ,
        0.15
      );
      
      if (hovered || isSelected) {
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -0.05, 0.1);
      } else {
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, 0, 0.1);
      }
    }
  });

  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => { 
          e.stopPropagation(); 
          setHovered(true); 
          if (isClickable) document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => { 
          e.stopPropagation(); 
          setHovered(false); 
          document.body.style.cursor = 'auto';
        }}
        onClick={(e) => { 
          e.stopPropagation(); 
          onSelect(plot); 
        }}
        castShadow
        receiveShadow
      >
        <extrudeGeometry args={[shape, extrudeSettings]} />
        <meshStandardMaterial
          color={color}
          metalness={0.6}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={hovered || isSelected ? 1.2 : 0.3}
        />
      </mesh>
      
      <Text
        position={[
          (plot as any).points?.reduce((acc: any, p: any) => acc + p.x, 0) / (plot as any).points?.length / 1200 * groundSize.width - groundSize.width / 2 || 
          ((plot as any).position_x || 0) / 1200 * groundSize.width - groundSize.width / 2 + 0.5,
          -((plot as any).points?.reduce((acc: any, p: any) => acc + p.y, 0) / (plot as any).points?.length / 800 * groundSize.height - groundSize.height / 2) ||
          -(((plot as any).position_y || 0) / 800 * groundSize.height - groundSize.height / 2) - 0.5,
          0.4
        ]}
        fontSize={0.25}
        color="#ffffff"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyfAZ9hjg.ttf"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.03}
        outlineColor="#000000"
      >
        {plot.plot_number}
      </Text>
    </group>
  );
}

function TownshipScene({ plots, layoutImage, onPlotSelect, selectedPlot }: any) {
  const texture = useTexture(layoutImage || "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80&w=1200");
  const { camera } = useThree();

  // Aspect ratio based on texture
  const groundSize = useMemo(() => {
    const ratio = texture.image.height / texture.image.width;
    const baseWidth = 22;
    return { width: baseWidth, height: baseWidth * ratio };
  }, [texture]);

  return (
    <>
      <SoftShadows size={20} samples={10} focus={0} />
      <ambientLight intensity={0.8} />
      <directionalLight 
        position={[15, 25, 20]} 
        intensity={2.5} 
        castShadow 
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={60}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      <pointLight position={[-15, 15, -10]} intensity={1.5} color="#3b82f6" />
      <pointLight position={[10, 5, 15]} intensity={1} color="#fbbf24" />
      
      {/* Premium Roads and Ground Base */}
      <group position={[0, -0.01, 0]}>
        {/* Main Base */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[groundSize.width + 4, groundSize.height + 4]} />
          <meshStandardMaterial color="#1e293b" roughness={1} />
        </mesh>
        
        {/* Layout Texture Overlay */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
          <planeGeometry args={[groundSize.width, groundSize.height]} />
          <meshStandardMaterial 
            map={texture} 
            roughness={0.7} 
            transparent 
            opacity={0.95} 
          />
        </mesh>

        {/* Outer Environment / Grass */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
          <planeGeometry args={[120, 120]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
      </group>

      <group>
        {plots.map((plot: PlotType) => (
          <Plot3D
            key={plot.id}
            plot={plot}
            groundSize={groundSize}
            onSelect={onPlotSelect}
            isSelected={selectedPlot?.id === plot.id}
          />
        ))}
      </group>
      
      <ContactShadows 
        position={[0, 0, 0]} 
        opacity={0.6} 
        scale={40} 
        blur={2.5} 
        far={10} 
      />
      
        <OrbitControls 
          makeDefault 
          minPolarAngle={0.1} 
          maxPolarAngle={Math.PI / 2.2} 
          enableDamping
          dampingFactor={0.05}
          maxDistance={45}
          minDistance={8}
          autoRotate={false}
          autoRotateSpeed={0.5}
        />

      
      <Environment preset="city" />
      <BakeShadows />
    </>
  );
}

function PlotInfoCard({ plot, onClose, onBook, onContact }: any) {
  return (
    <motion.div 
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      className="absolute top-8 right-8 w-[380px] bg-white/95 backdrop-blur-3xl rounded-[3rem] p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border border-white/60 z-10"
    >
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 p-3 hover:bg-gray-100 rounded-full transition-all active:scale-90"
      >
        <X className="h-5 w-5 text-gray-400" />
      </button>

      <div className="space-y-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="h-3 w-3 rounded-full animate-pulse" style={{ backgroundColor: statusColors[plot.status] || statusColors.available }} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
              Plot {plot.plot_number} • {plot.status.replace('_', ' ')}
            </span>
          </div>
          <h3 className="text-4xl font-black text-gray-900 leading-none">
            {plot.price ? `₹${plot.price?.toLocaleString()}` : "Price on Request"}
          </h3>
          <p className="text-emerald-500 font-bold text-xs mt-2 uppercase tracking-widest">Premium Inventory</p>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="p-5 bg-gray-50 rounded-[2rem] border border-gray-100 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all">
            <Ruler className="h-5 w-5 text-emerald-500 mb-3" />
            <div className="text-xl font-black text-gray-900">{plot.area_sqyds || 0}</div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sq. Yards</div>
          </div>
          <div className="p-5 bg-gray-50 rounded-[2rem] border border-gray-100 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all">
            <Compass className="h-5 w-5 text-blue-500 mb-3" />
            <div className="text-xl font-black text-gray-900">{plot.facing || 'East'}</div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Facing</div>
          </div>
        </div>

        <div className="space-y-4">
            <Button 
              onClick={onBook}
              className="w-full h-16 bg-amber-500 hover:bg-amber-600 text-black rounded-[1.5rem] text-lg font-black group shadow-[0_20px_40px_-12px_rgba(245,158,11,0.4)] transition-all hover:scale-[1.02] active:scale-95"
              disabled={plot.status !== 'available'}
            >
              {plot.status === 'available' ? (
                <div className="flex items-center justify-center gap-3">
                  Request Booking
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3 uppercase">
                  {plot.status.replace('_', ' ')}
                </div>
              )}
            </Button>

          <Button 
            onClick={onContact}
            variant="outline"
            className="w-full h-16 border-2 border-gray-100 hover:bg-gray-50 rounded-[1.5rem] font-bold transition-all"
          >
            <Phone className="mr-3 h-5 w-5" />
            Contact Specialist
          </Button>
        </div>

        <div className="pt-2">
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                Verified Listing • 100% Secure
            </div>
        </div>
      </div>
    </motion.div>
  );
}

interface TownshipLayout3DProps {
  plots: PlotType[];
  layoutImage?: string;
  onPlotSelect: (plot: PlotType) => void;
  selectedPlot: PlotType | null;
}

class SceneErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-white/40 gap-4">
          <Box className="h-12 w-12" />
          <div className="text-xs font-bold uppercase tracking-widest">3D View Temporarily Unavailable</div>
          <Button 
            variant="outline" 
            className="border-white/10 text-white/60 hover:text-white"
            onClick={() => window.location.reload()}
          >
            Reload Experience
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}

export function TownshipLayout3D({ plots, layoutImage, onPlotSelect, selectedPlot }: TownshipLayout3DProps) {
  const [showBooking, setShowBooking] = useState(false);
  const canvasRef = useRef<any>(null);

  return (
    <div className="relative w-full h-full bg-[#0a1628] rounded-[3.5rem] overflow-hidden shadow-2xl">
      <SceneErrorBoundary>
        <Canvas
          ref={canvasRef}
          shadows
          gl={{ 
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            stencil: false,
            depth: true
          }}
          camera={{ position: [15, 20, 15], fov: 30 }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <TownshipScene 
              plots={plots} 
              layoutImage={layoutImage}
              onPlotSelect={onPlotSelect}
              selectedPlot={selectedPlot}
            />
          </Suspense>
        </Canvas>
      </SceneErrorBoundary>
      
      {/* Dynamic Info Card */}
      <AnimatePresence>
        {selectedPlot && (
          <PlotInfoCard 
            plot={selectedPlot} 
            onClose={() => onPlotSelect(null as any)}
            onBook={() => setShowBooking(true)}
            onContact={() => window.parent.postMessage({ type: "OPEN_EXTERNAL_URL", data: { url: "tel:+919121212121" } }, "*")}
          />
        )}
      </AnimatePresence>

      {/* Booking Overlay */}
      <Dialog open={showBooking} onOpenChange={setShowBooking}>
        <DialogContent className="sm:max-w-[550px] p-0 rounded-[3rem] overflow-hidden border-none shadow-[0_64px_128px_-32px_rgba(0,0,0,0.6)] bg-transparent">
          <div className="bg-white p-12 relative">
             <button 
                onClick={() => setShowBooking(false)}
                className="absolute top-8 right-8 p-3 hover:bg-gray-100 rounded-full transition-all"
              >
                <X className="h-6 w-6 text-gray-400" />
              </button>
            {selectedPlot && (
              <BookingForm 
                plot={selectedPlot} 
                onSuccess={() => {
                  setShowBooking(false);
                  onPlotSelect(null as any);
                }} 
                onCancel={() => setShowBooking(false)} 
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Modern HUD Overlays */}
      <div className="absolute bottom-10 left-10 flex flex-col gap-6 pointer-events-none">
        {/* Navigation Help */}
        <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white/10 backdrop-blur-3xl p-6 rounded-[2.5rem] border border-white/10 pointer-events-auto"
        >
          <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-5 flex items-center gap-2">
            <Navigation className="h-3 w-3" />
            Navigation Guide
          </div>
          <div className="grid gap-4">
            {[
              { label: 'Orbit', action: 'Left Click' },
              { label: 'Pan', action: 'Right Click' },
              { label: 'Zoom', action: 'Scroll Wheel' },
            ].map(ctrl => (
              <div key={ctrl.label} className="flex items-center justify-between gap-12">
                <span className="text-xs font-bold text-white/70">{ctrl.label}</span>
                <span className="text-[10px] font-black text-amber-500 bg-amber-500/10 px-3 py-1.5 rounded-xl uppercase tracking-widest">{ctrl.action}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Legend */}
        <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-3xl p-6 rounded-[2.5rem] border border-white/10 pointer-events-auto"
        >
          <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-5 flex items-center gap-2">
            <Box className="h-3 w-3" />
            Availability Status
          </div>
            <div className="grid grid-cols-2 gap-x-10 gap-y-4">
              {[
                { color: statusColors.available, label: "Available" },
                { color: statusColors.sold, label: "Sold" },
                { color: statusColors.partially_sold, label: "Partially Sold" },
                { color: statusColors.registered, label: "Registered" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full shadow-[0_0_12px_rgba(255,255,255,0.3)]" style={{ backgroundColor: item.color }} />
                  <span className="text-xs font-bold text-white/80">{item.label}</span>
                </div>
              ))}
            </div>

        </motion.div>
      </div>
      
      {/* High-end Branding */}
      <div className="absolute top-10 left-10 flex items-center gap-5 pointer-events-none">
        <div className="h-14 w-14 bg-amber-500 rounded-[1.5rem] flex items-center justify-center shadow-[0_20px_40px_-10px_rgba(245,158,11,0.5)]">
          <Cuboid className="h-7 w-7 text-black" />
        </div>
        <div>
          <div className="text-sm font-black text-white uppercase tracking-[0.3em]">Next-Gen 3D Tour</div>
          <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mt-1">Smarter Property Selection</div>
        </div>
      </div>

      {/* View Mode Indicator */}
      <div className="absolute top-10 right-10 pointer-events-auto">
        <Button 
            onClick={() => onPlotSelect(null as any)}
            className="h-14 px-8 bg-white/10 backdrop-blur-3xl border border-white/10 rounded-full text-white font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all"
        >
            <Eye className="h-4 w-4 mr-2" />
            Reset View
        </Button>
      </div>
    </div>
  );
}
