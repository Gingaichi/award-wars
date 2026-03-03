// components/leaderboard/LeaderboardRow.tsx
import { LeaderboardRow as LeaderboardRowType } from "@/types/leaderboard";

interface LeaderboardRowProps {
  row: LeaderboardRowType & { rank: number };
  isCurrentUser: boolean;
}

export function LeaderboardRow({ row, isCurrentUser }: LeaderboardRowProps) {
  return (
    <div 
      className={`grid grid-cols-12 gap-4 px-4 py-2.5 items-center text-sm transition ${
        isCurrentUser 
          ? 'bg-yellow-500/10 hover:bg-yellow-500/15 border-l-2 border-yellow-400' 
          : 'hover:bg-zinc-800/40'
      }`}
    >
      <div className={`col-span-1 font-mono text-xs ${
        isCurrentUser ? 'text-yellow-400 font-bold' : 'text-zinc-400'
      }`}>
        {row.rank}
      </div>
      <div className={`col-span-8 truncate pr-2 ${
        isCurrentUser ? 'text-yellow-400 font-medium' : 'text-zinc-300'
      }`}>
        {row.username}
      </div>
      <div className={`col-span-3 text-right font-mono text-sm ${
        isCurrentUser ? 'text-yellow-400 font-bold' : 'text-yellow-300'
      }`}>
        {row.total_points}
      </div>
    </div>
  );
}