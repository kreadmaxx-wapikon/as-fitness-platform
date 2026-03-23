import type { Metadata } from "next";
import Image from "next/image";
import React from "react";
import { Sparkles, ShieldCheck, Target } from "lucide-react";
import Container from "@/components/site/Container";
import Reveal from "@/components/anim/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import NeonButton from "@/components/ui/NeonButton";
import { CONTACT_NUMBER, TRAINER } from "@/lib/data";

export const metadata: Metadata = {
  title: "About AS-Fitness | Training in Bhagalpur",
  description:
    "Learn about AS-Fitness: mission, vision, and why local members trust our gym training, personal coaching, and weight loss programs in Bhagalpur.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="relative">
      <section className="py-14 md:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="ABOUT AS-FITNESS"
              title="A premium fitness experience for Puraini, Bhagalpur"
              subtitle="We build training systems that feel simple, motivating, and effective—so you can stay consistent and achieve your goal."
            />
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <Reveal delay={0.05}>
              <div className="rounded-3xl border border-white/10 bg-surface/40 p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-r from-neon-red/25 to-neon-orange/20">
                    <ShieldCheck className="h-6 w-6 text-neon-amber" />
                  </span>
                  <h3 className="text-base font-extrabold">Our Mission</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Help local members transform with coach-guided training, clear progress tracking,
                  and nutrition that fits daily life.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-white/10 bg-surface/40 p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-r from-neon-orange/20 to-neon-amber/15">
                    <Target className="h-6 w-6 text-neon-orange" />
                  </span>
                  <h3 className="text-base font-extrabold">Our Vision</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Become the most trusted training center in Bhagalpur by focusing on technique,
                  accountability, and sustainable lifestyle change.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="rounded-3xl border border-white/10 bg-surface/40 p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-r from-neon-red/18 via-neon-orange/12 to-neon-amber/10">
                    <Sparkles className="h-6 w-6 text-neon-amber" />
                  </span>
                  <h3 className="text-base font-extrabold">Why We Win</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Every plan is goal-based. Every session has purpose. And every member gets
                  feedback that helps you improve faster.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div className="space-y-3 rounded-3xl border border-white/10 bg-black/25 p-6">
                <h3 className="text-lg font-extrabold">Why choose us</h3>
                {[
                  "Form-first coaching with real-time feedback.",
                  "Weekly check-ins to keep you on track.",
                  "Diet guidance that is practical and budget-friendly.",
                  "Programs for beginners, intermediate, and advanced members.",
                ].map((x) => (
                  <div key={x} className="flex gap-3 rounded-2xl border border-white/10 bg-surface/35 p-4">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-neon-red to-neon-orange text-black font-black">
                      ✓
                    </span>
                    <p className="text-sm font-semibold text-muted">{x}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <div className="rounded-3xl border border-white/10 bg-surface/40 p-6">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-white/10 bg-black/25">
                    <Image
                      src={TRAINER.image}
                      alt="Trainer introduction"
                      width={800}
                      height={500}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold">{TRAINER.name}</p>
                    <p className="mt-1 text-xs font-bold tracking-[0.16em] text-neon-orange/80">
                      {TRAINER.title}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted">{TRAINER.bio}</p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <NeonButton href="/membership" className="w-full sm:w-auto">
                    Join AS-Fitness
                  </NeonButton>
                  <NeonButton
                    href={`tel:${CONTACT_NUMBER}`}
                    variant="secondary"
                    className="w-full sm:w-auto"
                  >
                    Call Now
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

