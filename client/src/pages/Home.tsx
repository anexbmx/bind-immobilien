/* =============================================================
   BIND Immobilien GmbH – Home Page
   Design: "Clean Authority" – Off-white + Charcoal + Gold
   ============================================================= */

import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import InvestmentFocusSection from "@/components/InvestmentFocusSection";
import StatsSection from "@/components/StatsSection";
import SubmitOfferSection from "@/components/SubmitOfferSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
    <div style={{ backgroundColor: '#F8F7F4', color: '#111111', minHeight: '100vh' }}>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <InvestmentFocusSection />
      <StatsSection />
      <SubmitOfferSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}
