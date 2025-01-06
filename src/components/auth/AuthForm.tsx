import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export const AuthForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get the return URL from the query parameters or localStorage
  const searchParams = new URLSearchParams(location.search);
  const returnTo = searchParams.get("returnTo") || localStorage.getItem("returnTo") || "/";

  useEffect(() => {
    // Store the return URL in localStorage
    if (returnTo && returnTo !== "/") {
      localStorage.setItem("returnTo", returnTo);
    }

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session);
      if (event === "SIGNED_IN" && session) {
        // Clear the stored return URL
        localStorage.removeItem("returnTo");
        // Navigate to the return URL
        navigate(returnTo);
        toast({
          title: "Welcome back!",
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
  }, [navigate, returnTo]);

  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      theme="light"
      providers={[]}
      onError={(error) => {
        console.error("Auth error:", error);
        if (error.message.includes("User already registered")) {
          toast({
            title: "Account Already Exists",
            description: "Please sign in instead of signing up.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Authentication Error",
            description: error.message,
            variant: "destructive",
          });
        }
      }}
    />
  );
};