import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { BASE_URL } from "@/config/constants";

export const useSignUp = () => {
  const supabase = useSupabaseClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signUp = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${BASE_URL}/auth/callback`,
        },
      });

      if (signUpError) throw signUpError;

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