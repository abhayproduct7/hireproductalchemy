import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";

export const AuthForm = () => {
  return (
    <>
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
        redirectTo={`${window.location.origin}/login`}
        view="sign_in"
        showLinks={true}
        localization={{
          variables: {
            sign_up: {
              email_label: "Email",
              password_label: "Password",
              email_input_placeholder: "Your email address",
              password_input_placeholder: "Your password",
              button_label: "Sign up",
              loading_button_label: "Signing up...",
              social_provider_text: "Sign in with {{provider}}",
              link_text: "Don't have an account? Sign up",
              confirmation_text: "Check your email for the confirmation link",
            },
          },
        }}
      />
      <div className="mt-4 text-sm text-center text-muted-foreground">
        <p>Note: You will need to verify your email address before signing in.</p>
      </div>
    </>
  );
};