import { Button } from "../ui/Button";
import { Film, Award, AlertCircle } from "lucide-react";

interface BallotFooterProps {
  isComplete: boolean;
  selectedCount: number;
  totalCategories: number;
  onSave: () => void;
  saving: boolean;
}

export const BallotFooter: React.FC<BallotFooterProps> = ({
  isComplete,
  selectedCount,
  totalCategories,
  onSave,
  saving
}) => {
  return (
    <div className="mt-8 sm:mt-12 mb-6 sm:mb-8">
      {/* Film strip decoration */}
      <div className="relative py-4 sm:py-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-amber-900/30" />
        </div>
        <div className="relative flex justify-center">
          <div className="bg-stone-900 px-4 py-2 rounded-full border border-amber-900/30 flex items-center gap-2 sm:gap-3">
            <Film className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500" />
            <span className="text-xs sm:text-sm text-amber-300/80">
              AND THE AWARD GOES TO...
            </span>
            <Film className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500" />
          </div>
        </div>
      </div>

      {/* Submit section */}
      <div className="max-w-3xl mx-auto">
        <div className="bg-gradient-to-r from-stone-900/90 to-stone-800/90 backdrop-blur-sm rounded-lg border border-amber-900/30 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
            {/* Stats */}
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-amber-500">
                  {selectedCount}
                </div>
                <div className="text-xs sm:text-sm text-amber-300/60">SELECTED</div>
              </div>
              
              <div className="w-px h-8 sm:h-10 bg-amber-900/30" />
              
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-gray-400">
                  {totalCategories - selectedCount}
                </div>
                <div className="text-xs sm:text-sm text-gray-500">REMAINING</div>
              </div>
            </div>

            {/* Submit button */}
            <div className="w-full sm:w-auto">
              <Button
                onClick={onSave}
                disabled={!isComplete || saving}
                variant="primary"
                className={`w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold transition-all ${
                  isComplete 
                    ? "bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700" 
                    : "bg-stone-700 cursor-not-allowed"
                }`}
                icon={<Award className="w-4 h-4 sm:w-5 sm:h-5" />}
              >
                {saving ? "SUBMITTING..." : "CAST YOUR VOTE"}
              </Button>
            </div>
          </div>

          {/* Warning for incomplete ballot */}
          {!isComplete && (
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-amber-900/30">
              <p className="text-xs sm:text-sm text-amber-400/70 flex items-center gap-2">
                <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                Please select a nominee for all categories before casting your vote
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};