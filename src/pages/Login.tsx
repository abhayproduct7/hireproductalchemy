import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { Navigation } from "@/components/Navigation";
import Logo from "@/components/Logo";
import { toast } from "@/components/ui/use-toast";

const Login = () => {
  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, [session, navigate]);

  // Add error handling for auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth event:', event);
      console.log('Session:', session);
      
      if (event === 'SIGNED_IN') {
        navigate("/");
        toast({
          title: "Successfully signed in",
          description: "Welcome back!",
        });
      }
      
      if (event === 'SIGNED_OUT') {
        toast({
          title: "Signed out",
          description: "You have been signed out successfully.",
        });
      }

      if (event === 'USER_DELETED') {
        toast({
          variant: "destructive",
          title: "Account deleted",
          description: "Your account has been deleted.",
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

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
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              style: {
                button: {
                  background: "#0F4C35",
                  color: "white",
                  borderRadius: "0.5rem",
                  fontWeight: "500",
                  padding: "0.75rem 1rem",
                },
                anchor: {
                  color: "#0F4C35",
                },
                container: {
                  gap: "1rem",
                },
                divider: {
                  background: "#E6EFE9",
                },
                message: {
                  color: "#1A1A1A",
                },
              },
              variables: {
                default: {
                  colors: {
                    brand: "#0F4C35",
                    brandAccent: "#1B5E40",
                    inputBackground: "white",
                    inputBorder: "#E6EFE9",
                    inputText: "#1A1A1A",
                    messageText: "#1A1A1A",
                  },
                },
              },
            }}
            providers={["google"]}
            view="sign_in"
            onError={(error) => {
              console.error('Auth error:', error);
              toast({
                variant: "destructive",
                title: "Authentication Error",
                description: error.message,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;