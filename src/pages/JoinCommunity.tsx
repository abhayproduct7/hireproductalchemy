import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { JoinCommunityHero } from "@/components/sections/JoinCommunityHero";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { OpportunitiesSection } from "@/components/sections/OpportunitiesSection";

const JoinCommunity = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <JoinCommunityHero />
      <BenefitsSection />
      <OpportunitiesSection />
      <Footer />
    </div>
  );
};

export default JoinCommunity;