import { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

export const EmployerTable = () => {
  const supabase = useSupabaseClient();
  const [employers, setEmployers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        setLoading(true);
        
        // First fetch employer profiles
        const { data: employerProfiles, error: employerError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_type', 'employer');

        if (employerError) {
          console.error('Error fetching employers:', employerError);
          toast({
            title: "Error",
            description: "Failed to fetch employer profiles",
            variant: "destructive",
          });
          return;
        }

        if (employerProfiles) {
          // Then fetch their requirements separately
          const employersWithRequirements = await Promise.all(
            employerProfiles.map(async (employer) => {
              const { data: requirements, error: reqError } = await supabase
                .from('requirements')
                .select('*')
                .eq('user_id', employer.id)
                .throwOnError();
              
              if (reqError) {
                console.error('Error fetching requirements for employer:', employer.id, reqError);
                toast({
                  title: "Error",
                  description: `Failed to fetch requirements for ${employer.full_name}`,
                  variant: "destructive",
                });
              }
              
              return {
                ...employer,
                requirements: requirements || []
              };
            })
          );

          console.log('Final employers data:', employersWithRequirements);
          setEmployers(employersWithRequirements);
        }
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
                <TableRow key={employer.id}>
                  <TableCell>{employer.full_name}</TableCell>
                  <TableCell>{employer.email}</TableCell>
                  <TableCell>{employer.company_name}</TableCell>
                  <TableCell>{employer.location || 'N/A'}</TableCell>
                  <TableCell>{employer.phone || 'N/A'}</TableCell>
                  <TableCell>
                    {employer.requirements?.length > 0 ? (
                      employer.requirements.map((req: any, index: number) => (
                        <div key={req.id} className="mb-2 p-2 bg-gray-50 rounded">
                          <p><strong>Requirement {index + 1}:</strong></p>
                          <ul className="list-disc pl-4 space-y-1">
                            <li>Role Type: {req.answers?.type || 'N/A'}</li>
                            <li>Industry: {req.answers?.industry || 'N/A'}</li>
                            <li>Duration: {req.answers?.duration || 'N/A'}</li>
                            <li>Experience: {req.answers?.experience || 'N/A'} years</li>
                            <li>Timeline: {req.answers?.timeline || 'N/A'}</li>
                            <li>Key Responsibilities: {req.answers?.responsibilities || 'N/A'}</li>
                          </ul>
                        </div>
                      ))
                    ) : (
                      <span className="text-gray-500">No requirements submitted</span>
                    )}
                  </TableCell>
                  <TableCell>{new Date(employer.created_at).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </section>
  );
};