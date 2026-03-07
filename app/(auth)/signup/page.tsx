// app/signup/page.tsx (updated)
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignUpCard } from "@/components/auth/SignUpCard";
import { createClient } from "@/lib/supabase/client";

export default function SignUpPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const supabase = createClient();

  const handleSignUp = async () => {
    setError("");
    if (!username.trim()) return setError("Username required");
    if (!email.trim()) return setError("Email required");
    if (password !== confirmPassword) return setError("Passwords do not match");

    setLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });

      if (authError) {
        throw new Error(authError.message);
      }

      if (!authData.user) {
        throw new Error("Sign up failed - no user returned");
      }

      if (authData.user && !authData.session) {
        setError("Please check your email to confirm your account");
        setLoading(false);
        return;
      }

      localStorage.setItem("userId", authData.user.id);
      localStorage.setItem("username", username);
      router.push("/predict");
      
    } catch (error: any) {
      console.error("Signup error:", error);
      
      if (error.message.includes("User already registered")) {
        setError("An account with this email already exists");
      } else {
        setError(error.message || "Unexpected error during sign up");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = (error: string) => {
    setError(error);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
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
        onGoogleError={handleGoogleError}
      />
    </div>
  );
}