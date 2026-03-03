// api/auth/login/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createClient } from "@/lib/supabase/server";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // 1️⃣ Require email and password
    if (!email?.trim() || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
    }

    const supabase = await createClient();

    // 2️⃣ Fetch the existing user by email
    const { data: users, error } = await supabase
      .from("profiles")
      .select("id, username, password_hash")
      .eq("email", email.trim())
      .limit(1);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    if (!users || users.length === 0) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const user = users[0];

    // 3️⃣ Verify password
    const passwordValid = await bcrypt.compare(password, user.password_hash || "");
    if (!passwordValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // 4️⃣ Generate session token
    const token = signToken({ id: user.id, username: user.username });
    const res = NextResponse.json({ id: user.id, username: user.username });

    // 5️⃣ Set cookie for session
    res.cookies.set("aw_session", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax",
    });

    return res;
  } catch (err) {
    console.error("Unexpected login error:", err);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}