import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export const AuthForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [view, setView] = useState<"sign_in" | "sign_up">("sign_in");
  const [userType, setUserType] = useState<"talent" | "employer" | null>(null);
  
  // Get the return URL from the query parameters or localStorage
  const searchParams = new URLSearchParams(location.search);
  const returnTo = searchParams.get("returnTo") || localStorage.getItem("returnTo") || "/";

  useEffect(() => {
    // Store the return URL in localStorage
    if (returnTo && returnTo !== "/") {
      localStorage.setItem("returnTo", returnTo);
    }

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session);
      
      if (event === "SIGNED_IN" && session) {
        // If signing up, update the user's profile with the selected user type
        if (view === "sign_up" && userType) {
          const { error } = await supabase
            .from('profiles')
            .update({ user_type: userType })
            .eq('id', session.user.id);

          if (error) {
            toast({
              title: "Error",
              description: "Failed to set user type. Please try again.",
              variant: "destructive",
            });
            return;
          }
        }

        // Clear the stored return URL
        localStorage.removeItem("returnTo");
        // Navigate to the return URL
        navigate(returnTo);
        toast({
          title: "Welcome!",
          description: "You have successfully signed in.",
        });
      }

      if (event === "USER_UPDATED") {
        toast({
          title: "Profile Updated",
          description: "Your profile has been successfully updated.",
        });
      }

      if (event === "SIGNED_OUT") {
        toast({
          title: "Signed Out",
          description: "You have been successfully signed out.",
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, returnTo, view, userType]);

  return (
    <div className="space-y-6">
      {view === "sign_up" && (
        <div className="space-y-4">
          <Label className="text-base">I want to join as:</Label>
          <RadioGroup
            value={userType || ""}
            onValueChange={(value) => setUserType(value as "talent" | "employer")}
            className="grid grid-cols-2 gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="talent" id="talent" />
              <Label htmlFor="talent">Talent</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="employer" id="employer" />
              <Label htmlFor="employer">Employer</Label>
            </div>
          </RadioGroup>
        </div>
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
          // Reset user type when switching views
          if (newView === "sign_in") {
            setUserType(null);
          }
        }}
        localization={{
          variables: {
            sign_up: {
              email_label: "Email",
              password_label: "Password",
              button_label: userType ? "Sign Up" : "Please select a role above",
            },
            sign_in: {
              email_label: "Email",
              password_label: "Password",
            },
          },
        }}
      />
    </div>
  );
};