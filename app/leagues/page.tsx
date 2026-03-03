"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LeaguesHeader } from "@/components/leagues/LeaguesHeader";
import { LeagueCard } from "@/components/leagues/LeagueCard";
import { EmptyState } from "@/components/leagues/EmptyState";
import { CreateLeagueModal } from "@/components/leagues/CreateLeagueModal";
import { JoinLeagueModal } from "@/components/leagues/JoinLeagueModal";
import { MessageToast } from "@/components/leagues/MessageToast";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

interface League {
  id: string;
  name: string;
  code: string;
  member_count: number;
  is_owner: boolean;  // Changed from is_creator
}

export default function LeaguesPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [leagues, setLeagues] = useState<League[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedUsername = localStorage.getItem("username");
    
    if (!storedUserId) {
      router.push("/signup");
    } else {
      setUserId(storedUserId);
      setUsername(storedUsername);
      fetchLeagues(storedUserId);
    }
  }, [router]);

  const fetchLeagues = async (uid: string) => {
    try {
      const res = await fetch(`/api/leagues/user?userId=${uid}`);
      const data = await res.json();
      if (res.ok) setLeagues(data.leagues || []);
    } catch (error) {
      console.error("Failed to fetch leagues:", error);
    } finally {
      setLoading(false);
    }
  };

  const createLeague = async (name: string) => {
    const res = await fetch("/api/leagues/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, userId }),
    });
    const data = await res.json();
    
    if (!res.ok) throw new Error(data.error);
    
    setMessage({ type: "success", text: `League "${data.league.name}" created!` });
    await fetchLeagues(userId!);
  };

  const joinLeague = async (code: string) => {
    const res = await fetch("/api/leagues/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, userId }),
    });
    const data = await res.json();
    
    if (!res.ok) throw new Error(data.error);
    
    setMessage({ type: "success", text: "Successfully joined the league!" });
    await fetchLeagues(userId!);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
      <LeaguesHeader
        username={username}
        onJoinClick={() => setShowJoinModal(true)}
        onCreateClick={() => setShowCreateModal(true)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <MessageToast message={message} onClose={() => setMessage({ type: "", text: "" })} />

        {leagues.length === 0 ? (
          <EmptyState 
            onCreateClick={() => setShowCreateModal(true)}
            onJoinClick={() => setShowJoinModal(true)}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {leagues.map((league) => (
              <LeagueCard
                key={league.id}
                id={league.id}
                name={league.name}
                code={league.code}
                memberCount={league.member_count}
                isOwner={league.is_owner}  // Changed from isCreator
                onClick={(id) => router.push(`/leagues/${id}`)}
              />
            ))}
          </div>
        )}
      </div>

      <CreateLeagueModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={createLeague}
      />

      <JoinLeagueModal
        isOpen={showJoinModal}
        onClose={() => setShowJoinModal(false)}
        onJoin={joinLeague}
      />
    </div>
  );
}