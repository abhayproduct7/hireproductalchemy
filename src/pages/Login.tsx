import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { Navigation } from "@/components/Navigation";
import Logo from "@/components/Logo";

const Login = () => {
  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, [session, navigate]);

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
                  background: "rgb(var(--secondary))",
                  color: "white",
                  borderRadius: "0.5rem",
                },
                anchor: {
                  color: "rgb(var(--secondary))",
                },
              },
              variables: {
                default: {
                  colors: {
                    brand: "rgb(var(--secondary))",
                    brandAccent: "rgb(var(--accent))",
                  },
                },
              },
            }}
            providers={[]}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;