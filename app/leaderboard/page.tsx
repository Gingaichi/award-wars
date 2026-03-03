import { createClient } from "@/lib/supabase/server";

type RawRow = {
	user_id: string;
	total_points: number;
	profiles?: { username: string } | null;
};

export default async function LeaderboardPage() {
	const supabase = await createClient();

	// leaderboard has user_id FK — join profiles to get username
	const { data, error } = await supabase
		.from("leaderboard")
		.select("user_id, total_points, profiles(username)")
		.order("total_points", { ascending: false });

	if (error) {
		console.error("Error fetching leaderboard:", error);
		return <div className="p-8 text-red-400">Failed to load leaderboard.</div>;
	}

	const raw: RawRow[] = (data as any) || [];
	const rows = raw.map((r) => ({ username: r.profiles?.username ?? "Unknown", total_points: r.total_points }));

	return (
		<div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-zinc-800 text-white px-6 py-12">
			<div className="max-w-4xl mx-auto">
				<header className="mb-8 text-center">
					<h1 className="text-4xl font-extrabold tracking-tight text-yellow-400">Battleboard</h1>
					<p className="mt-2 text-zinc-300">Ranking of players by total points</p>
				</header>

				<div className="bg-zinc-900/60 backdrop-blur rounded-2xl border border-zinc-800 overflow-hidden shadow-lg">
					<div className="grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-zinc-800">
						<div className="col-span-1 text-zinc-400">#</div>
						<div className="col-span-7 text-zinc-300 font-semibold">Player</div>
						<div className="col-span-4 text-right text-zinc-300 font-semibold">Points</div>
					</div>

					<ol className="divide-y divide-zinc-800">
						{rows.map((r, idx) => (
							<li key={r.username} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-zinc-800/40 transition">
								<div className="col-span-1 text-zinc-400">{idx + 1}</div>
								<div className="col-span-7 flex items-center space-x-4">
									<div className="w-12 h-12 rounded-md bg-gradient-to-br from-yellow-600 to-amber-500 flex items-center justify-center text-black font-bold">{r.username?.charAt(0)?.toUpperCase() ?? "?"}</div>
									<div>
										<div className="font-semibold">{r.username}</div>
										
									</div>
								</div>
								<div className="col-span-4 text-right text-yellow-300 font-bold text-lg">{r.total_points}</div>
							</li>
						))}
					</ol>
				</div>
			</div>
		</div>
	);
}

