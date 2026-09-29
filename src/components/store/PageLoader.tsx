import { Leaf } from "lucide-react";

/** Branded full-page loading state — same rings + leaf design as the landing intro. */
export function PageLoader({ label = "Growing your experience..." }: { label?: string }) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-10 py-16">
      <div className="relative flex items-center justify-center">
        <div className="absolute size-32 rounded-full border-[4px] border-forest/20 border-t-forest animate-[spin_2s_linear_infinite]" />
        <div className="absolute size-24 rounded-full border-[4px] border-clay/20 border-b-clay border-l-clay animate-[spin_1.5s_linear_infinite_reverse]" />
        <div className="relative z-10 flex size-14 items-center justify-center rounded-full bg-forest text-cream shadow-xl">
          <Leaf className="size-7 animate-pulse" />
        </div>
      </div>
      <p className="mt-8 animate-pulse font-display text-2xl font-semibold tracking-wide text-forest">
        {label}
      </p>
    </div>
  );
}
