import { ArrowLeft, Trophy } from "lucide-react";
import { Button } from "../ui/Button";

interface DetailsHeaderProps {
  leagueName: string;
  creatorName: string;
  memberCount: number;
  onBack: () => void;
}

export const DetailsHeader: React.FC<DetailsHeaderProps> = ({
  leagueName,
  creatorName,
  memberCount,
  onBack
}) => {
  return (
    <div className="bg-black/30 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Button
          variant="secondary"
          onClick={onBack}
          icon={<ArrowLeft className="w-4 h-4" />}
          className="mb-4"
        >
          Back to Leagues
        </Button>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Trophy className="w-8 h-8 text-yellow-500" />
              {leagueName}
            </h1>
            <p className="text-gray-400 mt-1">
              Created by {creatorName} • {memberCount} members
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};