"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

export function Building() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.005;
      const t = state.clock.getElapsedTime();
      group.current.position.y = Math.sin(t / 2) / 4;
    }
  });

  return (
    <group ref={group}>
      {/* Main Tower 1 */}
      <mesh position={[-0.8, 1, 0]}>
        <boxGeometry args={[0.8, 4, 0.8]} />
        <meshStandardMaterial color="#1e3a8a" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Main Tower 2 */}
      <mesh position={[0.2, 1.5, -0.5]}>
        <boxGeometry args={[1, 5, 1]} />
        <meshStandardMaterial color="#2563eb" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Decorative Panels */}
      <mesh position={[0.2, 1.5, 0.05]}>
        <boxGeometry args={[1.1, 0.1, 1.1]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.2, 2.5, 0.05]}>
        <boxGeometry args={[1.1, 0.1, 1.1]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.2, 3.5, 0.05]}>
        <boxGeometry args={[1.1, 0.1, 1.1]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>

      {/* Ground Reflection Plate */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <circleGeometry args={[4, 32]} />
        <MeshDistortMaterial
          color="#1e3a8a"
          speed={2}
          distort={0.1}
          metalness={1}
          roughness={0}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}

export function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={50} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
      <Building />
    </>
  );
}
