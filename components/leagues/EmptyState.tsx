import { Trophy } from "lucide-react";
import { Button } from "../ui/Button";

interface EmptyStateProps {
  onCreateClick: () => void;
  onJoinClick: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onCreateClick, onJoinClick }) => {
  return (
    <div className="text-center py-8 sm:py-12 lg:py-20">
      <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 max-w-md mx-auto border border-white/10">
        <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-gray-500 mx-auto mb-3 sm:mb-4" />
        <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-2">No Leagues Yet</h3>
        <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 px-2">
          Create your first league or join one with an invite code
        </p>
        <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 justify-center px-4">
          <Button variant="success" onClick={onCreateClick} className="w-full xs:w-auto">
            Create League
          </Button>
          <Button variant="purple" onClick={onJoinClick} className="w-full xs:w-auto">
            Join League
          </Button>
        </div>
      </div>
    </div>
  );
};