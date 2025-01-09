import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export const useAuthForm = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<"sign_in" | "sign_up">("sign_in");
  const [userType, setUserType] = useState<"talent" | "employer" | null>(null);

  useEffect(() => {
    console.log("Setting up auth state listener");
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session);
      
      if (event === "SIGNED_IN" && session) {
        console.log('Sign in successful, navigating to dashboard');
        navigate("/dashboard");
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
      console.log("Cleaning up auth state listener");
      subscription.unsubscribe();
    };
  }, [navigate]);

  return {
    view,
    setView,
    userType,
    setUserType,
  };
};