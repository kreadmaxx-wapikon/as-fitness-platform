"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Download, Dumbbell, Share2, Sparkles } from "lucide-react";
import Container from "@/components/site/Container";
import Reveal from "@/components/anim/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

type Goal = "Weight Loss" | "Muscle Gain" | "Strength";
type Location = "Home" | "Gym";
type Level = "Beginner" | "Intermediate" | "Advanced";

type WorkoutForm = {
  goal: Goal;
  location: Location;
  level: Level;
  days: number;
};

type DayPlan = {
  day: number;
  title: string;
  exercises: string[];
  sets: string;
  reps: string;
  icon: "dumbbell" | "spark";
};

const DEFAULT_FORM: WorkoutForm = {
  goal: "Strength",
  location: "Gym",
  level: "Beginner",
  days: 4,
};

const STORAGE_KEY = "as-fitness-workout-ai";

function buildExercises(focus: string, location: Location, goal: Goal): string[] {
  const gymMap: Record<string, string[]> = {
    "Full Body A": ["Barbell Squat", "Bench Press", "Lat Pulldown", "Plank"],
    "Full Body B": ["Romanian Deadlift", "Overhead Press", "Seated Row", "Leg Raise"],
    "Upper Body": ["Incline Press", "Cable Row", "Shoulder Press", "Biceps Curl"],
    "Lower Body": ["Back Squat", "Walking Lunges", "Leg Curl", "Calf Raise"],
    "Push": ["Bench Press", "Incline Dumbbell Press", "Lateral Raise", "Triceps Pushdown"],
    "Pull": ["Deadlift", "Pull-ups", "Barbell Row", "Face Pull"],
    "Legs": ["Squat", "Leg Press", "Leg Extension", "Hamstring Curl"],
    "Chest + Triceps": ["Flat Bench", "Incline Press", "Dips", "Rope Pushdown"],
    "Back + Biceps": ["Deadlift", "Lat Pulldown", "One-Arm Row", "EZ Curl"],
    "Shoulders + Core": ["Shoulder Press", "Lateral Raise", "Rear Delt Fly", "Cable Crunch"],
    "Legs + Glutes": ["Squat", "Hip Thrust", "Bulgarian Split Squat", "Leg Curl"],
  };

  const homeMap: Record<string, string[]> = {
    "Full Body A": ["Bodyweight Squat", "Push-ups", "Resistance Row", "Plank"],
    "Full Body B": ["Glute Bridge", "Pike Push-up", "Band Row", "Mountain Climbers"],
    "Upper Body": ["Push-ups", "Band Rows", "Chair Dips", "Biceps Band Curl"],
    "Lower Body": ["Bodyweight Squat", "Reverse Lunges", "Single-leg RDL", "Calf Raises"],
    "Push": ["Push-ups", "Pike Push-up", "Chair Dips", "Diamond Push-ups"],
    "Pull": ["Band Rows", "Superman Holds", "Band Face Pull", "Hammer Curl (Band)"],
    "Legs": ["Squat", "Lunges", "Glute Bridge", "Wall Sit"],
    "Chest + Triceps": ["Push-ups", "Incline Push-ups", "Chair Dips", "Close-Grip Push-up"],
    "Back + Biceps": ["Band Row", "Towel Row", "Reverse Snow Angel", "Band Curl"],
    "Shoulders + Core": ["Pike Push-up", "Lateral Raise (Band)", "Plank", "Russian Twist"],
    "Legs + Glutes": ["Split Squat", "Glute Bridge", "Step-ups", "Donkey Kicks"],
  };

  const source = location === "Gym" ? gymMap : homeMap;
  const base = source[focus] ?? ["Squat", "Push-up", "Row", "Plank"];
  if (goal === "Weight Loss") return [...base, "10-15 min moderate cardio finisher"];
  return base;
}

function getSplit(level: Level): string[] {
  if (level === "Beginner") return ["Full Body A", "Full Body B"];
  if (level === "Intermediate") return ["Upper Body", "Lower Body", "Push", "Pull", "Legs"];
  return ["Chest + Triceps", "Back + Biceps", "Legs + Glutes", "Shoulders + Core", "Push", "Pull"];
}

function buildPlan(form: WorkoutForm): DayPlan[] {
  const template = getSplit(form.level);
  const sets = form.level === "Beginner" ? "3 sets" : form.level === "Intermediate" ? "3-4 sets" : "4-5 sets";
  const reps = form.goal === "Strength" ? "4-8 reps" : form.goal === "Muscle Gain" ? "8-12 reps" : "12-15 reps";

  return Array.from({ length: form.days }).map((_, idx) => {
    const title = template[idx % template.length];
    const exercises = buildExercises(title, form.location, form.goal);
    return {
      day: idx + 1,
      title,
      exercises,
      sets,
      reps,
      icon: idx % 2 === 0 ? "dumbbell" : "spark",
    };
  });
}

function motivational(goal: Goal) {
  if (goal === "Weight Loss") return "Small daily effort creates big transformation.";
  if (goal === "Muscle Gain") return "Fuel, lift, recover, repeat. Growth follows consistency.";
  return "Strong form and steady progression build real strength.";
}

function formatWorkoutText(form: WorkoutForm, days: DayPlan[]) {
  return [
    "AS-Fitness Workout Recommendation",
    "--------------------------------",
    `Goal: ${form.goal}`,
    `Location: ${form.location}`,
    `Level: ${form.level}`,
    `Days/Week: ${form.days}`,
    "",
    ...days.flatMap((d) => [
      `Day ${d.day}: ${d.title}`,
      `Sets/Reps: ${d.sets}, ${d.reps}`,
      ...d.exercises.map((e) => `- ${e}`),
      "",
    ]),
    `Motivation: ${motivational(form.goal)}`,
  ].join("\n");
}

