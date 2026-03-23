"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HeartPulse } from "lucide-react";
import Container from "@/components/site/Container";
import Reveal from "@/components/anim/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

type BMICategory = "Underweight" | "Normal" | "Overweight" | "Obese";

type BMIResult = {
  value: number;
  category: BMICategory;
  colorClass: string;
};

function getBMIResult(bmi: number): BMIResult {
  if (bmi < 18.5) {
    return { value: bmi, category: "Underweight", colorClass: "text-sky-400" };
  }

  if (bmi < 25) {
    return { value: bmi, category: "Normal", colorClass: "text-green-400" };
  }

  if (bmi < 30) {
    return { value: bmi, category: "Overweight", colorClass: "text-orange-400" };
  }

  return { value: bmi, category: "Obese", colorClass: "text-red-400" };
}

export default function BMICalculator() {
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [result, setResult] = useState<BMIResult | null>(null);
  const [error, setError] = useState("");

  const canReset = useMemo(() => {
    return heightCm.length > 0 || weightKg.length > 0 || result !== null || error.length > 0;
  }, [heightCm, weightKg, result, error]);

  const handleCalculate = () => {
    const parsedHeight = Number(heightCm);
    const parsedWeight = Number(weightKg);

    if (!heightCm || !weightKg) {
      setResult(null);
      setError("Please enter both height and weight.");
      return;
    }

    if (!Number.isFinite(parsedHeight) || !Number.isFinite(parsedWeight) || parsedHeight <= 0 || parsedWeight <= 0) {
      setResult(null);
      setError("Please enter valid positive numbers.");
      return;
    }

    const heightM = parsedHeight / 100;
    const bmi = parsedWeight / (heightM * heightM);

    setError("");
    setResult(getBMIResult(bmi));
  };

  const handleReset = () => {
    setHeightCm("");
    setWeightKg("");
    setResult(null);
    setError("");
  };

  return (
    <section id="bmi-calculator" className="scroll-mt-24 py-14 md:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="BMI CALCULATOR"
              title="Track your Body Mass Index instantly"
              subtitle="Use your height and weight to estimate your BMI and understand your current category."
            />
          </Reveal>

          <Reveal delay={0.05}>
            <div className="rounded-3xl border border-white/10 bg-surface/40 p-6 shadow-[0_0_60px_rgba(255,45,45,0.08)]">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-r from-neon-red/25 to-neon-orange/20">
                  <HeartPulse className="h-5 w-5 text-neon-amber" />
                </span>
                <p className="text-sm font-extrabold tracking-[0.16em] text-neon-orange/90">
                  HEALTH CHECK
                </p>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
                    Height (cm)
                  </span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min="1"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    placeholder="e.g. 170"
                    className="w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm font-semibold text-white outline-none transition-colors placeholder:text-muted focus:border-neon-orange/60"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
                    Weight (kg)
                  </span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min="1"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    placeholder="e.g. 65"
                    className="w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm font-semibold text-white outline-none transition-colors placeholder:text-muted focus:border-neon-orange/60"
                  />
                </label>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleCalculate}
                  className="rounded-2xl bg-gradient-to-r from-neon-red to-neon-orange px-5 py-3 text-sm font-black text-black transition-transform hover:scale-[1.02]"
                >
                  Calculate BMI
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={!canReset}
                  className="rounded-2xl border border-white/10 bg-black/25 px-5 py-3 text-sm font-bold text-white/90 transition-colors hover:border-neon-orange/45 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Reset
                </button>
              </div>

              <AnimatePresence mode="wait">
                {error ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                    className="mt-5 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-300"
                  >
                    {error}
                  </motion.div>
                ) : result ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.28 }}
                    className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-4"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
                      Your BMI Result
                    </p>
                    <p className={`mt-2 text-3xl font-black ${result.colorClass}`}>
                      {result.value.toFixed(2)}
                    </p>
                    <p className={`mt-1 text-sm font-extrabold ${result.colorClass}`}>
                      {result.category}
                    </p>
                    <div className="mt-3 space-y-1 text-xs font-semibold text-muted">
                      <p>Maintain a healthy lifestyle.</p>
                      <p>Consult a trainer for best results.</p>
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
