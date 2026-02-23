"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Save, Image as ImageIcon, Building2, Trash2, Eye } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";

export default function AdminJumeirahPage() {
  const [building3DImage, setBuilding3DImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data } = await supabase
      .from("jumeirah_settings")
      .select("*")
      .eq("key", "building_3d_image")
      .single();
    
    if (data?.value) {
      setBuilding3DImage(data.value);
    }
    setLoading(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split(".").pop();
    const fileName = `building-3d-${Date.now()}.${fileExt}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from("jumeirah")
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("jumeirah")
        .getPublicUrl(fileName);

      setBuilding3DImage(publicUrl);
      toast.success("Image uploaded successfully");
    } catch (error: any) {
      toast.error(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("jumeirah_settings")
        .upsert({ 
          key: "building_3d_image", 
          value: building3DImage,
          updated_at: new Date().toISOString()
        }, { onConflict: "key" });

      if (error) throw error;
      toast.success("Settings saved successfully");
    } catch (error: any) {
      toast.error(`Save failed: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveImage = () => {
    setBuilding3DImage("");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Jumeirah Towers Settings</h1>
          <p className="text-gray-500">Manage the 3D building image for Jumeirah Towers page</p>
        </div>
        <Link href="/jumeirah-towers" target="_blank">
          <Button variant="outline" className="rounded-xl">
            <Eye className="h-4 w-4 mr-2" />
            View Page
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
            <Building2 className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Building Image</h2>
              <p className="text-gray-500 text-sm">Upload any building image - it will be displayed with 3D rotation effects</p>
          </div>
        </div>

        <div className="space-y-6">
          {building3DImage ? (
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100 border-2 border-gray-200">
                <Image
                  src={building3DImage}
                  alt="Jumeirah Towers 3D"
                  fill
                  className="object-cover"
                />
              </div>
              <button
                type="button"
                onClick={handleRemoveImage}
                aria-label="Remove image"
                className="absolute top-4 right-4 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-amber-500 hover:bg-amber-50/50 transition-all">
              <input
                type="file"
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
                disabled={uploading}
              />
              {uploading ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-gray-500">Uploading...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center">
                    <Upload className="h-8 w-8 text-amber-600" />
                  </div>
                  <div className="text-center">
                    <p className="text-gray-700 font-semibold">Click to upload building image</p>
                      <p className="text-gray-400 text-sm mt-1">PNG, JPG or WebP - Will be converted to 3D view</p>
                  </div>
                </div>
              )}
            </label>
          )}

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Or paste image URL</label>
            <div className="flex gap-3">
              <Input
                value={building3DImage}
                onChange={(e) => setBuilding3DImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="h-12 rounded-xl flex-1"
              />
              <label className="relative">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                  disabled={uploading}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 rounded-xl"
                  disabled={uploading}
                  asChild
                >
                  <span>
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Upload
                  </span>
                </Button>
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-amber-500 hover:bg-amber-600 text-black rounded-xl h-12 px-6"
            >
              {saving ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Saving...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Settings
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-2xl p-6 border border-amber-200">
          <h3 className="font-bold text-amber-900 mb-2">How it works</h3>
          <ul className="text-amber-800 text-sm space-y-1">
            <li>• Upload any building image (photo or render)</li>
            <li>• The image will automatically get 3D rotation effects</li>
            <li>• Auto-rotate animation runs by default</li>
            <li>• Users can hover to manually rotate the view</li>
            <li>• Best results: high-resolution frontal building shots</li>
          </ul>
        </div>
    </div>
  );
}
