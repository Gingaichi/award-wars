import { Film, Star, TrendingUp } from "lucide-react";

interface BallotHeaderProps {
  progress: number;
  selectedCount: number;
  totalCategories: number;
}

export const BallotHeader: React.FC<BallotHeaderProps> = ({ 
  progress, 
  selectedCount, 
  totalCategories 
}) => {
  return (
    <div className="text-center space-y-4 sm:space-y-6">
      {/* Title with film strip effect */}
      <div className="relative inline-block">
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-red-600 rounded-lg blur opacity-25" />
        <div className="relative flex items-center justify-center gap-3 bg-stone-900/90 backdrop-blur-sm px-6 sm:px-8 py-3 sm:py-4 rounded-lg border border-amber-500/30">
          <Film className="w-6 h-6 sm:w-8 sm:h-8 text-amber-500" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-red-400 to-amber-400">
            OFFICIAL BALLOT
          </h1>
          <Star className="w-6 h-6 sm:w-8 sm:h-8 text-amber-500" />
        </div>
      </div>

      {/* Academy Awards style subtitle */}
      <p className="text-lg sm:text-xl text-amber-300/80 font-light tracking-wider">
        THE 2026 AWARD WARS · CAST YOUR VOTE
      </p>

      {/* Progress bar - film strip style */}
      <div className="max-w-2xl mx-auto mt-6 sm:mt-8">
        <div className="flex justify-between text-xs sm:text-sm text-amber-300/70 mb-2 px-1">
          <span className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
            BALLOT PROGRESS
          </span>
          <span>{selectedCount} of {totalCategories} selected</span>
        </div>
        <div className="h-2 sm:h-3 bg-stone-800 rounded-full overflow-hidden border border-amber-900/50">
          <div 
            className="h-full bg-gradient-to-r from-amber-500 via-red-500 to-amber-500 transition-all duration-500 relative"
            style={{ width: `${progress}%` }}
          >
            {/* Film perforation effect */}
            <div className="absolute inset-0 flex justify-around">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="w-1 h-full bg-black/20" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative line */}
      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-amber-900/30" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-stone-900 px-4 text-xs sm:text-sm text-amber-500/60">
            ⬇ MAKE YOUR SELECTIONS BELOW ⬇
          </span>
        </div>
      </div>
    </div>
  );
};