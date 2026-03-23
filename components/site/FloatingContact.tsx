"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";

const CONTACT_NUMBER = "8409700152";

export default function FloatingContact() {
  const waUrl = `https://wa.me/${CONTACT_NUMBER}?text=${encodeURIComponent(
    "Hi AS-Fitness! I want to join. Please share membership details."
  )}`;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <motion.a
        href={waUrl}
        target="_blank"
        rel="noreferrer"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        whileHover={{ scale: 1.04 }}
        className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/55 text-neon-amber shadow-[0_0_40px_rgba(255,122,24,0.25)] backdrop-blur"
        aria-label="WhatsApp AS-Fitness"
      >
        <MessageCircle className="h-5 w-5" />
      </motion.a>

      <motion.a
        href={`tel:${CONTACT_NUMBER}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        whileHover={{ scale: 1.04 }}
        className="hidden h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/55 text-neon-orange shadow-[0_0_40px_rgba(255,45,45,0.18)] backdrop-blur md:flex"
        aria-label="Call AS-Fitness"
      >
        <Phone className="h-5 w-5" />
      </motion.a>

      <motion.a
        href={`tel:${CONTACT_NUMBER}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        whileHover={{ scale: 1.04 }}
        className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/55 text-neon-orange shadow-[0_0_40px_rgba(255,45,45,0.18)] backdrop-blur md:hidden"
        aria-label="Call AS-Fitness"
      >
        <Phone className="h-5 w-5" />
      </motion.a>
    </div>
  );
}

