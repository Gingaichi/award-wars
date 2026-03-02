"use client";

import Link from "next/link";

type Props = {
  error: string | null;
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
  loading: boolean;
  onUsernameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange?: (value: string) => void;
  onSubmit: () => void;
};

export function SignUpCard({
  error,
  username,
  email,
  password,
  confirmPassword,
  loading,
  onUsernameChange,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
}: Props) {
  return (
    <div className="w-full max-w-md space-y-6 rounded-2xl bg-zinc-900 p-8 shadow-2xl border border-zinc-800">
      <h1 className="text-4xl font-bold text-center text-yellow-400">
        Join Award Wars
      </h1>

      {error && (
        <div className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400 border border-red-500/30">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="w-full rounded-lg bg-zinc-800 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
          value={username}
          onChange={(e) => onUsernameChange(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-lg bg-zinc-800 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-lg bg-zinc-800 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
        />

        <input
          type="password"
          placeholder="Retype password"
          className="w-full rounded-lg bg-zinc-800 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
          value={confirmPassword ?? ""}
          onChange={(e) => onConfirmPasswordChange?.(e.target.value)}
        />
      </div>

      <button
        onClick={onSubmit}
        disabled={loading}
        className="w-full rounded-lg bg-gradient-to-r from-yellow-500 to-amber-400 py-3 font-semibold text-black hover:shadow-lg hover:shadow-yellow-500/50 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Creating Account..." : "Sign Up"}
      </button>

      <div className="text-center text-zinc-400 text-sm">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-yellow-400 hover:text-yellow-300 font-semibold transition"
        >
          Return to Login
        </Link>
      </div>
    </div>
  );
}