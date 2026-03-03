import { Star, Award, CheckCircle } from "lucide-react";

interface Nominee {
  id: string;
  name: string;
  winner?: boolean;
}

interface NomineeCardProps {
  nominee: Nominee;
  isSelected: boolean;
  onSelect: () => void;
}

export const NomineeCard: React.FC<NomineeCardProps> = ({
  nominee,
  isSelected,
  onSelect
}) => {
  return (
    <button
      onClick={onSelect}
      className={`group relative overflow-hidden rounded-lg transition-all duration-300 ${
        isSelected 
          ? "bg-gradient-to-r from-amber-900/40 to-red-900/40 border-2 border-amber-500 shadow-lg shadow-amber-500/20" 
          : "bg-stone-900/60 border border-stone-700 hover:border-amber-700/50 hover:bg-stone-800/80"
      }`}
    >
      {/* Hover effect overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r from-amber-500/0 to-red-500/0 transition-all duration-300 ${
        isSelected ? "opacity-100" : "group-hover:opacity-10"
      }`} />

      <div className="relative p-3 sm:p-4">
        <div className="flex items-center gap-3">
          {/* Selection indicator */}
          <div className={`relative flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 transition-all ${
            isSelected 
              ? "border-amber-500 bg-amber-500/20" 
              : "border-stone-600 group-hover:border-amber-700"
          }`}>
            {isSelected && (
              <CheckCircle className="absolute -inset-1 w-5 h-5 sm:w-6 sm:h-6 text-amber-500" />
            )}
          </div>

          {/* Nominee name and award styling */}
          <div className="flex-1 text-left">
            <span className={`text-sm sm:text-base font-medium transition-colors ${
              isSelected ? "text-amber-300" : "text-gray-300 group-hover:text-white"
            }`}>
              {nominee.name}
            </span>
          </div>

          {/* Past winner indicator */}
          {nominee.winner && (
            <div className="relative">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 fill-yellow-500" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-500 rounded-full animate-ping" />
            </div>
          )}
        </div>

        {/* Film strip decoration for selected items */}
        {isSelected && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 via-red-500 to-amber-500" />
        )}
      </div>
    </button>
  );
};