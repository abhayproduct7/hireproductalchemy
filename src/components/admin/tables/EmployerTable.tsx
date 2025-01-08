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
import { EmployerRow } from "./employer/EmployerRow";
import { Database } from "@/integrations/supabase/types";
import { Profile, Requirement, RequirementAnswers } from "./employer/types";

export const EmployerTable = () => {
  const supabase = useSupabaseClient<Database>();
  const [employers, setEmployers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        setLoading(true);
        
        // First fetch all employer profiles
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_type', 'employer');

        if (profilesError) throw profilesError;

        // Then fetch requirements for each employer
        const employersWithRequirements = await Promise.all(
          (profiles || []).map(async (profile) => {
            const { data: requirements, error: reqError } = await supabase
              .from('requirements')
              .select('*')
              .eq('user_id', profile.id)
              .order('created_at', { ascending: false });

            if (reqError) {
              console.error('Error fetching requirements:', reqError);
              return {
                ...profile,
                requirements: []
              };
            }

            // Type cast the requirements to ensure they match our Requirement type
            const typedRequirements = (requirements || []).map(req => ({
              ...req,
              answers: req.answers as unknown as RequirementAnswers
            })) as Requirement[];

            console.log('Fetched requirements for profile:', profile.id, typedRequirements); // Debug log

            return {
              ...profile,
              requirements: typedRequirements
            } as Profile;
          })
        );

        console.log('Fetched employers with requirements:', employersWithRequirements); // Debug log
        setEmployers(employersWithRequirements);
        
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
                <TableHead>Project Requirements</TableHead>
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