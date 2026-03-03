import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { eventId, userId, selections } = body;

    if (!eventId || !userId || !selections) {
      return NextResponse.json({ 
        error: "Missing required fields" 
      }, { status: 400 });
    }

    const supabase = await createClient();

    // First, delete any existing predictions for this user and event
    const { error: deleteError } = await supabase
      .from("predictions")
      .delete()
      .eq("user_id", userId)
      .eq("event_id", eventId);

    if (deleteError) {
      console.error("Error deleting existing predictions:", deleteError);
      return NextResponse.json({ 
        error: "Failed to update predictions" 
      }, { status: 500 });
    }

    // Prepare new predictions
    const predictions = Object.entries(selections).map(([categoryId, nomineeId]) => ({
      user_id: userId,
      event_id: eventId,
      category_id: categoryId,
      nominee_id: nomineeId,
      created_at: new Date().toISOString(),
    })).filter(p => p.nominee_id); // Only include selections that have a nominee

    if (predictions.length === 0) {
      return NextResponse.json({ 
        error: "No valid selections provided" 
      }, { status: 400 });
    }

    // Insert new predictions
    const { error: insertError } = await supabase
      .from("predictions")
      .insert(predictions);

    if (insertError) {
      console.error("Error inserting predictions:", insertError);
      return NextResponse.json({ 
        error: "Failed to save predictions" 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Predictions saved successfully" 
    });

  } catch (err) {
    console.error("Unexpected error saving predictions:", err);
    return NextResponse.json({ 
      error: "Unexpected error" 
    }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const eventId = searchParams.get("eventId");

    if (!userId || !eventId) {
      return NextResponse.json({ 
        error: "User ID and Event ID are required" 
      }, { status: 400 });
    }

    const supabase = await createClient();

    const { data: predictions, error } = await supabase
      .from("predictions")
      .select(`
        category_id,
        nominee_id,
        nominees (
          id,
          name
        )
      `)
      .eq("user_id", userId)
      .eq("event_id", eventId);

    if (error) {
      console.error("Error fetching predictions:", error);
      return NextResponse.json({ 
        error: "Failed to fetch predictions" 
      }, { status: 500 });
    }

    return NextResponse.json({ predictions });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ 
      error: "Unexpected error" 
    }, { status: 500 });
  }
}