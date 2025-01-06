import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

export const ContactSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log("Attempting to insert contact form data...");
      
      // First insert the contact form data
      const { error: contactError } = await supabase
        .from("producthire")
        .insert([
          {
            name,
            email,
            "company name": companyName,
          },
        ]);

      if (contactError) throw contactError;

      // Check if user already exists
      const { data: userData, error: userCheckError } = await supabase
        .auth.admin.getUserByEmail(email);

      if (userCheckError && userCheckError.message !== "User not found") {
        throw userCheckError;
      }

      let userId;

      if (!userData) {
        // Create new user if they don't exist
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password: crypto.randomUUID(), // Generate a random password
          options: {
            data: {
              full_name: name,
            },
          },
        });

        if (authError) throw authError;
        userId = authData.user?.id;
      } else {
        userId = userData.id;
      }

      // Update the profile if we have a user ID
      if (userId) {
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({ 
            id: userId,
            full_name: name,
            company_name: companyName,
            user_type: 'employer'
          });

        if (profileError) throw profileError;
      }

      toast({
        title: "Form submitted successfully!",
        description: "Check your email for login instructions.",
      });

      // Reset form
      setName("");
      setEmail("");
      setCompanyName("");
      
      // Redirect to login page
      navigate("/login");
    } catch (error: any) {
      console.error("Detailed error:", error);
      
      // Handle user already exists error gracefully
      if (error.message?.includes("User already registered")) {
        toast({
          title: "Account already exists",
          description: "Please try signing in instead.",
        });
        navigate("/login");
        return;
      }

      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-muted">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-primary mb-4">
            Not Ready to Commit Yet?
          </h2>
          <p className="text-lg text-muted-foreground">
            Let's start a conversation about your product management needs. Share your details, and we'll reach out to discuss how we can help.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
          <div>
            <Input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <div>
            <Input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <div>
            <Input
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Let's Talk"}
          </Button>
        </form>
      </div>
    </section>
  );
};