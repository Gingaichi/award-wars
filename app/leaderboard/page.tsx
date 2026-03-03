// app/leaderboard/page.tsx
import { createClient } from "@/lib/supabase/server";

import { LeaderboardHeader } from "@/components/leaderboard/LeaderboardHeader";
import { LeaderboardTable } from "@/components/leaderboard/LeaderboardTable";
import { LeaderboardRow } from "@/types/leaderboard";

export default async function LeaderboardPage() {
  const supabase = await createClient();

  // Get current logged in user
  const { data: { user } } = await supabase.auth.getUser();

  // First, get the latest active event
  const { data: events } = await supabase
    .from("events")
    .select("id, name, year")
    .order("year", { ascending: false })
    .limit(1);

  if (!events || events.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-zinc-800 text-white px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-yellow-400 mb-4">Battleboard</h1>
          <p className="text-zinc-400">No active events found.</p>
        </div>
      </div>
    );
  }

  const eventId = events[0].id;
  const eventName = events[0].name;
  const eventYear = events[0].year;

  // Fetch all profiles first to get usernames
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, username");

  // Create a map of user_id to username
  const profileMap = new Map();
  if (profiles) {
    profiles.forEach(profile => {
      profileMap.set(profile.id, profile.username);
    });
  }

  // Fetch leaderboard data for this event
  const { data: leaderboardData, error: leaderboardError } = await supabase
    .from("leaderboard")
    .select("user_id, total_points")
    .eq("event_id", eventId)
    .order("total_points", { ascending: false });

  if (leaderboardError) {
    console.error("Error fetching leaderboard:", leaderboardError);
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-zinc-800 text-white px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-yellow-400 mb-4">Battleboard</h1>
          <p className="text-red-400">Failed to load leaderboard. Please try again later.</p>
        </div>
      </div>
    );
  }

  // Combine leaderboard data with usernames from profiles
  let rows: LeaderboardRow[] = [];

  if (leaderboardData && leaderboardData.length > 0) {
    rows = leaderboardData.map(item => ({
      username: profileMap.get(item.user_id) || "Unknown Player",
      total_points: item.total_points,
      user_id: item.user_id
    }));
  }

  // Also include any profiles that don't have leaderboard entries yet (with 0 points)
  if (profiles) {
    const userIdsInLeaderboard = new Set(leaderboardData?.map(item => item.user_id) || []);
    
    profiles.forEach(profile => {
      if (!userIdsInLeaderboard.has(profile.id)) {
        rows.push({
          username: profile.username,
          total_points: 0,
          user_id: profile.id
        });
      }
    });
  }

  // Sort: first by points (descending), then by username (ascending)
  rows.sort((a, b) => {
    if (b.total_points !== a.total_points) {
      return b.total_points - a.total_points;
    }
    return a.username.localeCompare(b.username);
  });

  // Add ranking to each row
  const rowsWithRank = rows.map((row, index) => ({
    ...row,
    rank: index + 1
  }));

  // Get top 50
  const top50 = rowsWithRank.slice(0, 50);
  
  // Find current user's position
  const currentUserEntry = user ? rowsWithRank.find(row => row.user_id === user.id) : null;
  
  // Determine what to show
  let displayRows = [...top50];
  let showSeparator = false;
  
  // If current user exists and is not in top 50, add them at the bottom
  if (currentUserEntry && currentUserEntry.rank > 50) {
    displayRows.push({
      ...currentUserEntry,
      username: `${currentUserEntry.username} (You)`
    });
    showSeparator = true;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-zinc-800 text-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        
        
        <LeaderboardHeader
          eventName={eventName}
          eventYear={eventYear}
          totalPlayers={rows.length}
          userRank={currentUserEntry?.rank}
          userPoints={currentUserEntry?.total_points}
        />

        <div className="bg-zinc-900/60 backdrop-blur rounded-2xl border border-zinc-800 overflow-hidden shadow-lg">
          <LeaderboardTable
            rows={displayRows}
            currentUserId={user?.id}
            showSeparator={showSeparator}
          />
        </div>

        <p className="mt-6 text-center text-xs text-zinc-600">
          Don't forget to watch Monster (2023)
        </p>
      </div>
    </div>
  );
}