"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Container from "@/components/site/Container";
import Reveal from "@/components/anim/Reveal";
import Lightbox, { type LightboxImage } from "@/components/gallery/Lightbox";
import { GALLERY } from "@/lib/data";

export default function GalleryClient() {
  const images: LightboxImage[] = useMemo(
    () =>
      GALLERY.map((g) => ({
        src: g.src,
        alt: g.alt,
      })),
    [],
  );

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <>
      <section className="py-14 md:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr,auto] lg:items-start">
            <div>
              <Reveal>
                <p className="text-xs font-bold tracking-[0.22em] text-neon-orange/90">
                  GALLERY
                </p>
                <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">
                  Gym moments. Transformation energy.
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                  Tap any photo to preview. Our coaching environment is designed to keep
                  you motivated and consistent.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.05}>
              <div className="rounded-3xl border border-white/10 bg-surface/40 p-6">
                <p className="text-sm font-extrabold">Training Highlights</p>
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  <li>• Strength & conditioning sessions</li>
                  <li>• Personal coaching feedback</li>
                  <li>• Community motivation</li>
                </ul>
              </div>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {images.map((img, idx) => (
              <Reveal key={img.src} delay={idx * 0.04}>
                <button
                  type="button"
                  onClick={() => {
                    setIndex(idx);
                    setOpen(true);
                  }}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black/25 text-left"
                  aria-label={`Open image ${idx + 1}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={800}
                    height={500}
                    className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="text-xs font-bold tracking-[0.16em] text-neon-orange/90">
                      VIEW
                    </p>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-black/45">
                      <span className="text-sm font-black text-neon-amber">→</span>
                    </span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Lightbox
        open={open}
        images={images}
        index={index}
        onClose={() => setOpen(false)}
        onChangeIndex={(nextIndex) => setIndex(nextIndex)}
      />
    </>
  );
}

