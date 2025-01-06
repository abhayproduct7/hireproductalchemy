import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { UserTypeSelector } from "./UserTypeSelector";
import { useAuthForm } from "@/hooks/useAuthForm";
import { useEffect, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

export const AuthForm = () => {
  const { view, setView, userType, setUserType, returnTo } = useAuthForm();
  const [password, setPassword] = useState("");
  const [showRequirements, setShowRequirements] = useState(false);

  // Password requirements
  const requirements = [
    { met: password.length >= 6, text: "At least 6 characters long" },
  ];

  // Use useEffect to monitor Auth component's view changes
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        console.log("User signed in:", session);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="space-y-6">
      {view === "sign_up" && (
        <>
          <UserTypeSelector
            userType={userType}
            onUserTypeChange={setUserType}
          />
          {showRequirements && (
            <Alert variant="info">
              <Info className="h-4 w-4" />
              <AlertDescription>
                <div className="text-sm mt-1">
                  Password requirements:
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    {requirements.map((req, index) => (
                      <li
                        key={index}
                        className={req.met ? "text-green-600" : "text-blue-600"}
                      >
                        {req.text} {req.met && "✓"}
                      </li>
                    ))}
                  </ul>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </>
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
            }
          }
        }}
        theme="light"
        providers={[]}
        view={view}
        redirectTo={`${window.location.origin}/login`}
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
        onPasswordInput={(e) => {
          setPassword(e.target.value);
          setShowRequirements(true);
        }}
      />
    </div>
  );
};