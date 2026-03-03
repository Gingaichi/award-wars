// app/api/leagues/[id]/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: leagueId } = await params; // ✅ Await the params Promise
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Get league details
    const { data: league, error: leagueError } = await supabase
      .from("leagues")
      .select(`
        id,
        name,
        code,
        owner_id,
        created_at
      `)
      .eq("id", leagueId)
      .single();

    if (leagueError || !league) {
      return NextResponse.json(
        { error: "League not found" },
        { status: 404 }
      );
    }

    // Get all members of the league with their profiles and scores
    const { data: members, error: membersError } = await supabase
      .from("league_members")
      .select(`
        user_id,
        role,
        joined_at,
        profiles!inner (
          username
        )
      `)
      .eq("league_id", leagueId);

    if (membersError) {
      console.error("Error fetching members:", membersError);
      return NextResponse.json(
        { error: "Failed to fetch members" },
        { status: 500 }
      );
    }

    // Get owner name
    const { data: owner } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", league.owner_id)
      .single();

    // Get current event for points calculation
    const { data: events } = await supabase
      .from("events")
      .select("id")
      .order("year", { ascending: false })
      .limit(1);

    const eventId = events?.[0]?.id;

    // Get points for each member from leaderboard
    const membersWithScores = await Promise.all(
      members.map(async (member: any) => {
        let score = 0;
        
        if (eventId) {
          const { data: leaderboard } = await supabase
            .from("leaderboard")
            .select("total_points")
            .eq("user_id", member.user_id)
            .eq("event_id", eventId)
            .maybeSingle();
          
          score = leaderboard?.total_points || 0;
        }

        return {
          id: member.user_id,
          username: member.profiles.username,
          score,
          role: member.role,
          is_owner: member.user_id === league.owner_id,
          joined_at: member.joined_at
        };
      })
    );

    // Sort by score (descending) and assign ranks
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
        owner_name: owner?.username || "Unknown",
        member_count: members.length,
        members: sortedMembers
      }
    });
  } catch (error) {
    console.error("Error in leagues/[id]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}