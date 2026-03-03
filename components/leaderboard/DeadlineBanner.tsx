// components/leaderboard/DeadlineBanner.tsx
interface DeadlineBannerProps {
  deadline: string;
}

export function DeadlineBanner({ deadline }: DeadlineBannerProps) {
  return (
    <div className="mb-6 p-4 bg-red-600  text-center shadow-lg">
      <p className="text-white font-mono font-bold text-sm sm:text-base">
        Deadline: {deadline} . Get your predictions in before the show starts
      </p>
    </div>
  );
}