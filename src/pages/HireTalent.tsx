import { HireTalentHero } from "@/components/sections/HireTalentHero";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { TrustedBrandsSection } from "@/components/sections/TrustedBrandsSection";
import { Footer } from "@/components/Footer";

const HireTalent = () => {
  return (
    <div className="min-h-screen">
      <HireTalentHero />
      <TrustedBrandsSection />
      <HowItWorksSection />
      <Footer />
    </div>
  );
};

export default HireTalent;