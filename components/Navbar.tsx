// components/Navbar.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      
      // Get username from user metadata or fetch from profiles
      if (session?.user) {
        const username = session.user.user_metadata?.username;
        setUsername(username || null);
      }
    };
    
    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const username = session.user.user_metadata?.username;
        setUsername(username || null);
      } else {
        setUsername(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <nav className="bg-zinc-900 text-white border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Scrollable Navigation Links */}
          <div className="flex-1 overflow-x-auto hide-scrollbar mx-4">
            <div className="flex items-center space-x-3 sm:space-x-6 min-w-max">
              <Link 
                href="/" 
                className={`text-xs sm:text-sm whitespace-nowrap transition-colors ${
                  isActive("/") && pathname === "/" 
                    ? "text-purple-400 font-medium" 
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Home
              </Link>
              
              {user && (
                <Link 
                  href="/predict" 
                  className={`text-xs sm:text-sm whitespace-nowrap transition-colors ${
                    isActive("/predict") 
                      ? "text-purple-400 font-medium" 
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  Predictions
                </Link>
              )}
              
              <Link 
                href="/leaderboard" 
                className={`text-xs sm:text-sm whitespace-nowrap transition-colors ${
                  isActive("/leaderboard") 
                    ? "text-purple-400 font-medium" 
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Leaderboard
              </Link>
              
              <Link 
                href="/leagues" 
                className={`text-xs sm:text-sm whitespace-nowrap transition-colors ${
                  isActive("/leagues") 
                    ? "text-purple-400 font-medium" 
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Leagues
              </Link>
            </div>
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {user ? (
              <>
                <span className="text-xs sm:text-sm text-gray-300 hidden xs:inline">
                  {username || user.email?.split('@')[0]}
                </span>
                <button 
                  onClick={handleSignOut} 
                  className="text-xs sm:text-sm bg-red-600 hover:bg-red-700 px-2 sm:px-3 py-1 rounded transition-colors whitespace-nowrap"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="text-xs sm:text-sm text-gray-300 hover:text-white transition-colors whitespace-nowrap"
                >
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 px-2 sm:px-3 py-1 rounded transition-colors whitespace-nowrap"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}