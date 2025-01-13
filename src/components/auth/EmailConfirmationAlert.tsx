import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
        title: "Success",
        description: "Confirmation email has been resent. Please check your inbox.",
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
    <Alert variant="destructive" className="mb-4">
      <AlertDescription>
        Please verify your email address before signing in.
        <div className="mt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleResendConfirmation}
            disabled={isResending}
          >
            {isResending ? "Sending..." : "Resend confirmation email"}
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};