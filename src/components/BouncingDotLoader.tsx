export default function BouncingDotLoader() {
    return (
      <div className="flex justify-center">
        <span className="w-2 h-2 mx-0.5 bg-gray-500 rounded-full animate-loader"></span>
        <span className="w-2 h-2 mx-0.5 bg-gray-500 rounded-full animate-loader animation-delay-200"></span>
        <span className="w-2 h-2 mx-0.5 bg-gray-500 rounded-full animate-loader animation-delay-400"></span>
      </div>
    );
}