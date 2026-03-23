import React from "react";
import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn(align === "center" ? "text-center" : "text-left")}>
      {eyebrow ? (
        <p className="text-xs font-bold tracking-[0.22em] text-neon-orange/90">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

