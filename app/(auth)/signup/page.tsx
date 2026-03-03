"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setError("");
    if (!username.trim()) return setError("Username required");
    if (!email.trim()) return setError("Email required");
    if (password !== confirmPassword) return setError("Passwords do not match");

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, passwordConfirm: confirmPassword }),
      });

      const data = await res.json();
        if (res.ok && data.id) {
          // Store the logged-in profile's id
          localStorage.setItem("userId", data.id); // ✅ THIS IS CRUCIAL
          router.push("/leagues");
        }
    } catch {
      setError("Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="border p-2 mb-2 w-full"/>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 mb-2 w-full"/>
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="border p-2 mb-2 w-full"/>
      <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="border p-2 mb-2 w-full"/>
      <button onClick={handleSignUp} disabled={loading} className="bg-blue-600 text-white px-4 py-2">
        {loading ? "Signing up..." : "Sign Up"}
      </button>
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
}