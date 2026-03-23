import type { Metadata } from "next";
import React from "react";
import GalleryClient from "@/components/gallery/GalleryClient";

export const metadata: Metadata = {
  title: "Gallery | AS-Fitness Bhagalpur",
  description:
    "Explore AS-Fitness gym gallery in Bhagalpur. Tap photos to preview transformation energy and training moments.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return <GalleryClient />;
}

