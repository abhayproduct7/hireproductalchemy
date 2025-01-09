import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { AuthError, AuthApiError } from "@supabase/supabase-js";

const getErrorMessage = (error: AuthError) => {
  if (error instanceof AuthApiError) {
    switch (error.status) {
      case 400:
        return 'Invalid credentials. Please check your email and password.';
      case 422:
        return 'Invalid email format. Please enter a valid email address.';
      default:
        return error.message;
    }
  }
  return error.message;
};

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

      if (event === 'USER_UPDATED') {
        console.log('User updated:', session);
      }

      if (event === 'PASSWORD_RECOVERY') {
        toast({
          title: "Password Recovery",
          description: "Please check your email for password reset instructions.",
        });
      }

      // Handle authentication errors
      if (event === 'SIGNED_IN' && !session) {
        const { error } = await supabase.auth.getSession();
        if (error) {
          console.error('Authentication error:', error);
          toast({
            title: "Authentication Error",
            description: getErrorMessage(error),
            variant: "destructive",
          });
        }
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