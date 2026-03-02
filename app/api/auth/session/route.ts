import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const cookie = req.headers.get("cookie") || "";
    const match = cookie.match(/aw_session=([^;]+)/);
    const token = match ? decodeURIComponent(match[1]) : null;
    if (!token) return NextResponse.json({ user: null });

    const data = verifyToken(token);
    if (!data) return NextResponse.json({ user: null });

    return NextResponse.json({ user: { id: data.id, username: data.username } });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ user: null });
  }
}
