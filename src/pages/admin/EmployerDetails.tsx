import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Loader2 } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useToast } from "@/hooks/use-toast";
import { Database } from "@/integrations/supabase/types";
import { Profile, Requirement } from "@/components/admin/tables/employer/types";

const EmployerDetails = () => {
  const { employerId } = useParams();
  const supabase = useSupabaseClient<Database>();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [employer, setEmployer] = useState<Profile | null>(null);
  const [requirements, setRequirements] = useState<Requirement[]>([]);

  useEffect(() => {
    const fetchEmployerDetails = async () => {
      try {
        setLoading(true);
        
        // Fetch employer profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', employerId)
          .single();

        if (profileError) throw profileError;

        // Fetch requirements
        const { data: requirementsData, error: requirementsError } = await supabase
          .from('requirements')
          .select('*')
          .eq('user_id', employerId);

        if (requirementsError) throw requirementsError;

        setEmployer(profileData);
        setRequirements(requirementsData as Requirement[]);
        
      } catch (error) {
        console.error('Error:', error);
        toast({
          title: "Error",
          description: "Failed to fetch employer details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (employerId) {
      fetchEmployerDetails();
    }
  }, [employerId, supabase, toast]);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  if (!employer) {
    return (
      <AdminLayout>
        <div className="bg-white shadow rounded-lg p-6">
          Employer not found
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Employer Details</h2>
          <div className="space-y-4">
            <div>
              <span className="font-semibold">Email:</span> {employer.email || 'N/A'}
            </div>
            <div>
              <span className="font-semibold">Company:</span> {employer.company_name || 'N/A'}
            </div>
            <div>
              <span className="font-semibold">Location:</span> {employer.location || 'N/A'}
            </div>
            <div>
              <span className="font-semibold">Joined:</span> {new Date(employer.created_at!).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Requirements Posted</h3>
          {requirements.length === 0 ? (
            <p>No requirements posted yet</p>
          ) : (
            <div className="space-y-6">
              {requirements.map((requirement) => (
                <div key={requirement.id} className="border rounded-lg p-4">
                  <div className="space-y-2">
                    <div>
                      <span className="font-semibold">Type:</span> {requirement.answers["1"]}
                    </div>
                    <div>
                      <span className="font-semibold">Industry:</span> {requirement.answers["2"]}
                    </div>
                    <div>
                      <span className="font-semibold">Duration:</span> {requirement.answers["3"]}
                    </div>
                    <div>
                      <span className="font-semibold">Responsibilities:</span> {requirement.answers["4"]}
                    </div>
                    <div>
                      <span className="font-semibold">Experience Required:</span> {requirement.answers["5"]}
                    </div>
                    <div className="text-sm text-gray-500">
                      Posted on: {new Date(requirement.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default EmployerDetails;