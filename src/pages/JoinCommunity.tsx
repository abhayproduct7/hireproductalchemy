import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { JoinCommunityHero } from "@/components/sections/JoinCommunityHero";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { CommunityAdvantagesSection } from "@/components/sections/CommunityAdvantagesSection";
import { JoinApplicationForm } from "@/components/sections/JoinApplicationForm";
import { useSession } from "@supabase/auth-helpers-react";

const JoinCommunity = () => {
  const session = useSession();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {!session ? (
        <>
          <JoinCommunityHero />
          <CommunityAdvantagesSection />
          <BenefitsSection />
        </>
      ) : (
        <JoinApplicationForm />
      )}
      <Footer />
    </div>
  );
};

export default JoinCommunity;