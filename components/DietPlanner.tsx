"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Droplets, Download, Share2, UtensilsCrossed } from "lucide-react";
import Container from "@/components/site/Container";
import Reveal from "@/components/anim/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

type Gender = "Male" | "Female";
type Goal = "Weight Loss" | "Muscle Gain" | "Maintain Fitness";
type ActivityLevel = "Beginner" | "Intermediate" | "Advanced";

type DietForm = {
  age: string;
  gender: Gender;
  weight: string;
  height: string;
  goal: Goal;
  activity: ActivityLevel;
};

type DietResult = {
  calories: number;
  proteinG: number;
  carbsG: number;
  fatsG: number;
  waterLiters: number;
  meals: {
    breakfast: string;
    lunch: string;
    dinner: string;
    snacks: string;
  };
};

const DEFAULT_FORM: DietForm = {
  age: "",
  gender: "Male",
  weight: "",
  height: "",
  goal: "Maintain Fitness",
  activity: "Beginner",
};

const STORAGE_KEY = "as-fitness-diet-planner";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function goalAccent(goal: Goal) {
  if (goal === "Maintain Fitness") return "text-green-400";
  if (goal === "Muscle Gain") return "text-orange-400";
  return "text-red-400";
}

function getMealTemplate(goal: Goal) {
  if (goal === "Weight Loss") {
    return {
      breakfast: "Greek yogurt + oats + berries + chia seeds",
      lunch: "Grilled chicken/paneer salad + quinoa + mixed veggies",
      dinner: "Fish/tofu + sauteed vegetables + small brown rice portion",
      snacks: "Boiled eggs/roasted chana + apple + green tea",
    };
  }

  if (goal === "Muscle Gain") {
    return {
      breakfast: "Oats in milk + banana + peanut butter + whey",
      lunch: "Rice + dal + chicken/paneer + curd + salad",
      dinner: "Whole wheat roti + lean protein + potatoes + veggies",
      snacks: "Nuts, fruit smoothie, peanut chikki, boiled eggs",
    };
  }

  return {
    breakfast: "Vegetable omelet/poha + fruit + milk",
    lunch: "Balanced thali: roti/rice + dal + sabzi + protein source",
    dinner: "Light protein bowl + veggies + soup",
    snacks: "Seasonal fruits + mixed nuts + buttermilk",
  };
}

function buildDietPlan(form: DietForm): DietResult {
  const age = Number(form.age);
  const weight = Number(form.weight);
  const height = Number(form.height);

  const genderOffset = form.gender === "Male" ? 5 : -161;
  const bmr = 10 * weight + 6.25 * height - 5 * age + genderOffset;

  const activityMultiplier =
    form.activity === "Beginner" ? 1.375 : form.activity === "Intermediate" ? 1.55 : 1.725;
  let calories = bmr * activityMultiplier;

  if (form.goal === "Weight Loss") calories -= 400;
  if (form.goal === "Muscle Gain") calories += 300;

  calories = clamp(Math.round(calories), 1200, 4200);

  const proteinPerKg =
    form.goal === "Muscle Gain" ? 2.2 : form.goal === "Weight Loss" ? 2.0 : 1.8;
  const proteinG = Math.round(weight * proteinPerKg);
  const fatsG = Math.round(weight * 0.8);
  const caloriesAfterProteinFat = calories - proteinG * 4 - fatsG * 9;
  const carbsG = Math.max(80, Math.round(caloriesAfterProteinFat / 4));

  const waterLiters = Number((weight * 0.035).toFixed(1));

  return {
    calories,
    proteinG,
    carbsG,
    fatsG,
    waterLiters,
    meals: getMealTemplate(form.goal),
  };
}

function formatDietText(form: DietForm, result: DietResult) {
  return [
    "AS-Fitness Diet Plan",
    "--------------------",
    `Goal: ${form.goal}`,
    `Daily Calories: ${result.calories} kcal`,
    `Macros: Protein ${result.proteinG}g | Carbs ${result.carbsG}g | Fats ${result.fatsG}g`,
    `Water Intake: ${result.waterLiters} liters/day`,
    "",
    "Meals",
    `Breakfast: ${result.meals.breakfast}`,
    `Lunch: ${result.meals.lunch}`,
    `Dinner: ${result.meals.dinner}`,
    `Snacks: ${result.meals.snacks}`,
    "",
    "Tips",
    "- Maintain a healthy lifestyle",
    "- Consult a trainer for best results",
  ].join("\n");
}

