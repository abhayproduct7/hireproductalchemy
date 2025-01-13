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
import { Loader2 } from "lucide-react";

const JoinCommunity = () => {
  const session = useSession();
  const navigate = useNavigate();
  const [hasApplication, setHasApplication] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    const checkUserAndApplication = async () => {
      if (session?.user) {
        try {
          // First check if user profile exists and get user type
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("user_type")
            .eq("id", session.user.id)
            .single();

          if (profileError) {
            console.error("Error fetching profile:", profileError);
            setIsLoading(false);
            return;
          }

          setUserProfile(profile);

          // If user is employer, redirect to hire page
          if (profile?.user_type === 'employer') {
            navigate('/hire');
            return;
          }

          // Check for existing application
          const { data, error } = await supabase
            .from("candidate_applications")
            .select("id")
            .eq("user_id", session.user.id)
            .maybeSingle();

          if (error) {
            console.error("Error checking application:", error);
          }

          setHasApplication(!!data);
          setIsLoading(false);
        } catch (error) {
          console.error("Error checking user state:", error);
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    checkUserAndApplication();
  }, [session, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center min-h-[60vh]">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // If user is not authenticated and tries to access the form directly,
  // redirect them to login
  useEffect(() => {
    if (!session && window.location.hash === "#application") {
      navigate("/login");
    }
  }, [session, navigate]);

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