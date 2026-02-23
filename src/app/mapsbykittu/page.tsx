"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(
  () => import("react-leaflet").then(m => m.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then(m => m.TileLayer),
  { ssr: false }
);
const GeoJSON = dynamic(
  () => import("react-leaflet").then(m => m.GeoJSON),
  { ssr: false }
);
const ImageOverlay = dynamic(
  () => import("react-leaflet").then(m => m.ImageOverlay),
  { ssr: false }
);

export default function MapPage() {
  const [data, setData] = useState<any>(null);
  const [bounds, setBounds] = useState<any>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    fetch("/api/project-map")
      .then(res => res.json())
      .then(setData);
  }, []);

  useEffect(() => {
    if (mapRef.current && data?.geojson) {
      const calculatedBounds = data.geojson.features[0].geometry.coordinates[0].map(
        ([lng, lat]: [number, number]) => [lat, lng]
      );
      setBounds(calculatedBounds);
      mapRef.current.fitBounds(calculatedBounds);
    }
  }, [data]);

  if (!data?.geojson) {
    return (
      <div className="h-screen flex items-center justify-center">
        Upload KML from Admin to view map
      </div>
    );
  }

return (
  <MapContainer
    ref={mapRef}
    style={{ height: "100vh", width: "100%" }}
    zoom={13}
    center={[20, 0]}
    zoomControl
  >

      {/* ✅ SATELLITE (SAME AS BEFORE) */}
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />

      {/* ✅ ROADS (SAME AS BEFORE) */}
      <TileLayer
        url="https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}"
      />

      {/* ✅ STATE / CITY LABELS (SAME AS BEFORE) */}
      <TileLayer
        url="https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
      />

      {/* ✅ KML BOUNDARY */}
      <GeoJSON
        data={data.geojson}
        style={{
          color: "#22c55e",
          weight: 2,
          fillOpacity: 0.12
        }}
      />

      {/* ✅ PROJECT LAYOUT IMAGE (ALIGNED TO KML) */}
      {data.imageUrl && (
        <ImageOverlay
          url={data.imageUrl}
          bounds={bounds}
          opacity={0.85}
          zIndex={10}
        />
      )}
    </MapContainer>
  );
}
