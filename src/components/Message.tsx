export default function Message({
  message,
  isBot,
}: {
  message: String;
  isBot: Boolean;
}) {
  return (
    <div id="lst-msg" className="flex justify-start mr-8 gap-2">
      <div className="border border-zinc-300 h-5 w-5 bg-white rounded-full overflow-hidden -mt-1">
        <img alt="profile picture" />
      </div>
      <div
        className="max-w-[calc(100%-50px)] mb-3 rounded-b-lg rounded-tr-lg py-3 px-4"
        style={{ backgroundColor: "rgb(61, 68, 85)", color: "white" }}
      >
        <div className="flex flex-col items-start break-words">
          <div className="prose text-inherit text-left w-full break-words dark:prose-invert text-sm">
            <div>
              <p>Hi! What can I help you with?</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
