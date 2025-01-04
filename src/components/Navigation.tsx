import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "@/components/ui/use-toast";
import Logo from "./Logo";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
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
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Logo />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/hire" className="nav-link">
              Hire Talent
            </Link>
            <Link to="/join" className="nav-link">
              Join Our Community
            </Link>
            <Link to="/resources" className="nav-link">
              Resources
            </Link>
            {session ? (
              <button
                onClick={handleLogout}
                className="btn-secondary px-4 py-2 rounded-md font-medium"
              >
                Log Out
              </button>
            ) : (
              <Link
                to="/login"
                className="btn-primary px-4 py-2 rounded-md font-medium"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
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
      )}
    </nav>
  );
};