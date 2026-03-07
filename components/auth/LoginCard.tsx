// components/auth/LoginCard.tsx
"use client";

import Link from "next/link";
import { GoogleSignInButton } from "./GoogleSignInButton";

type Props = {
  error: string | null;
  email: string;
  password: string;
  loading?: boolean;
  googleLoading?: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: () => void;
  onGoogleSignIn?: () => void;
};

export function LoginCard({
  error,
  email,
  password,
  loading = false,
  googleLoading = false,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onGoogleSignIn,
}: Props) {
  return (
    <div className="w-full max-w-md space-y-6 rounded-2xl bg-zinc-900/80 backdrop-blur-sm p-8 shadow-2xl border border-zinc-800">
      <h1 className="text-4xl font-bold text-center text-yellow-400">
        Welcome Back
      </h1>
      <p className="text-center text-zinc-400 text-sm">Sign in to continue your predictions</p>

      {error && (
        <div className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400 border border-red-500/30">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-lg bg-zinc-800/80 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition border border-zinc-700"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          disabled={loading || googleLoading}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-lg bg-zinc-800/80 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition border border-zinc-700"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          disabled={loading || googleLoading}
        />
      </div>

      <button
        onClick={onSubmit}
        disabled={loading || googleLoading}
        className="w-full rounded-lg bg-gradient-to-r from-yellow-500 to-amber-400 py-3 font-semibold text-black hover:shadow-lg hover:shadow-yellow-500/50 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-zinc-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-zinc-900 text-zinc-500">Or continue with</span>
        </div>
      </div>

      {/* Google Sign In Button */}
      {onGoogleSignIn && (
        <button
          onClick={onGoogleSignIn}
          disabled={googleLoading || loading}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white hover:bg-gray-100 text-gray-900 font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed border border-gray-300"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span>{googleLoading ? "Redirecting..." : "Continue with Google"}</span>
        </button>
      )}

      <div className="text-center text-zinc-400 text-sm">
        Don't have an account?{" "}
        <Link
          href="/signup"
          className="text-yellow-400 hover:text-yellow-300 font-semibold transition"
        >
          Sign up here
        </Link>
      </div>
    </div>
  );
}