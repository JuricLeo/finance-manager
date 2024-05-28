"use client";

import AboutSection from "@/components/landing/about-section";
import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import HeroTitle from "@/components/landing/hero-title";
import Pricing from "@/components/landing/pricing";

export default function Home() {
  return (
    <main className="px-3 md:px-12 bg-[hsl(0.7,0.55,0.06)] text-white">
      <Header />
      <HeroTitle />
      <AboutSection />
      <Pricing />
      <Footer />
    </main>
  );
}
