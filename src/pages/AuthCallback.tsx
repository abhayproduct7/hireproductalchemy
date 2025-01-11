import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useToast } from "@/components/ui/use-toast";

const AuthCallback = () => {
  const { isLoading, session } = useSessionContext();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading) {
      if (session) {
        toast({
          title: "Email confirmed",
          description: "Your email has been confirmed. Welcome!",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Error",
          description: "There was a problem confirming your email. Please try again.",
          variant: "destructive",
        });
        navigate("/login");
      }
    }
  }, [isLoading, session, navigate, toast]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-pulse">Verifying...</div>
    </div>
  );
};

export default AuthCallback;