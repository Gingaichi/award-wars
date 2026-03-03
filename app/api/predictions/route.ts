import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { verifyToken } from "@/lib/auth";

//
// POST → Save predictions (Service Role)
//
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { eventId, selections } = body;

    if (!eventId || !selections) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ Next.js 15+ requires await
    const cookieStore = await cookies();
    const token = cookieStore.get("aw_session")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded?.id) {
      return NextResponse.json(
        { error: "Invalid session" },
        { status: 401 }
      );
    }

    const userId = decoded.id;

    const supabase = createServiceClient();

    // Delete old predictions
    const { error: deleteError } = await supabase
      .from("predictions")
      .delete()
      .eq("user_id", userId)
      .eq("event_id", eventId);

    if (deleteError) {
      console.error("Delete error:", deleteError);
      return NextResponse.json(
        { error: "Failed to update predictions" },
        { status: 500 }
      );
    }

    const predictions = Object.entries(selections)
      .map(([categoryId, nomineeId]) => ({
        user_id: userId,
        event_id: eventId,
        category_id: categoryId,
        nominee_id: nomineeId,
        created_at: new Date().toISOString(),
      }))
      .filter((p: any) => p.nominee_id);

    if (predictions.length === 0) {
      return NextResponse.json(
        { error: "No valid selections provided" },
        { status: 400 }
      );
    }

    const { error: insertError } = await supabase
      .from("predictions")
      .insert(predictions);

    if (insertError) {
      console.error("Insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to save predictions" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Predictions saved successfully",
    });
  } catch (err) {
    console.error("Unexpected error saving predictions:", err);
    return NextResponse.json(
      { error: "Unexpected error" },
      { status: 500 }
    );
  }
}

//
// GET → Read predictions
//
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get("eventId");

    if (!eventId) {
      return NextResponse.json(
        { error: "Event ID is required" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("aw_session")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded?.id) {
      return NextResponse.json(
        { error: "Invalid session" },
        { status: 401 }
      );
    }

    const userId = decoded.id;

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
      console.error("Fetch error:", error);
      return NextResponse.json(
        { error: "Failed to fetch predictions" },
        { status: 500 }
      );
    }

    return NextResponse.json({ predictions });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { error: "Unexpected error" },
      { status: 500 }
    );
  }
}