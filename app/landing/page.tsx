"use client";

import AboutSection from "@/components/landing/about-section";
import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import HeroTitle from "@/components/landing/hero-title";
import Pricing from "@/components/landing/pricing";

export default function Home() {
  return (
    <main className="px-3 md:px-12">
      <Header />
      <HeroTitle />
      <AboutSection />
      <Pricing />
      <Footer />
    </main>
  );
}
