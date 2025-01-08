import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useAuthForm } from "@/hooks/useAuthForm";
import { SignUpForm } from "./SignUpForm";
import { AuthLinks } from "./AuthLinks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const AuthForm = () => {
  const { view, setView, userType, setUserType } = useAuthForm();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session);
      
      if (event === 'SIGNED_IN' && session) {
        try {
          // Check if user is admin
          const { data: adminData, error: adminError } = await supabase
            .from('admin_users')
            .select('user_id')
            .eq('user_id', session.user.id)
            .maybeSingle();

          if (adminError) {
            throw adminError;
          }

          if (adminData) {
            console.log("Admin user detected, redirecting to admin dashboard");
            navigate('/admin/dashboard');
          } else {
            console.log("Regular user detected, redirecting to dashboard");
            navigate('/dashboard');
          }
        } catch (error) {
          console.error("Error checking admin status:", error);
          toast({
            title: "Error",
            description: "An error occurred while signing in. Please try again.",
            variant: "destructive",
          });
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  if (view === "sign_up") {
    return <SignUpForm setView={setView} userType={userType} setUserType={setUserType} />;
  }

  return (
    <div className="space-y-6">
      <Auth
        supabaseClient={supabase}
        appearance={{ 
          theme: ThemeSupa,
          style: {
            input: {
              borderRadius: '4px',
              border: '1px solid #e2e8f0',
              padding: '8px 12px',
            },
            button: {
              border: 'none',
              backgroundColor: '#1B5E40',
              color: 'white',
            },
            anchor: {
              color: '#1B5E40',
              cursor: 'pointer',
            },
            message: {
              color: '#1B5E40',
            }
          }
        }}
        theme="light"
        providers={[]}
        view="sign_in"
        showLinks={false}
        redirectTo={`${window.location.origin}/login`}
        localization={{
          variables: {
            sign_in: {
              email_label: "Email",
              password_label: "Password",
              button_label: "Sign In",
            },
          },
        }}
      />
      <AuthLinks setView={setView} />
    </div>
  );
};