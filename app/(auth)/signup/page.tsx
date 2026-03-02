"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignUpCard } from "@/components/auth/SignUpCard";

export default function SignUpPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async () => {
    setLoading(true);
    setError(null);
    const trimmed = username?.trim() || "";
    if (!trimmed) {
      setError("Please choose a username.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: trimmed, email, password, passwordConfirm: confirmPassword }),
      });

      if (!res.ok) {
        const body = await res.json();
        setError(body?.error || "Signup failed");
        setLoading(false);
        return;
      }

      // Signed up and session cookie set
      router.push("/predict");
    } catch (err) {
      setError("Unexpected error");
      setLoading(false);
      return;
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
        confirmPassword={confirmPassword}
        loading={loading}
        onUsernameChange={setUsername}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onConfirmPasswordChange={setConfirmPassword}
        onSubmit={handleSignUp}
      />
    </div>
  );
}