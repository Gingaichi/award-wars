"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { DetailsHeader, InviteCode, RankingsTable } from "@/components/league-details";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

interface Member {
  id: string;
  username: string;
  score: number;
  rank: number;
  role: string;
  is_owner: boolean;
}

interface League {
  id: string;
  name: string;
  code: string;
  owner_name: string;
  member_count: number;
  members: Member[];
}

export default function LeagueDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [league, setLeague] = useState<League | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      router.push("/signup");
    } else {
      setUserId(storedUserId);
      fetchLeagueDetails(storedUserId);
    }
  }, [params.id]);

  const fetchLeagueDetails = async (uid: string) => {
    try {
      const leagueId = params.id as string;
      const res = await fetch(`/api/leagues/${leagueId}?userId=${uid}`);
      const data = await res.json();
      if (res.ok) setLeague(data.league);
    } catch (error) {
      console.error("Failed to fetch league:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!league) return <div className="text-white text-center mt-20">League not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <DetailsHeader
        leagueName={league.name}
        creatorName={league.owner_name}
        memberCount={league.member_count}
        onBack={() => router.push("/leagues")}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-end">
          <InviteCode code={league.code} />
        </div>

        <RankingsTable members={league.members} currentUserId={userId} />
      </div>
    </div>
  );
}