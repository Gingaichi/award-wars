// components/predict/CategoryCard.tsx
import { Award, Clapperboard, Star } from "lucide-react";
import { NomineeCard } from "./NomineeCard";
import { GlassCard } from "../ui/GlassCard";
import { Category, Nominee } from "@/types";


interface CategoryCardProps {
  category: Category;
  index: number;
  selectedNomineeId?: string;
  onSelect: (nomineeId: string) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  index,
  selectedNomineeId,
  onSelect
}) => {
  return (
    <GlassCard className="overflow-hidden border border-amber-900/30 hover:border-amber-700/50 transition-all">
      {/* Category header with film strip design */}
      <div className="relative">
        {/* Top perforation */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-900/50 via-red-900/50 to-amber-900/50" />
        
        <div className="px-4 sm:px-6 py-4 sm:py-5 bg-gradient-to-r from-stone-900 to-stone-800">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-500 rounded-full blur-sm opacity-50" />
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-stone-900 border-2 border-amber-500/50 flex items-center justify-center">
                <span className="text-xs sm:text-sm font-bold text-amber-500">
                  #{index + 1}
                </span>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                  {category.name}
              
                </h2>
                
                {/* Points badge - NOW USING category.points */}
                <div className="flex items-center gap-1 border-amber-500/30">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-sm font-bold text-amber-400">
                    {category.points} {category.points === 1 ? 'point' : 'points'}
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-amber-300/60 mt-1">
                SELECT YOUR PREDICTION
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Nominees grid */}
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {category.nominees.map((nominee) => (
            <NomineeCard
              key={nominee.id}
              nominee={nominee}
              isSelected={selectedNomineeId === nominee.id}
              onSelect={() => onSelect(nominee.id)}
            />
          ))}
        </div>

        {/* Winner indicator for past winners */}
        {category.nominees.some(n => n.winner) && (
          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-amber-900/30">
            <p className="text-xs sm:text-sm text-amber-500/70 flex items-center gap-2">
              <span className="w-1 h-1 bg-amber-500 rounded-full" />
              ★ PAST WINNER INDICATED WITH GOLD STAR ★
            </p>
          </div>
        )}
      </div>
    </GlassCard>
  );
};