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

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <AIAgentSection />
      <CompaniesSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <RequirementsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;