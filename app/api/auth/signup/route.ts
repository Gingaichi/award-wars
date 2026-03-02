import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createClient } from "@/lib/supabase/server";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, email, password, passwordConfirm } = body;

    if (!username || !email || !password || !passwordConfirm) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    if (password !== passwordConfirm) {
      return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
    }

    const supabase = await createClient();

    // Check username and email availability
    const { data: userByUsername } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", username)
      .limit(1);
    if (userByUsername && userByUsername.length > 0) {
      return NextResponse.json({ error: "Username taken" }, { status: 409 });
    }

    const { data: userByEmail } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", email)
      .limit(1);
    if (userByEmail && userByEmail.length > 0) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    // Create profile row
    const id = (globalThis as any).crypto?.randomUUID?.() || Math.random().toString(36).slice(2, 10);
    const password_hash = await bcrypt.hash(password, 10);

    const { error } = await supabase.from("profiles").insert({
      id,
      username,
      email,
      password_hash,
    });

    if (error) {
      console.error("Error inserting profile:", error);
      return NextResponse.json({ error: "DB error" }, { status: 500 });
    }

    const token = signToken({ id, username });

    const res = NextResponse.json({ id, username });
    res.cookies.set("aw_session", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
