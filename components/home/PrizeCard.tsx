// components/home/PrizeCard.tsx
import Image from "next/image";
import { Crown, Award, Medal } from "lucide-react";

interface PrizeCardProps {
  place: "first" | "second" | "third";
  prize: string;
  conditions?: string[];
}

const placeConfig = {
  first: {
    icon: Crown,
    bgGradient: "from-yellow-500/20 via-amber-500/10 to-yellow-500/5",
    borderColor: "border-yellow-500/30",
    textColor: "text-yellow-400",
    iconColor: "text-yellow-400",
    badge: "bg-yellow-500",
    rank: "#1",
    image: "/fourth.png"
  },
  second: {
    icon: Award,
    bgGradient: "from-gray-400/20 via-gray-400/10 to-gray-400/5",
    borderColor: "border-gray-400/30",
    textColor: "text-gray-300",
    iconColor: "text-gray-400",
    badge: "bg-gray-400",
    rank: "#2",
    image: "/fourth.png"  // Using the same image
  },
  third: {
    icon: Medal,
    bgGradient: "from-amber-700/20 via-amber-700/10 to-amber-700/5",
    borderColor: "border-amber-700/30",
    textColor: "text-amber-600",
    iconColor: "text-amber-600",
    badge: "bg-amber-600",
    rank: "#3",
    image: "/fourth.png"  // Using the same image
  }
};

export function PrizeCard({ place, prize, conditions = [] }: PrizeCardProps) {
  const config = placeConfig[place];
  const Icon = config.icon;

  return (
    <div className={`relative group perspective-1000`}>
      {/* Glow effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${config.bgGradient} rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300`} />
      
      <div className={`relative bg-gradient-to-b from-black to-zinc-900 rounded-xl border ${config.borderColor} p-6 backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:-translate-y-2`}>
        
        {/* Rank badge */}
        <div className={`absolute -top-3 left-1/2 -translate-x-1/2 ${config.badge} px-4 py-1 rounded-full text-xs font-bold text-black shadow-lg`}>
          {config.rank}
        </div>

        {/* Image container */}
        <div className="relative w-32 h-32 mx-auto mb-4 mt-4">
          <div className={`absolute inset-0 bg-gradient-to-r ${config.bgGradient} rounded-full blur-xl`} />
          <div className="relative w-full h-full">
            <Image
              src={config.image}
              alt={`${place} place prize`}
              fill
              className="object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Prize description */}
        <h3 className={`text-xl font-bold text-center mb-2 ${config.textColor}`}>
          {prize}
        </h3>

        {/* Requirements - now shown for all places */}
        <div className="mt-3 pt-3 border-t border-white/10">
          <p className="text-xs text-zinc-500 text-center mb-2">Requirements to win:</p>
          <p className="text-xs text-zinc-400 text-center flex items-center justify-center gap-1 mb-1">
            <span className="w-1 h-1 rounded-full bg-zinc-500" />
            Follow @kxreeda on X
          </p>
          <p className="text-xs text-zinc-400 text-center flex items-center justify-center gap-1">
            <span className="w-1 h-1 rounded-full bg-zinc-500" />
            Follow @stelikira on X
          </p>
        </div>

        {/* Shine effect on hover */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none bg-gradient-to-tr from-white/0 via-white/5 to-white/0" />
      </div>
    </div>
  );
}