"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { 
  Upload, MousePointer2, Square, Save, RotateCcw, 
  Wand2, Plus, Trash2, PenTool, Type, Move, Layers 
} from "lucide-react";
import { toast } from "sonner";

interface Plot {
  id?: string;
  plot_number: string;
  x: number;
  y: number;
  width: number;
  height: number;
  status: string;
  points?: { x: number; y: number }[];
  category?: string;
}

interface LayoutMappingToolProps {
  projectId: string;
  layoutImageUrl?: string;
  existingPlots?: any[];
  onSave: () => void;
}

type Mode = "select" | "rect" | "polygon";

export function LayoutMappingTool({ projectId, layoutImageUrl, existingPlots = [], onSave }: LayoutMappingToolProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [plots, setPlots] = useState<Plot[]>([]);
  const [mode, setMode] = useState<Mode>("polygon");
  const [activePlot, setActivePlot] = useState<Partial<Plot> | null>(null);
  const [selectedPlotIndex, setSelectedPlotIndex] = useState<number | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPoints, setCurrentPoints] = useState<{ x: number; y: number }[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [canvasSize, setCanvasSize] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    if (layoutImageUrl) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = layoutImageUrl;
      img.onload = () => {
        setImage(img);
        // Set canvas aspect ratio based on image
        const container = containerRef.current;
        if (container) {
          const containerWidth = container.clientWidth - 32; // padding
          const ratio = img.height / img.width;
          setCanvasSize({
            width: containerWidth,
            height: containerWidth * ratio
          });
        }
        
        setPlots(existingPlots.map(p => ({
          id: p.id,
          plot_number: p.plot_number,
          x: p.position_x || 0,
          y: p.position_y || 0,
          width: p.width || 50,
          height: p.height || 50,
          status: p.status || "available",
          points: p.points || [],
          category: p.category || "Standard"
        })));
      };
    }
  }, [layoutImageUrl, existingPlots]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Draw existing plots
    plots.forEach((plot, index) => {
      const isSelected = selectedPlotIndex === index;
      const color = plot.status === "sold" ? "#ef4444" : "#22c55e";
      
      ctx.beginPath();
      if (plot.points && plot.points.length > 0) {
        ctx.moveTo(plot.points[0].x, plot.points[0].y);
        plot.points.forEach(p => ctx.lineTo(p.x, p.y));
        ctx.closePath();
      } else {
        ctx.rect(plot.x, plot.y, plot.width, plot.height);
      }

      ctx.strokeStyle = isSelected ? "#3b82f6" : color;
      ctx.lineWidth = isSelected ? 4 : 2;
      ctx.stroke();
      ctx.fillStyle = (isSelected ? "#3b82f6" : color) + "33";
      ctx.fill();

      // Plot Number Label
      const centerX = plot.points && plot.points.length > 0 
        ? plot.points.reduce((acc, p) => acc + p.x, 0) / plot.points.length 
        : plot.x + plot.width / 2;
      const centerY = plot.points && plot.points.length > 0 
        ? plot.points.reduce((acc, p) => acc + p.y, 0) / plot.points.length 
        : plot.y + plot.height / 2;

      ctx.fillStyle = "#000000";
      ctx.font = "bold 12px Inter";
      ctx.textAlign = "center";
      ctx.fillText(plot.plot_number, centerX, centerY);
    });

    // Draw active polygon points
    if (mode === "polygon" && currentPoints.length > 0) {
      ctx.beginPath();
      ctx.moveTo(currentPoints[0].x, currentPoints[0].y);
      currentPoints.forEach(p => ctx.lineTo(p.x, p.y));
      ctx.lineTo(mousePos.x, mousePos.y);
      
      ctx.strokeStyle = "#3b82f6";
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.setLineDash([]);
      
      currentPoints.forEach(p => {
        ctx.fillStyle = "#3b82f6";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // Draw active rect
    if (mode === "rect" && activePlot && isDrawing) {
      ctx.strokeStyle = "#3b82f6";
      ctx.lineWidth = 2;
      ctx.strokeRect(activePlot.x!, activePlot.y!, activePlot.width!, activePlot.height!);
      ctx.fillStyle = "#3b82f633";
      ctx.fillRect(activePlot.x!, activePlot.y!, activePlot.width!, activePlot.height!);
    }
  }, [image, plots, mode, activePlot, isDrawing, currentPoints, mousePos, selectedPlotIndex]);

  useEffect(() => {
    draw();
  }, [draw]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (mode === "rect") {
      setIsDrawing(true);
      setActivePlot({ x, y, width: 0, height: 0, plot_number: (plots.length + 1).toString() });
    } else if (mode === "polygon") {
      setCurrentPoints([...currentPoints, { x, y }]);
    } else if (mode === "select") {
      // Find if clicked on a plot
      const index = plots.findIndex(p => {
        if (p.points && p.points.length > 0) {
          // Simple point in polygon check
          let inside = false;
          for (let i = 0, j = p.points.length - 1; i < p.points.length; j = i++) {
            const xi = p.points[i].x, yi = p.points[i].y;
            const xj = p.points[j].x, yj = p.points[j].y;
            const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
          }
          return inside;
        } else {
          return x >= p.x && x <= p.x + p.width && y >= p.y && y <= p.y + p.height;
        }
      });
      setSelectedPlotIndex(index !== -1 ? index : null);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    if (isDrawing && activePlot && mode === "rect") {
      setActivePlot({
        ...activePlot,
        width: x - activePlot.x!,
        height: y - activePlot.y!
      });
    }
  };

  const handleMouseUp = () => {
    if (isDrawing && activePlot && mode === "rect") {
      const newPlot = {
        ...activePlot,
        width: Math.abs(activePlot.width!),
        height: Math.abs(activePlot.height!),
        x: activePlot.width! < 0 ? activePlot.x! + activePlot.width! : activePlot.x!,
        y: activePlot.height! < 0 ? activePlot.y! + activePlot.height! : activePlot.y!,
        status: "available",
        points: [
          { x: activePlot.x!, y: activePlot.y! },
          { x: activePlot.x! + activePlot.width!, y: activePlot.y! },
          { x: activePlot.x! + activePlot.width!, y: activePlot.y! + activePlot.height! },
          { x: activePlot.x!, y: activePlot.y! + activePlot.height! }
        ]
      } as Plot;

      setPlots([...plots, newPlot]);
      setActivePlot(null);
      setIsDrawing(false);
    }
  };

  const handleDoubleClick = () => {
    if (mode === "polygon" && currentPoints.length >= 3) {
      // Calculate bounding box for polygon
      const minX = Math.min(...currentPoints.map(p => p.x));
      const maxX = Math.max(...currentPoints.map(p => p.x));
      const minY = Math.min(...currentPoints.map(p => p.y));
      const maxY = Math.max(...currentPoints.map(p => p.y));

      const newPlot: Plot = {
        plot_number: (plots.length + 1).toString(),
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY,
        status: "available",
        points: currentPoints
      };

      setPlots([...plots, newPlot]);
      setCurrentPoints([]);
    }
  };

  const handleSave = async () => {
    try {
      const plotsToSave = plots.map(p => ({
        ...(p.id ? { id: p.id } : {}),
        project_id: projectId,
        plot_number: p.plot_number,
        position_x: Math.round(p.x),
        position_y: Math.round(p.y),
        width: Math.round(p.width),
        height: Math.round(p.height),
        status: p.status,
        points: p.points,
        category: p.category
      }));

      const response = await fetch(`/api/projects/${projectId}/plots`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(plotsToSave),
      });

      if (!response.ok) throw new Error("Failed to save plots");
      
      toast.success("Layout saved successfully!");
      onSave();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save layout");
    }
  };

  const deletePlot = (index: number) => {
    setPlots(plots.filter((_, i) => i !== index));
    if (selectedPlotIndex === index) setSelectedPlotIndex(null);
  };

  return (
    <div className="space-y-4" ref={containerRef}>
      <div className="flex flex-wrap items-center justify-between bg-white p-4 rounded-3xl shadow-sm border border-gray-100 gap-4">
        <div className="flex items-center gap-3">
          <div className="flex bg-gray-100 p-1.5 rounded-2xl">
            <Button 
              variant={mode === "select" ? "default" : "ghost"} 
              size="sm" 
              onClick={() => setMode("select")}
              className={`rounded-xl ${mode === "select" ? "bg-white text-black shadow-sm" : ""}`}
            >
              <MousePointer2 className="h-4 w-4 mr-2" /> Select
            </Button>
            <Button 
              variant={mode === "rect" ? "default" : "ghost"} 
              size="sm" 
              onClick={() => setMode("rect")}
              className={`rounded-xl ${mode === "rect" ? "bg-white text-black shadow-sm" : ""}`}
            >
              <Square className="h-4 w-4 mr-2" /> Rectangle
            </Button>
            <Button 
              variant={mode === "polygon" ? "default" : "ghost"} 
              size="sm" 
              onClick={() => setMode("polygon")}
              className={`rounded-xl ${mode === "polygon" ? "bg-white text-black shadow-sm" : ""}`}
            >
              <PenTool className="h-4 w-4 mr-2" /> Polygon
            </Button>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            {mode === "polygon" ? "Double click to close polygon" : mode === "rect" ? "Drag to draw rectangle" : "Click plot to select"}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => { setPlots([]); setCurrentPoints([]); }} className="rounded-xl">
            <RotateCcw className="h-4 w-4 mr-2" /> Reset
          </Button>
          <Button size="sm" onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-6">
            <Save className="h-4 w-4 mr-2" /> Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="relative bg-gray-900 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white group">
            <canvas
              ref={canvasRef}
              width={canvasSize.width}
              height={canvasSize.height}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onDoubleClick={handleDoubleClick}
              className={`cursor-crosshair max-w-full h-auto transition-transform duration-700 ${mode === 'select' ? 'group-hover:scale-[1.02]' : ''}`}
            />
            
            {!image && (
              <div className="absolute inset-0 flex items-center justify-center text-center p-12 bg-gray-900">
                <div className="space-y-4">
                  <div className="h-20 w-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto animate-pulse">
                    <Layers className="h-10 w-10 text-gray-600" />
                  </div>
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Loading Layout Image...</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 max-h-[600px] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-black text-gray-900 uppercase tracking-tighter">Plot List</h4>
              <span className="text-xs font-black bg-gray-100 px-3 py-1 rounded-full">{plots.length} Total</span>
            </div>
            
            <div className="space-y-3">
              {plots.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <Plus className="h-8 w-8 mx-auto mb-2 opacity-20" />
                  <p className="text-[10px] font-bold uppercase tracking-widest">Start mapping plots</p>
                </div>
              ) : (
                plots.map((plot, i) => (
                  <div 
                    key={i} 
                    onClick={() => setSelectedPlotIndex(i)}
                    className={`group p-4 rounded-2xl border transition-all cursor-pointer ${
                      selectedPlotIndex === i 
                        ? "bg-amber-50 border-amber-200" 
                        : "bg-gray-50 border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-xl flex items-center justify-center font-black text-xs ${
                          plot.status === 'sold' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'
                        }`}>
                          {plot.plot_number}
                        </div>
                        <div>
                          <div className="text-xs font-black text-gray-900">Plot #{plot.plot_number}</div>
                          <div className="text-[10px] font-bold text-gray-400 uppercase">{plot.points?.length || 4} Vertices</div>
                        </div>
                      </div>
                      <button 
                        type="button"
                        title="Delete plot"
                        onClick={(e) => { e.stopPropagation(); deletePlot(i); }} 
                        className="opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    
                    {selectedPlotIndex === i && (
                      <div className="mt-4 space-y-3 pt-3 border-t border-amber-200/50">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-[9px] font-black text-amber-900/40 uppercase">Number</label>
                            <input 
                              type="text" 
                              placeholder="Plot number"
                              value={plot.plot_number} 
                              onChange={(e) => {
                                const newPlots = [...plots];
                                newPlots[i].plot_number = e.target.value;
                                setPlots(newPlots);
                              }}
                              className="w-full bg-white border border-amber-200 rounded-lg px-2 py-1.5 text-xs font-bold"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-black text-amber-900/40 uppercase">Status</label>
                            <select 
                              value={plot.status}
                              onChange={(e) => {
                                const newPlots = [...plots];
                                newPlots[i].status = e.target.value;
                                setPlots(newPlots);
                              }}
                              className="w-full bg-white border border-amber-200 rounded-lg px-2 py-1.5 text-xs font-bold"
                            >
                              <option value="available">Available</option>
                              <option value="sold">Sold</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
