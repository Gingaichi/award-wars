import { Crown, Medal } from "lucide-react";

interface RankRowProps {
  rank: number;
  username: string;
  score: number;
  isOwner: boolean;
  role: string;
  isCurrentUser: boolean;
}

export const RankRow: React.FC<RankRowProps> = ({
  rank,
  username,
  score,
  isOwner,
  role,
  isCurrentUser
}) => {
  const getRankIcon = () => {
    switch(rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Medal className="w-5 h-5 text-amber-600" />;
      default: return <span className="w-5 h-5 text-gray-500 font-mono">#{rank}</span>;
    }
  };

  return (
    <div className={`px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors ${
      isCurrentUser ? "bg-purple-500/10" : ""
    }`}>
      <div className="flex items-center gap-4">
        <div className="w-8 text-center">
          {getRankIcon()}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-white font-medium">{username}</span>
            {isOwner && (
              <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-300 text-xs rounded-full border border-yellow-500/30">
                Owner
              </span>
            )}
            {role === 'admin' && !isOwner && (
              <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30">
                Admin
              </span>
            )}
            {isCurrentUser && (
              <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30">
                You
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-2xl font-bold text-white">{score}</div>
        <div className="text-xs text-gray-500">points</div>
      </div>
    </div>
  );
};