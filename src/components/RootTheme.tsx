"use client";
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect } from "react";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";

const COLORS_TOP = ["#B24C63a1", "#5438DCa1", "#357DEDa1", "#56EEF4a1", "#32E875a1"];

export default function RootTheme({ children, className }: { children: React.ReactNode, className: string }) {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(130% 130% at 50% 0%, #020617 55%, ${color})`;

  return (
    <motion.div
      style={{
        backgroundImage,
      }}
      className={`relative min-h-screen overflow-hidden ${className} bg-gray-950 text-gray-200`}
    >
      {children}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={1000} factor={4} fade speed={2} />
        </Canvas>
      </div>
    </motion.div>
  );
}
