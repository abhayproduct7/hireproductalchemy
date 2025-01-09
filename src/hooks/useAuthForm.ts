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
  const returnTo = searchParams.get("returnTo") || localStorage.getItem("returnTo") || "/dashboard";

  useEffect(() => {
    if (returnTo && returnTo !== "/") {
      localStorage.setItem("returnTo", returnTo);
    }

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session);
      
      if (event === "SIGNED_IN" && session) {
        // Handle user type setting for new sign ups
        if (userType) {
          try {
            const { error } = await supabase
              .from('profiles')
              .update({ user_type: userType })
              .eq('id', session.user.id);

            if (error) {
              console.error('Error setting user type:', error);
              toast({
                title: "Error",
                description: "Failed to set user type. Please try again.",
                variant: "destructive",
              });
              return;
            }
          } catch (error) {
            console.error('Error in profile update:', error);
          }
        }

        // Handle navigation after successful sign in
        localStorage.removeItem("returnTo");
        navigate(returnTo);
        toast({
          title: "Welcome!",
          description: "You have successfully signed in.",
        });
      }

      if (event === 'SIGNED_OUT') {
        navigate('/login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, returnTo, userType]);

  return {
    view,
    setView,
    userType,
    setUserType,
    returnTo,
  };
};