import Link from "next/link";
import React from "react";
import Container from "./Container";

const CONTACT_NUMBER = "8409700152";
const ADDRESS = "Puraini Bhagalpur Bihar 812005, India";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/20">
      <Container>
        <div className="grid gap-8 py-10 md:grid-cols-3">
          <div className="md:col-span-1">
            <p className="text-sm font-extrabold tracking-tight">AS-Fitness</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Premium gym training and coaching for real results.
            </p>
          </div>

          <div className="grid gap-2 text-sm font-semibold md:col-span-1">
            <p className="text-muted">Quick Links</p>
            <Link className="text-foreground hover:text-neon-orange" href="/services">
              Services
            </Link>
            <Link className="text-foreground hover:text-neon-orange" href="/membership">
              Membership
            </Link>
            <Link className="text-foreground hover:text-neon-orange" href="/gallery">
              Gallery
            </Link>
          </div>

          <div className="grid gap-2 text-sm md:col-span-1">
            <p className="text-muted">Contact</p>
            <a className="text-foreground hover:text-neon-orange" href={`tel:${CONTACT_NUMBER}`}>
              {CONTACT_NUMBER}
            </a>
            <p className="text-muted">{ADDRESS}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} AS-Fitness. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <Link className="text-muted hover:text-neon-orange" href="/contact">
              Contact
            </Link>
            <Link className="text-muted hover:text-neon-orange" href="/about">
              About
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

