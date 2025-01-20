import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { CompaniesSection } from "@/components/sections/CompaniesSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { RequirementsSection } from "@/components/sections/RequirementsSection";
import { AIAgentSection } from "@/components/sections/AIAgentSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/Footer";
import { ProcessComparisonGraph } from "@/components/graphs/ProcessComparisonGraph";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "ProductHire | AI-Enhanced Product Management Talent Platform";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <CompaniesSection />
      <AIAgentSection />
      <PricingSection />
      <FeaturesSection />
      <div className="py-24 bg-muted/30">
        <div className="container max-w-6xl mx-auto px-4">
          <ProcessComparisonGraph />
        </div>
      </div>
      <TestimonialsSection />
      <RequirementsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;