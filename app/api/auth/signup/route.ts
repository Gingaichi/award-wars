import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createClient } from "@/lib/supabase/server";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, email, password, passwordConfirm } = body;

    // ✅ Basic validation
    if (!username?.trim() || !email?.trim() || !password || !passwordConfirm) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (password !== passwordConfirm) {
      return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
    }

    const supabase = await createClient();

    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim().toLowerCase();

    // ✅ Generate ID and hash password
    const id = (globalThis as any).crypto?.randomUUID?.() || Math.random().toString(36).slice(2, 10);
    const password_hash = await bcrypt.hash(password, 10);

    // ✅ Try inserting directly — rely on DB UNIQUE constraints
    const { error } = await supabase.from("profiles").insert({
      id,
      username: trimmedUsername,
      email: trimmedEmail,
      password_hash,
    });

    if (error) {
      console.error("Error inserting profile:", error);

      // Handle duplicate email or username
      if (error.code === "23505") {
        if (error.message.includes("profiles_email_key")) {
          return NextResponse.json({ error: "Email already in use" }, { status: 409 });
        }
        if (error.message.includes("profiles_username_unique")) {
          return NextResponse.json({ error: "Username taken" }, { status: 409 });
        }
      }

      // Handle null constraint errors
      if (error.code === "23502") {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }

      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    // ✅ Sign token
    const token = signToken({ id, username: trimmedUsername });

    const res = NextResponse.json({ id, username: trimmedUsername });
    res.cookies.set("aw_session", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });

    return res;
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}