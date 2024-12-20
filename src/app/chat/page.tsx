"use client";
import Image from "next/image";
import Message from "@/components/Message";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Message as Msg } from "@/types/message";
import { useNotifications } from "reapop";
import { heavenBot } from "@/utils/heaven";
import { hellBot } from "@/utils/hell";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import angelLogo from "../assets/angel-logo.jpg";
import devilLogo from "../assets/devil-logo.jpg";
import BouncingDotLoader from "@/components/BouncingDotLoader";
import RootTheme from "@/components/RootTheme";

export default function Chat() {
  const router = useRouter();
  const session = useSession();

  const [heavenMessages, setHeavenMessages] = useState<Msg[]>();
  const [hellMessages, setHellMessages] = useState<Msg[]>();
  const [active, setActive] = useState("hell");
  const promptRef = useRef<HTMLTextAreaElement>(null);

  const hellMsgEnd = useRef<HTMLDivElement>(null);
  const heavenMsgEnd = useRef<HTMLDivElement>(null);

  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const { notify } = useNotifications();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      notify("Please login first!!", "info");
      router.push("/");
    } else if (session.status === "authenticated") {
      getData();
    }
  }, [session]);

  useEffect(() => {
    const handleKeyDown = (ev: KeyboardEvent) => {
      if (ev.ctrlKey || ev.altKey) {
        return;
      }
      if (promptRef.current) {
        promptRef.current.focus();
      }
    };
    globalThis.addEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    hellMsgEnd.current?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      heavenMsgEnd.current?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  }, [hellMessages, heavenMessages]);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await fetch("api/v1/message");
      const data = await res.json();
      if (res.status == 401 && session.status) {
        notify(data.error, "error");
        signOut();
        router.push("/");
      }

      if (data.success === true) {
        setHeavenMessages(data.heaven);
        setHellMessages(data.hell);
      }
    } catch (err) {
      console.log(err);
      notify("Failed to fetch data!", "error");
    } finally {
      setLoading(false);
    }
  };

  const onFormSubmit = async (ev: SyntheticEvent) => {
    ev.preventDefault();
    if (!prompt.trim()) return;
    try {
      setPrompt("");
      setHeavenMessages((dt) => [
        ...(dt ?? []),
        { message: prompt, isBot: false },
      ]);
      setHellMessages((dt) => [
        ...(dt ?? []),
        { message: prompt, isBot: false },
      ]);
      setLoading(true);
      const [hellRes, heavenRes] = await Promise.all([
        hellBot(prompt, hellMessages ?? []),
        heavenBot(prompt, heavenMessages ?? []),
      ]);
      setHeavenMessages((heavenMessages) => [
        ...(heavenMessages ?? []),
        { message: heavenRes, isBot: true },
      ]);
      setHellMessages((hellMessages) => [
        ...(hellMessages ?? []),
        { message: hellRes, isBot: true },
      ]);
      fetch("api/v1/message", {
        method: "POST",
        body: JSON.stringify({
          prompt: prompt,
          hellMessage: hellRes,
          heavenMessage: heavenRes,
        }),
      });
    } catch (err) {
      console.log(err);
      notify("Failed to fetch data!", "error");
      setHeavenMessages((heavenMessages) => [
        ...(heavenMessages ?? []),
        { message: "Bot not responding", isBot: true },
      ]);
      setHellMessages((hellMessages) => [
        ...(hellMessages ?? []),
        { message: "Bot not responding", isBot: true },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onPromptKeydown = (ev: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (ev.key === "Enter" && !ev.shiftKey) {
      ev.preventDefault();
      const submitEvent = new Event(
        "submit"
      ) as unknown as React.FormEvent<HTMLFormElement>;
      onFormSubmit(submitEvent);
    }
  };

  return (
    <RootTheme className="">
      <main className="mt-[49px] text-white">
        <div className="flex">
          <button
            onClick={() => setActive("heaven")}
            className="flex gap-3 justify-center items-center flex-1 text-lg py-3 bg-black/40 border-white border-b border-r"
          >
            <div className="relative border border-zinc-300 h-7 w-7 bg-white rounded-full overflow-hidden">
              <Image fill alt="profile picture" src={angelLogo} />
            </div>
            Heaven
          </button>
          <button
            onClick={() => setActive("hell")}
            className="flex gap-3 justify-center items-center flex-1 text-lg py-3 bg-black/40 border-white border-b"
          >
            <div className="relative border border-zinc-300 h-7 w-7 bg-white rounded-full overflow-hidden">
              <Image fill alt="profile picture" src={devilLogo} />
            </div>
            Hell
          </button>
        </div>
        <div className="flex">
          <section
            className={`relative z-50 md:!block ${
              active == "heaven" ? "block" : "hidden"
            } flex-1 overflow-auto h-[calc(100dvh-160px)] py-3 border-r border-white scrollbar scrollbar-none scrollbar-track-none`}
            id="heaven"
          >
            <div className="px-4 flex-grow scroll-smooth space-y-2">
              {heavenMessages?.map((ele) => (
                <Message
                  key={ele?._id}
                  message={ele.message}
                  isBot={ele.isBot}
                  isHeaven={true}
                />
              ))}
              {loading && (
                <div className={`flex justify-start mr-8 gap-2`}>
                  <div className="border border-zinc-300 h-5 w-5 bg-white rounded-full overflow-hidden -mt-1">
                    <Image
                      width={20}
                      height={20}
                      alt="profile picture"
                      src={angelLogo}
                    />
                  </div>
                  <div
                    className={`max-w-[calc(100%-50px)] mb-3 rounded-b-lg rounded-tr-lg py-3 px-4`}
                    style={{
                      backgroundColor: "rgb(61, 68, 85)",
                      color: "white",
                    }}
                  >
                    <div className="flex flex-col items-start break-words">
                      <div className="prose text-inherit text-left w-full break-words dark:prose-invert text-sm">
                        <div>
                          <BouncingDotLoader />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={heavenMsgEnd}></div>
            </div>
          </section>
          <section
            className={`relative z-50 md:!block ${
              active == "hell" ? "block" : "hidden"
            } flex-1 overflow-auto h-[calc(100dvh-160px)] py-3 scrollbar scrollbar-none scrollbar-track-none`}
            id="hell"
          >
            <div className="px-4 flex-grow scroll-smooth space-y-2">
              {hellMessages?.map((ele) => (
                <Message
                  key={ele?._id}
                  message={ele.message}
                  isBot={ele.isBot}
                  isHeaven={false}
                />
              ))}
              {loading && (
                <div className={`flex justify-start mr-8 gap-2`}>
                  <div className="border border-zinc-300 h-5 w-5 bg-white rounded-full overflow-hidden -mt-1">
                    <Image
                      width={20}
                      height={20}
                      alt="profile picture"
                      src={devilLogo}
                    />
                  </div>
                  <div
                    className={`max-w-[calc(100%-50px)] mb-3 rounded-b-lg rounded-tr-lg py-3 px-4`}
                    style={{
                      backgroundColor: "rgb(61, 68, 85)",
                      color: "white",
                    }}
                  >
                    <div className="flex flex-col items-start break-words">
                      <div className="prose text-inherit text-left w-full break-words dark:prose-invert text-sm">
                        <div>
                          <BouncingDotLoader />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={hellMsgEnd}></div>
            </div>
          </section>
        </div>
        <form
          className="relative z-10 px-10 py-2 pt-3 bg-black/40 border-t border-white"
          onSubmit={onFormSubmit}
        >
          <div className="rounded-full flex border-white bg-black text-white border w-full">
            <textarea
              ref={promptRef}
              className="px-2 py-1 rounded-full bg-black text-white flex-1 border-0 outline-0"
              placeholder="Enter message..."
              rows={1}
              onChange={(ev) => setPrompt(ev.target.value)}
              onKeyDown={onPromptKeydown}
              value={prompt}
              required
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
    </RootTheme>
  );
}
