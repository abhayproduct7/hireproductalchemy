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
          className="block px-3 py-2 rounded-md text-sm bg-secondary text-white hover:bg-secondary/90 text-center"
        >
          Hire Talent
        </Link>
        <Link
          to="/join"
          className="block px-3 py-2 rounded-md text-sm text-primary hover:text-primary/90"
        >
          Join Our Community
        </Link>
        <a
          href="#pricing-section"
          className="block px-3 py-2 rounded-md text-sm text-primary hover:text-primary/90"
        >
          Pricing
        </a>
        {session ? (
          <>
            <Link
              to="/profile"
              className="block px-3 py-2 rounded-md text-sm text-primary hover:text-primary/90"
            >
              My Profile
            </Link>
            <Link
              to="/dashboard"
              className="block px-3 py-2 rounded-md text-sm text-primary hover:text-primary/90"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-3 py-2 rounded-md text-sm text-primary hover:text-primary/90"
            >
              Log Out
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="block px-3 py-2 rounded-md text-sm text-primary hover:text-primary/90 text-center"
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};