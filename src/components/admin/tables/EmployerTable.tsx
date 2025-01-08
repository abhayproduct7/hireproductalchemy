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
import { Profile, RequirementAnswers } from "./employer/types";

export const EmployerTable = () => {
  const supabase = useSupabaseClient<Database>();
  const [employers, setEmployers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        setLoading(true);
        
        // Fetch employer profiles
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_type', 'employer');

        if (profilesError) {
          console.error('Error fetching profiles:', profilesError);
          toast({
            title: "Error",
            description: "Failed to fetch employer profiles",
            variant: "destructive",
          });
          return;
        }

        if (!profiles) {
          setEmployers([]);
          return;
        }

        // Fetch requirements for each profile
        const employersWithData = await Promise.all(
          profiles.map(async (profile) => {
            const { data: reqs, error: reqsError } = await supabase
              .from('requirements')
              .select('*')
              .eq('user_id', profile.id);

            if (reqsError) {
              console.error('Error fetching requirements:', reqsError);
              return {
                ...profile,
                requirements: []
              };
            }

            const requirements = reqs?.map(req => ({
              ...req,
              answers: req.answers as RequirementAnswers
            })) || [];

            return {
              ...profile,
              requirements
            };
          })
        );

        console.log('Fetched employers with data:', employersWithData);
        setEmployers(employersWithData);
      } catch (error) {
        console.error('Error in fetchEmployers:', error);
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