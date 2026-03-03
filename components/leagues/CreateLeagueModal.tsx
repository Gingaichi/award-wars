import { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

interface CreateLeagueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string) => Promise<void>;
}

export const CreateLeagueModal: React.FC<CreateLeagueModalProps> = ({
  isOpen,
  onClose,
  onCreate
}) => {
  const [leagueName, setLeagueName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!leagueName.trim()) {
      setError("League name is required");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await onCreate(leagueName);
      setLeagueName("");
      onClose();
    } catch (err) {
      setError("Failed to create league");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-2xl max-w-md w-full p-6 border border-purple-500/30">
        <h2 className="text-2xl font-bold text-white mb-4">Create New League</h2>
        <Input
          label="League Name"
          placeholder="Enter league name"
          value={leagueName}
          onChange={(e) => setLeagueName(e.target.value)}
          error={error}
          autoFocus
        />
        <div className="flex gap-3 justify-end mt-6">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSubmit} isLoading={loading}>
            Create League
          </Button>
        </div>
      </div>
    </div>
  );
};