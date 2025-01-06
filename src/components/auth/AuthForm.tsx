import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { UserTypeSelector } from "./UserTypeSelector";
import { useAuthForm } from "@/hooks/useAuthForm";

export const AuthForm = () => {
  const { view, setView, userType, setUserType, returnTo } = useAuthForm();

  return (
    <div className="space-y-6">
      {view === "sign_up" && (
        <UserTypeSelector
          userType={userType}
          onUserTypeChange={setUserType}
        />
      )}
      
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme="light"
        providers={[]}
        view={view}
        redirectTo={`${window.location.origin}/login`}
        viewChange={(newView) => {
          setView(newView as "sign_in" | "sign_up");
          if (newView === "sign_in") {
            setUserType(null);
          }
        }}
        localization={{
          variables: {
            sign_up: {
              email_label: "Email",
              password_label: "Password",
              button_label: "Sign Up",
            },
            sign_in: {
              email_label: "Email",
              password_label: "Password",
              button_label: "Sign In",
            },
          },
        }}
      />
    </div>
  );
};