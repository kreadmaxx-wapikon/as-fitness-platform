import type { Metadata } from "next";
import React from "react";
import Container from "@/components/site/Container";
import Reveal from "@/components/anim/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import PricingTable from "@/components/membership/PricingTable";

export const metadata: Metadata = {
  title: "Membership Plans | AS-Fitness Bhagalpur",
  description:
    "Join AS-Fitness in Bhagalpur. Choose Basic, Standard, or Premium membership with monthly or quarterly options. Call 8409700152.",
  alternates: { canonical: "/membership" },
};

export default function MembershipPage() {
  return (
    <div className="relative">
      <section className="py-14 md:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="MEMBERSHIP"
              title="Pick a plan. Start this week."
              subtitle="Transparent pricing with premium coaching. Train with structure and accountability—no guesswork."
            />
          </Reveal>

          <PricingTable />
        </Container>
      </section>
    </div>
  );
}

