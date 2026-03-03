// components/leaderboard/LeaderboardTable.tsx
import { LeaderboardRow } from "./LeaderboardRow";
import { LeaderboardRow as LeaderboardRowType } from "@/types/leaderboard";

interface LeaderboardTableProps {
  rows: (LeaderboardRowType & { rank: number })[];
  currentUserId?: string;
  showSeparator?: boolean;
}

export function LeaderboardTable({ rows, currentUserId, showSeparator }: LeaderboardTableProps) {
  if (rows.length === 0) {
    return (
      <div className="px-6 py-12 text-center text-zinc-500">
        No players found.
      </div>
    );
  }

  return (
    <>
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-4 py-3 items-center border-b border-zinc-800 text-xs font-medium text-zinc-400">
        <div className="col-span-1">#</div>
        <div className="col-span-8">Player</div>
        <div className="col-span-3 text-right">Pts</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-zinc-800">
        {rows.map((row) => (
          <LeaderboardRow
            key={`${row.user_id}-${row.rank}`}
            row={row}
            isCurrentUser={row.user_id === currentUserId}
          />
        ))}
      </div>

      {/* Separator */}
      {showSeparator && (
        <div className="px-4 py-2 text-xs text-center text-zinc-600 border-t border-zinc-800">
          ⋮
        </div>
      )}
    </>
  );
}