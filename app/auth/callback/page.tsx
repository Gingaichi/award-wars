// app/auth/callback/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { UsernameCollection } from "@/components/auth/UsernameCollection";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | undefined>();
  const [needsUsername, setNeedsUsername] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;
        
        if (!session) {
          // No session, redirect to signup
          router.push("/signup");
          return;
        }

        const user = session.user;
        setUserId(user.id);
        setUserEmail(user.email);

        // Check if user has a username in metadata
        const username = user.user_metadata?.username;
        
        if (!username) {
          // User needs to set a username
          setNeedsUsername(true);
        } else {
          // User already has username, but let's verify it's in profiles table
          // Check if profile exists with this username
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("username")
            .eq("id", user.id)
            .single();

          if (profileError || !profile) {
            // Profile doesn't exist, create it with email
            const { error: insertError } = await supabase
              .from("profiles")
              .insert({
                id: user.id,
                username: username,
                email: user.email, // Include email
                updated_at: new Date().toISOString(),
              });

            if (insertError) {
              console.error("Error creating profile:", insertError);
            }
          } else if (profile.username !== username) {
            // Update username in profiles table if it doesn't match
            const { error: updateError } = await supabase
              .from("profiles")
              .update({ 
                username: username, 
                email: user.email, // Include email in update
                updated_at: new Date().toISOString() 
              })
              .eq("id", user.id);

            if (updateError) {
              console.error("Error updating profile:", updateError);
            }
          }

          // Store in localStorage
          localStorage.setItem("userId", user.id);
          localStorage.setItem("username", username);
          
          router.push("/predict");
        }
      } catch (error: any) {
        console.error("Auth callback error:", error);
        setError(error.message);
      }
    };

    handleCallback();
  }, [router, supabase]);

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <button
            onClick={() => router.push("/signup")}
            className="text-yellow-400 hover:underline"
          >
            Back to Sign Up
          </button>
        </div>
      </div>
    );
  }

  if (needsUsername && userId) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <UsernameCollection userId={userId} email={userEmail} />
      </div>
    );
  }

  // Loading state
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="text-white">Processing authentication...</div>
    </div>
  );
}