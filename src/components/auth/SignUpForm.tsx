import { useState } from "react";
import { UserTypeSelector } from "./UserTypeSelector";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { handleSignUpError } from "./utils/authErrorHandler";
import { PasswordRequirements } from "./PasswordRequirements";
import { SignUpFormFields } from "./SignUpFormFields";

interface SignUpFormProps {
  setView: (view: "sign_in" | "sign_up") => void;
}

export const SignUpForm = ({ setView }: SignUpFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"talent" | "employer" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const requirements = [
    { met: password.length >= 6, text: "At least 6 characters long" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userType) {
      toast({
        title: "Error",
        description: "Please select whether you're joining as Talent or Employer",
        variant: "destructive",
      });
      return;
    }

    if (!requirements.every(req => req.met)) {
      toast({
        title: "Error",
        description: "Please meet all password requirements",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // First check if user exists in profiles
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id, user_type')
        .eq('email', email)
        .maybeSingle();

      if (profileError && profileError.code !== 'PGRST116') {
        throw profileError;
      }

      // Check if the user exists in auth
      const { data: { user }, error: userError } = await supabase.auth.admin.getUserByEmail(email);
      
      if (profileData) {
        // If user exists in profiles but with different user type, show error
        if (profileData.user_type && profileData.user_type !== userType) {
          toast({
            title: "Account type mismatch",
            description: `You already have an account as a ${profileData.user_type}. Please sign in instead.`,
            variant: "destructive",
          });
          setView("sign_in");
          return;
        }
      }
      
      // If user exists in auth but not in profiles, create profile
      if (user && !profileData) {
        const { error: createProfileError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            email: email,
            user_type: userType,
          });

        if (createProfileError) throw createProfileError;
        
        toast({
          title: "Account exists",
          description: "Please sign in with your existing account",
        });
        setView("sign_in");
        return;
      }
      
      // Proceed with sign up if user doesn't exist
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            user_type: userType,
          },
        },
      });

      if (signUpError) {
        if (signUpError.message?.includes("User already registered")) {
          toast({
            title: "Account exists",
            description: "Please sign in with your existing account",
          });
          setView("sign_in");
          return;
        }
        throw signUpError;
      }

      toast({
        title: "Success",
        description: "Please check your email to verify your account",
      });
      setView("sign_in");
      
    } catch (error: any) {
      console.error("Signup error:", error);
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <UserTypeSelector userType={userType} onUserTypeChange={setUserType} />
      
      <SignUpFormFields
        email={email}
        password={password}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
      />

      <PasswordRequirements
        requirements={requirements}
        show={password.length > 0}
      />

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Signing up..." : "Sign Up"}
      </Button>

      <p className="text-center text-sm">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => setView("sign_in")}
          className="text-accent hover:underline"
        >
          Sign in
        </button>
      </p>
    </form>
  );
};