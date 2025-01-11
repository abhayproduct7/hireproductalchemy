import { useSession } from "@supabase/auth-helpers-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { TalentProfile } from "@/components/profile/TalentProfile";
import { EmployerProfile } from "@/components/profile/EmployerProfile";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const session = useSession();
  const navigate = useNavigate();
  const [userType, setUserType] = useState<"talent" | "employer" | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserType = async () => {
      if (!session?.user) {
        navigate("/login");
        return;
      }

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("user_type")
          .eq("id", session.user.id)
          .single();

        if (error) throw error;
        
        if (data) {
          setUserType(data.user_type);
        }
      } catch (error) {
        console.error("Error fetching user type:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserType();
  }, [session, navigate]);

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
            <p className="text-muted-foreground">
              Please contact support if you believe this is an error.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Profile;