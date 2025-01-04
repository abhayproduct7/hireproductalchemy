import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { Navigation } from "@/components/Navigation";
import Logo from "@/components/Logo";
import { AuthForm } from "@/components/auth/AuthForm";
import { useAuthState } from "@/hooks/useAuthState";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const session = useSession();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Initialize auth state management
  useAuthState();

  // Handle successful login
  useEffect(() => {
    if (session) {
      const handlePendingRequirements = async () => {
        const pendingRequirements = localStorage.getItem('pendingRequirements');
        
        if (pendingRequirements) {
          try {
            const requirements = JSON.parse(pendingRequirements);
            
            const { error } = await supabase
              .from("requirements")
              .insert([{ 
                answers: requirements,
                user_id: session.user.id
              }]);

            if (error) throw error;

            toast({
              title: "Requirements submitted successfully!",
              description: "We'll be in touch with matched candidates soon.",
            });

            // Clear pending requirements
            localStorage.removeItem('pendingRequirements');
            
            // Navigate to hire page
            navigate("/hire");
          } catch (error) {
            console.error("Error submitting requirements:", error);
            toast({
              title: "Something went wrong",
              description: "Please try again later.",
              variant: "destructive",
            });
            navigate("/requirements");
          }
        } else {
          // If no pending requirements, check for return URL
          const params = new URLSearchParams(location.search);
          const returnTo = params.get('returnTo');
          navigate(returnTo || "/");
        }
      };

      handlePendingRequirements();
    }
  }, [session, navigate, location.search, toast]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container max-w-md mx-auto px-4 pt-32">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Logo />
          </div>
          <h1 className="text-2xl font-bold text-primary mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">
            Sign in to access your account and manage your product hiring needs
          </p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <AuthForm />
        </div>
      </div>
    </div>
  );
};

export default Login;