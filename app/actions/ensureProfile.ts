"use server";

import { ensureUserProfile } from "@/lib/supabase/profile";

export async function ensureProfile(userId: string, username: string = "") {
  if (!userId) return null;
  return await ensureUserProfile(userId, username);
}
