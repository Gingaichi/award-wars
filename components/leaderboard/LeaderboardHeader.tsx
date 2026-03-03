// components/leaderboard/LeaderboardHeader.tsx
interface LeaderboardHeaderProps {
  eventName: string;
  eventYear: number;
  totalPlayers: number;
  userRank?: number;
  userPoints?: number;
}

export function LeaderboardHeader({ 
  eventName, 
  eventYear, 
  totalPlayers, 
  userRank, 
  userPoints 
}: LeaderboardHeaderProps) {
  return (
    <header className="mb-8 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight text-yellow-400 mb-2">
        Battleboard
      </h1>
      <p className="text-xs text-zinc-500 mt-1">
        {totalPlayers} player{totalPlayers !== 1 ? 's' : ''} competing
      </p>
      {userRank !== undefined && userPoints !== undefined && (
        <p className="text-sm text-yellow-400/80 mt-2">
          Your rank: #{userRank} with {userPoints} point{userPoints !== 1 ? 's' : ''}
        </p>
      )}
    </header>
  );
}