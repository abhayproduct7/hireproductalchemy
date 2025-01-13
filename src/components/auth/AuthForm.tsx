import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useAuthForm } from "@/hooks/useAuthForm";
import { SignUpForm } from "./SignUpForm";
import { AuthLinks } from "./AuthLinks";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { BASE_URL } from "@/config/constants";
import { toast } from "@/hooks/use-toast";
import { AuthError } from "@supabase/supabase-js";

export const AuthForm = () => {
  const { view, setView, userType, setUserType } = useAuthForm();
  const [error, setError] = useState<string | null>(null);
  const [unconfirmedEmail, setUnconfirmedEmail] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);

  const handleResendConfirmation = async () => {
    if (!unconfirmedEmail) return;
    
    setIsResending(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: unconfirmedEmail,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Confirmation email has been resent. Please check your inbox.",
      });
    } catch (error) {
      console.error('Error resending confirmation:', error);
      toast({
        title: "Error",
        description: "Failed to resend confirmation email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        // Check if there's an error in the URL
        const urlParams = new URLSearchParams(window.location.search);
        const errorCode = urlParams.get('error_code');
        const email = urlParams.get('email');

        if (errorCode === 'email_not_confirmed' && email) {
          setError('Please verify your email address before signing in.');
          setUnconfirmedEmail(email);
        }
      }
    });

    // Initial check for error in URL
    const urlParams = new URLSearchParams(window.location.search);
    const errorCode = urlParams.get('error_code');
    const email = urlParams.get('email');

    if (errorCode === 'email_not_confirmed' && email) {
      setError('Please verify your email address before signing in.');
      setUnconfirmedEmail(email);
    }

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (view === "sign_up") {
    return <SignUpForm setView={setView} userType={userType} setUserType={setUserType} />;
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>
            {error}
            {unconfirmedEmail && (
              <div className="mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResendConfirmation}
                  disabled={isResending}
                >
                  {isResending ? "Sending..." : "Resend confirmation email"}
                </Button>
              </div>
            )}
          </AlertDescription>
        </Alert>
      )}
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
        redirectTo={`${BASE_URL}/auth/callback`}
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