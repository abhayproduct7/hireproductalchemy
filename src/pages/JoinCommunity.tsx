import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { JoinCommunityHero } from "@/components/sections/JoinCommunityHero";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { OpportunitiesSection } from "@/components/sections/OpportunitiesSection";
import { CommunityAdvantagesSection } from "@/components/sections/CommunityAdvantagesSection";

const JoinCommunity = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <JoinCommunityHero />
      <CommunityAdvantagesSection />
      <BenefitsSection />
      <OpportunitiesSection />
      <Footer />
    </div>
  );
};

export default JoinCommunity;