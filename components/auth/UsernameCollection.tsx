// components/auth/UsernameCollection.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface UsernameCollectionProps {
  userId: string;
  email?: string;
}

export function UsernameCollection({ userId, email }: UsernameCollectionProps) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleSubmitUsername = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim()) {
      setError("Username is required");
      return;
    }

    if (username.length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }

    setLoading(true);

    try {
      // First, update the user's metadata with the username
      const { error: updateError } = await supabase.auth.updateUser({
        data: { username }
      });

      if (updateError) throw updateError;

      // Then, insert or update the profile in the profiles table with email
      const { error: profileError } = await supabase
        .from("profiles")
        .upsert({
          id: userId,
          username: username,
          email: email, // Include the email
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'id'
        });

      if (profileError) throw profileError;

      // Store username in localStorage
      localStorage.setItem("username", username);
      localStorage.setItem("userId", userId);

      // Redirect to predict page
      router.push("/predict");
    } catch (error: any) {
      console.error("Username update error:", error);
      setError(error.message || "Failed to set username");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6 bg-zinc-900 p-8 rounded-xl border border-zinc-800">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white">Almost there!</h2>
        <p className="text-zinc-400 mt-2">
          {email ? `Choose a username for ${email}` : "Choose a username to continue"}
        </p>
      </div>

      <form onSubmit={handleSubmitUsername} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
            disabled={loading}
            autoFocus
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-gradient-to-r from-yellow-500 to-amber-400 text-black font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Setting up..." : "Continue to Predictions"}
        </button>
      </form>
    </div>
  );
}