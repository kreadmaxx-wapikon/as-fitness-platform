import type { Metadata } from "next";
import React from "react";
import { Apple, Dumbbell, Target, User } from "lucide-react";
import Container from "@/components/site/Container";
import Reveal from "@/components/anim/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import NeonButton from "@/components/ui/NeonButton";
import { SERVICES, CONTACT_NUMBER } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services | AS-Fitness Bhagalpur",
  description:
    "Gym training, personal training, weight loss programs, and diet guidance at AS-Fitness in Bhagalpur. Premium coaching and weekly progress tracking.",
  alternates: { canonical: "/services" },
};

const ICONS = {
  dumbbell: Dumbbell,
  user: User,
  target: Target,
  apple: Apple,
} as const;

export default function ServicesPage() {
  return (
    <div>
      <section className="py-14 md:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="SERVICES"
              title="Everything you need to train smarter"
              subtitle="Choose a program and we’ll coach you with structure, accountability, and technique."
            />
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s, idx) => {
              const Icon = ICONS[s.iconKey];
              return (
                <Reveal key={s.key} delay={idx * 0.05}>
                  <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black/25 p-6 transition-all hover:border-neon-red/40">
                    <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-neon-red/20 blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="relative">
                      <div className="flex items-center gap-3">
                        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-r from-neon-red/25 via-neon-orange/15 to-neon-amber/10 border border-white/10">
                          <Icon className="h-6 w-6 text-neon-amber" />
                        </span>
                        <h3 className="text-base font-extrabold">{s.title}</h3>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-muted">
                        {s.description}
                      </p>
                      <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-neon-orange/90">
                        Get started <span aria-hidden>→</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-10 rounded-3xl border border-white/10 bg-surface/40 p-6 md:p-8">
            <Reveal>
              <div className="grid gap-6 md:grid-cols-2 md:items-center">
                <div>
                  <h3 className="text-xl font-extrabold">Not sure which program fits you?</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    Call us and we’ll suggest the best plan based on your goal and schedule.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <NeonButton href="/membership" className="w-full sm:w-auto">
                    View Membership
                  </NeonButton>
                  <NeonButton
                    href={`tel:${CONTACT_NUMBER}`}
                    variant="secondary"
                    className="w-full sm:w-auto"
                  >
                    Call {CONTACT_NUMBER}
                  </NeonButton>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </div>
  );
}

