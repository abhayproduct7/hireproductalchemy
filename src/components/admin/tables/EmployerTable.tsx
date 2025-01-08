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
        console.log("Fetching employers..."); // Debug log
        
        // First fetch all employer profiles
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_type', 'employer');

        if (profilesError) {
          console.error('Profiles error:', profilesError); // Debug log
          throw profilesError;
        }

        console.log("Fetched profiles:", profiles); // Debug log

        // Then fetch requirements for each employer
        const employersWithRequirements = await Promise.all(
          (profiles || []).map(async (profile) => {
            console.log("Fetching requirements for profile:", profile.id); // Debug log
            
            const { data: requirements, error: reqError } = await supabase
              .from('requirements')
              .select('*')
              .eq('user_id', profile.id);

            if (reqError) {
              console.error('Requirements error for profile', profile.id, ':', reqError); // Debug log
              return {
                ...profile,
                requirements: []
              };
            }

            console.log("Requirements for profile", profile.id, ":", requirements); // Debug log

            // Map requirements data
            const mappedRequirements = requirements?.map(req => ({
              id: req.id,
              user_id: req.user_id,
              created_at: req.created_at,
              answers: req.answers as {
                "1": string; // Role Type
                "2": string; // Industry
                "3": string; // Duration
                "4": string; // Responsibilities
                "5": string; // Experience
              }
            })) || [];

            return {
              ...profile,
              requirements: mappedRequirements
            };
          })
        );

        console.log("Final employers data:", employersWithRequirements); // Debug log
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