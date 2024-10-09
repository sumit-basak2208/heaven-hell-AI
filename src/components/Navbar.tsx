"use client";
import Image from "next/image";
import logo from "../app/assets/hh-logo.png";
import { signIn, signOut, useSession } from "next-auth/react";
import { ChevronDown, LogIn, LogOut } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const session = useSession();

  return (
    <nav className="absolute top-0 flex justify-between left-0 w-[100vw] px-3 py-2 bg-black z-20 text-white shadow-lg border-b border-white">
      <div className="flex items-center gap-3">
        {/* <Image src={logo} width={30} height={30} alt="log" /> */}
        <Link href="/" className="text-xl font-semibold mb-1">Hell Heaven AI</Link>
      </div>
      <div className="flex items-center mr-1">
        {session.status === "authenticated" ? (
          <button onClick={ ev => signOut()}  className="flex items-center text-lg font-semibold gap-1">
            <span className="mb-1">Logout</span>
            <LogOut />
          </button>
        ) : (
            <button onClick={ev => signIn("google") }  className="flex items-center text-lg font-semibold gap-1">
            <span className="mb-1">Login</span>
            <LogIn />
          </button>
        )}
      </div>
    </nav>
  );
}
