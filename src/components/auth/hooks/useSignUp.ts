import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface UseSignUpProps {
  setView: (view: "sign_in" | "sign_up") => void;
}

export const useSignUp = ({ setView }: UseSignUpProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignUp = async (
    email: string,
    password: string,
    userType: "talent" | "employer" | null
  ) => {
    if (!userType) {
      toast({
        title: "Error",
        description: "Please select whether you're joining as talent or an employer",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      console.log("Starting signup process for:", email, "as", userType);

      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            user_type: userType,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (signUpError) {
        console.error("Signup error:", signUpError);
        if (signUpError.message === "User already registered") {
          toast({
            title: "Account exists",
            description: "Please sign in with your existing account",
          });
          setView("sign_in");
          return;
        }
        throw signUpError;
      }

      if (signUpData.user) {
        console.log("User created successfully, creating profile...");
        
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: signUpData.user.id,
            email: email,
            user_type: userType,
          }, {
            onConflict: 'id',
          });

        if (profileError) {
          console.error("Profile creation error:", profileError);
          throw new Error("Failed to create profile");
        }

        console.log("Profile created successfully with user_type:", userType);
        
        // Redirect to confirmation page
        navigate("/email-confirmation");
      }
    } catch (error: any) {
      console.error("Signup process error:", error);
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleSignUp,
  };
};