import React from "react";

const BUSINESS_NAME = "AS-Fitness";
const CONTACT_NUMBER = "8409700152";
const ADDRESS_LINE = "Puraini Bhagalpur Bihar 812005";

export default function LocalBusinessJsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GymOrFitnessCenter",
    name: BUSINESS_NAME,
    telephone: CONTACT_NUMBER,
    url: `${siteUrl}/`,
    areaServed: ["Bhagalpur", "Bihar"],
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS_LINE,
      addressLocality: "Bhagalpur",
      addressRegion: "Bihar",
      postalCode: "812005",
      addressCountry: "IN",
    },
    makesOffer: {
      "@type": "Offer",
      name: "Gym Training & Personal Training",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

