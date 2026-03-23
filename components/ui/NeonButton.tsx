import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

export type NeonButtonProps = {
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  type?: "button" | "submit";
  target?: string;
  rel?: string;
};

export default function NeonButton({
  href,
  onClick,
  children,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  target,
  rel,
}: NeonButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-red/60";

  const sizeClass =
    size === "sm"
      ? "h-10 px-4 text-sm"
      : size === "lg"
        ? "h-14 px-6 text-base"
        : "h-12 px-5 text-sm md:text-base";

  const variantClass =
    variant === "primary"
      ? "bg-gradient-to-r from-neon-red via-neon-orange to-neon-amber text-black shadow-[0_0_40px_rgba(255,45,45,0.25)] hover:brightness-110"
      : variant === "secondary"
        ? "border border-border/70 bg-surface/70 text-foreground hover:bg-surface"
        : "bg-transparent text-foreground hover:bg-white/5 border border-transparent hover:border-border/50";

  const cls = cn(base, sizeClass, variantClass, className);

  if (href) {
    const isExternal = /^https?:\/\//.test(href);
    if (isExternal) {
      return (
        <a className={cls} href={href} target={target} rel={rel}>
          {children}
        </a>
      );
    }

    return (
      <Link className={cls} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} onClick={onClick} type={type}>
      {children}
    </button>
  );
}

