"use client";

import React, { useEffect, useState } from "react";
import { supabase, Project } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Eye, X, Save, Image as ImageIcon, MapPin } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

const emptyForm = {
  name: "",
  slug: "",
  location: "",
  approval_type: "HMDA Approved",
  status: "ongoing",
  total_plots: 0,
  available_plots: 0,
  price_per_sqyd: 0,
  total_acres: 0,
  description: "",
  hero_image: "",
  layout_image: "",
  brochure_url: "",
  amenities: [] as string[],
  is_featured: false,
  Highlights: [] as string[],
  google_embed_url: "",
  proximity: [] as { label: string; value: string }[],
  Gallery: [] as string[],
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [showModal, setShowModal] = React.useState(false);
  const [editingProject, setEditingProject] = React.useState<Project | null>(null);
  const [uploading, setUploading] = React.useState(false);
  const [formData, setFormData] = React.useState({ ...emptyForm });

  // Temp input states for array fields
  const [highlightInput, setHighlightInput] = React.useState("");
  const [amenityInput, setAmenityInput] = React.useState("");
  const [proximityLabel, setProximityLabel] = React.useState("");
  const [proximityValue, setProximityValue] = React.useState("");
  const [galleryInput, setGalleryInput] = useState("");

  React.useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      const data = await response.json();
      if (Array.isArray(data)) {
        setProjects(data);
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };
  const addGallery = () => {

  if (!galleryInput.trim()) return;

  setFormData(prev => ({
    ...prev,
    Gallery: [...prev.Gallery, galleryInput.trim()]
  }));

  setGalleryInput("");
};

const removeGallery = (index: number) => {

  setFormData(prev => ({
    ...prev,
    Gallery: prev.Gallery.filter((_, i) => i !== index)
  }));
};
const handleGalleryUpload = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {

  const file = e.target.files?.[0];

  if (!file) return;

  setUploading(true);

  const fileExt = file.name.split(".").pop();

  const fileName = `${Math.random()}-${Date.now()}.${fileExt}`;

  const { error } = await supabase.storage
    .from("project-uploads")
    .upload(fileName, file);

  if (error) {
    toast.error(error.message);
    setUploading(false);
    return;
  }

  const { data } = supabase.storage
    .from("project-uploads")
    .getPublicUrl(fileName);

  setFormData(prev => ({
    ...prev,
    Gallery: [...prev.Gallery, data.publicUrl]
  }));

  toast.success("Gallery image added");

  setUploading(false);
};

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "hero_image" | "layout_image" | "brochure_url"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;

    try {
      const { error } = await supabase.storage
        .from("project-uploads")
        .upload(fileName, file);

      if (error) throw error;

      const {
        data: { publicUrl },
      } = supabase.storage.from("project-uploads").getPublicUrl(fileName);

      setFormData((prev) => ({ ...prev, [field]: publicUrl }));
      toast.success("File uploaded successfully");
    } catch (error: any) {
      toast.error(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  // --- Array helpers ---
  const addHighlight = () => {
    const val = highlightInput.trim();
    if (!val) return;
    setFormData((prev) => ({ ...prev, Highlights: [...prev.Highlights, val] }));
    setHighlightInput("");
  };

  const removeHighlight = (idx: number) =>
    setFormData((prev) => ({ ...prev, Highlights: prev.Highlights.filter((_, i) => i !== idx) }));

  const addAmenity = () => {
    const val = amenityInput.trim();
    if (!val) return;
    setFormData((prev) => ({ ...prev, amenities: [...prev.amenities, val] }));
    setAmenityInput("");
  };

  const removeAmenity = (idx: number) =>
    setFormData((prev) => ({ ...prev, amenities: prev.amenities.filter((_, i) => i !== idx) }));

  const addProximity = () => {
    const label = proximityLabel.trim();
    const value = proximityValue.trim();
    if (!label || !value) return;
    setFormData((prev) => ({ ...prev, proximity: [...prev.proximity, { label, value }] }));
    setProximityLabel("");
    setProximityValue("");
  };

  const removeProximity = (idx: number) =>
    setFormData((prev) => ({ ...prev, proximity: prev.proximity.filter((_, i) => i !== idx) }));

  // --- Submit ---
  const handleSubmit = async () => {
    if (!formData.name || !formData.location) {
      toast.error("Please fill in required fields");
      return;
    }

    const slug = formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-");
    const dataToSubmit = { ...formData, slug };

    try {
      const url = "/api/projects";
      const response = await fetch(
        editingProject ? `${url}/${editingProject.id}` : url,
        {
          method: editingProject ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSubmit),
        }
      );

      if (response.ok) {
        toast.success(
          editingProject ? "Project updated successfully" : "Project created successfully"
        );
        fetchProjects();
        closeModal();
      } else {
        const error = await response.json();
        throw new Error(error.error || "Failed to save project");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const response = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (response.ok) {
        toast.success("Project deleted");
        fetchProjects();
      } else {
        throw new Error("Failed to delete project");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const openEditModal = (project: any) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      slug: project.slug,
      location: project.location,
      approval_type: project.approval_type,
      status: project.status,
      total_plots: project.total_plots,
      available_plots: project.available_plots,
      price_per_sqyd: project.price_per_sqyd,
      total_acres: project.total_acres,
      description: project.description || "",
      hero_image: project.hero_image || "",
      layout_image: project.layout_image || "",
      brochure_url: project.brochure_url || "",
      amenities: project.amenities || [],
      is_featured: project.is_featured,
      Highlights: project.Highlights || [],
      google_embed_url: project.google_embed_url || "",
      proximity: project.proximity || [],
      Gallery: project.Gallery || [],
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProject(null);
    setFormData({ ...emptyForm });
    setHighlightInput("");
    setAmenityInput("");
    setProximityLabel("");
    setProximityValue("");
  };

  // Shared pill style
  const pill = "flex items-center gap-1 bg-amber-100 text-amber-800 text-xs font-medium px-2 py-1 rounded-full";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-500">Manage all your projects</p>
        </div>
        <Button
          onClick={() => setShowModal(true)}
          className="bg-amber-500 hover:bg-amber-600 text-black rounded-xl"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Project</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Location</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Plots</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Price/Sq.Yd</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                    Loading...
                  </td>
                </tr>
              ) : projects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                    No projects found
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-amber-100 rounded-lg flex items-center justify-center overflow-hidden">
                          {project.hero_image ? (
                            <img
                              src={project.hero_image}
                              alt={project.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <ImageIcon className="h-5 w-5 text-amber-600" />
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{project.name}</div>
                          <div className="text-sm text-gray-500">{project.approval_type}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{project.location}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                          project.status === "ongoing"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">
                        {project.available_plots}/{project.total_plots}
                      </div>
                      <div className="text-xs text-gray-500">available</div>
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      ₹{project.price_per_sqyd?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/projects/${project.id}/plots`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-9 w-9 p-0"
                            title="Manage Plots"
                          >
                            <MapPin className="h-4 w-4 text-emerald-500" />
                          </Button>
                        </Link>
                        <Link href={`/projects/${project.slug}`} target="_blank">
                          <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                            <Eye className="h-4 w-4 text-gray-400" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-9 w-9 p-0"
                          onClick={() => openEditModal(project)}
                        >
                          <Edit className="h-4 w-4 text-blue-500" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-9 w-9 p-0"
                          onClick={() => handleDelete(project.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
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
              <h2 className="text-xl font-bold text-gray-900">
                {editingProject ? "Edit Project" : "Add New Project"}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full"
                title="Close modal"
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Project Name *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-12 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Slug (URL)</label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="auto-generated"
                    className="h-12 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Location *</label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="h-12 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Approval Type</label>
                  <select
                    aria-label="Approval Type"
                    value={formData.approval_type}
                    onChange={(e) => setFormData({ ...formData, approval_type: e.target.value })}
                    className="w-full h-12 rounded-xl border border-gray-200 px-4"
                  >
                    <option value="HMDA Approved">HMDA Approved</option>
                    <option value="DTCP Approved">DTCP Approved</option>
                    <option value="YTDA Approved">YTDA Approved</option>
                    <option value="MUDA Approved">MUDA Approved</option>
                  </select>
                </div>
              </div>

              {/* Images */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Hero Image</label>
                <div className="flex gap-2">
                  <Input
                    value={formData.hero_image}
                    onChange={(e) => setFormData({ ...formData, hero_image: e.target.value })}
                    placeholder="URL or upload..."
                    className="h-12 rounded-xl flex-1"
                  />
                  <div className="relative">
                    <input
                      type="file"
                      onChange={(e) => handleFileUpload(e, "hero_image")}
                      className="hidden"
                      id="hero-upload"
                      accept="image/*"
                      title="Upload hero image"
                    />
                    <label
                      htmlFor="hero-upload"
                      className={`flex items-center justify-center h-12 px-4 rounded-xl border-2 border-dashed border-gray-300 hover:border-amber-500 cursor-pointer transition-colors ${
                        uploading ? "opacity-50 pointer-events-none" : ""
                      }`}
                    >
                      <ImageIcon className="h-5 w-5 text-gray-400" />
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Layout Image</label>
                  <div className="flex gap-2">
                    <Input
                      value={formData.layout_image}
                      onChange={(e) => setFormData({ ...formData, layout_image: e.target.value })}
                      placeholder="URL or upload..."
                      className="h-12 rounded-xl flex-1"
                    />
                    <div className="relative">
                      <input
                        type="file"
                        onChange={(e) => handleFileUpload(e, "layout_image")}
                        className="hidden"
                        id="layout-upload"
                        accept="image/*"
                        title="Upload layout image"
                      />
                      <label
                        htmlFor="layout-upload"
                        className={`flex items-center justify-center h-12 px-4 rounded-xl border-2 border-dashed border-gray-300 hover:border-amber-500 cursor-pointer transition-colors ${
                          uploading ? "opacity-50 pointer-events-none" : ""
                        }`}
                      >
                        <ImageIcon className="h-5 w-5 text-gray-400" />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Brochure (Optional)</label>
                  <div className="flex gap-2">
                    <Input
                      value={formData.brochure_url}
                      onChange={(e) => setFormData({ ...formData, brochure_url: e.target.value })}
                      placeholder="URL or upload..."
                      className="h-12 rounded-xl flex-1"
                    />
                    <div className="relative">
                      <input
                        type="file"
                        onChange={(e) => handleFileUpload(e, "brochure_url")}
                        className="hidden"
                        id="brochure-upload"
                        accept=".pdf,image/*"
                        title="Upload brochure"
                      />
                      <label
                        htmlFor="brochure-upload"
                        className={`flex items-center justify-center h-12 px-4 rounded-xl border-2 border-dashed border-gray-300 hover:border-amber-500 cursor-pointer transition-colors ${
                          uploading ? "opacity-50 pointer-events-none" : ""
                        }`}
                      >
                        <Plus className="h-5 w-5 text-gray-400" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status & Numbers */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Status</label>
                  <select
                    aria-label="Status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full h-12 rounded-xl border border-gray-200 px-4"
                  >
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Total Acres</label>
                  <Input
                    type="number"
                    value={formData.total_acres}
                    onChange={(e) =>
                      setFormData({ ...formData, total_acres: parseFloat(e.target.value) })
                    }
                    className="h-12 rounded-xl"
                  />
                </div>
              </div>
              {/* Gallery */}
<div className="space-y-2">

  <label className="text-sm font-semibold text-gray-700">
    Gallery Images
  </label>

  <div className="flex gap-2">

    <Input
      value={galleryInput}
      onChange={(e) => setGalleryInput(e.target.value)}
      placeholder="Paste image URL"
      className="h-12 rounded-xl flex-1"
    />

    <Button
      type="button"
      onClick={addGallery}
      className="h-12 px-4 bg-amber-500 rounded-xl"
    >
      Add
    </Button>

    <input
      type="file"
      accept="image/*"
      onChange={handleGalleryUpload}
    />

  </div>

  <div className="flex flex-wrap gap-2">

    {formData.Gallery.map((img, i) => (

      <div key={i} className="relative">

        <img
          src={img}
          className="w-20 h-20 object-cover rounded"
        />

        <button
          onClick={() => removeGallery(i)}
          className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1"
        >
          X
        </button>

      </div>

    ))}

  </div>

</div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Total Plots</label>
                  <Input
                    type="number"
                    value={formData.total_plots}
                    onChange={(e) =>
                      setFormData({ ...formData, total_plots: parseInt(e.target.value) })
                    }
                    className="h-12 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Available Plots</label>
                  <Input
                    type="number"
                    value={formData.available_plots}
                    onChange={(e) =>
                      setFormData({ ...formData, available_plots: parseInt(e.target.value) })
                    }
                    className="h-12 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Price/Sq.Yd</label>
                  <Input
                    type="number"
                    value={formData.price_per_sqyd}
                    onChange={(e) =>
                      setFormData({ ...formData, price_per_sqyd: parseFloat(e.target.value) })
                    }
                    className="h-12 rounded-xl"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="min-h-[100px] rounded-xl"
                />
              </div>

              {/* Google Map Embed URL */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Google Map Embed URL</label>
                <Input
                  value={formData.google_embed_url}
                  onChange={(e) => setFormData({ ...formData, google_embed_url: e.target.value })}
                  placeholder="https://maps.google.com/maps?..."
                  className="h-12 rounded-xl"
                />
              </div>

              {/* ── Highlights ── */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Highlights</label>
                <div className="flex gap-2">
                  <Input
                    value={highlightInput}
                    onChange={(e) => setHighlightInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addHighlight())}
                    placeholder="e.g. Gated Community"
                    className="h-12 rounded-xl flex-1"
                  />
                  <Button
                    type="button"
                    onClick={addHighlight}
                    className="h-12 px-4 bg-amber-500 hover:bg-amber-600 text-black rounded-xl"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {formData.Highlights.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.Highlights.map((h, i) => (
                      <span key={i} className={pill}>
                        {h}
                        <button
                          type="button"
                          onClick={() => removeHighlight(i)}
                          className="ml-1 hover:text-red-600"
                          title="Remove highlight"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* ── Amenities ── */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Amenities</label>
                <div className="flex gap-2">
                  <Input
                    value={amenityInput}
                    onChange={(e) => setAmenityInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addAmenity())}
                    placeholder="e.g. Swimming Pool"
                    className="h-12 rounded-xl flex-1"
                  />
                  <Button
                    type="button"
                    onClick={addAmenity}
                    className="h-12 px-4 bg-amber-500 hover:bg-amber-600 text-black rounded-xl"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {formData.amenities.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.amenities.map((a, i) => (
                      <span key={i} className={pill}>
                        {a}
                        <button
                          type="button"
                          onClick={() => removeAmenity(i)}
                          className="ml-1 hover:text-red-600"
                          title="Remove amenity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* ── Proximity ── */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Proximity</label>
                <div className="flex gap-2">
                  <Input
                    value={proximityLabel}
                    onChange={(e) => setProximityLabel(e.target.value)}
                    placeholder="Label (e.g. Airport)"
                    className="h-12 rounded-xl flex-1"
                  />
                  <Input
                    value={proximityValue}
                    onChange={(e) => setProximityValue(e.target.value)}
                    placeholder="Distance (e.g. 12 km)"
                    className="h-12 rounded-xl flex-1"
                  />
                  <Button
                    type="button"
                    onClick={addProximity}
                    className="h-12 px-4 bg-amber-500 hover:bg-amber-600 text-black rounded-xl"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {formData.proximity.length > 0 && (
                  <div className="mt-2 rounded-xl border border-gray-100 overflow-hidden">
                    {formData.proximity.map((p, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between px-4 py-2 text-sm border-b last:border-b-0 hover:bg-gray-50"
                      >
                        <span className="font-medium text-gray-700">{p.label}</span>
                        <span className="text-gray-500">{p.value}</span>
                        <button
                          type="button"
                          onClick={() => removeProximity(i)}
                          className="ml-4 text-gray-400 hover:text-red-500"
                          title="Remove proximity"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
                {/* ── Highlights ── */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Highlights</label>
                <div className="flex gap-2">
                  <Input
                    value={highlightInput}
                    onChange={(e) => setHighlightInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addHighlight())}
                    placeholder="e.g. Gated Community"
                    className="h-12 rounded-xl flex-1"
                  />
                  <Button
                    type="button"
                    onClick={addHighlight}
                    className="h-12 px-4 bg-amber-500 hover:bg-amber-600 text-black rounded-xl"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {formData.Highlights.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.Highlights.map((h, i) => (
                      <span key={i} className={pill}>
                        {h}
                        <button
                          type="button"
                          onClick={() => removeHighlight(i)}
                          className="ml-1 hover:text-red-600"
                          title="Remove highlight"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Featured */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="h-5 w-5 rounded border-gray-300"
                  aria-label="Featured Project"
                  id="is_featured"
                />
                <label htmlFor="is_featured" className="text-sm font-semibold text-gray-700 cursor-pointer">
                  Featured Project
                </label>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
              <Button variant="outline" onClick={closeModal} className="rounded-xl">
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                className="bg-amber-500 hover:bg-amber-600 text-black rounded-xl"
              >
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