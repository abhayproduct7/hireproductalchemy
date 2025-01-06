import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ContactFormData {
  name: string;
  email: string;
  companyName: string;
}

export const useContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async ({ name, email, companyName }: ContactFormData) => {
    setIsLoading(true);
    try {
      // First, submit contact form data
      const { error: contactError } = await supabase
        .from("producthire")
        .insert([{ name, email, "company name": companyName }]);

      if (contactError) throw contactError;

      try {
        // Try to create the user account
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password: crypto.randomUUID(),
          options: {
            data: {
              full_name: name,
            },
          },
        });

        if (authError) {
          if (authError.message.includes("User already registered")) {
            toast({
              title: "Account already exists",
              description: "Please sign in with your existing account.",
            });
            navigate("/login");
            return true;
          }
          throw authError;
        }

        // Only try to update profile if we successfully created a new user
        if (authData?.user?.id) {
          const { error: profileError } = await supabase
            .from("profiles")
            .upsert({
              id: authData.user.id,
              full_name: name,
              company_name: companyName,
              user_type: "employer",
            });

          if (profileError) throw profileError;
        }

        toast({
          title: "Form submitted successfully!",
          description: "Check your email for login instructions.",
        });
        
        navigate("/login");
        return true;
      } catch (authError: any) {
        if (!authError.message?.includes("User already registered")) {
          toast({
            title: "Authentication error",
            description: "There was a problem creating your account.",
            variant: "destructive",
          });
        }
        return false;
      }
    } catch (error: any) {
      console.error("Detailed error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSubmit, isLoading };
};