import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { EmployerDashboard } from "@/components/dashboard/EmployerDashboard";
import { TalentDashboard } from "@/components/dashboard/TalentDashboard";
import { SetupProfile } from "@/components/dashboard/SetupProfile";

const Dashboard = () => {
  const session = useSession();
  const navigate = useNavigate();
  const supabase = useSupabaseClient();
  const [userType, setUserType] = useState<'employer' | 'talent' | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      navigate("/login");
      return;
    }

    const fetchUserType = async () => {
      try {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("user_type")
          .eq("id", session.user.id)
          .single();

        if (error) throw error;
        setUserType(profile?.user_type || null);
      } catch (error) {
        console.error("Error fetching user type:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserType();
  }, [session, supabase, navigate]);

  if (!session) return null;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        {!userType ? (
          <SetupProfile />
        ) : userType === 'employer' ? (
          <EmployerDashboard />
        ) : (
          <TalentDashboard />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;