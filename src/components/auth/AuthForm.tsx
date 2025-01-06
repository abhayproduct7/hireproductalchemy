import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useAuthForm } from "@/hooks/useAuthForm";
import { SignUpForm } from "./SignUpForm";

export const AuthForm = () => {
  const { view, setView } = useAuthForm();

  if (view === "sign_up") {
    return <SignUpForm setView={setView} />;
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
              '[href="#auth-sign-up"]': {
                display: 'none',
              },
            },
            message: {
              color: '#1B5E40',
            }
          }
        }}
        theme="light"
        providers={[]}
        view="sign_in"
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
      <button
        type="button"
        onClick={() => setView("sign_up")}
        className="w-full text-center text-sm text-accent hover:underline mt-4"
      >
        Don't have an account? Sign up
      </button>
    </div>
  );
};