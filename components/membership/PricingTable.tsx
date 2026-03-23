"use client";

import React, { useMemo, useState } from "react";
import NeonButton from "@/components/ui/NeonButton";
import { CONTACT_NUMBER } from "@/lib/data";

type Billing = "monthly" | "quarterly";

type Plan = {
  key: "basic" | "standard" | "premium";
  name: string;
  monthly: number;
  tagline: string;
  bullets: string[];
  highlight?: boolean;
};

const PLANS: Plan[] = [
  {
    key: "basic",
    name: "Basic",
    monthly: 1999,
    tagline: "Gym training with structure",
    bullets: ["2 guided sessions/month", "Progress checklist", "Workout plan"],
  },
  {
    key: "standard",
    name: "Standard",
    monthly: 2499,
    tagline: "Personal guidance + tracking",
    bullets: ["1-on-1 coaching weekly", "Form feedback", "Diet guidance basics"],
    highlight: true,
  },
  {
    key: "premium",
    name: "Premium",
    monthly: 3499,
    tagline: "Complete transformation system",
    bullets: ["Weekly check-ins", "Diet plan + adjustments", "Priority support"],
  },
];

function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function PricingTable() {
  const [billing, setBilling] = useState<Billing>("monthly");

  const plans = useMemo(() => {
    const discount = 0.9; // Quarterly discount
    return PLANS.map((p) => {
      const price =
        billing === "monthly" ? p.monthly : Math.round(p.monthly * 3 * discount);
      return { ...p, price };
    });
  }, [billing]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-surface/40 p-4">
        <p className="text-sm font-extrabold text-muted">
          Choose your billing
        </p>
        <div className="inline-flex rounded-2xl border border-white/10 bg-black/25 p-1">
          <button
            type="button"
            onClick={() => setBilling("monthly")}
            className={[
              "rounded-xl px-4 py-2 text-sm font-extrabold transition-colors",
              billing === "monthly"
                ? "bg-gradient-to-r from-neon-red to-neon-orange text-black shadow-[0_0_40px_rgba(255,45,45,0.25)]"
                : "text-foreground hover:bg-surface/50",
            ].join(" ")}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setBilling("quarterly")}
            className={[
              "rounded-xl px-4 py-2 text-sm font-extrabold transition-colors",
              billing === "quarterly"
                ? "bg-gradient-to-r from-neon-red to-neon-orange text-black shadow-[0_0_40px_rgba(255,45,45,0.25)]"
                : "text-foreground hover:bg-surface/50",
            ].join(" ")}
          >
            Quarterly
          </button>
        </div>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.key}
            className={[
              "relative flex flex-col gap-5 rounded-3xl border bg-black/25 p-6",
              p.highlight
                ? "border-neon-red/35 shadow-[0_0_70px_rgba(255,45,45,0.15)]"
                : "border-white/10",
            ].join(" ")}
          >
            {p.highlight ? (
              <div className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-neon-red via-neon-orange to-neon-amber px-4 py-1 text-xs font-extrabold text-black shadow-[0_0_40px_rgba(255,45,45,0.25)]">
                Most Popular
              </div>
            ) : null}

            <div>
              <p className="text-xs font-bold tracking-[0.22em] text-neon-orange/90">
                PLAN
              </p>
              <h3 className="mt-2 text-2xl font-extrabold">{p.name}</h3>
              <p className="mt-2 text-sm font-semibold text-muted">{p.tagline}</p>
            </div>

            <div>
              <p className="text-4xl font-extrabold">
                {formatINR(p.price)}
              </p>
              <p className="mt-1 text-sm font-semibold text-muted">
                {billing === "monthly" ? "per month" : "per quarter"}
              </p>
            </div>

            <ul className="space-y-2 text-sm text-muted">
              {p.bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-xl bg-surface/70 text-neon-amber font-black">
                    ✓
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              <NeonButton
                href={`/contact`}
                className="w-full"
                onClick={() => {}}
              >
                Get Started
              </NeonButton>

              <a
                className="mt-3 block text-center text-sm font-extrabold text-neon-orange/90 hover:text-neon-amber"
                href={`tel:${CONTACT_NUMBER}`}
              >
                Prefer a call? {CONTACT_NUMBER}
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-3xl border border-white/10 bg-surface/40 p-6 md:p-8">
        <h3 className="text-xl font-extrabold">
          Want help choosing the right plan?
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          Call us and we’ll suggest the best membership based on your goal, experience, and schedule.
        </p>
      </div>
    </div>
  );
}

