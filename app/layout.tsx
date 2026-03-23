import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/site/Footer";
import FloatingContact from "@/components/site/FloatingContact";
import Navbar from "@/components/site/Navbar";
import LocalBusinessJsonLd from "@/components/seo/LocalBusinessJsonLd";

export const metadata: Metadata = {
  title: {
    default: "AS-Fitness",
    template: "%s | AS-Fitness",
  },
  description:
    "AS-Fitness premium gym, personal training, and weight loss programs in Puraini, Bhagalpur (Bihar). Join today to transform your body and lifestyle.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    title: "AS-Fitness | Premium Fitness Center in Bhagalpur",
    description:
      "Transform Your Body, Transform Your Life. Gym training, personal training, weight loss & diet guidance in Bhagalpur.",
    images: [
      {
        url: "/hero/og.svg",
        width: 1200,
        height: 630,
        alt: "AS-Fitness",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <LocalBusinessJsonLd />
        <Navbar />
        <main id="main" className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
