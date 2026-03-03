import { Film, Award, Star, TrendingUp } from "lucide-react";
import { useEffect } from "react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal content - Oscar-style */}
      <div className="relative bg-gradient-to-b from-stone-900 to-stone-800 rounded-2xl max-w-md w-full border-2 border-amber-500/30 shadow-2xl shadow-amber-500/20 overflow-hidden">
        {/* Film strip top */}
        <div className="h-2 bg-gradient-to-r from-amber-600 via-red-600 to-amber-600" />
        
        {/* Confetti effect dots */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-amber-500 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="relative p-6 sm:p-8 text-center">
          {/* Oscar statue icon */}
          <div className="relative mb-4 sm:mb-6">
            <div className="absolute inset-0 bg-amber-500 rounded-full blur-2xl opacity-30 animate-pulse" />
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-gradient-to-b from-amber-400 to-amber-600 rounded-full flex items-center justify-center border-4 border-amber-300/30">
              <Award className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
          </div>

          {/* Success message */}
          <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-red-400 to-amber-400 mb-2">
            AND THE AWARD GOES TO...
          </h2>
          
          <p className="text-lg sm:text-xl text-amber-300 mb-2">YOUR PREDICTIONS!</p>
          
          <div className="flex items-center justify-center gap-2 text-amber-400/80 mb-4">
            <Star className="w-4 h-4 fill-amber-400" />
            <span className="text-sm">BALLOT SUCCESSFULLY CAST</span>
            <Star className="w-4 h-4 fill-amber-400" />
          </div>

          {/* Film strip decoration */}
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-amber-600/50 rounded-sm" />
            ))}
          </div>

          <p className="text-xs sm:text-sm text-gray-400">
            You will be redirected to your leagues...
          </p>

          {/* Loading bar */}
          <div className="mt-4 h-1 bg-stone-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-amber-500 to-red-500 rounded-full animate-[loading_3s_ease-in-out]" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};