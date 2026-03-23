"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export type LightboxImage = { src: string; alt: string };

export default function Lightbox({
  open,
  images,
  index,
  onClose,
  onChangeIndex,
}: {
  open: boolean;
  images: LightboxImage[];
  index: number;
  onClose: () => void;
  onChangeIndex: (nextIndex: number) => void;
}) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChangeIndex((index + 1) % images.length);
      if (e.key === "ArrowLeft") onChangeIndex((index - 1 + images.length) % images.length);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [index, images.length, onChangeIndex, onClose, open]);

  const img = images[index];

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Gallery preview"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-black/30 backdrop-blur"
            initial={{ y: 10, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 10, scale: 0.98 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-3">
              <p className="text-sm font-semibold text-neon-amber">AS-Fitness Gallery</p>
              <button
                onClick={onClose}
                className="rounded-xl border border-white/10 bg-surface/50 px-3 py-1 text-sm font-bold text-foreground hover:bg-surface"
              >
                Close
              </button>
            </div>

            <div className="relative">
              <Image
                src={img.src}
                alt={img.alt}
                width={800}
                height={500}
                className="max-h-[70vh] w-full object-cover"
                loading="eager"
                priority
              />

              <button
                onClick={() => onChangeIndex((index - 1 + images.length) % images.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-black/55 px-3 py-2 text-sm font-bold text-foreground hover:bg-black/70"
                aria-label="Previous image"
              >
                Prev
              </button>
              <button
                onClick={() => onChangeIndex((index + 1) % images.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-black/55 px-3 py-2 text-sm font-bold text-foreground hover:bg-black/70"
                aria-label="Next image"
              >
                Next
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

