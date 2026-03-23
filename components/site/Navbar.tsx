"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import Container from "./Container";
import NeonButton from "@/components/ui/NeonButton";

const CONTACT_NUMBER = "8409700152";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = useMemo(
    () => [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/services", label: "Services" },
      { href: "/gallery", label: "Gallery" },
      { href: "/membership", label: "Membership" },
      { href: "/contact", label: "Contact" },
    ],
    [],
  );

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur supports-[backdrop-filter]:bg-black/25">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-3 font-extrabold tracking-tight"
            onClick={() => setOpen(false)}
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-r from-neon-red via-neon-orange to-neon-amber shadow-[0_0_30px_rgba(255,45,45,0.35)] neon-glow">
              <span className="text-[11px] font-black text-black">AS</span>
            </span>
            <span className="text-sm sm:text-base">AS-Fitness</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {links.map((l) => {
              const active =
                l.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={[
                    "text-sm font-semibold transition-colors",
                    active
                      ? "text-neon-amber"
                      : "text-muted hover:text-neon-orange",
                  ].join(" ")}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-surface/60 md:hidden"
              href={`tel:${CONTACT_NUMBER}`}
              aria-label={`Call ${CONTACT_NUMBER}`}
            >
              <Phone className="h-5 w-5 text-neon-orange" />
            </a>

            <div className="hidden md:flex">
              <NeonButton href="/membership" size="sm" className="h-10 px-4">
                Join Now
              </NeonButton>
            </div>

            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-surface/60 md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="h-5 w-5 text-neon-amber" /> : <Menu className="h-5 w-5 text-neon-orange" />}
            </button>
          </div>
        </div>
      </Container>

      {open ? (
        <div className="border-t border-white/10 bg-black/65 md:hidden">
          <Container>
            <div className="flex flex-col gap-2 py-3">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-white/10 bg-surface/40 px-3 py-2 text-sm font-semibold text-muted hover:text-neon-orange"
                >
                  {l.label}
                </Link>
              ))}

              <div className="mt-2 grid grid-cols-2 gap-2">
                <NeonButton
                  href="/membership"
                  size="sm"
                  className="w-full"
                >
                  Join Now
                </NeonButton>
                <a
                  className="inline-flex h-10 items-center justify-center rounded-full border border-border/70 bg-surface/70 px-4 text-sm font-semibold text-foreground hover:bg-surface"
                  href="/contact"
                  onClick={() => setOpen(false)}
                >
                  Contact
                </a>
              </div>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}

