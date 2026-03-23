import React from "react";

export default function Loading() {
  return (
    <div className="relative flex min-h-[50vh] items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-grid-neon opacity-30" />
      <div className="relative flex flex-col items-center gap-4">
        <div className="neon-glow h-16 w-16 animate-spin rounded-full border border-neon-red/40 bg-gradient-to-b from-neon-red/20 to-neon-orange/20" />
        <p className="text-sm font-semibold tracking-wide text-muted">
          Loading AS-Fitness...
        </p>
      </div>
    </div>
  );
}

