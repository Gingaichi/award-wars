import { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

interface JoinLeagueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoin: (code: string) => Promise<void>;
}

export const JoinLeagueModal: React.FC<JoinLeagueModalProps> = ({
  isOpen,
  onClose,
  onJoin
}) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!code.trim()) {
      setError("Invite code is required");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await onJoin(code.toUpperCase());
      setCode("");
      onClose();
    } catch (err) {
      setError("Failed to join league");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-2xl max-w-md w-full p-6 border border-purple-500/30">
        <h2 className="text-2xl font-bold text-white mb-4">Join League</h2>
        <Input
          label="Invite Code"
          placeholder="Enter invite code"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          error={error}
          className="uppercase"
          autoFocus
        />
        <div className="flex gap-3 justify-end mt-6">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="purple" onClick={handleSubmit} isLoading={loading}>
            Join League
          </Button>
        </div>
      </div>
    </div>
  );
};