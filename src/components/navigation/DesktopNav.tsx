import { Link } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
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
      <Link
        to="/hire"
        className="btn-secondary px-4 py-2 rounded-md font-medium text-sm"
      >
        Hire Talent
      </Link>
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
            className="w-56 bg-white border border-gray-100 shadow-lg mt-2 z-50"
          >
            <DropdownMenuItem 
              onClick={() => navigate("/profile")}
              className="hover:bg-muted focus:bg-muted"
            >
              My Profile
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => navigate("/dashboard")}
              className="hover:bg-muted focus:bg-muted"
            >
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-100" />
            <DropdownMenuItem 
              onClick={handleLogout}
              className="hover:bg-muted focus:bg-muted"
            >
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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