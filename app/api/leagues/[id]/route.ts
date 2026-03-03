import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }  // Change type to Promise
) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const { id: leagueId } = await params;  // Await params

    if (!userId || !leagueId) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const supabase = await createClient();

    // Get league details
    const { data: league, error: leagueError } = await supabase
      .from("leagues")
      .select(`
        id,
        name,
        code,
        created_at,
        owner_id,
        owner:profiles!leagues_owner_id_fkey(username)
      `)
      .eq("id", leagueId)
      .single();

    if (leagueError || !league) {
      return NextResponse.json({ error: "League not found" }, { status: 404 });
    }

    // Get all members
    const { data: members, error: membersError } = await supabase
      .from("league_members")
      .select(`
        user_id,
        role,
        joined_at,
        profiles:user_id (
          username
        )
      `)
      .eq("league_id", leagueId);

    if (membersError) {
      console.error("Error fetching members:", membersError);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    // Get scores from leaderboard for each member
    const membersWithScores = await Promise.all(
      members.map(async (member) => {
        const { data: leaderboardData } = await supabase
          .from("leaderboard")
          .select("total_points")
          .eq("profile_id", member.user_id)
          .maybeSingle();

        return {
          id: member.user_id,
          username: (member.profiles as any).username,
          score: leaderboardData?.total_points || 0,
          role: member.role,
          is_owner: member.user_id === league.owner_id
        };
      })
    );

    // Sort by score descending and add ranks
    const sortedMembers = membersWithScores
      .sort((a, b) => b.score - a.score)
      .map((member, index) => ({
        ...member,
        rank: index + 1
      }));

    return NextResponse.json({
      league: {
        id: league.id,
        name: league.name,
        code: league.code,
        owner_name: (league.owner as any).username,
        member_count: sortedMembers.length,
        members: sortedMembers
      }
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}