import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { Mail } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { HireTalentHero } from "@/components/sections/HireTalentHero";
import { JoinCommunityHero } from "@/components/sections/JoinCommunityHero";
import { Footer } from "@/components/Footer";

const EmailConfirmation = () => {
  const { isLoading, session } = useSessionContext();
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'talent' | 'employer' | null>(null);
  const [isCheckingProfile, setIsCheckingProfile] = useState(true);

  useEffect(() => {
    const checkUserProfile = async () => {
      if (session?.user) {
        try {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('user_type')
            .eq('id', session.user.id)
            .single();

          if (error) {
            console.error('Error fetching profile:', error);
            return;
          }

          setUserType(profile?.user_type || null);
        } catch (error) {
          console.error('Error:', error);
        } finally {
          setIsCheckingProfile(false);
        }
      } else {
        setIsCheckingProfile(false);
      }
    };

    checkUserProfile();
  }, [session]);

  // Show loading state while checking session and profile
  if (isLoading || isCheckingProfile) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  // If user is authenticated, show appropriate page based on user type
  if (session) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        {userType === 'employer' ? <HireTalentHero /> : <JoinCommunityHero />}
        <Footer />
      </div>
    );
  }

  // Show email confirmation message if not authenticated
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="flex items-center justify-center px-4 py-32">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
            <div className="mx-auto w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-secondary" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Check Your Email</h1>
            <p className="text-gray-600">
              We've sent you a confirmation link to complete your registration. 
              Please check your email and click the link to activate your account.
            </p>
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Didn't receive the email? Check your spam folder or contact support.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EmailConfirmation;