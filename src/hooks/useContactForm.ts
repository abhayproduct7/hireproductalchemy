import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
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
      // First, check if the user already exists in profiles
      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", email)
        .single();

      if (existingProfile) {
        toast({
          title: "Account already exists",
          description: "Please sign in with your existing account.",
        });
        navigate("/login");
        return true;
      }

      // Submit contact form data to producthire table
      const { error: contactError } = await supabase
        .from("producthire")
        .insert([{ name, email, "company name": companyName }]);

      if (contactError) throw contactError;

      try {
        // Generate a secure random password that meets minimum requirements
        const securePassword = `PH${crypto.randomUUID().slice(0, 10)}!2024`;
        
        // Create the user account in auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password: securePassword,
          options: {
            data: {
              full_name: name,
              user_type: "employer",
            },
          },
        });

        if (authError) throw authError;

        // The profile will be automatically created by the handle_new_user trigger
        // We just need to update it with additional information
        if (authData?.user?.id) {
          const { error: profileError } = await supabase
            .from("profiles")
            .update({
              company_name: companyName,
              user_type: "employer",
            })
            .eq("id", authData.user.id);

          if (profileError) throw profileError;
        }

        toast({
          title: "Form submitted successfully!",
          description: "Check your email for login instructions.",
        });
        
        navigate("/login");
        return true;
      } catch (authError: any) {
        console.error("Auth error:", authError);
        toast({
          title: "Error",
          description: "There was a problem creating your account.",
          variant: "destructive",
        });
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