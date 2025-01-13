import { useEffect } from "react";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { BASE_URL } from "@/config/constants";

export const useAuthState = () => {
  useEffect(() => {
    // First, ensure we're on the correct domain
    if (!window.location.origin.includes('producthire.co.uk')) {
      window.location.href = `${BASE_URL}${window.location.pathname}${window.location.search}`;
      return;
    }

    const handleAuthChange = async (event: AuthChangeEvent, session: Session | null) => {
      console.log('Auth state changed:', event, session);

      if (session) {
        try {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('user_type')
            .eq('id', session.user.id)
            .single();

          if (profileError) {
            console.error('Error fetching profile:', profileError);
            return;
          }

          if (event === 'SIGNED_IN') {
            console.log('Sign in successful, navigating to dashboard');
            const redirectPath = profile?.user_type === 'employer' ? '/hire' : '/join-community#application';
            window.location.href = `${BASE_URL}${redirectPath}`;
            toast({
              title: "Successfully signed in",
              description: "Welcome back!",
            });
          }
        } catch (error) {
          console.error('Error in auth change handler:', error);
        }
      }

      if (event === 'SIGNED_OUT') {
        console.log('Sign out detected');
        window.location.href = `${BASE_URL}/login`;
        toast({
          title: "Signed out",
          description: "You have been signed out successfully.",
        });
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthChange);

    return () => {
      subscription.unsubscribe();
    };
  }, []);
};