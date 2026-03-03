import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const { code, userId } = await req.json();

    if (!code?.trim() || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabase = await createClient();

    // Find the league by code
    const { data: league, error: leagueError } = await supabase
      .from("leagues")
      .select("id, name, code, owner_id")
      .eq("code", code.trim().toUpperCase())
      .single();

    if (leagueError || !league) {
      return NextResponse.json({ error: "Invalid invite code" }, { status: 404 });
    }

    // Check if user is already a member
    const { data: existingMember } = await supabase
      .from("league_members")
      .select("id")
      .eq("league_id", league.id)
      .eq("user_id", userId)
      .maybeSingle();

    if (existingMember) {
      return NextResponse.json({ error: "Already a member of this league" }, { status: 400 });
    }

    // Add user to league (no score column)
    const { error: joinError } = await supabase
      .from("league_members")
      .insert({
        league_id: league.id,
        user_id: userId,
        role: 'member', // or whatever default role you use
        joined_at: new Date().toISOString(),
      });

    if (joinError) {
      console.error("Error joining league:", joinError);
      return NextResponse.json({ error: "Failed to join league" }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true,
      league: {
        id: league.id,
        name: league.name,
        code: league.code
      }
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}