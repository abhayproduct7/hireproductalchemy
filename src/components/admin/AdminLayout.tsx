import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Loader2 } from "lucide-react";

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const supabase = useSupabaseClient();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminStatus = async () => {
      const { data: adminData, error } = await supabase
        .from('admin_users')
        .select('user_id')
        .maybeSingle();

      if (error || !adminData) {
        console.log('Not an admin user, redirecting...');
        navigate('/');
      }
    };

    checkAdminStatus();
  }, [supabase, navigate]);

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