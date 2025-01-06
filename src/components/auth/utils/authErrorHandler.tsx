import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface HandleSignUpErrorProps {
  error: Error;
  onSignInClick: () => void;
}

export const handleSignUpError = ({ error, onSignInClick }: HandleSignUpErrorProps) => {
  if (error.message.includes("User already registered")) {
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