import { HireTalentHero } from "@/components/sections/HireTalentHero";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";

const HireTalent = () => {
  return (
    <div className="min-h-screen">
      <HireTalentHero />
      <HowItWorksSection />
    </div>
  );
};

export default HireTalent;