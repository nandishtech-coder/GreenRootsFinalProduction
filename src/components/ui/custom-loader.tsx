

export function CustomLoader({ text = "Loading...", className = "" }: { text?: string, className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-6 ${className}`}>
      <div className="relative flex items-center justify-center">
        {/* Outer Ring */}
        <div className="absolute size-32 rounded-full border-[4px] border-forest/20 border-t-forest animate-[spin_2s_linear_infinite]" />
        
        {/* Inner Ring */}
        <div className="absolute size-24 rounded-full border-[4px] border-clay/20 border-b-clay border-l-clay animate-[spin_1.5s_linear_infinite_reverse]" />
        
        {/* Center Logo */}
        <div className="relative z-10 flex size-14 items-center justify-center rounded-full bg-card shadow-xl overflow-hidden">
          <img
            src="/logo.png"
            alt="Loading"
            className="size-full scale-[1.02] object-cover animate-pulse"
          />
        </div>
      </div>
      <p className="font-display text-xl font-semibold text-forest tracking-wide animate-pulse mt-4 text-center">
        {text}
      </p>
    </div>
  );
}
