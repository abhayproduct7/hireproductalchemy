import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { JoinCommunityHero } from "@/components/sections/JoinCommunityHero";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { CommunityAdvantagesSection } from "@/components/sections/CommunityAdvantagesSection";
import { JoinApplicationForm } from "@/components/sections/JoinApplicationForm";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const JoinCommunity = () => {
  const session = useSession();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [hasApplication, setHasApplication] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);
  const showApplicationForm = location.hash === '#application';

  useEffect(() => {
    document.title = "Join Our Product Management Community | ProductHire";
  }, []);

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

          console.log("Profile found:", profile);
          setUserProfile(profile);

          // If user is employer, redirect to hire page
          if (profile?.user_type === 'employer') {
            toast({
              title: "Access Denied",
              description: "Employer accounts cannot access the talent application form.",
              variant: "destructive"
            });
            navigate('/hire');
            return;
          }

          // Check for existing application - using select count instead of maybeSingle
          const { count, error } = await supabase
            .from("candidate_applications")
            .select('*', { count: 'exact', head: true })
            .eq("user_id", session.user.id);

          if (error) {
            console.error("Error checking application:", error);
            toast({
              title: "Error",
              description: "Failed to check application status. Please try again.",
              variant: "destructive"
            });
          }

          setHasApplication(count ? count > 0 : false);
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
  }, [session, navigate, toast]);

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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        {(!session || hasApplication || !showApplicationForm) ? (
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
