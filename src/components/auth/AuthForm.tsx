import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useAuthForm } from "@/hooks/useAuthForm";
import { SignUpForm } from "./SignUpForm";
import { AuthLinks } from "./AuthLinks";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";
import { AuthError } from "@supabase/supabase-js";

export const AuthForm = () => {
  const { view, setView, userType, setUserType } = useAuthForm();
  const [error, setError] = useState<string | null>(null);

  // Set up auth state change listener to catch errors
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'USER_UPDATED' && !session) {
      const urlParams = new URLSearchParams(window.location.search);
      const errorCode = urlParams.get('error_code');
      const errorMessage = urlParams.get('error_description');
      
      if (errorCode === 'email_not_confirmed') {
        setError('Please check your email and click the confirmation link to verify your account.');
      } else if (errorMessage) {
        setError(errorMessage);
      }
    }
  });

  if (view === "sign_up") {
    return <SignUpForm setView={setView} userType={userType} setUserType={setUserType} />;
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
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
        redirectTo={`${window.location.origin}/auth/callback`}
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