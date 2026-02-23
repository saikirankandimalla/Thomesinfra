"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function AdminPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const uploadKML = async () => {
    if (!file) {
      alert("Please select a KML file");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload-kml", {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    setLoading(false);

    if (!res.ok) {
      alert(data.error || "Upload failed");
      return;
    }

    alert("KML uploaded and saved successfully!");
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Admin – Upload KML</h1>

      <Input
        type="file"
        accept=".kml"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button
        onClick={uploadKML}
        disabled={loading}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded"
      >
        {loading ? "Uploading..." : "Upload KML"}
      </button>
    </div>
  );
}
