"use client";

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

interface PlotProps {
  position: [number, number, number];
  status: "approved" | "pending" | "available";
  id: string;
  onClick: (id: string) => void;
}

function Plot({ position, status, id, onClick }: PlotProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const colors = {
    approved: "#22c55e",
    pending: "#ef4444",
    available: "#ffffff",
  };

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.position.y = THREE.MathUtils.lerp(
        mesh.current.position.y,
        hovered ? 0.3 : 0,
        0.1
      );
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={mesh}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onClick(id)}
      >
        <boxGeometry args={[0.9, 0.2, 0.9]} />
        <meshStandardMaterial
          color={colors[status]}
          metalness={0.5}
          roughness={0.2}
          emissive={hovered ? colors[status] : "black"}
          emissiveIntensity={hovered ? 0.5 : 0}
        />
        <Text
          position={[0, 0.15, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.2}
          color={status === "available" ? "#1e3a8a" : "white"}
          anchorX="center"
          anchorY="middle"
        >
          {id}
        </Text>
      </mesh>
    </group>
  );
}

export function PlotMapScene({ onPlotClick }: { onPlotClick: (id: string) => void }) {
  const plots = [];
  const rows = 5;
  const cols = 5;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const status =
        (i + j) % 7 === 0 ? "pending" : (i + j) % 3 === 0 ? "approved" : "available";
      plots.push(
        <Plot
          key={`${i}-${j}`}
          position={[i - rows / 2 + 0.5, 0, j - cols / 2 + 0.5]}
          status={status as any}
          id={`P-${i}${j}`}
          onClick={onPlotClick}
        />
      );
    }
  }

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <group rotation={[Math.PI / 6, -Math.PI / 4, 0]}>
          {plots}
          {/* Base Plate */}
          <mesh position={[0, -0.2, 0]}>
            <boxGeometry args={[cols + 0.5, 0.1, rows + 0.5]} />
            <meshStandardMaterial color="#f3f4f6" />
          </mesh>
        </group>
      </Float>
      <ContactShadows position={[0, -1, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
    </>
  );
}
