import type { Metadata } from "next";
import Image from "next/image";
import { Apple, Dumbbell, Target, User } from "lucide-react";
import React from "react";
import Container from "@/components/site/Container";
import NeonButton from "@/components/ui/NeonButton";
import Reveal from "@/components/anim/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import BMICalculator from "@/components/BMICalculator";
import DietPlanner from "@/components/DietPlanner";
import WorkoutAI from "@/components/WorkoutAI";
import { BEFORE_AFTER, CONTACT_NUMBER, GALLERY, SERVICES, TESTIMONIALS, TRAINER } from "@/lib/data";

export const metadata: Metadata = {
  title: "AS-Fitness | Premium Gym in Bhagalpur",
  description:
    "AS-Fitness premium gym training, personal training, weight loss programs, and diet guidance in Puraini, Bhagalpur. Join now for real results.",
  alternates: { canonical: "/" },
};

const ICONS = {
  dumbbell: Dumbbell,
  user: User,
  target: Target,
  apple: Apple,
} as const;

export default function Home() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-neon opacity-30" />
        <div className="absolute -top-24 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-neon-red/25 via-neon-orange/15 to-neon-amber/10 blur-3xl" />

        <Container>
          <div className="relative grid gap-10 py-14 md:grid-cols-2 md:py-20">
            <div className="flex flex-col justify-center">
              <Reveal>
                <p className="text-xs font-bold tracking-[0.22em] text-neon-orange/90">
                  PURAINI BHAGALPUR • 812005
                </p>
                <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
                  Transform Your Body, Transform Your Life
                </h1>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                  Premium coaching for gym training, personal training, weight loss programs,
                  and diet guidance. Built for consistency, strength, and confidence.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <NeonButton href="/membership" size="lg">
                    Join Now
                  </NeonButton>
                  <NeonButton
                    href={`tel:${CONTACT_NUMBER}`}
                    variant="secondary"
                    size="lg"
                  >
                    Call Now
                  </NeonButton>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {[
                    { label: "Goal-Based", value: "Training Plans" },
                    { label: "Real Support", value: "Weekly Check-ins" },
                    { label: "Neon Energy", value: "High-Motivation Coaching" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="rounded-2xl border border-white/10 bg-surface/50 p-4"
                    >
                      <p className="text-xs font-bold text-muted">{s.label}</p>
                      <p className="mt-2 text-sm font-extrabold">{s.value}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="relative">
              <Reveal>
                <div className="rounded-3xl border border-white/10 bg-black/30 p-4 shadow-[0_0_60px_rgba(255,45,45,0.12)]">
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-neon-red/20 via-neon-orange/10 to-neon-amber/10">
                    <Image
                      src={GALLERY[1].src}
                      alt="AS-Fitness gym training"
                      width={800}
                      height={500}
                      className="h-[280px] w-full object-cover saturate-110"
                      priority
                    />
                    <div className="absolute bottom-0 right-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/45 p-3 backdrop-blur">
                        <div>
                          <p className="text-xs font-bold tracking-[0.18em] text-neon-orange/90">
                            RESULT FOCUSED
                          </p>
                          <p className="mt-1 text-sm font-extrabold">
                            Strength • Fat Loss • Confidence
                          </p>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-neon-red to-neon-orange shadow-[0_0_30px_rgba(255,45,45,0.35)]">
                          <span className="text-xs font-black text-black">AS</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-neon-red/20 blur-3xl" />
              <div className="pointer-events-none absolute -top-8 -left-10 h-40 w-40 rounded-full bg-neon-orange/20 blur-3xl" />
            </div>
          </div>
        </Container>
      </section>

      {/* Services highlights */}
      <section id="services" className="scroll-mt-24 py-14 md:py-20">
        <Container>
          <div className="grid gap-10 md:grid-cols-2 md:items-start">
            <Reveal>
              <SectionHeading
                eyebrow="SERVICES"
                title="Your fitness journey, coached step-by-step"
                subtitle="Choose the program that matches your goals—then train with clarity, structure, and accountability."
              />
            </Reveal>

            <Reveal>
              <div className="rounded-3xl border border-white/10 bg-surface/40 p-6 shadow-[0_0_60px_rgba(255,45,45,0.08)]">
                <p className="text-sm font-semibold text-muted">
                  Quick Start
                </p>
                <ol className="mt-4 space-y-3 text-sm">
                  {[
                    "Join membership and choose your goal.",
                    "Get a personalized weekly plan.",
                    "Train with form feedback and progress tracking.",
                  ].map((x, i) => (
                    <li key={x} className="flex gap-3">
                      <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-neon-red to-neon-orange text-black font-black">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{x}</span>
                    </li>
                  ))}
                </ol>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <NeonButton href="/membership" className="w-full sm:w-auto">
                    View Plans
                  </NeonButton>
                  <NeonButton
                    href={`tel:${CONTACT_NUMBER}`}
                    variant="secondary"
                    className="w-full sm:w-auto"
                  >
                    Talk to Coach
                  </NeonButton>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s, idx) => {
              const Icon = ICONS[s.iconKey];
              return (
                <Reveal key={s.key} delay={idx * 0.05}>
                  <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black/25 p-6 transition-all hover:border-neon-red/40">
                    <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-neon-red/20 blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="flex items-center gap-3">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-r from-neon-red/25 via-neon-orange/15 to-neon-amber/10 border border-white/10">
                        <Icon className="h-6 w-6 text-neon-amber" />
                      </div>
                      <h3 className="text-base font-extrabold">{s.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{s.description}</p>
                    <div className="mt-5 text-sm font-semibold text-neon-orange/90">
                      Start training →
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <BMICalculator />
      <DietPlanner />
      <WorkoutAI />

      {/* Testimonials */}
      <section id="testimonials" className="scroll-mt-24 py-14 md:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="TESTIMONIALS"
              title="Local results from real members"
              subtitle="Motivation is easy. Progress is earned—every session, every week."
            />
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {TESTIMONIALS.map((t, idx) => (
              <Reveal key={t.name} delay={idx * 0.05}>
                <div className="h-full rounded-3xl border border-white/10 bg-surface/40 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-extrabold">{t.name}</p>
                      <p className="mt-1 text-xs font-bold tracking-[0.18em] text-neon-orange/80">
                        {t.tag}
                      </p>
                    </div>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-r from-neon-red/25 to-neon-orange/20">
                      <span className="text-lg font-black text-neon-amber">“</span>
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {t.quote}
                  </p>
                  <div className="mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-neon-red to-neon-orange" />
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Before / After */}
      <section id="transformation" className="scroll-mt-24 py-14 md:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <SectionHeading
                eyebrow="TRANSFORMATION"
                title="Before & After: structured coaching, real change"
                subtitle="We combine strength training, fat-loss routines, and diet guidance to help you stay consistent."
              />
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {BEFORE_AFTER.stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-white/10 bg-black/25 p-4"
                  >
                    <p className="text-xs font-bold text-muted">{s.label}</p>
                    <p className="mt-2 text-sm font-extrabold text-neon-amber">
                      {s.value}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black/25">
                  <Image
                    src={BEFORE_AFTER.before.src}
                    alt={BEFORE_AFTER.before.alt}
                    width={800}
                    height={500}
                    className="h-72 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/45 px-3 py-1 text-xs font-extrabold text-neon-orange/90 backdrop-blur">
                    BEFORE
                  </div>
                </div>
                <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black/25">
                  <Image
                    src={BEFORE_AFTER.after.src}
                    alt={BEFORE_AFTER.after.alt}
                    width={800}
                    height={500}
                    className="h-72 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/45 px-3 py-1 text-xs font-extrabold text-neon-amber backdrop-blur">
                    AFTER
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Want your own transformation? Choose a plan and start training this week.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Trainer */}
      <section id="trainer" className="scroll-mt-24 pb-16 md:pb-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <SectionHeading
                eyebrow="TRAINER HIGHLIGHT"
                title="Coaching that focuses on technique and consistency"
                subtitle="You will always know what to do, why you are doing it, and how to improve."
              />

              <div className="mt-7 space-y-3">
                {TRAINER.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-surface/40 p-4">
                    <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-r from-neon-red/25 to-neon-orange/20">
                      <span className="text-neon-amber font-black">✓</span>
                    </span>
                    <div>
                      <p className="text-sm font-extrabold">{h}</p>
                      <p className="mt-1 text-sm text-muted">
                        Clear guidance built for real life, not only gym time.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <div className="rounded-3xl border border-white/10 bg-black/25 p-6 shadow-[0_0_60px_rgba(255,45,45,0.08)]">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-neon-red/30 to-neon-orange/15">
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
                    Start Membership
                  </NeonButton>
                  <NeonButton
                    href={`tel:${CONTACT_NUMBER}`}
                    variant="secondary"
                    className="w-full sm:w-auto"
                  >
                    Call for Advice
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
