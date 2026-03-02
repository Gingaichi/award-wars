"use server";

import { createClient } from "@/lib/supabase/server";

export async function checkUsernameAvailable(raw: string) {
  const supabase = await createClient();
  const username = (raw || "").trim();
  if (!username) return false;

  const { data } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username)
    .limit(1);

  return !(data && data.length > 0);
}
