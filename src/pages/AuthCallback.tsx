import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AuthCallback = () => {
  const { isLoading, session } = useSessionContext();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleCallback = async () => {
      if (!isLoading && session?.user) {
        try {
          // Get the user's profile type
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('user_type')
            .eq('id', session.user.id)
            .single();

          if (profileError) throw profileError;

          toast({
            title: "Email confirmed",
            description: "Your email has been confirmed. Welcome!",
          });

          // Redirect based on user type
          if (profile.user_type === 'talent') {
            navigate("/join-community#application");
          } else {
            navigate("/dashboard");
          }
        } catch (error) {
          console.error("Error in callback:", error);
          toast({
            title: "Error",
            description: "There was a problem setting up your account. Please try again.",
            variant: "destructive",
          });
          navigate("/login");
        }
      } else if (!isLoading && !session) {
        toast({
          title: "Error",
          description: "There was a problem confirming your email. Please try again.",
          variant: "destructive",
        });
        navigate("/login");
      }
    };

    handleCallback();
  }, [isLoading, session, navigate, toast]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-pulse">Verifying...</div>
    </div>
  );
};

export default AuthCallback;