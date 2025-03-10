import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useAuthForm } from "@/hooks/useAuthForm";
import { SignUpForm } from "./SignUpForm";
import { AuthLinks } from "./AuthLinks";
import { useState, useEffect } from "react";
import { BASE_URL } from "@/config/constants";
import { EmailConfirmationAlert } from "./EmailConfirmationAlert";
import { ErrorAlert } from "./ErrorAlert";
import { AuthError } from "@supabase/supabase-js";

export const AuthForm = () => {
  const { view, setView, userType, setUserType } = useAuthForm();
  const [error, setError] = useState<string | null>(null);
  const [unconfirmedEmail, setUnconfirmedEmail] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthError = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const errorCode = urlParams.get('error_code');
      const errorMessage = urlParams.get('error_description');
      const email = urlParams.get('email');

      if (errorCode === 'email_not_confirmed' && email) {
        setUnconfirmedEmail(decodeURIComponent(email));
      } else if (errorMessage) {
        setError(decodeURIComponent(errorMessage));
      }
    };

    handleAuthError();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        setError(null);
        setUnconfirmedEmail(null);
      }

      // Handle auth errors through the event listener
      if (event === 'USER_UPDATED' && !session) {
        const { data, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          if (sessionError.message.includes('Email not confirmed')) {
            const email = sessionError.message.match(/Email (.*?) is/)?.[1];
            if (email) {
              setUnconfirmedEmail(email);
            }
          } else {
            setError(sessionError.message);
          }
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleErrorClose = () => {
    setError(null);
    setUnconfirmedEmail(null);
  };

  if (view === "sign_up") {
    return <SignUpForm setView={setView} userType={userType} setUserType={setUserType} />;
  }

  return (
    <div className="space-y-6">
      {unconfirmedEmail && (
        <EmailConfirmationAlert 
          email={unconfirmedEmail} 
          onClose={handleErrorClose} 
        />
      )}
      {error && !unconfirmedEmail && (
        <ErrorAlert message={error} onClose={handleErrorClose} />
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