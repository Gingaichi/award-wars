"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 bg-gradient-to-tr from-yellow-600/20 via-amber-500/10 to-yellow-300/20 blur-3xl opacity-70" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>

      <main className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">

        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-700/40 bg-yellow-900/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-yellow-400">
          The ultimate awards prediction league
        </div>

        {/* Title */}
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
          <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
            Award Wars
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400 sm:text-xl">
          Predict every major award. Compete with friends. Climb the leaderboard.
          When the winners are announced, only one forecaster will take the crown.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/predict"
            className="rounded-xl bg-gradient-to-r from-yellow-500 to-amber-400 px-8 py-3 text-lg font-semibold text-black shadow-lg transition hover:scale-105 hover:shadow-yellow-500/30"
          >
            Start Predicting
          </Link>

          <Link
            href="/leaderboard"
            className="rounded-xl border border-yellow-600/40 bg-black/40 px-8 py-3 text-lg font-semibold text-yellow-400 backdrop-blur transition hover:bg-yellow-900/20"
          >
            View Leaderboard
          </Link>
        </div>

        {/* Decorative Divider */}
        <div className="mt-20 w-full max-w-3xl border-t border-yellow-800/30 pt-10 text-sm uppercase tracking-[0.3em] text-zinc-600">
          Lights. Camera. Prediction.
        </div>
      </main>
    </div>
  );
}