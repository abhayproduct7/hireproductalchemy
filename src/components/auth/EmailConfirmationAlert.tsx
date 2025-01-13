import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

interface EmailConfirmationAlertProps {
  email: string;
  onClose: () => void;
}

export const EmailConfirmationAlert = ({ email, onClose }: EmailConfirmationAlertProps) => {
  const [isResending, setIsResending] = useState(false);

  const handleResendConfirmation = async () => {
    setIsResending(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });

      if (error) throw error;

      toast({
        title: "Confirmation email sent",
        description: "Please check your inbox and spam folder.",
      });
    } catch (error) {
      console.error('Error resending confirmation:', error);
      toast({
        title: "Error",
        description: "Failed to resend confirmation email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Alert variant="destructive" className="mb-6">
      <Mail className="h-5 w-5" />
      <AlertTitle className="mb-2">Email Verification Required</AlertTitle>
      <AlertDescription className="space-y-4">
        <p>
          Please verify your email address ({email}) before signing in. Check your inbox and spam folder for the verification link.
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={handleResendConfirmation}
            disabled={isResending}
            className="w-full sm:w-auto"
          >
            {isResending ? "Sending..." : "Resend Verification Email"}
          </Button>
          <Button
            variant="ghost"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Try Different Email
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};