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
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          user_type: userType,
        },
      },
    });

    if (error) {
      handleSignUpError({ error, onSignInClick: () => setView("sign_in") });
    } else {
      toast({
        title: "Success",
        description: "Please check your email to verify your account",
      });
      setView("sign_in");
    }
    
    setIsLoading(false);
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