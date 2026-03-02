// /lib/supabase/profile.ts
import { createClient } from "@/lib/supabase/server";

export async function ensureUserProfile(userId: string, username: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .upsert(
      { id: userId, username },
      { onConflict: "id" } // won't create duplicate
    );

  if (error) console.error("Error creating profile:", error);
  return data;
}