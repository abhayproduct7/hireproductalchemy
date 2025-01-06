import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { UserTypeSelector } from "./UserTypeSelector";
import { PasswordRequirements } from "./PasswordRequirements";
import { AuthLinks } from "./AuthLinks";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
});

type FormData = z.infer<typeof formSchema>;

interface SignUpFormProps {
  setView: (view: "sign_in" | "sign_up") => void;
  userType: "talent" | "employer" | null;
  setUserType: (type: "talent" | "employer" | null) => void;
}

export const SignUpForm = ({ setView, userType, setUserType }: SignUpFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async ({ email, password }: FormData) => {
    if (!userType) {
      toast({
        title: "Error",
        description: "Please select whether you're joining as talent or an employer",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);

      // Check if user exists in profiles
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id, user_type')
        .eq('email', email)
        .maybeSingle();

      if (profileError) {
        throw profileError;
      }

      if (profileData) {
        // If user exists in profiles but with different user type, show error
        if (profileData.user_type && profileData.user_type !== userType) {
          toast({
            title: "Account exists",
            description: `This email is already registered as ${profileData.user_type}. Please sign in or use a different email.`,
            variant: "destructive",
          });
          return;
        }
      }

      // Proceed with sign up
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            user_type: userType,
          },
        },
      });

      if (signUpError) {
        if (signUpError.message === "User already registered") {
          toast({
            title: "Account exists",
            description: "Please sign in with your existing account",
          });
          setView("sign_in");
          return;
        }
        throw signUpError;
      }

      toast({
        title: "Check your email",
        description: "We've sent you a confirmation link to complete your registration",
      });
    } catch (error: any) {
      console.error("Signup error:", error);
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
        <p className="text-sm text-muted-foreground">Enter your details below to create your account</p>
      </div>

      <UserTypeSelector userType={userType} setUserType={setUserType} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isLoading}
            {...register("email")}
          />
          {errors?.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Input
            id="password"
            placeholder="Create a password"
            type="password"
            autoComplete="new-password"
            disabled={isLoading}
            {...register("password")}
          />
          {errors?.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>

        <PasswordRequirements />

        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <AuthLinks view="sign_up" setView={setView} />
    </div>
  );
};