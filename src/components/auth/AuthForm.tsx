import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";

export const AuthForm = () => {
  const redirectTo = `${window.location.origin}/login`;

  return (
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
      redirectTo={redirectTo}
      onlyThirdPartyProviders={false}
    />
  );
};