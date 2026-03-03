import { Users } from "lucide-react";
import { RankRow } from "./RankRow";

interface Member {
  id: string;
  username: string;
  score: number;
  rank: number;
  role: string;
  is_owner: boolean;
}

interface RankingsTableProps {
  members: Member[];
  currentUserId: string | null;
}

export const RankingsTable: React.FC<RankingsTableProps> = ({ members, currentUserId }) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
      <div className="px-6 py-4 border-b border-white/10">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Users className="w-5 h-5" />
          Rankings
        </h2>
      </div>

      <div className="divide-y divide-white/10">
        {members.map((member) => (
          <RankRow
            key={member.id}
            rank={member.rank}
            username={member.username}
            score={member.score}
            isOwner={member.is_owner}
            role={member.role}
            isCurrentUser={member.id === currentUserId}
          />
        ))}
      </div>
    </div>
  );
};