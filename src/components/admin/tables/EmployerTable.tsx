import { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Database } from "@/integrations/supabase/types";
import { EmployerRow } from "./employer/EmployerRow";
import { Profile, Requirement } from "./employer/types";

export const EmployerTable = () => {
  const supabase = useSupabaseClient<Database>();
  const [employers, setEmployers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        setLoading(true);
        
        // First fetch employer profiles
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_type', 'employer');

        if (profilesError) {
          console.error('Error fetching profiles:', profilesError);
          throw profilesError;
        }

        // Then fetch all requirements
        const { data: requirements, error: requirementsError } = await supabase
          .from('requirements')
          .select('*')
          .order('created_at', { ascending: false });

        if (requirementsError) {
          console.error('Error fetching requirements:', requirementsError);
          throw requirementsError;
        }

        // Map requirements to profiles
        const employersWithRequirements = profiles?.map(profile => ({
          ...profile,
          requirements: requirements.filter(req => req.user_id === profile.id).map(req => ({
            id: req.id,
            user_id: req.user_id,
            created_at: req.created_at,
            answers: req.answers as {
              "1": string;
              "2": string;
              "3": string;
              "4": string;
              "5": string;
            }
          }))
        })) || [];

        console.log('Employers with requirements:', employersWithRequirements);
        setEmployers(employersWithRequirements as Profile[]);
        
      } catch (error) {
        console.error('Error:', error);
        toast({
          title: "Error",
          description: "Failed to fetch employer data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEmployers();
  }, [supabase, toast]);

  if (loading) {
    return <div className="flex justify-center p-8">Loading employer data...</div>;
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Employer Enquiries</h2>
      {employers.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-6 text-center">
          No employer enquiries found
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Requirements</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employers.map((employer) => (
                <EmployerRow key={employer.id} employer={employer} />
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </section>
  );
};