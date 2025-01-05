import { Link } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

export const DesktopNav = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    navigate("/login");
  };

  return (
    <div className="hidden md:flex items-center space-x-8">
      <Link to="/hire" className="nav-link text-sm">
        Hire Talent
      </Link>
      <Link to="/join" className="nav-link text-sm">
        Join Our Community
      </Link>
      <Link to="/resources" className="nav-link text-sm">
        Resources
      </Link>
      {session ? (
        <button
          onClick={handleLogout}
          className="btn-secondary px-4 py-2 rounded-md font-medium text-sm"
        >
          Log Out
        </button>
      ) : (
        <Link
          to="/login"
          className="btn-primary px-4 py-2 rounded-md font-medium text-sm"
        >
          Sign In
        </Link>
      )}
    </div>
  );
};