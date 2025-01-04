import { HireTalentHero } from "@/components/sections/HireTalentHero";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { TrustedBrandsSection } from "@/components/sections/TrustedBrandsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { Footer } from "@/components/Footer";
import { AIAgentSection } from "@/components/sections/AIAgentSection";

const HireTalent = () => {
  return (
    <div className="min-h-screen">
      <HireTalentHero />
      <AIAgentSection />
      <TrustedBrandsSection />
      <HowItWorksSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default HireTalent;