export default function WorkoutAI() {
  const [form, setForm] = useState<WorkoutForm>(DEFAULT_FORM);
  const [daysPlan, setDaysPlan] = useState<DayPlan[] | null>(null);
  const [openDay, setOpenDay] = useState<number | null>(1);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as { form: WorkoutForm; daysPlan: DayPlan[] | null };
      setForm(parsed.form ?? DEFAULT_FORM);
      setDaysPlan(parsed.daysPlan ?? null);
      setOpenDay(parsed.daysPlan?.[0]?.day ?? 1);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ form, daysPlan }));
  }, [form, daysPlan]);

  const restSuggestion = useMemo(() => {
    const restDays = 7 - form.days;
    if (restDays <= 0) return "Keep one active recovery day with mobility and stretching.";
    return `${restDays} rest day(s) recommended for recovery and performance.`;
  }, [form.days]);

  const generate = () => {
    setDaysPlan(buildPlan(form));
    setOpenDay(1);
  };

  const reset = () => {
    setForm(DEFAULT_FORM);
    setDaysPlan(null);
    setOpenDay(1);
  };

  const downloadPlan = () => {
    if (!daysPlan) return;
    const content = formatWorkoutText(form, daysPlan);
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "workout-plan.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const whatsappLink = useMemo(() => {
    if (!daysPlan) return "#";
    return `https://wa.me/?text=${encodeURIComponent(formatWorkoutText(form, daysPlan))}`;
  }, [form, daysPlan]);

  return (
    <section id="workout-ai" className="scroll-mt-24 pb-16 md:pb-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <SectionHeading
              eyebrow="WORKOUT RECOMMENDATION AI"
              title="Get your personalized weekly training split"
              subtitle="Choose your goal, location, level, and training days to generate a practical day-wise workout plan."
            />
          </Reveal>

          <Reveal delay={0.05}>
            <div className="rounded-3xl border border-white/10 bg-surface/40 p-6 shadow-[0_0_60px_rgba(255,45,45,0.08)]">
              <div className="grid gap-4 sm:grid-cols-2">
                <select
                  value={form.goal}
                  onChange={(e) => setForm((p) => ({ ...p, goal: e.target.value as Goal }))}
                  className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm font-semibold outline-none focus:border-neon-orange/60"
                >
                  <option>Weight Loss</option>
                  <option>Muscle Gain</option>
                  <option>Strength</option>
                </select>
                <select
                  value={form.location}
                  onChange={(e) => setForm((p) => ({ ...p, location: e.target.value as Location }))}
                  className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm font-semibold outline-none focus:border-neon-orange/60"
                >
                  <option>Home</option>
                  <option>Gym</option>
                </select>
                <select
                  value={form.level}
                  onChange={(e) => setForm((p) => ({ ...p, level: e.target.value as Level }))}
                  className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm font-semibold outline-none focus:border-neon-orange/60"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
                <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/35 px-4 py-3">
                  <span className="text-xs font-bold tracking-[0.12em] text-muted">Days/week</span>
                  <input
                    type="number"
                    min={1}
                    max={7}
                    value={form.days}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        days: Math.min(7, Math.max(1, Number(e.target.value) || 1)),
                      }))
                    }
                    className="w-16 bg-transparent text-sm font-black outline-none"
                  />
                </label>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={generate}
                  className="rounded-2xl bg-gradient-to-r from-neon-red to-neon-orange px-5 py-3 text-sm font-black text-black"
                >
                  Generate Workout
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-2xl border border-white/10 bg-black/25 px-5 py-3 text-sm font-bold text-white/90"
                >
                  Reset
                </button>
              </div>

              <AnimatePresence>
                {daysPlan ? (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="mt-5 space-y-3"
                  >
                    {daysPlan.map((d) => (
                      <div key={d.day} className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                        <button
                          type="button"
                          onClick={() => setOpenDay((current) => (current === d.day ? null : d.day))}
                          className="flex w-full items-center justify-between px-4 py-3 text-left"
                        >
                          <span className="inline-flex items-center gap-2 text-sm font-extrabold">
                            {d.icon === "dumbbell" ? (
                              <Dumbbell className="h-4 w-4 text-neon-amber" />
                            ) : (
                              <Sparkles className="h-4 w-4 text-neon-orange" />
                            )}
                            Day {d.day}: {d.title}
                          </span>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${openDay === d.day ? "rotate-180" : ""}`}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {openDay === d.day ? (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="px-4 pb-4 text-sm text-muted"
                            >
                              <p className="font-semibold text-white">
                                {d.sets} • {d.reps}
                              </p>
                              <ul className="mt-2 space-y-1">
                                {d.exercises.map((exercise) => (
                                  <li key={exercise}>- {exercise}</li>
                                ))}
                              </ul>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </div>
                    ))}

                    <div className="rounded-2xl border border-white/10 bg-black/25 p-4 text-sm">
                      <p className="font-bold text-neon-amber">Recovery Tip</p>
                      <p className="mt-1 text-muted">{restSuggestion}</p>
                      <p className="mt-2 font-semibold text-white">{motivational(form.goal)}</p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={downloadPlan}
                        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/35 px-3 py-2 text-xs font-bold"
                      >
                        <Download className="h-4 w-4" />
                        Download Plan
                      </button>
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/35 px-3 py-2 text-xs font-bold"
                      >
                        <Share2 className="h-4 w-4" />
                        Share WhatsApp
                      </a>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
