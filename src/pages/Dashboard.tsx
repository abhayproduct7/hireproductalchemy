import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { EmployerDashboard } from "@/components/dashboard/EmployerDashboard";
import { TalentDashboard } from "@/components/dashboard/TalentDashboard";
import { SetupProfile } from "@/components/dashboard/SetupProfile";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const session = useSession();
  const navigate = useNavigate();
  const supabase = useSupabaseClient();
  const { toast } = useToast();
  const [userType, setUserType] = useState<'employer' | 'talent' | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "ProductHire Dashboard | Manage Your Activities";
  }, []);

  useEffect(() => {
    if (!session) {
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
          // If no profile exists, show the setup profile component
          setUserType(null);
        } else {
          setUserType(data.user_type);
        }
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
  }, [session, supabase, navigate, toast]);

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
