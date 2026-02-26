"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Eye, X, Save, Image as ImageIcon, MapPin } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

// ── helpers ──────────────────────────────────────────────────────────────────
const getId = (project: any): string => project._id ?? project.id ?? "";

// ── empty form (aligned to Mongoose schema) ───────────────────────────────────
const emptyForm = {
  name: "",
  slug: "",
  location: "",
  approval_type: "HMDA Approved",
  status: "ongoing",
  total_plots: 0,
  available_plots: 0,
  commercial_plots: 0,
  residential_plots: 0,
  price_per_sqyd: 0,
  Totalacres: 0,
  description: "",
  hero_image: "",
  layout_image: "",
  brochure_url: "",
  google_embed_url: "",
  amenities: [] as string[],
  Highlights: [] as string[],
  WhychooseUs: "",
  WhychooseUspoints: [] as string[],
  proximity: [] as { label: string; value: string }[],
  gallery_images: [] as { label: string; value: string }[],
  youtube_videos: [] as string[],
  is_featured: false,
};

type FormData = typeof emptyForm;

// ── pill style ────────────────────────────────────────────────────────────────
const pill = "flex items-center gap-1 bg-amber-100 text-amber-800 text-xs font-medium px-2 py-1 rounded-full";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<FormData>({ ...emptyForm });

  // temp array-input states
  const [highlightInput, setHighlightInput] = useState("");
  const [amenityInput, setAmenityInput] = useState("");
  const [whyPointInput, setWhyPointInput] = useState("");
  const [proximityLabel, setProximityLabel] = useState("");
  const [proximityValue, setProximityValue] = useState("");
  const [galleryLabel, setGalleryLabel] = useState("");
  const [galleryValue, setGalleryValue] = useState("");
  const [youtubeInput, setYoutubeInput] = useState("");

  React.useEffect(() => { fetchProjects(); }, []);

  // ── fetch ────────────────────────────────────────────────────────────────────
  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : data.data ?? []);
    } catch (e) {
      console.error("Failed to fetch projects:", e);
    } finally {
      setLoading(false);
    }
  };

  // ── file upload (Cloudinary / your own upload API) ────────────────────────
  // Replace this with your own upload endpoint. Supabase has been removed.
  const uploadFile = async (file: File): Promise<string> => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    if (!res.ok) throw new Error("Upload failed");
    const json = await res.json();
    return json.url as string; // your API should return { url: "..." }
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "hero_image" | "layout_image" | "brochure_url"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadFile(file);
      setFormData((prev) => ({ ...prev, [field]: url }));
      toast.success("File uploaded successfully");
    } catch (err: any) {
      toast.error(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadFile(file);
      setFormData((prev) => ({
        ...prev,
        gallery_images: [...prev.gallery_images, { label: file.name, value: url }],
      }));
      toast.success("Gallery image uploaded");
    } catch (err: any) {
      toast.error(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  // ── array helpers ─────────────────────────────────────────────────────────
  const addHighlight = () => {
    const val = highlightInput.trim();
    if (!val) return;
    setFormData((p) => ({ ...p, Highlights: [...p.Highlights, val] }));
    setHighlightInput("");
  };
  const removeHighlight = (i: number) =>
    setFormData((p) => ({ ...p, Highlights: p.Highlights.filter((_, idx) => idx !== i) }));

  const addAmenity = () => {
    const val = amenityInput.trim();
    if (!val) return;
    setFormData((p) => ({ ...p, amenities: [...p.amenities, val] }));
    setAmenityInput("");
  };
  const removeAmenity = (i: number) =>
    setFormData((p) => ({ ...p, amenities: p.amenities.filter((_, idx) => idx !== i) }));

  const addWhyPoint = () => {
    const val = whyPointInput.trim();
    if (!val) return;
    setFormData((p) => ({ ...p, WhychooseUspoints: [...p.WhychooseUspoints, val] }));
    setWhyPointInput("");
  };
  const removeWhyPoint = (i: number) =>
    setFormData((p) => ({ ...p, WhychooseUspoints: p.WhychooseUspoints.filter((_, idx) => idx !== i) }));

  const addProximity = () => {
    const label = proximityLabel.trim();
    const value = proximityValue.trim();
    if (!label || !value) return;
    setFormData((p) => ({ ...p, proximity: [...p.proximity, { label, value }] }));
    setProximityLabel("");
    setProximityValue("");
  };
  const removeProximity = (i: number) =>
    setFormData((p) => ({ ...p, proximity: p.proximity.filter((_, idx) => idx !== i) }));

  const addGallery = () => {
    const label = galleryLabel.trim();
    const value = galleryValue.trim();
    if (!value) return;
    setFormData((p) => ({ ...p, gallery_images: [...p.gallery_images, { label, value }] }));
    setGalleryLabel("");
    setGalleryValue("");
  };
  const removeGallery = (i: number) =>
    setFormData((p) => ({ ...p, gallery_images: p.gallery_images.filter((_, idx) => idx !== i) }));

  const addYoutube = () => {
    const val = youtubeInput.trim();
    if (!val) return;
    setFormData((p) => ({ ...p, youtube_videos: [...p.youtube_videos, val] }));
    setYoutubeInput("");
  };
  const removeYoutube = (i: number) =>
    setFormData((p) => ({ ...p, youtube_videos: p.youtube_videos.filter((_, idx) => idx !== i) }));

  // ── submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!formData.name || !formData.location) {
      toast.error("Please fill in required fields");
      return;
    }
    const slug = formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
    const payload = { ...formData, slug };

    try {
      const id = editingProject ? getId(editingProject) : null;
      const res = await fetch(id ? `/api/projects/${id}` : "/api/projects", {
        method: id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to save project");
      }
      toast.success(id ? "Project updated" : "Project created");
      fetchProjects();
      closeModal();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // ── delete ────────────────────────────────────────────────────────────────
  const handleDelete = async (project: any) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    const id = getId(project);
    if (!id) { toast.error("Invalid project ID"); return; }
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete project");
      toast.success("Project deleted");
      fetchProjects();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // ── open edit ─────────────────────────────────────────────────────────────
  const openEditModal = (project: any) => {
    setEditingProject(project);
    setFormData({
      name: project.name ?? "",
      slug: project.slug ?? "",
      location: project.location ?? "",
      approval_type: project.approval_type ?? "HMDA Approved",
      status: project.status ?? "ongoing",
      total_plots: project.total_plots ?? 0,
      available_plots: project.available_plots ?? 0,
      commercial_plots: project.commercial_plots ?? 0,
      residential_plots: project.residential_plots ?? 0,
      price_per_sqyd: project.price_per_sqyd ?? 0,
      Totalacres: project.Totalacres ?? 0,
      description: project.description ?? "",
      hero_image: project.hero_image ?? "",
      layout_image: project.layout_image ?? "",
      brochure_url: project.brochure_url ?? "",
      google_embed_url: project.google_embed_url ?? "",
      amenities: project.amenities ?? [],
      Highlights: project.Highlights ?? [],
      WhychooseUs: project.WhychooseUs ?? "",
      WhychooseUspoints: project.WhychooseUspoints ?? [],
      proximity: project.proximity ?? [],
      gallery_images: project.gallery_images ?? [],
      youtube_videos: project.youtube_videos ?? [],
      is_featured: project.is_featured ?? false,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProject(null);
    setFormData({ ...emptyForm });
    setHighlightInput(""); setAmenityInput(""); setWhyPointInput("");
    setProximityLabel(""); setProximityValue("");
    setGalleryLabel(""); setGalleryValue(""); setYoutubeInput("");
  };

  // ── render ────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-500">Manage all your projects</p>
        </div>
        <Button onClick={() => setShowModal(true)} className="bg-amber-500 hover:bg-amber-600 text-black rounded-xl">
          <Plus className="h-4 w-4 mr-2" /> Add Project
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {["Project", "Location", "Status", "Plots", "Price/Sq.Yd", "Actions"].map((h) => (
                  <th key={h} className={`px-6 py-4 text-xs font-semibold text-gray-500 uppercase ${h === "Actions" ? "text-right" : "text-left"}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-400">Loading...</td></tr>
              ) : projects.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-400">No projects found</td></tr>
              ) : (
                projects.map((project) => {
                  const id = getId(project);
                  return (
                    <tr key={id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-amber-100 rounded-lg flex items-center justify-center overflow-hidden">
                            {project.hero_image
                              ? <img src={project.hero_image} alt={project.name} className="h-full w-full object-cover" />
                              : <ImageIcon className="h-5 w-5 text-amber-600" />}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{project.name}</div>
                            <div className="text-sm text-gray-500">{project.approval_type}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{project.location}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${project.status === "ongoing" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"}`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900">{project.available_plots}/{project.total_plots}</div>
                        <div className="text-xs text-gray-500">available</div>
                      </td>
                      <td className="px-6 py-4 text-gray-900">₹{project.price_per_sqyd?.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/projects/${id}/plots`}>
                            <Button variant="ghost" size="sm" className="h-9 w-9 p-0" title="Manage Plots">
                              <MapPin className="h-4 w-4 text-emerald-500" />
                            </Button>
                          </Link>
                          <Link href={`/projects/${project.slug}`} target="_blank">
                            <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                              <Eye className="h-4 w-4 text-gray-400" />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="sm" className="h-9 w-9 p-0" onClick={() => openEditModal(project)}>
                            <Edit className="h-4 w-4 text-blue-500" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-9 w-9 p-0" onClick={() => handleDelete(project)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={closeModal} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-xl font-bold text-gray-900">{editingProject ? "Edit Project" : "Add New Project"}</h2>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full" title="Close">
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            <div className="p-6 space-y-6">

              {/* ── Basic Info ─────────────────────────────────────── */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Project Name *</label>
                  <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="h-12 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Slug (URL)</label>
                  <Input value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} placeholder="auto-generated" className="h-12 rounded-xl" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Location *</label>
                  <Input value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="h-12 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Approval Type</label>
                  <select value={formData.approval_type} onChange={(e) => setFormData({ ...formData, approval_type: e.target.value })} className="w-full h-12 rounded-xl border border-gray-200 px-4">
                    <option>HMDA Approved</option>
                    <option>DTCP Approved</option>
                    <option>YTDA Approved</option>
                    <option>MUDA Approved</option>
                  </select>
                </div>
              </div>

              {/* ── Status & Sizes ─────────────────────────────────── */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full h-12 rounded-xl border border-gray-200 px-4">
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Total Acres</label>
                  <Input type="number" value={formData.Totalacres} onChange={(e) => setFormData({ ...formData, Totalacres: parseFloat(e.target.value) })} className="h-12 rounded-xl" />
                </div>
              </div>

              {/* ── Plot Numbers ───────────────────────────────────── */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Total Plots</label>
                  <Input type="number" value={formData.total_plots} onChange={(e) => setFormData({ ...formData, total_plots: parseInt(e.target.value) })} className="h-12 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Available Plots</label>
                  <Input type="number" value={formData.available_plots} onChange={(e) => setFormData({ ...formData, available_plots: parseInt(e.target.value) })} className="h-12 rounded-xl" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Residential Plots</label>
                  <Input type="number" value={formData.residential_plots} onChange={(e) => setFormData({ ...formData, residential_plots: parseInt(e.target.value) })} className="h-12 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Commercial Plots</label>
                  <Input type="number" value={formData.commercial_plots} onChange={(e) => setFormData({ ...formData, commercial_plots: parseInt(e.target.value) })} className="h-12 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Price / Sq.Yd</label>
                  <Input type="number" value={formData.price_per_sqyd} onChange={(e) => setFormData({ ...formData, price_per_sqyd: parseFloat(e.target.value) })} className="h-12 rounded-xl" />
                </div>
              </div>

              {/* ── Images ─────────────────────────────────────────── */}
              {(["hero_image", "layout_image", "brochure_url"] as const).map((field) => (
                <div className="space-y-2" key={field}>
                  <label className="text-sm font-semibold text-gray-700">
                    {field === "hero_image" ? "Hero Image" : field === "layout_image" ? "Layout Image" : "Brochure (PDF / Image)"}
                  </label>
                  <div className="flex gap-2">
                    <Input value={formData[field]} onChange={(e) => setFormData({ ...formData, [field]: e.target.value })} placeholder="Paste URL or upload →" className="h-12 rounded-xl flex-1" />
                    <div className="relative">
                      <input type="file" onChange={(e) => handleFileUpload(e, field)} className="hidden" id={`upload-${field}`} accept={field === "brochure_url" ? ".pdf,image/*" : "image/*"} />
                      <label htmlFor={`upload-${field}`} className={`flex items-center justify-center h-12 px-4 rounded-xl border-2 border-dashed border-gray-300 hover:border-amber-500 cursor-pointer transition-colors ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
                        <ImageIcon className="h-5 w-5 text-gray-400" />
                      </label>
                    </div>
                  </div>
                </div>
              ))}

              {/* ── Gallery Images ─────────────────────────────────── */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Gallery Images</label>
                <div className="flex gap-2">
                  <Input value={galleryLabel} onChange={(e) => setGalleryLabel(e.target.value)} placeholder="Caption (optional)" className="h-12 rounded-xl w-1/3" />
                  <Input value={galleryValue} onChange={(e) => setGalleryValue(e.target.value)} placeholder="Image URL" className="h-12 rounded-xl flex-1" />
                  <Button type="button" onClick={addGallery} className="h-12 px-4 bg-amber-500 hover:bg-amber-600 text-black rounded-xl">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {/* Upload from device */}
                <div className="flex items-center gap-2">
                  <input type="file" accept="image/*" onChange={handleGalleryUpload} id="gallery-upload" className="hidden" />
                  <label htmlFor="gallery-upload" className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-dashed border-gray-300 hover:border-amber-500 cursor-pointer text-sm text-gray-500 transition-colors ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
                    <ImageIcon className="h-4 w-4" /> Upload from device
                  </label>
                </div>
                {formData.gallery_images.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.gallery_images.map((img, i) => (
                      <div key={i} className="relative group">
                        <img src={img.value} alt={img.label} className="w-20 h-20 object-cover rounded-lg" />
                        {img.label && <div className="text-xs text-center text-gray-500 mt-0.5 truncate w-20">{img.label}</div>}
                        <button onClick={() => removeGallery(i)} className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ── YouTube Videos ─────────────────────────────────── */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">YouTube Videos</label>
                <div className="flex gap-2">
                  <Input value={youtubeInput} onChange={(e) => setYoutubeInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addYoutube())} placeholder="https://youtube.com/..." className="h-12 rounded-xl flex-1" />
                  <Button type="button" onClick={addYoutube} className="h-12 px-4 bg-amber-500 hover:bg-amber-600 text-black rounded-xl">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {formData.youtube_videos.length > 0 && (
                  <div className="flex flex-col gap-1 mt-2">
                    {formData.youtube_videos.map((url, i) => (
                      <div key={i} className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700">
                        <span className="truncate flex-1">{url}</span>
                        <button onClick={() => removeYoutube(i)} className="ml-2 text-gray-400 hover:text-red-500"><X className="h-3.5 w-3.5" /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ── Description ───────────────────────────────────── */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Description</label>
                <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="min-h-[100px] rounded-xl" />
              </div>

              {/* ── Google Map Embed ──────────────────────────────── */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Google Map Embed URL</label>
                <Input value={formData.google_embed_url} onChange={(e) => setFormData({ ...formData, google_embed_url: e.target.value })} placeholder="https://maps.google.com/maps?..." className="h-12 rounded-xl" />
              </div>

              {/* ── Highlights ───────────────────────────────────── */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Highlights</label>
                <div className="flex gap-2">
                  <Input value={highlightInput} onChange={(e) => setHighlightInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addHighlight())} placeholder="e.g. Gated Community" className="h-12 rounded-xl flex-1" />
                  <Button type="button" onClick={addHighlight} className="h-12 px-4 bg-amber-500 hover:bg-amber-600 text-black rounded-xl"><Plus className="h-4 w-4" /></Button>
                </div>
                {formData.Highlights.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.Highlights.map((h, i) => (
                      <span key={i} className={pill}>{h}<button type="button" onClick={() => removeHighlight(i)} className="ml-1 hover:text-red-600"><X className="h-3 w-3" /></button></span>
                    ))}
                  </div>
                )}
              </div>

              {/* ── Amenities ────────────────────────────────────── */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Amenities</label>
                <div className="flex gap-2">
                  <Input value={amenityInput} onChange={(e) => setAmenityInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addAmenity())} placeholder="e.g. Swimming Pool" className="h-12 rounded-xl flex-1" />
                  <Button type="button" onClick={addAmenity} className="h-12 px-4 bg-amber-500 hover:bg-amber-600 text-black rounded-xl"><Plus className="h-4 w-4" /></Button>
                </div>
                {formData.amenities.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.amenities.map((a, i) => (
                      <span key={i} className={pill}>{a}<button type="button" onClick={() => removeAmenity(i)} className="ml-1 hover:text-red-600"><X className="h-3 w-3" /></button></span>
                    ))}
                  </div>
                )}
              </div>

              {/* ── Why Choose Us ────────────────────────────────── */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Why Choose Us (heading)</label>
                <Input value={formData.WhychooseUs} onChange={(e) => setFormData({ ...formData, WhychooseUs: e.target.value })} placeholder="e.g. Why invest in this project?" className="h-12 rounded-xl" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Why Choose Us Points</label>
                <div className="flex gap-2">
                  <Input value={whyPointInput} onChange={(e) => setWhyPointInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addWhyPoint())} placeholder="e.g. High ROI Location" className="h-12 rounded-xl flex-1" />
                  <Button type="button" onClick={addWhyPoint} className="h-12 px-4 bg-amber-500 hover:bg-amber-600 text-black rounded-xl"><Plus className="h-4 w-4" /></Button>
                </div>
                {formData.WhychooseUspoints.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.WhychooseUspoints.map((p, i) => (
                      <span key={i} className={pill}>{p}<button type="button" onClick={() => removeWhyPoint(i)} className="ml-1 hover:text-red-600"><X className="h-3 w-3" /></button></span>
                    ))}
                  </div>
                )}
              </div>

              {/* ── Proximity ────────────────────────────────────── */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Proximity</label>
                <div className="flex gap-2">
                  <Input value={proximityLabel} onChange={(e) => setProximityLabel(e.target.value)} placeholder="Label (e.g. Airport)" className="h-12 rounded-xl flex-1" />
                  <Input value={proximityValue} onChange={(e) => setProximityValue(e.target.value)} placeholder="Distance (e.g. 12 km)" className="h-12 rounded-xl flex-1" />
                  <Button type="button" onClick={addProximity} className="h-12 px-4 bg-amber-500 hover:bg-amber-600 text-black rounded-xl"><Plus className="h-4 w-4" /></Button>
                </div>
                {formData.proximity.length > 0 && (
                  <div className="mt-2 rounded-xl border border-gray-100 overflow-hidden">
                    {formData.proximity.map((p, i) => (
                      <div key={i} className="flex items-center justify-between px-4 py-2 text-sm border-b last:border-b-0 hover:bg-gray-50">
                        <span className="font-medium text-gray-700">{p.label}</span>
                        <span className="text-gray-500">{p.value}</span>
                        <button type="button" onClick={() => removeProximity(i)} className="ml-4 text-gray-400 hover:text-red-500"><X className="h-3.5 w-3.5" /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ── Featured ─────────────────────────────────────── */}
              <div className="flex items-center gap-3">
                <input type="checkbox" id="is_featured" checked={formData.is_featured} onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })} className="h-5 w-5 rounded border-gray-300" />
                <label htmlFor="is_featured" className="text-sm font-semibold text-gray-700 cursor-pointer">Featured Project</label>
              </div>

            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
              <Button variant="outline" onClick={closeModal} className="rounded-xl">Cancel</Button>
              <Button onClick={handleSubmit} className="bg-amber-500 hover:bg-amber-600 text-black rounded-xl">
                <Save className="h-4 w-4 mr-2" />
                {editingProject ? "Update Project" : "Create Project"}
              </Button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}