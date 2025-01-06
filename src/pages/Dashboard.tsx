import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!session) {
      navigate("/login");
    }
  }, [session, navigate]);

  if (!session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <RoleBasedDashboard userId={session.user.id} />
      </main>
      <Footer />
    </div>
  );
};

const RoleBasedDashboard = ({ userId }: { userId: string }) => {
  const supabase = useSupabaseClient();
  const [userType, setUserType] = useState<'employer' | 'talent' | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserType = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('user_type')
        .eq('id', userId)
        .single();

      if (!error && data) {
        setUserType(data.user_type);
      }
      setIsLoading(false);
    };

    fetchUserType();
  }, [userId, supabase]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (userType === 'employer') {
    return (
      <div className="space-y-8">
        <h1 className="text-4xl font-bold">Employer Dashboard</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Active Talent Search</h2>
            <p className="text-muted-foreground mb-4">
              View and manage your current talent requirements and matches.
            </p>
            <Button onClick={() => navigate("/requirements")}>
              Post New Requirement
            </Button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Talent Matches</h2>
            <p className="text-muted-foreground mb-4">
              Review candidates that match your requirements.
            </p>
            <Button variant="outline">View Matches</Button>
          </div>
        </div>
      </div>
    );
  }

  if (userType === 'talent') {
    return (
      <div className="space-y-8">
        <h1 className="text-4xl font-bold">Talent Dashboard</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Upcoming Projects</h2>
            <p className="text-muted-foreground mb-4">
              View and manage your upcoming project opportunities.
            </p>
            <Button onClick={() => navigate("/projects")}>
              View Projects
            </Button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Profile & Applications</h2>
            <p className="text-muted-foreground mb-4">
              Update your profile and view application status.
            </p>
            <Button variant="outline" onClick={() => navigate("/profile")}>
              View Profile
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold mb-4">Welcome to ProductHire</h1>
      <p className="text-muted-foreground mb-8">
        Please complete your profile to access the dashboard.
      </p>
      <Button onClick={() => navigate("/profile")}>
        Complete Profile
      </Button>
    </div>
  );
};

export default Dashboard;