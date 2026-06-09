/* =============================================================
   BIND Immobilien GmbH – Home Page
   Design: "Clean Authority" – Off-white + Charcoal + Gold
   ============================================================= */

import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import { lazy, Suspense, useEffect, useState } from "react";

const AboutSection = lazy(() => import("@/components/AboutSection"));
const InvestmentFocusSection = lazy(() => import("@/components/InvestmentFocusSection"));
const SubmitOfferSection = lazy(() => import("@/components/SubmitOfferSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const StatsSection = lazy(() => import("@/components/StatsSection"));
const FooterSection = lazy(() => import("@/components/FooterSection"));

export default function Home() {
  const [showDeferredSections, setShowDeferredSections] = useState(false);

  useEffect(() => {
    setShowDeferredSections(true);
  }, []);

  return (
    <div style={{ backgroundColor: '#F8F7F4', color: '#111111', minHeight: '100vh' }}>
      <Navigation />
      <main id="main-content">
        <HeroSection />
        {showDeferredSections && (
          <Suspense fallback={null}>
            <AboutSection />
            <InvestmentFocusSection />
            <SubmitOfferSection />
            <ContactSection />
            <StatsSection />
          </Suspense>
        )}
      </main>
      {showDeferredSections && (
        <Suspense fallback={null}>
          <FooterSection />
        </Suspense>
      )}
    </div>
  );
}
