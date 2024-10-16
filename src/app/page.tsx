import React from "react";
import { Github, Waypoints } from "lucide-react";
import Link from "next/link";
import RootTheme from "@/components/RootTheme";

export default function Home() {
  return (
    <RootTheme className="grid place-content-center px-4 py-24">
      <main className="relative z-10 flex flex-col items-center">
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
            className="hover:shadow-[2px_4px_16px_#ffffff6b] flex items-center gap-2 font-semibold text-black bg-white rounded-lg px-5 py-2"
            href="/chat"
          >
            <Waypoints />
            Get started
          </Link>
          <a
            href="https://github.com/sumit-basak2208/heaven-hell-AI"
            target="_blank"
            className="hover:shadow-[2px_4px_16px_#ffffff6b] flex items-center gap-2 font-semibold border-2 bg-black border-white rounded-lg px-9 py-2"
          >
            <Github />
            Source
          </a>
        </div>
      </main>
    </RootTheme>
  );
};
