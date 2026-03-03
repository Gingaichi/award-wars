interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = "" }) => {
  return (
    <div className={`relative bg-stone-900/40 backdrop-blur-sm rounded-xl border border-amber-900/30 ${className}`}>
      {/* Film grain overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none rounded-xl"
           style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E')" }} />
      
      {/* Content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
};