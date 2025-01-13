import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { AuthError } from "@supabase/supabase-js";

export const useAuthForm = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<"sign_in" | "sign_up">("sign_in");
  const [userType, setUserType] = useState<"talent" | "employer" | null>(null);

  useEffect(() => {
    console.log("Setting up auth state listener");
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session);
      
      if (event === "SIGNED_IN" && session) {
        console.log('Sign in successful, checking profile');
        
        // Check if user has a profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('id', session.user.id)
          .single();

        if (profileError) {
          console.error('Error fetching profile:', profileError);
          toast({
            title: "Error",
            description: "There was a problem accessing your profile.",
            variant: "destructive",
          });
          return;
        }

        if (profile) {
          console.log('Profile found:', profile);
          // Redirect based on user type
          if (profile.user_type === 'talent') {
            navigate("/join-community#application");
          } else {
            navigate("/dashboard");
          }
          
          toast({
            title: "Welcome!",
            description: "You have successfully signed in.",
          });
        }
      }

      if (event === 'SIGNED_OUT') {
        navigate('/login');
      }

      if (event === 'USER_UPDATED') {
        console.log('User updated:', session);
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