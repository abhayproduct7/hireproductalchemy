import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export const useAuthForm = () => {
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

  return {
    view,
    setView,
    userType,
    setUserType,
    returnTo,
  };
};