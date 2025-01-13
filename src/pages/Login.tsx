import { Navigation } from "@/components/Navigation";
import { AuthForm } from "@/components/auth/AuthForm";
import { useSession } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "@/config/constants";

const Login = () => {
  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      // Get the return path from localStorage, but ensure it's a relative path
      const storedReturnTo = localStorage.getItem("returnTo");
      let returnPath = "/";

      if (storedReturnTo) {
        try {
          // Create URL object to parse the stored path
          const url = new URL(storedReturnTo);
          // Only use the pathname and hash from the stored URL
          returnPath = url.pathname + url.hash;
          
          // Update the URL to use the custom domain
          window.history.replaceState({}, '', `${BASE_URL}${returnPath}`);
        } catch {
          // If the stored value isn't a valid URL, use it directly if it starts with /
          if (storedReturnTo.startsWith('/')) {
            returnPath = storedReturnTo;
          }
        }
      }

      localStorage.removeItem("returnTo");
      navigate(returnPath);
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