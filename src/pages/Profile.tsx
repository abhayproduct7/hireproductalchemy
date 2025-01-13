import { useSession } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { TalentProfile } from "@/components/profile/TalentProfile";
import { EmployerProfile } from "@/components/profile/EmployerProfile";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Profile = () => {
  const session = useSession();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userType, setUserType] = useState<"talent" | "employer" | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!session?.user) {
      navigate("/login");
      return;
    }

    const fetchUserType = async () => {
      try {
        console.log("Fetching user type for:", session.user.id);
        
        const { data, error } = await supabase
          .from("profiles")
          .select("user_type")
          .eq("id", session.user.id)
          .maybeSingle();

        if (error) {
          console.error("Error fetching user type:", error);
          throw error;
        }
        
        console.log("Fetched user type:", data?.user_type);
        
        if (!data) {
          // If no profile exists, show an error and redirect to complete profile setup
          toast({
            title: "Profile not found",
            description: "Please complete your profile setup",
            variant: "destructive",
          });
          navigate("/join-community#application");
          return;
        }

        setUserType(data.user_type);
      } catch (error) {
        console.error("Error fetching user type:", error);
        toast({
          title: "Error",
          description: "Failed to load profile data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserType();
  }, [session, navigate, toast]);

  if (!session) {
    navigate("/login");
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-4 w-full max-w-md mb-8" />
          <div className="space-y-6">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {userType === "talent" ? (
          <TalentProfile />
        ) : userType === "employer" ? (
          <EmployerProfile />
        ) : (
          <div className="text-center py-8">
            <h2 className="text-2xl font-semibold mb-4">Profile type not set</h2>
            <p className="text-muted-foreground mb-4">
              It seems your profile type hasn't been set. This usually happens when the signup process wasn't completed properly.
            </p>
            <p className="text-muted-foreground">
              Please try signing out and signing in again, or contact support if the issue persists.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Profile;