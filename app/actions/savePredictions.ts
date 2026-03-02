"use server";

import { createClient } from "@/lib/supabase/server";
import {ensureUserProfile} from "@/lib/supabase/profile";

export async function savePredictions(userId: string, eventId: string, selections: { categoryId: string; nomineeId: string }[]) {
  const supabase = await createClient();

    await ensureUserProfile(userId, "");

  // Remove previous predictions for this user and event
  await supabase
    .from("predictions")
    .delete()
    .eq("user_id", userId)
    .eq("event_id", eventId);

  // Insert new predictions
  const { error } = await supabase
    .from("predictions")
    .insert(
      selections.map((sel) => ({
        user_id: userId,
        event_id: eventId,
        category_id: sel.categoryId,
        nominee_id: sel.nomineeId,
      }))
    );

  if (error) {
    console.error("Error saving predictions:", error.message);
    throw new Error(error.message);
  }

  return true;
}