// app/api/leagues/user/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Get all leagues the user is a member of
    const { data: memberships, error: membershipError } = await supabase
      .from("league_members")
      .select(`
        league_id,
        role,
        leagues (
          id,
          name,
          code,
          owner_id
        )
      `)
      .eq("user_id", userId);

    if (membershipError) {
      console.error("Error fetching memberships:", membershipError);
      return NextResponse.json(
        { error: "Failed to fetch leagues" },
        { status: 500 }
      );
    }

    // Get member counts for each league
    const leagues = await Promise.all(
      memberships.map(async (membership: any) => {
        const { count } = await supabase
          .from("league_members")
          .select("*", { count: "exact", head: true })
          .eq("league_id", membership.league_id);

        return {
          id: membership.leagues.id,
          name: membership.leagues.name,
          code: membership.leagues.code,
          member_count: count || 0,
          is_owner: membership.leagues.owner_id === userId,
          role: membership.role
        };
      })
    );

    return NextResponse.json({ leagues });
  } catch (error) {
    console.error("Error in leagues/user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}