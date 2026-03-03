import { Trophy, LogIn, Plus } from "lucide-react";
import { Button } from "../ui/Button";

interface LeaguesHeaderProps {
  username: string | null;
  onJoinClick: () => void;
  onCreateClick: () => void;
}

export const LeaguesHeader: React.FC<LeaguesHeaderProps> = ({ 
  username, 
  onJoinClick, 
  onCreateClick 
}) => {
  return (
    <div className="bg-black/30 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2 sm:gap-3">
              <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />
              <span className="break-words">My Leagues</span>
            </h1>
            {username && (
              <p className="text-sm sm:text-base text-gray-400 mt-1">Welcome back, {username}!</p>
            )}
          </div>
          
          {/* Button container - stacked on mobile, row on desktop */}
          <div className="flex flex-col xs:flex-row w-full sm:w-auto gap-2 sm:gap-3">
            <Button 
              variant="purple" 
              onClick={onJoinClick} 
              icon={<LogIn className="w-4 h-4" />}
              className="w-full xs:w-auto justify-center"
            >
              Join League
            </Button>
            <Button 
              variant="success" 
              onClick={onCreateClick} 
              icon={<Plus className="w-4 h-4" />}
              className="w-full xs:w-auto justify-center"
            >
              Create League
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};