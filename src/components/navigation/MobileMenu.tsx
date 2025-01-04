import { Link } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

interface MobileMenuProps {
  isOpen: boolean;
}

export const MobileMenu = ({ isOpen }: MobileMenuProps) => {
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

  if (!isOpen) return null;

  return (
    <div className="md:hidden animate-fade-in">
      <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-b border-gray-100">
        <Link
          to="/hire"
          className="block px-3 py-2 rounded-md text-base nav-link"
        >
          Hire Talent
        </Link>
        <Link
          to="/join"
          className="block px-3 py-2 rounded-md text-base nav-link"
        >
          Join Our Community
        </Link>
        <Link
          to="/resources"
          className="block px-3 py-2 rounded-md text-base nav-link"
        >
          Resources
        </Link>
        {session ? (
          <button
            onClick={handleLogout}
            className="block w-full px-3 py-2 rounded-md text-base btn-secondary text-center"
          >
            Log Out
          </button>
        ) : (
          <Link
            to="/login"
            className="block px-3 py-2 rounded-md text-base btn-primary text-center"
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};