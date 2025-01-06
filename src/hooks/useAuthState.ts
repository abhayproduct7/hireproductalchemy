import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export const useAuthState = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Setting up auth state listener");
    console.log("Current URL:", window.location.href);

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, session: Session | null) => {
      console.log('Auth event:', event);
      console.log('Session:', session);
      console.log('Current pathname:', window.location.pathname);
      
      if (event === 'SIGNED_IN') {
        console.log('Sign in successful, navigating to home');
        navigate("/");
        toast({
          title: "Successfully signed in",
          description: "Welcome back!",
        });
      }
      
      if (event === 'SIGNED_OUT') {
        console.log('Sign out detected');
        toast({
          title: "Signed out",
          description: "You have been signed out successfully.",
        });
      }

      if (event === 'USER_UPDATED') {
        console.log('User update detected');
        toast({
          title: "Account updated",
          description: "Your account has been updated successfully.",
        });
      }

      // Check for error events
      if (event === 'TOKEN_REFRESHED') {
        console.log('Token refreshed');
      }

      if (event === 'INITIAL_SESSION') {
        console.log('Initial session loaded:', session ? 'Session exists' : 'No session');
      }
    });

    // Get initial session
    const checkInitialSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      console.log('Initial session check:', session ? 'Session exists' : 'No session');
      if (error) {
        console.error('Error checking initial session:', error);
      }
    };

    checkInitialSession();

    return () => {
      console.log("Cleaning up auth state listener");
      subscription.unsubscribe();
    };
  }, [navigate]);
};