import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const { name, userId } = await req.json();

    if (!name?.trim() || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabase = await createClient();

    // Generate a unique invite code
    const generateCode = () => {
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
      let code = '';
      for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return code;
    };

    let code = generateCode();
    let existingLeague;

    // Ensure code is unique
    do {
      const { data } = await supabase
        .from("leagues")
        .select("code")
        .eq("code", code)
        .maybeSingle();
      existingLeague = data;
      if (existingLeague) code = generateCode();
    } while (existingLeague);

    // Create the league with owner_id
    const { data: league, error: leagueError } = await supabase
      .from("leagues")
      .insert({
        name: name.trim(),
        code,
        owner_id: userId,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (leagueError) {
      console.error("Error creating league:", leagueError);
      return NextResponse.json({ error: "Failed to create league" }, { status: 500 });
    }

    // Add owner as a member of the league (no score column)
    const { error: memberError } = await supabase
      .from("league_members")
      .insert({
        league_id: league.id,
        user_id: userId,
        role: 'owner', // or whatever default role you use
        joined_at: new Date().toISOString(),
      });

    if (memberError) {
      console.error("Error adding owner to league:", memberError);
      // Optionally delete the league if adding member fails
      await supabase.from("leagues").delete().eq("id", league.id);
      return NextResponse.json({ error: "Failed to setup league" }, { status: 500 });
    }

    return NextResponse.json({ 
      league: {
        id: league.id,
        name: league.name,
        code: league.code,
        member_count: 1,
        is_owner: true
      }
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}