import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useAuthForm } from "@/hooks/useAuthForm";
import { SignUpForm } from "./SignUpForm";
import { toast } from "@/hooks/use-toast";

export const AuthForm = () => {
  const { view, setView } = useAuthForm();

  if (view === "sign_up") {
    return <SignUpForm setView={setView} />;
  }

  const handlePasswordReset = async () => {
    const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
    const email = emailInput?.value?.trim();

    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address first",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login`,
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message || "Failed to send reset instructions",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Password reset instructions have been sent to your email",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send reset instructions",
        variant: "destructive",
      });
    }
  };

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
      <div className="space-y-4 text-center">
        <button
          type="button"
          onClick={handlePasswordReset}
          className="w-full text-sm text-accent hover:underline"
        >
          Forgot Password?
        </button>
        <button
          type="button"
          onClick={() => setView("sign_up")}
          className="w-full text-sm text-accent hover:underline"
        >
          Don't have an account? Sign up
        </button>
      </div>
    </div>
  );
};