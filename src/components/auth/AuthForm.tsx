import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const AuthForm = () => {
  const supabase = useSupabaseClient();
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
      if (event === "SIGNED_IN" && session) {
        // Clear the stored return URL
        localStorage.removeItem("returnTo");
        // Navigate to the return URL
        navigate(returnTo);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, navigate, returnTo]);

  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      theme="light"
      providers={[]}
    />
  );
};