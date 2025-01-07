import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { JoinCommunityHero } from "@/components/sections/JoinCommunityHero";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { CommunityAdvantagesSection } from "@/components/sections/CommunityAdvantagesSection";
import { JoinApplicationForm } from "@/components/sections/JoinApplicationForm";

const JoinCommunity = () => {
  const session = useSession();
  const navigate = useNavigate();
  const [hasApplication, setHasApplication] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkExistingApplication = async () => {
      if (session?.user) {
        try {
          const { data, error } = await supabase
            .from("candidate_applications")
            .select("id")
            .eq("user_id", session.user.id)
            .maybeSingle();

          if (error) {
            console.error("Error checking application:", error);
          }

          setHasApplication(!!data);
        } catch (error) {
          console.error("Error checking application:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    checkExistingApplication();
  }, [session]);

  useEffect(() => {
    // If user is not authenticated and tries to access the form directly,
    // redirect them to login
    if (!session && window.location.hash === "#application") {
      navigate("/login");
    }
  }, [session, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        {!session || hasApplication ? (
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