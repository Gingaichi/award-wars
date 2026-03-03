interface MessageToastProps {
  message: { type: string; text: string } | null;
  onClose: () => void;
}

export const MessageToast: React.FC<MessageToastProps> = ({ message, onClose }) => {
  if (!message?.text) return null;

  return (
    <div className={`mb-6 p-4 rounded-lg ${
      message.type === "error" 
        ? "bg-red-500/20 border border-red-500/50 text-red-200" 
        : "bg-green-500/20 border border-green-500/50 text-green-200"
    }`}>
      {message.text}
      <button 
        onClick={onClose}
        className="float-right hover:opacity-70"
      >
        ×
      </button>
    </div>
  );
};