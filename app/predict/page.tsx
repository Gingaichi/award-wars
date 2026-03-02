// app/predict/page.tsx
import PredictClient from "@/components/PredictClient";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

interface Nominee {
  id: string;
  name: string;
  winner?: boolean;
}

interface Category {
  id: string;
  name: string;
  nominees: Nominee[];
}

export default async function PredictPage() {
  const supabase = await createClient();

  // 1️⃣ Get the currently logged-in user from our session cookie
  const cookieStore = await cookies();
  const token = cookieStore.get("aw_session")?.value ?? null;
  const session = token ? verifyToken(token) : null;
  if (!session) {
    return <div>Please log in to submit predictions.</div>;
  }
  const userId = session.id;

  // 2️⃣ Get latest active event
  const { data: events } = await supabase
    .from("events")
    .select("id, name, year")
    .order("year", { ascending: false })
    .limit(1);

  if (!events || events.length === 0) {
    return <div>No active event found.</div>;
  }

  const eventId = events[0].id;

  // 3️⃣ Fetch categories + nominees for this event
  const { data: categories, error } = await supabase
    .from("categories")
    .select(`
      id,
      name,
      nominees (
        id,
        name,
        winner
      )
    `)
    .eq("event_id", eventId);

  if (error) {
    console.error("Error fetching categories:", error);
    return <div>Failed to load categories.</div>;
  }

  // 4️⃣ Check for existing predictions for this user + event
  const { data: existingPredictions } = await supabase
    .from("predictions")
    .select("category_id, nominee_id")
    .eq("user_id", userId)
    .eq("event_id", eventId);

  const initialSelections: Record<string, string> = {};
  if (existingPredictions && existingPredictions.length > 0) {
    existingPredictions.forEach((p: any) => {
      initialSelections[p.category_id] = p.nominee_id;
    });
  }

  return (
    <PredictClient
      categories={categories || []}
      eventId={eventId}
      userId={userId}
      initialSelections={initialSelections}
    />
  );
}