"use client";
import { Github, Waypoints } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="text-white overflow-clip relative w-screen h-screen">
      <div className="absolute w-[70px] h-[1600px] -top-[640px] -rotate-[35deg] bg-[#8200ff]/80 blur-[175px]"></div>
      <div className="absolute md:block hidden w-[70px] h-[1600px] -top-[640px] right-0 rotate-[35deg] bg-[#8200ff]/80 blur-[175px]"></div>
      <div className="container md:pt-[250px] pt-[200px] text-center gap-4 flex flex-col items-center justify-center">
        <h1
          className="md:text-7xl text-5xl font-bold bg-[linear-gradient(167deg,#F0F0F0_15.54%,#F4F4F4_43.53%,#FFF_48.02%,rgba(188,188,188,0.68)81.88%)] bg-clip-text"
          style={{
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Heaven Hell AI
        </h1>
        <h3 className="text-lg md:max-w-[700px] px-4 mx-w-[95vw]">
          Engage in insightful conversations with both a devil and an angel,
          offering balanced perspectives in a warm, professional environment.
        </h3>
        <div className="px-4 mt-5 flex sm:flex-row flex-col gap-6 max-w-[400px] w-full justify-between">
          <Link href="/chat" className="hover:shadow-[2px_4px_16px_rgba(130,0,255,0.5)] flex items-center gap-2 text-xl font-semibold text-black bg-white rounded-lg px-5 py-4">
            <Waypoints />
            Get started
          </Link>
          <button className="hover:shadow-[2px_4px_16px_rgba(130,0,255,0.5)] flex items-center gap-2 text-xl font-semibold border-2 bg-black border-white rounded-lg px-9 py-4">
            <Github />
            Source
          </button>
        </div>
      </div>
    </main>
  );
}
