// /lib/supabase/profile.ts
import { createClient } from "@/lib/supabase/server";

export async function ensureUserProfile(userId: string, username: string) {
  const supabase = await createClient();

  const trimmed = typeof username === "string" ? username.trim() : "";

  // If a username was provided, ensure it's not taken by another user.
  if (trimmed) {
    const { data: existing } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", trimmed)
      .limit(1);

    if (existing && existing.length > 0 && existing[0].id !== userId) {
      return { error: { code: "USERNAME_TAKEN" } };
    }

    const { data, error } = await supabase
      .from("profiles")
      .upsert({ id: userId, username: trimmed }, { onConflict: "id" });

    if (error) {
      console.error("Error creating/updating profile:", error);
      return { error };
    }

    return data;
  }

  // No username provided — generate a unique fallback username and upsert.
  for (let i = 0; i < 5; i++) {
    const candidate = `user_${Math.random().toString(36).slice(2, 9)}`;
    const { data: exists } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", candidate)
      .limit(1);

    if (!exists || exists.length === 0) {
      const { data, error } = await supabase
        .from("profiles")
        .upsert({ id: userId, username: candidate }, { onConflict: "id" });

      if (error) {
        console.error("Error creating profile with generated username:", error);
        return null;
      }

      return data;
    }
  }

  // Fallback to a deterministic username based on user id prefix
  const fallback = `user_${userId.slice(0, 8)}`;
  const { data, error } = await supabase
    .from("profiles")
    .upsert({ id: userId, username: fallback }, { onConflict: "id" });

  if (error) {
    console.error("Error creating profile with fallback username:", error);
    return null;
  }

  return data;
}