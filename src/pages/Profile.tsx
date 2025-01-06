import { useSession } from "@supabase/auth-helpers-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { TalentProfile } from "@/components/profile/TalentProfile";
import { EmployerProfile } from "@/components/profile/EmployerProfile";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const Profile = () => {
  const session = useSession();
  const [userType, setUserType] = useState<"talent" | "employer" | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserType = async () => {
      if (session?.user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("user_type")
          .eq("id", session.user.id)
          .single();

        if (!error && data) {
          setUserType(data.user_type);
        }
        setIsLoading(false);
      }
    };

    fetchUserType();
  }, [session]);

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
          <div>Profile type not set</div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Profile;