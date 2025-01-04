import { HireTalentHero } from "@/components/sections/HireTalentHero";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { TrustedBrandsSection } from "@/components/sections/TrustedBrandsSection";

const HireTalent = () => {
  return (
    <div className="min-h-screen">
      <HireTalentHero />
      <TrustedBrandsSection />
      <HowItWorksSection />
    </div>
  );
};

export default HireTalent;