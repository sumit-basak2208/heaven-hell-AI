import Image from "next/image";
import heavenBg from "./assets/heaven-bg.webp";

export default function Home() {
  return (
    <main className="mt-[52px] bg-white">
      <div className="flex">
        <section
          className="flex-1 h-[calc(100dvh-109px)] relative z-10 px-2 py-3"
          id="heaven"
        >
          <Image
            fill
            src={heavenBg}
            alt="heaven-bg"
            className="-z-10 opacity-50"
          />
          Heaven
        </section>
        <section className="flex-1 h-[calc(100dvh-109px)] px-2 py-3" id="hell">
          Hell
        </section>
      </div>
      <form className="px-10 py-2 bg-gradient-navbar">
        <textarea
          className="px-2 py-1 rounded-full border-1 border-black border w-full"
          placeholder="Enter text..."
          rows={1}
        />
      </form>
    </main>
  );
}
