// app/predict/page.tsx
import PredictClient from "@/components/PredictClient";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DeadlineBanner } from "@/components/leaderboard/DeadlineBanner";
import { Category, Nominee } from "@/types";

export default async function PredictPage() {
  const supabase = await createClient();

  // 1️⃣ Get logged-in user from Supabase session
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login?redirect=predict");
  }

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

  // 3️⃣ Fetch categories + nominees - NO COMMENTS IN THE SELECT STRING!
  const { data: categories, error } = await supabase
    .from("categories")
    .select(`
      id,
      name,
      points,
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

  

  // 4️⃣ Fetch existing predictions for THIS user
  const { data: existingPredictions, error: predError } = await supabase
    .from("predictions")
    .select("category_id, nominee_id, created_at")
    .eq("user_id", user.id)
    .eq("event_id", eventId);

  const initialSelections: Record<string, string> = {};

  if (existingPredictions && existingPredictions.length > 0) {
    existingPredictions.forEach((p: any) => {
      initialSelections[p.category_id] = p.nominee_id;
    });
  }

  return (
    <>
      <DeadlineBanner deadline="Sunday 15th March 2026" />
      <PredictClient
        categories={categories || []}
        eventId={eventId}
        initialSelections={initialSelections}
      />
    </>
  );
}