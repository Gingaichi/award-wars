// components/home/PrizesSection.tsx
import { Sparkles, Trophy, Crown, Medal, Gift, Heart } from "lucide-react";

export function PrizesSection() {
  const prizes = [
    {
      place: "1st",
      prize: "Letterboxd Patron + $25 Criterion Gift Card",
      icon: Crown,
      bgGradient: "from-yellow-500/20 via-amber-500/10 to-yellow-500/5",
      borderColor: "border-yellow-500/30",
      textColor: "text-yellow-400",
      badgeColor: "bg-yellow-500",
      badgeText: "🏆 CHAMPION",
      requirements: true
    },
    {
      place: "2nd",
      prize: "$25 Criterion Gift Card",
      icon: Gift,
      bgGradient: "from-gray-400/20 via-gray-400/10 to-gray-400/5",
      borderColor: "border-gray-400/30",
      textColor: "text-gray-300",
      badgeColor: "bg-gray-400",
      badgeText: "🥈 RUNNER UP",
      requirements: false
    },
    {
      place: "3rd",
      prize: "A Warm Hug",
      icon: Heart,
      bgGradient: "from-amber-700/20 via-amber-700/10 to-amber-700/5",
      borderColor: "border-amber-700/30",
      textColor: "text-amber-500",
      badgeColor: "bg-amber-600",
      badgeText: "🥉 THIRD PLACE",
      requirements: false
    }
  ];

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-yellow-600/10 via-amber-500/5 to-yellow-300/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-yellow-700/40 bg-yellow-900/20 mb-6">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-yellow-400">
              PRIZES & GLORY
            </span>
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What will the top predictors{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
              win?
            </span>
          </h2>

          <div className="flex items-center justify-center gap-2 text-zinc-400">
            <Trophy className="w-5 h-5 text-yellow-500/70" />
            <p className="text-lg">Top 3 forecasters take home these prizes</p>
            <Trophy className="w-5 h-5 text-yellow-500/70" />
          </div>
        </div>

        {/* Prize cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {prizes.map((prize, index) => {
            const Icon = prize.icon;
            
            return (
              <div key={index} className="relative group">
                {/* Glow effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${prize.bgGradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition duration-300`} />
                
                <div className={`relative bg-gradient-to-b from-black to-zinc-900 rounded-xl border ${prize.borderColor} p-6 backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 h-full flex flex-col`}>
                  
                  {/* Place badge */}
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 ${prize.badgeColor} px-4 py-1 rounded-full shadow-lg whitespace-nowrap`}>
                    <span className="text-xs font-bold text-black">{prize.badgeText}</span>
                  </div>

                  {/* Large Icon */}
                  <div className="flex justify-center mt-8 mb-6">
                    <div className={`p-5 rounded-full bg-black/50 border ${prize.borderColor}`}>
                      <Icon className={`w-10 h-10 ${prize.textColor}`} />
                    </div>
                  </div>

                  {/* Prize description */}
                  <h3 className={`text-xl font-bold text-center mb-4 ${prize.textColor}`}>
                    {prize.prize}
                  </h3>

                  {/* Requirements - only for 1st place */}
                  {prize.requirements && (
                    <div className="mt-2 pt-4 border-t border-white/10">
                      <p className="text-xs text-zinc-500 text-center mb-3">Requirements to win:</p>
                      <div className="space-y-2">
                        <p className="text-sm text-zinc-400 text-center">
                          Follow @kxreeda on X
                        </p>
                        <p className="text-sm text-zinc-400 text-center">
                          Follow @stelikira on X
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none bg-gradient-to-tr from-white/0 via-white/5 to-white/0" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-zinc-600 max-w-2xl mx-auto">
            Winners will be announced after the ceremony. First place must be following both accounts 
            on X (Twitter) to be eligible. Prizes are non-transferable.
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute -left-20 top-1/2 w-40 h-40 bg-yellow-500/5 rounded-full blur-2xl" />
        <div className="absolute -right-20 bottom-1/2 w-40 h-40 bg-amber-500/5 rounded-full blur-2xl" />
      </div>
    </section>
  );
}