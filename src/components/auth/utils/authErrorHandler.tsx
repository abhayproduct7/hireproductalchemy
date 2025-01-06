import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { AuthError } from "@supabase/supabase-js";

interface HandleSignUpErrorProps {
  error: AuthError;
  onSignInClick: () => void;
}

export const handleSignUpError = ({ error, onSignInClick }: HandleSignUpErrorProps) => {
  // Parse the error body if it exists
  let errorBody;
  try {
    errorBody = error.message && error.message.includes("{") 
      ? JSON.parse(error.message)
      : null;
  } catch {
    errorBody = null;
  }

  // Check for user already exists error
  const isUserExistsError = 
    (errorBody?.code === "user_already_exists") ||
    (error.message?.includes("User already registered"));

  if (isUserExistsError) {
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
      description: errorBody?.message || error.message || "An error occurred during sign up",
      variant: "destructive",
    });
  }
};