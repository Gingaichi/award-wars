// components/home/PrizesSection.tsx
import Image from "next/image";
import { Sparkles, Trophy, Crown } from "lucide-react";

export function PrizesSection() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-yellow-600/10 via-amber-500/5 to-yellow-300/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-yellow-700/40 bg-yellow-900/20 mb-6">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-yellow-400">
              THE GRAND PRIZE
            </span>
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What will the champion{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
              win?
            </span>
          </h2>

          <div className="flex items-center justify-center gap-2 text-zinc-400">
            <Trophy className="w-5 h-5 text-yellow-500/70" />
            <p className="text-lg">Number 1 on the BattleBoard takes home this prize</p>
            <Trophy className="w-5 h-5 text-yellow-500/70" />
          </div>
        </div>

        {/* Single Prize Card - Centered */}
        <div className="flex justify-center">
          <div className="relative group w-full max-w-md">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/30 via-amber-500/20 to-yellow-500/30 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-300" />
            
            <div className="relative bg-gradient-to-b from-black to-zinc-900 rounded-2xl border border-yellow-500/30 p-8 backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:-translate-y-2">
              
              {/* Crown icon */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                <div className="bg-yellow-500 p-3 rounded-full shadow-lg shadow-yellow-500/30">
                  <Crown className="w-6 h-6 text-black" />
                </div>
              </div>

              {/* Image container - LARGER SIZE */}
              <div className="relative w-48 h-48 mx-auto mb-6 mt-8">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/30 via-amber-500/20 to-yellow-500/30 rounded-full blur-2xl" />
                <div className="relative w-full h-full">
                  <Image
                    src="/fourth.png"
                    alt="Grand prize"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </div>
              </div>

              {/* Prize description */}
              <h3 className="text-2xl font-bold text-center text-yellow-400 mb-4">
                Letterboxd Patron (1 Year)
              </h3>

              {/* Requirements */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-sm text-zinc-500 text-center mb-3">Requirements to win:</p>
                <div className="space-y-2">
                  <p className="text-sm text-zinc-400 text-center flex items-center justify-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                    Follow @kxreeda on X
                  </p>
                  <p className="text-sm text-zinc-400 text-center flex items-center justify-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                    Follow @stelikira on X
                  </p>
                </div>
              </div>

              {/* Shine effect on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none bg-gradient-to-tr from-white/0 via-white/5 to-white/0" />
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-zinc-600 max-w-2xl mx-auto">
            Winner will be announced after the ceremony. Must be following both accounts 
            on X (Twitter) to be eligible. Prize is non-transferable.
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute -left-20 top-1/2 w-40 h-40 bg-yellow-500/5 rounded-full blur-2xl" />
        <div className="absolute -right-20 bottom-1/2 w-40 h-40 bg-amber-500/5 rounded-full blur-2xl" />
      </div>
    </section>
  );
}