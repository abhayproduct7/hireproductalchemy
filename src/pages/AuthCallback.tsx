import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BASE_URL } from "@/config/constants";

const AuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // First, ensure we're on the correct domain
    if (!window.location.origin.includes('producthire.co.uk')) {
      const currentPath = window.location.pathname;
      const currentSearch = window.location.search;
      window.location.href = `${BASE_URL}${currentPath}${currentSearch}`;
      return;
    }

    const handleAuthCallback = async () => {
      try {
        // Get the error parameters from URL if they exist
        const params = new URLSearchParams(window.location.search);
        const errorCode = params.get('error_code');
        const errorDescription = params.get('error_description');

        if (errorCode === 'otp_expired') {
          console.error('Email confirmation link expired');
          toast({
            title: "Email confirmation link expired",
            description: "Please request a new confirmation email from the login page.",
            variant: "destructive",
          });
          window.location.href = `${BASE_URL}/login?error_code=email_not_confirmed`;
          return;
        }

        if (errorCode) {
          console.error('Auth error:', errorCode, errorDescription);
          toast({
            title: "Authentication error",
            description: errorDescription || "Please try signing in again.",
            variant: "destructive",
          });
          window.location.href = `${BASE_URL}/login`;
          return;
        }

        // Get the session to check if user is authenticated
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          throw sessionError;
        }

        if (session) {
          // Get user profile to check user type
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('user_type')
            .eq('id', session.user.id)
            .single();

          if (profileError) {
            console.error('Profile error:', profileError);
            throw profileError;
          }

          // Redirect based on user type
          const redirectPath = profile?.user_type === 'employer' ? '/hire' : '/join-community#application';
          window.location.href = `${BASE_URL}${redirectPath}`;

          toast({
            title: "Successfully authenticated",
            description: "Welcome to ProductHire!",
          });
        } else {
          // If no session, redirect to login
          window.location.href = `${BASE_URL}/login`;
        }
      } catch (error) {
        console.error('Error in auth callback:', error);
        toast({
          title: "Authentication error",
          description: "Please try signing in again.",
          variant: "destructive",
        });
        window.location.href = `${BASE_URL}/login`;
      }
    };

    handleAuthCallback();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
    </div>
  );
};

export default AuthCallback;