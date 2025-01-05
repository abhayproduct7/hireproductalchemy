import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export const useAuthState = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth event:', event);
      console.log('Session:', session);
      
      if (event === 'SIGNED_IN' && session) {
        toast({
          title: "Successfully signed in",
          description: "Welcome back!",
        });
      }
      
      if (event === 'SIGNED_OUT') {
        navigate("/login");
        toast({
          title: "Signed out",
          description: "You have been signed out successfully.",
        });
      }

      if (event === 'USER_UPDATED') {
        console.log('User updated:', session?.user);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);
};