import Image from "next/image";
import angelLogo from "../app/assets/angel-logo.png";
import devilLogo from "../app/assets/devil-logo.png";
import userLogo from "../app/assets/user-logo.png";
import Markdown from "react-markdown";

export default function Message({
  message,
  isBot,
  isHeaven,
}: {
  message: string;
  isBot: boolean;
  isHeaven: boolean;
}) {
  return (
    <div
      id="lst-msg"
      className={`flex ${
        !isBot ? "justify-right flex-row-reverse" : "justify-start mr-8"
      } gap-2`}
    >
      <div className="border border-zinc-300 h-5 w-5 bg-white rounded-full overflow-hidden -mt-1">
        <Image
          width={20}
          height={20}
          alt="profile picture"
          src={!isBot ? userLogo : isHeaven ? angelLogo : devilLogo}
        />
      </div>
      <div
        className={`max-w-[calc(100%-50px)] mb-3 rounded-b-lg rounded-t${
          isBot ? "r" : "l"
        }-lg py-3 px-4`}
        style={{ backgroundColor: "rgb(61, 68, 85)", color: "white" }}
      >
        <div className="flex flex-col items-start break-words">
          <div className="prose text-inherit text-left w-full break-words dark:prose-invert text-sm">
            <div>
              <Markdown>{message}</Markdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
