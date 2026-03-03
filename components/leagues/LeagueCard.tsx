import { Users, Copy, Check } from "lucide-react";
import { useState } from "react";

interface LeagueCardProps {
  id: string;
  name: string;
  code: string;
  memberCount: number;
  isOwner: boolean;
  onClick: (id: string) => void;
}

export const LeagueCard: React.FC<LeagueCardProps> = ({
  id,
  name,
  code,
  memberCount,
  isOwner,
  onClick
}) => {
  const [copied, setCopied] = useState(false);

  const copyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={() => onClick(id)}
      className="group bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10 hover:border-purple-500/50 transition-all cursor-pointer hover:transform hover:scale-[1.02] sm:hover:scale-105 hover:bg-white/10"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-0 mb-3 sm:mb-4">
        <div className="w-full sm:w-auto">
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 break-words pr-2">
            {name}
          </h3>
          <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
            <Users className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="truncate">{memberCount} {memberCount === 1 ? 'member' : 'members'}</span>
          </div>
        </div>
        {isOwner && (
          <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded-full border border-yellow-500/30 whitespace-nowrap">
            Creator
          </span>
        )}
      </div>

      <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3 xs:gap-0 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/10">
        <div className="flex items-center gap-2 w-full xs:w-auto">
          <span className="text-xs sm:text-sm text-gray-400">Code:</span>
          <code className="px-2 py-1 bg-black/30 rounded text-purple-300 font-mono text-xs sm:text-sm truncate max-w-[120px] xs:max-w-none">
            {code}
          </code>
        </div>
        <button
          onClick={copyCode}
          className="p-1.5 sm:p-2 hover:bg-white/10 rounded-lg transition-colors self-end xs:self-auto"
          aria-label="Copy invite code"
        >
          {copied ? (
            <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
          ) : (
            <Copy className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-hover:text-white" />
          )}
        </button>
      </div>
    </div>
  );
};