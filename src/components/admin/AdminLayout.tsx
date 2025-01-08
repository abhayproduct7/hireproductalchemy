import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const supabase = useSupabaseClient();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;

        if (!session) {
          console.log('No active session found');
          navigate('/login');
          return;
        }

        console.log('Checking admin status for user:', session.user.id);
        
        const { data: adminData, error: adminError } = await supabase
          .from('admin_users')
          .select('user_id')
          .eq('user_id', session.user.id)
          .maybeSingle();

        if (adminError) throw adminError;

        if (!adminData) {
          console.log('User is not an admin');
          toast({
            title: "Access Denied",
            description: "You don't have permission to access the admin dashboard.",
            variant: "destructive",
          });
          navigate('/');
          return;
        }

        console.log('Admin access confirmed');
        setIsLoading(false);

      } catch (error) {
        console.error('Error in admin check:', error);
        toast({
          title: "Authentication Error",
          description: "Please try logging in again.",
          variant: "destructive",
        });
        navigate('/login');
      }
    };

    checkAdminStatus();
  }, [supabase, navigate, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-secondary">Admin Dashboard</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
};