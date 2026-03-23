import type { Metadata } from "next";
import React from "react";
import Container from "@/components/site/Container";
import Reveal from "@/components/anim/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/contact/ContactForm";
import NeonButton from "@/components/ui/NeonButton";
import { CONTACT_NUMBER } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact AS-Fitness | Bhagalpur",
  description:
    "Contact AS-Fitness in Bhagalpur. Join for gym training, personal coaching, weight loss programs, and diet guidance. Call or WhatsApp 8409700152.",
  alternates: { canonical: "/contact" },
};

const WA_URL = `https://wa.me/${CONTACT_NUMBER}?text=${encodeURIComponent(
  "Hi AS-Fitness! I want to join. Please share membership details."
)}`;

export default function ContactPage() {
  return (
    <div className="relative">
      <section className="py-14 md:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="CONTACT"
              title="Let’s talk about your goal"
              subtitle="Send your details and we’ll get back to you quickly. Prefer calling or WhatsApp? Use the buttons below."
            />
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr,1.05fr] lg:items-start">
            <Reveal>
              <div className="rounded-3xl border border-white/10 bg-surface/40 p-6 md:p-8">
                <ContactForm />

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <NeonButton
                    href={`tel:${CONTACT_NUMBER}`}
                    variant="secondary"
                    className="w-full sm:w-auto"
                  >
                    Call Now
                  </NeonButton>
                  <NeonButton href={WA_URL} className="w-full sm:w-auto">
                    WhatsApp Us
                  </NeonButton>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-3xl border border-white/10 bg-black/25 p-4 md:p-6">
                <p className="text-sm font-extrabold text-neon-orange/90">
                  Puraini Bhagalpur (812005)
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Find us near Puraini, Bhagalpur, Bihar. Call us if you need help locating the gym.
                </p>

                <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
                  <iframe
                    title="AS-Fitness location map"
                    className="h-[340px] w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=Puraini%20Bhagalpur%20Bihar%20812005&output=embed`}
                  />
                </div>

                <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-surface/40 p-4">
                  <a
                    href={`tel:${CONTACT_NUMBER}`}
                    className="text-sm font-extrabold text-foreground hover:text-neon-orange"
                  >
                    Click to call: {CONTACT_NUMBER}
                  </a>
                  <a
                    href={WA_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-extrabold text-neon-amber hover:text-neon-orange"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </div>
  );
}

