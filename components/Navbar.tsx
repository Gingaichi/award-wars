"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function Navbar() {
  const supabase = createClient();
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getUser().then((res: any) => {
      if (!mounted) return;
      setUser(res?.data?.user ?? null);
    });

    const { data }: any = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      try {
        data?.subscription?.unsubscribe?.();
      } catch (_) {
        // ignore cleanup errors
      }
    };
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="bg-zinc-900 text-white px-6 py-3 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/" className="font-bold text-lg">Award Wars</Link>
          <Link href="/" className="hover:underline">Home</Link>
          {user && <Link href="/predict" className="hover:underline">Predictions</Link>}
          <Link href="/leaderboard" className="hover:underline">Leaderboard</Link>
          <Link href="/leagues" className="hover:underline">Leagues</Link>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-sm">{user.user_metadata?.username ?? user.email}</span>
              <button onClick={handleSignOut} className="bg-red-600 px-3 py-1 rounded text-sm">Sign out</button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:underline">Login</Link>
              <Link href="/signup" className="ml-2 bg-blue-600 px-3 py-1 rounded text-sm">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
