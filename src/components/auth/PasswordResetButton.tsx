import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const PasswordResetButton = () => {
  const handlePasswordReset = async () => {
    const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
    const email = emailInput?.value?.trim();

    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address first",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login`,
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message || "Failed to send reset instructions",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Password reset instructions have been sent to your email",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send reset instructions",
        variant: "destructive",
      });
    }
  };

  return (
    <button
      type="button"
      onClick={handlePasswordReset}
      className="w-full text-sm text-accent hover:underline"
    >
      Forgot Password?
    </button>
  );
};