// lib/supabase/auth.ts
import { createClient } from "./server";

export async function getUser(supabaseClient?: any) {
  const supabase = supabaseClient || (await createClient());
  const { data } = await supabase.auth.getUser();
  return data.user || null;
}