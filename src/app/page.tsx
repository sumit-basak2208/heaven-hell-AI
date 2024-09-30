"use client";
import Image from "next/image";
import hhBg from "./assets/hh-bg.jpg";
import Message from "@/components/Message";
import { useEffect, useState } from "react";
import { Message as Msg } from "@/types/message";

export default function Home() {
  const [heavenMessage, setHeavenMessage] = useState<Msg[]>();
  const [hellMessage, setHellMessage] = useState<Msg[]>();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setHeavenMessage([
      { message: "Hello, how can I assist you today?", isBot: true },
      {
        message: "I'm looking for information on cloud services.",
        isBot: false,
      },
      {
        message:
          "Cloud services help you store and manage data on remote servers.",
        isBot: true,
      },
      {
        message: "Can you provide more details on storage options?",
        isBot: false,
      },
      {
        message:
          "Sure! There are options like block storage, object storage, and file storage.",
        isBot: true,
      },
      { message: "Which one is best for large data archiving?", isBot: false },
      {
        message:
          "For large data archiving, object storage is typically the best option.",
        isBot: true,
      },
      { message: "Great! How can I get started?", isBot: false },
      {
        message:
          "You can begin by selecting a cloud provider and creating an account.",
        isBot: true,
      },
      { message: "Thanks for the help!", isBot: false },
    ]);
    setHellMessage([
      { message: "Hello, how can I assist you today?", isBot: true },
      {
        message: "I'm looking for information on cloud services.",
        isBot: false,
      },
      {
        message:
          "Cloud services help you store and manage data on remote servers.",
        isBot: true,
      },
      {
        message: "Can you provide more details on storage options?",
        isBot: false,
      },
      {
        message:
          "Sure! There are options like block storage, object storage, and file storage.",
        isBot: true,
      },
      { message: "Which one is best for large data archiving?", isBot: false },
      {
        message:
          "For large data archiving, object storage is typically the best option.",
        isBot: true,
      },
      { message: "Great! How can I get started?", isBot: false },
      {
        message:
          "You can begin by selecting a cloud provider and creating an account.",
        isBot: true,
      },
      { message: "Thanks for the help!", isBot: false },
    ]);
  };
  return (
    <main className="mt-[49px] text-white">
      <div className="flex relative">
        <Image src={hhBg} fill alt="bg" className="opacity-50" />
        <section
          className="w-[50%] overflow-auto h-[calc(100dvh-109px)] py-3 relative z-10 scrollbar scrollbar-none scrollbar-track-none"
          id="heaven"
        >
          <div className="px-4 flex-grow scroll-smooth space-y-2">
            {heavenMessage?.map((ele) => (
              <Message
                message={ele.message}
                isBot={ele.isBot}
                isHeaven={true}
              />
            ))}
          </div>
        </section>
        <section
          className="w-[50%] overflow-auto h-[calc(100dvh-109px)] py-3 relative z-10 ml-4 scrollbar scrollbar-none scrollbar-track-none"
          id="hell"
        >
          <div className="px-4 flex-grow scroll-smooth space-y-2">
            {hellMessage?.map((ele) => (
              <Message
                message={ele.message}
                isBot={ele.isBot}
                isHeaven={false}
              />
            ))}
          </div>
        </section>
      </div>
      <form className="px-10 py-2 pt-3 bg-black border-t border-white">
        <div className="rounded-full flex border-white bg-black text-white border w-full">
          <textarea
            className="px-2 py-1 rounded-full bg-black text-white flex-1 border-0 outline-0"
            placeholder="Enter text..."
            rows={1}
          />
          <button className="p-2 rounded-full">
            <svg
              fill="#ffffff"
              height="20px"
              width="20px"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512.001 512.001"
              stroke="#ffffff"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g>
                  {" "}
                  <g>
                    {" "}
                    <g>
                      {" "}
                      <path d="M483.927,212.664L66.967,25.834C30.95,9.695-7.905,42.024,1.398,80.367l21.593,89.001 c3.063,12.622,11.283,23.562,22.554,30.014l83.685,47.915c6.723,3.85,6.738,13.546,0,17.405l-83.684,47.915 c-11.271,6.452-19.491,17.393-22.554,30.015L1.398,431.633c-9.283,38.257,29.507,70.691,65.569,54.534l416.961-186.83 C521.383,282.554,521.333,229.424,483.927,212.664z M468.609,265.151l-416.96,186.83c-7.618,3.417-15.814-3.398-13.845-11.516 l21.593-89.001c0.647-2.665,2.383-4.975,4.761-6.337l83.685-47.915c31.857-18.239,31.887-64.167,0-82.423l-83.685-47.916 c-2.379-1.362-4.115-3.672-4.761-6.337L37.804,71.535c-1.945-8.016,6.128-14.975,13.845-11.514L468.61,246.85 C476.522,250.396,476.542,261.596,468.609,265.151z"></path>{" "}
                      <path d="M359.268,238.907l-147.519-66.1c-9.444-4.231-20.523-0.005-24.752,9.435c-4.231,9.44-0.006,20.523,9.434,24.752 L305.802,256l-109.37,49.006c-9.44,4.231-13.664,15.313-9.434,24.752c4.231,9.443,15.312,13.663,24.752,9.435l147.519-66.101 C373.996,266.495,374.006,245.51,359.268,238.907z"></path>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>{" "}
              </g>
            </svg>
          </button>
        </div>
      </form>
    </main>
  );
}
