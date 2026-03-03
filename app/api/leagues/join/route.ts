// app/api/leagues/join/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const { code, userId } = await request.json();

    if (!code || !userId) {
      return NextResponse.json(
        { error: "Code and user ID required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Find league by code
    const { data: league, error: leagueError } = await supabase
      .from("leagues")
      .select("id, name")
      .eq("code", code.toUpperCase())
      .maybeSingle();

    if (leagueError || !league) {
      return NextResponse.json(
        { error: "Invalid league code" },
        { status: 404 }
      );
    }

    // Check if user is already a member
    const { data: existingMember } = await supabase
      .from("league_members")
      .select("id")
      .eq("league_id", league.id)
      .eq("user_id", userId)
      .maybeSingle();

    if (existingMember) {
      return NextResponse.json(
        { error: "Already a member of this league" },
        { status: 400 }
      );
    }

    // Add user to league as regular member (role = 'member')
    const { error: joinError } = await supabase
      .from("league_members")
      .insert({
        league_id: league.id,
        user_id: userId,
        role: 'member',
        joined_at: new Date().toISOString()
      });

    if (joinError) {
      console.error("Error joining league:", joinError);
      return NextResponse.json(
        { error: "Failed to join league: " + joinError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      league: {
        id: league.id,
        name: league.name
      }
    });

  } catch (error) {
    console.error("Error in leagues/join:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}