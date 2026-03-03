// types/leaderboard.ts
export interface LeaderboardRow {
  username: string;
  total_points: number;
  user_id: string;
  rank?: number;
  isCurrentUser?: boolean;
}

export interface Event {
  id: string;
  name: string;
  year: number;
}