import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { BASE_URL } from "@/config/constants";

interface UseSignUpProps {
  setView?: (view: "sign_in" | "sign_up") => void;
}

export const useSignUp = ({ setView }: UseSignUpProps = {}) => {
  const supabase = useSupabaseClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signUp = async (email: string, password: string, userType: "talent" | "employer" | null) => {
    try {
      setIsLoading(true);
      setError(null);

      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${BASE_URL}/auth/callback`,
          data: {
            user_type: userType,
          },
        },
      });

      if (signUpError) throw signUpError;
      
      // If successful, switch to sign in view
      if (setView) {
        setView("sign_in");
      }

    } catch (err: any) {
      console.error("Sign up error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signUp,
    isLoading,
    error,
  };
};