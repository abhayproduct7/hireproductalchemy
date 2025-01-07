import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { JoinCommunityHero } from "@/components/sections/JoinCommunityHero";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { CommunityAdvantagesSection } from "@/components/sections/CommunityAdvantagesSection";
import { JoinApplicationForm } from "@/components/sections/JoinApplicationForm";

const JoinCommunity = () => {
  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is not authenticated and tries to access the form directly,
    // redirect them to login
    if (!session && window.location.hash === "#application") {
      navigate("/login");
    }
  }, [session, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        {!session ? (
          <>
            <JoinCommunityHero />
            <CommunityAdvantagesSection />
            <BenefitsSection />
          </>
        ) : (
          <div className="container mx-auto px-4 py-16">
            <JoinApplicationForm />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default JoinCommunity;