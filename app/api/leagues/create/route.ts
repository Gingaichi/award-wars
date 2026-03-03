// app/api/leagues/create/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const { name, userId } = await request.json();

    if (!name || !userId) {
      return NextResponse.json(
        { error: "Name and user ID required" },
        { status: 400 }
      );
    }

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
      );

    // Generate a unique invite code
    const generateCode = () => {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let code = "";
      for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return code;
    };

    let code = generateCode();
    let existingLeague;
    let attempts = 0;
    const maxAttempts = 10;

    // Ensure code is unique
    do {
      const { data } = await supabase
        .from("leagues")
        .select("code")
        .eq("code", code)
        .maybeSingle();
      
      existingLeague = data;
      if (existingLeague && attempts < maxAttempts) {
        code = generateCode();
        attempts++;
      } else if (attempts >= maxAttempts) {
        return NextResponse.json(
          { error: "Failed to generate unique code" },
          { status: 500 }
        );
      }
    } while (existingLeague);

    // Create the league
    const { data: league, error: createError } = await supabase
      .from("leagues")
      .insert({
        name,
        code,
        owner_id: userId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (createError) {
      console.error("Error creating league:", createError);
      return NextResponse.json(
        { error: "Failed to create league: " + createError.message },
        { status: 500 }
      );
    }

    // Add creator as a member with role 'owner'
    const { error: memberError } = await supabase
      .from("league_members")
      .insert({
        league_id: league.id,
        user_id: userId,
        role: 'owner',
        joined_at: new Date().toISOString()
      });

    if (memberError) {
      console.error("Error adding creator to league:", memberError);
      
      // Rollback league creation
      await supabase.from("leagues").delete().eq("id", league.id);
      
      return NextResponse.json(
        { error: "Failed to add you to the league: " + memberError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      league: {
        id: league.id,
        name: league.name,
        code: league.code
      }
    });

  } catch (error) {
    console.error("Error in leagues/create:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}