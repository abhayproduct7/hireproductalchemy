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
  
  const searchParams = new URLSearchParams(location.search);
  const returnTo = searchParams.get("returnTo") || localStorage.getItem("returnTo") || "/";

  useEffect(() => {
    if (returnTo && returnTo !== "/") {
      localStorage.setItem("returnTo", returnTo);
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
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

        localStorage.removeItem("returnTo");
        navigate(returnTo);
        toast({
          title: "Welcome!",
          description: "You have successfully signed in.",
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, returnTo, view, userType]);

  return (
    <div className="space-y-6">
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme="light"
        providers={[]}
        view={view}
        redirectTo={`${window.location.origin}/login`}
        onViewChange={(newView) => {
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
      
      {view === "sign_up" && (
        <div className="space-y-4 pt-4 border-t">
          <Label className="text-base">Join as:</Label>
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
    </div>
  );
};