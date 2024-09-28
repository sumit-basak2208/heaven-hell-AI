import Image from "next/image";
import logo from "../app/assets/hh-logo.png";

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 right-0 px-3 py-2 bg-gradient-navbar z-20 text-white shadow-lg">
      <div className="flex items-center gap-3">
        <Image src={logo} width={30} height={30} alt="log" />
        <h1 className="text-xl font-semibold mb-1">Hell Heaven AI</h1>
      </div>
    </nav>
  );
}
