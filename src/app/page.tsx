"use client"
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect } from "react";
import { Github, Waypoints } from "lucide-react";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import Link from "next/link";

const COLORS_TOP = ["#FFAEBCa1", "#A0E7E5a1", "#B4F8C8a1", "#FBE7C6a1"];

export default function Home() {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(150% 150% at 50% 0%, #020617 50%, ${color})`;

  return (
    <motion.main
      style={{
        backgroundImage,
      }}
      className="relative grid min-h-screen place-content-center overflow-hidden bg-gray-950 px-4 py-24 text-gray-200"
    >
      <div className="relative z-10 flex flex-col items-center">
        <h1
          className="md:text-7xl text-5xl font-semibold bg-[linear-gradient(167deg,#F0F0F0_15.54%,#F4F4F4_43.53%,#FFF_48.02%,rgba(188,188,188,0.68)81.88%)] bg-clip-text"
          style={{
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Heaven Hell AI
        </h1>
        <p className="my-6 max-w-xl text-center text-base leading-relaxed md:text-lg md:leading-relaxed">
          Engage in insightful conversations with both a devil and an angel,
          offering balanced perspectives in a warm, professional environment.
        </p>
        <div className="px-4 mt-5 flex sm:flex-row flex-col gap-6 justify-center w-full">
          <Link
            className="hover:shadow-[2px_4px_16px_#color] flex items-center gap-2 font-semibold text-black bg-white rounded-lg px-5 py-2"
            href="/chat"
          >
            <Waypoints />
            Get started
          </Link>
          <a
            href="https://github.com/sumit-basak2208/heaven-hell-AI"
            target="_blank"
            className="hover:shadow-[2px_4px_16px_#color] flex items-center gap-2 font-semibold border-2 bg-black border-white rounded-lg px-9 py-2"
          >
            <Github />
            Source
          </a>
        </div>
      </div>

      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={1000} factor={4} fade speed={2} />
        </Canvas>
      </div>
    </motion.main>
  );
};
