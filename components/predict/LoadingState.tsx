import { Film } from "lucide-react";

export const LoadingState = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 to-stone-800 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="relative">
          <Film className="w-12 h-12 sm:w-16 sm:h-16 text-amber-500 animate-pulse" />
          <div className="absolute inset-0 bg-amber-500 rounded-full blur-2xl opacity-20 animate-pulse" />
        </div>
        <p className="text-lg sm:text-xl text-amber-300/80 font-light">
          LOADING THE BALLOT...
        </p>
        <div className="flex justify-center gap-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-amber-600 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};