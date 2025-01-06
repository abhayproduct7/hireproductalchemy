import { Navigation } from "@/components/Navigation";
import { AuthForm } from "@/components/auth/AuthForm";
import { useSession } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      const returnTo = localStorage.getItem("returnTo") || "/";
      localStorage.removeItem("returnTo");
      navigate(returnTo);
    }
  }, [session, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-md mx-auto pt-32 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Welcome Back</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <AuthForm />
        </div>
      </div>
    </div>
  );
};

export default Login;