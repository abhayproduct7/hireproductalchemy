import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserTypeSelector } from "./UserTypeSelector";
import { PasswordRequirements } from "./PasswordRequirements";
import { AuthLinks } from "./AuthLinks";
import { useSignUp } from "./hooks/useSignUp";
import { SignUpFormFields } from "./SignUpFormFields";

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
  setUserType: (type: "talent" | "employer") => void;
}

export const SignUpForm = ({ setView, userType, setUserType }: SignUpFormProps) => {
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const { isLoading, handleSignUp } = useSignUp({ setView });
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const password = watch("password", "");
  
  const passwordRequirements = [
    { met: password.length >= 8, text: "At least 8 characters" },
    { met: /[A-Z]/.test(password), text: "One uppercase letter" },
    { met: /[a-z]/.test(password), text: "One lowercase letter" },
    { met: /[0-9]/.test(password), text: "One number" },
    { met: /[^A-Za-z0-9]/.test(password), text: "One special character" },
  ];

  const onSubmit = async ({ email, password }: FormData) => {
    await handleSignUp(email, password, userType);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
        <p className="text-sm text-muted-foreground">
          Enter your details below to create your account
        </p>
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
          {errors?.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Input
            id="password"
            placeholder="Create a password"
            type="password"
            autoComplete="new-password"
            disabled={isLoading}
            onFocus={() => setShowPasswordRequirements(true)}
            {...register("password")}
          />
          {errors?.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <PasswordRequirements
          requirements={passwordRequirements}
          show={showPasswordRequirements}
        />

        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <AuthLinks setView={setView} />
    </div>
  );
};