export default function DietPlanner() {
  const [form, setForm] = useState<DietForm>(DEFAULT_FORM);
  const [result, setResult] = useState<DietResult | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as { form: DietForm; result: DietResult | null };
      setForm(parsed.form ?? DEFAULT_FORM);
      setResult(parsed.result ?? null);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ form, result }));
  }, [form, result]);

  const canReset = useMemo(() => {
    return JSON.stringify(form) !== JSON.stringify(DEFAULT_FORM) || result !== null || error.length > 0;
  }, [form, result, error]);

  const handleGenerate = () => {
    const age = Number(form.age);
    const weight = Number(form.weight);
    const height = Number(form.height);

    if (!form.age || !form.weight || !form.height) {
      setResult(null);
      setError("Please fill age, height, and weight.");
      return;
    }

    if (!Number.isFinite(age) || !Number.isFinite(weight) || !Number.isFinite(height)) {
      setResult(null);
      setError("Please provide valid numeric inputs.");
      return;
    }

    if (age < 13 || age > 90 || weight <= 0 || height <= 0) {
      setResult(null);
      setError("Use realistic values (Age 13-90, positive height/weight).");
      return;
    }

    setError("");
    setResult(buildDietPlan(form));
  };

  const handleReset = () => {
    setForm(DEFAULT_FORM);
    setResult(null);
    setError("");
  };

  const handleDownload = () => {
    if (!result) return;
    const content = formatDietText(form, result);
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "diet-plan.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const whatsappLink = useMemo(() => {
    if (!result) return "#";
    return `https://wa.me/?text=${encodeURIComponent(formatDietText(form, result))}`;
  }, [form, result]);

  return (
    <section id="diet-planner" className="scroll-mt-24 py-14 md:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <SectionHeading
              eyebrow="DIET PLAN GENERATOR"
              title="Generate your daily fitness diet plan"
              subtitle="Get calories, macros, and practical meal suggestions tailored to your goal and activity level."
            />
          </Reveal>

          <Reveal delay={0.05}>
            <div className="rounded-3xl border border-white/10 bg-surface/40 p-6 shadow-[0_0_60px_rgba(255,45,45,0.08)]">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-r from-neon-red/25 to-neon-orange/20">
                  <UtensilsCrossed className="h-5 w-5 text-neon-amber" />
                </span>
                <p className="text-sm font-extrabold tracking-[0.14em] text-neon-orange/90">
                  SMART NUTRITION
                </p>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <input
                  type="number"
                  placeholder="Age"
                  value={form.age}
                  onChange={(e) => setForm((prev) => ({ ...prev, age: e.target.value }))}
                  className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm font-semibold outline-none placeholder:text-muted focus:border-neon-orange/60"
                />
                <select
                  value={form.gender}
                  onChange={(e) => setForm((prev) => ({ ...prev, gender: e.target.value as Gender }))}
                  className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm font-semibold outline-none focus:border-neon-orange/60"
                >
                  <option>Male</option>
                  <option>Female</option>
                </select>
                <input
                  type="number"
                  placeholder="Weight (kg)"
                  value={form.weight}
                  onChange={(e) => setForm((prev) => ({ ...prev, weight: e.target.value }))}
                  className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm font-semibold outline-none placeholder:text-muted focus:border-neon-orange/60"
                />
                <input
                  type="number"
                  placeholder="Height (cm)"
                  value={form.height}
                  onChange={(e) => setForm((prev) => ({ ...prev, height: e.target.value }))}
                  className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm font-semibold outline-none placeholder:text-muted focus:border-neon-orange/60"
                />
                <select
                  value={form.goal}
                  onChange={(e) => setForm((prev) => ({ ...prev, goal: e.target.value as Goal }))}
                  className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm font-semibold outline-none focus:border-neon-orange/60"
                >
                  <option>Weight Loss</option>
                  <option>Muscle Gain</option>
                  <option>Maintain Fitness</option>
                </select>
                <select
                  value={form.activity}
                  onChange={(e) => setForm((prev) => ({ ...prev, activity: e.target.value as ActivityLevel }))}
                  className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm font-semibold outline-none focus:border-neon-orange/60"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleGenerate}
                  className="rounded-2xl bg-gradient-to-r from-neon-red to-neon-orange px-5 py-3 text-sm font-black text-black"
                >
                  Generate Plan
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={!canReset}
                  className="rounded-2xl border border-white/10 bg-black/25 px-5 py-3 text-sm font-bold text-white/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Reset
                </button>
              </div>

              <AnimatePresence mode="wait">
                {error ? (
                  <motion.p
                    key="diet-error"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="mt-4 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-300"
                  >
                    {error}
                  </motion.p>
                ) : result ? (
                  <motion.div
                    key="diet-result"
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-4"
                  >
                    <p className={`text-sm font-extrabold ${goalAccent(form.goal)}`}>{form.goal}</p>
                    <p className="mt-1 text-2xl font-black">{result.calories} kcal/day</p>
                    <div className="mt-2 grid gap-2 text-sm sm:grid-cols-2">
                      <p>Protein: {result.proteinG}g</p>
                      <p>Carbs: {result.carbsG}g</p>
                      <p>Fats: {result.fatsG}g</p>
                      <p className="inline-flex items-center gap-2">
                        <Droplets className="h-4 w-4 text-cyan-300" />
                        {result.waterLiters} L water/day
                      </p>
                    </div>

                    <div className="mt-4 space-y-2 text-sm text-muted">
                      <p><span className="font-bold text-white">Breakfast:</span> {result.meals.breakfast}</p>
                      <p><span className="font-bold text-white">Lunch:</span> {result.meals.lunch}</p>
                      <p><span className="font-bold text-white">Dinner:</span> {result.meals.dinner}</p>
                      <p><span className="font-bold text-white">Snacks:</span> {result.meals.snacks}</p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={handleDownload}
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
