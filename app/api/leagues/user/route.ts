import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    const supabase = await createClient();

    // Get leagues where user is a member
    const { data: memberships, error: membershipError } = await supabase
      .from("league_members")
      .select(`
        league_id,
        leagues:league_id (
          id,
          name,
          code,
          created_at,
          owner_id
        )
      `)
      .eq("user_id", userId);

    if (membershipError) {
      console.error("Error fetching memberships:", membershipError);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    // Get leagues where user is the owner (creator)
    const { data: ownedLeagues, error: ownedError } = await supabase
      .from("leagues")
      .select(`
        id,
        name,
        code,
        created_at,
        owner_id
      `)
      .eq("owner_id", userId);

    if (ownedError) {
      console.error("Error fetching owned leagues:", ownedError);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    // Combine and deduplicate leagues
    const leagueMap = new Map();

    // Add leagues from memberships
    memberships.forEach((membership) => {
      const league = membership.leagues as any;
      if (league) {
        leagueMap.set(league.id, {
          ...league,
          member_count: 0, // Will update later
          is_owner: league.owner_id === userId
        });
      }
    });

    // Add leagues from owned leagues (if not already in map)
    ownedLeagues.forEach((league) => {
      if (!leagueMap.has(league.id)) {
        leagueMap.set(league.id, {
          ...league,
          member_count: 0, // Will update later
          is_owner: true
        });
      }
    });

    // Get member counts for all leagues
    const leagues = await Promise.all(
      Array.from(leagueMap.values()).map(async (league) => {
        const { count } = await supabase
          .from("league_members")
          .select("*", { count: "exact", head: true })
          .eq("league_id", league.id);

        return {
          id: league.id,
          name: league.name,
          code: league.code,
          created_at: league.created_at,
          member_count: count || 1, // At least the owner
          is_owner: league.is_owner
        };
      })
    );

    // Sort by creation date (newest first)
    leagues.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return NextResponse.json({ leagues });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}