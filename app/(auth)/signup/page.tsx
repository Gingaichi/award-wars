"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { SignUpCard } from "@/components/auth/SignUpCard";

export default function SignUpPage() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    const user = data.user;

    if (user) {
      await supabase.from("profiles").insert({
        id: user.id,
        username,
      });
    }

    setLoading(false);
    router.push("/predict");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-zinc-950 to-black text-white px-4">
      <SignUpCard
        error={error}
        username={username}
        email={email}
        password={password}
        loading={loading}
        onUsernameChange={setUsername}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={handleSignUp}
      />
    </div>
  );
}