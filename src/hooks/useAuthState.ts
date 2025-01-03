import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export const useAuthState = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
      console.log('Auth event:', event);
      console.log('Session:', session);
      
      if (event === 'SIGNED_IN') {
        navigate("/");
        toast({
          title: "Successfully signed in",
          description: "Welcome back!",
        });
      }
      
      if (event === 'SIGNED_OUT') {
        toast({
          title: "Signed out",
          description: "You have been signed out successfully.",
        });
      }

      if (event === 'USER_UPDATED') {
        toast({
          title: "Account updated",
          description: "Your account has been updated successfully.",
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);
};