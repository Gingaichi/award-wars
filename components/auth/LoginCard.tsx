"use client";

import Link from "next/link";

type Props = {
  error: string | null;
  email: string;
  password: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: () => void;
};

export function LoginCard({
  error,
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: Props) {
  return (
    <div className="w-full max-w-md space-y-6 rounded-2xl bg-zinc-900 p-8 shadow-2xl border border-zinc-800">
      <h1 className="text-4xl font-bold text-center text-yellow-400">
        Login
      </h1>

      {error && (
        <div className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400 border border-red-500/30">
          {error}
        </div>
      )}

      <div className="space-y-4">
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
      </div>

      <button
        onClick={onSubmit}
        className="w-full rounded-lg bg-gradient-to-r from-yellow-500 to-amber-400 py-3 font-semibold text-black hover:shadow-lg hover:shadow-yellow-500/50 transition"
      >
        Login
      </button>

      <div className="text-center text-zinc-400 text-sm">
        Don't have an account?{" "}
        <Link
          href="/signup"
          className="text-yellow-400 hover:text-yellow-300 font-semibold transition"
        >
          Create one
        </Link>
      </div>
    </div>
  );
}