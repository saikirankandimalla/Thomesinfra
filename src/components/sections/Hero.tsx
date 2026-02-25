"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
} from "lucide-react";

/**
 * Videos
 */
const heroVideos = [
  "/videos/logo_intro.mp4",
  "/videos/PILLAR-TELUGU.mp4",
  "/videos/PILLAR-ENGLISH.mp4",
];

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [direction, setDirection] = useState(0);

  // sound state (start muted for autoplay safety)
  const [isMuted, setIsMuted] = useState(true);

  // show controls on hover (Netflix style)
  const [showControls, setShowControls] = useState(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * Ensure autoplay works
   */
  useEffect(() => {
    if (!videoRef.current) return;

    videoRef.current.muted = isMuted;

    const playPromise = videoRef.current.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  }, [currentVideo, isMuted]);

  /**
   * Next video
   */
  const nextVideo = useCallback(() => {
    setDirection(1);
    setCurrentVideo((prev) => (prev + 1) % heroVideos.length);
  }, []);

  /**
   * Previous video
   */
  const prevVideo = useCallback(() => {
    setDirection(-1);
    setCurrentVideo(
      (prev) => (prev - 1 + heroVideos.length) % heroVideos.length
    );
  }, []);

  /**
   * Go to specific video
   */
  const goToVideo = useCallback(
    (index: number) => {
      setDirection(index > currentVideo ? 1 : -1);
      setCurrentVideo(index);
    },
    [currentVideo]
  );

  /**
   * Toggle sound
   */
  const toggleSound = () => {
    if (!videoRef.current) return;

    const newMuted = !isMuted;
    setIsMuted(newMuted);
    videoRef.current.muted = newMuted;

    if (!newMuted) {
      videoRef.current.volume = 1;
      videoRef.current.play().catch(() => {});
    }
  };

  /**
   * Netflix style controls visibility
   */
  const handleMouseMove = () => {
    setShowControls(true);

    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }

    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  if (!mounted) {
    return <section className="relative min-h-screen bg-black" />;
  }

  return (
    <section
      className="relative w-full min-h-screen overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setShowControls(true)}
    >

      {/* VIDEO */}
      <div className="absolute inset-0">

        <AnimatePresence mode="wait">
          <motion.video
            key={currentVideo}
            ref={videoRef}
            src={heroVideos[currentVideo]}

            autoPlay
            playsInline
            preload="auto"
            muted={isMuted}

            onEnded={nextVideo}

            className="absolute inset-0 w-full h-full object-cover"

            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}

            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>

        {/* subtle overlay */}
        <div className="absolute inset-0 bg-black/10" />

      </div>

      {/* CONTROLS */}
      <div
        className={`
        absolute inset-0 z-20
        transition-opacity duration-500
        ${showControls ? "opacity-100" : "opacity-0"}
      `}
      >

        {/* LEFT */}
        <button
          onClick={prevVideo}
          className="
          absolute left-6 top-1/2 -translate-y-1/2
          bg-black/40 hover:bg-black/60
          backdrop-blur-md
          border border-white/20
          text-white
          p-3 rounded-full
          transition
          "
        >
          <ChevronLeft size={28} />
        </button>

        {/* RIGHT */}
        <button
          onClick={nextVideo}
          className="
          absolute right-6 top-1/2 -translate-y-1/2
          bg-black/40 hover:bg-black/60
          backdrop-blur-md
          border border-white/20
          text-white
          p-3 rounded-full
          transition
          "
        >
          <ChevronRight size={28} />
        </button>

        {/* SOUND BUTTON */}
        <button
          onClick={toggleSound}
          className="
          absolute bottom-8 right-8
          bg-black/40 hover:bg-black/60
          backdrop-blur-md
          border border-white/20
          text-white
          p-3 rounded-full
          transition
          "
        >
          {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
        </button>

        {/* DOTS */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">

          {heroVideos.map((_, index) => (
            <button
              key={index}
              onClick={() => goToVideo(index)}
              className={`
              transition-all duration-300 rounded-full
              ${
                index === currentVideo
                  ? "w-10 h-3 bg-white"
                  : "w-3 h-3 bg-white/40 hover:bg-white/70"
              }
              `}
            />
          ))}

        </div>

      </div>

    </section>
  );
}

