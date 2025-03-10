import { Link } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserCircle2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const DesktopNav = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    navigate("/login");
  };

  const scrollToPricing = () => {
    if (location.pathname !== '/') {
      navigate('/?scrollTo=pricing');
      return;
    }
    
    const pricingSection = document.querySelector('#pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="hidden md:flex items-center space-x-8">
      <Link
        to="/hire"
        className="btn-secondary px-4 py-2 rounded-md font-medium text-sm"
      >
        Hire Talent
      </Link>
      <button 
        onClick={scrollToPricing}
        className="nav-link text-sm hover:text-secondary transition-colors"
      >
        Pricing
      </button>
      <Link to="/join" className="nav-link text-sm">
        Join Our Community
      </Link>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <UserCircle2 className="h-8 w-8 text-secondary hover:text-secondary/80 transition-colors" />
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="w-56 bg-white border border-gray-200 shadow-lg rounded-md mt-2 z-50"
          >
            <DropdownMenuItem 
              onClick={() => navigate("/profile")}
              className="cursor-pointer px-4 py-2.5 text-gray-800 hover:bg-secondary hover:text-white focus:bg-secondary focus:text-white transition-colors"
            >
              My Profile
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => navigate("/dashboard")}
              className="cursor-pointer px-4 py-2.5 text-gray-800 hover:bg-secondary hover:text-white focus:bg-secondary focus:text-white transition-colors"
            >
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-200 my-1" />
            <DropdownMenuItem 
              onClick={handleLogout}
              className="cursor-pointer px-4 py-2.5 text-gray-800 hover:bg-secondary hover:text-white focus:bg-secondary focus:text-white transition-colors"
            >
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link
          to="/login"
          className="text-secondary hover:text-secondary/80 border-2 border-secondary px-4 py-2 rounded-md font-medium text-sm transition-colors"
        >
          Sign In
        </Link>
      )}
    </div>
  );
};