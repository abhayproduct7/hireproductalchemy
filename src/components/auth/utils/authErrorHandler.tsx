import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { AuthError } from "@supabase/supabase-js";

interface HandleSignUpErrorProps {
  error: AuthError;
  onSignInClick: () => void;
}

export const handleSignUpError = ({ error, onSignInClick }: HandleSignUpErrorProps) => {
  // Check if the error message contains the specific error code or message
  if (error.message.includes("User already registered") || 
      (typeof error === 'object' && 'body' in error && 
       JSON.parse((error as any).body).code === "user_already_exists")) {
    toast({
      title: "Account Already Exists",
      description: "This email is already registered. Please sign in instead.",
      action: (
        <Button 
          variant="outline" 
          onClick={onSignInClick}
          className="ml-2"
        >
          Sign In
        </Button>
      ),
    });
  } else {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
  }
};