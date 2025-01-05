import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { JoinCommunityHero } from "@/components/sections/JoinCommunityHero";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { CommunityAdvantagesSection } from "@/components/sections/CommunityAdvantagesSection";
import { JoinApplicationForm } from "@/components/sections/JoinApplicationForm";

const JoinCommunity = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <JoinCommunityHero />
      <CommunityAdvantagesSection />
      <BenefitsSection />
      <JoinApplicationForm />
      <Footer />
    </div>
  );
};

export default JoinCommunity;