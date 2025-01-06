import { useState } from "react";
import { UserTypeSelector } from "./UserTypeSelector";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

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

  const showRequirements = password.length > 0;

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
      if (error.message.includes("User already registered")) {
        toast({
          title: "Account Already Exists",
          description: "This email is already registered. Please sign in instead.",
          action: (
            <Button 
              variant="outline" 
              onClick={() => setView("sign_in")}
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
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {showRequirements && (
        <Alert variant="info" className="animate-fade-in">
          <Info className="h-4 w-4" />
          <AlertDescription>
            <div className="text-sm mt-1">
              Password requirements:
              <ul className="list-disc pl-5 mt-1 space-y-1">
                {requirements.map((req, index) => (
                  <li
                    key={index}
                    className={req.met ? "text-green-600" : "text-blue-600"}
                  >
                    {req.text} {req.met && "✓"}
                  </li>
                ))}
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      )}

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