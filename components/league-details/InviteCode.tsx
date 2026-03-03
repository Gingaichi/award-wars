import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface InviteCodeProps {
  code: string;
}

export const InviteCode: React.FC<InviteCodeProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-2 border border-white/10">
      <span className="text-sm text-gray-400">Invite Code:</span>
      <code className="px-3 py-1 bg-black/30 rounded text-purple-300 font-mono text-lg">
        {code}
      </code>
      <button
        onClick={copyToClipboard}
        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
      >
        {copied ? (
          <Check className="w-5 h-5 text-green-500" />
        ) : (
          <Copy className="w-5 h-5 text-gray-400 hover:text-white" />
        )}
      </button>
    </div>
  );
};