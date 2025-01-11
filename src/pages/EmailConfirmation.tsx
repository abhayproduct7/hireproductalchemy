import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { Mail } from "lucide-react";

const EmailConfirmation = () => {
  const { isLoading, session } = useSessionContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && session) {
      navigate("/dashboard");
    }
  }, [isLoading, session, navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
          <div className="mx-auto w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
            <Mail className="w-8 h-8 text-secondary" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Check Your Email</h1>
          <p className="text-gray-600">
            We've sent you a confirmation link to complete your registration. 
            Please check your email and click the link to activate your account.
          </p>
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Didn't receive the email? Check your spam folder or contact support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmation;