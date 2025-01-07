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

export const EmployerTable = () => {
  const supabase = useSupabaseClient();
  const [employers, setEmployers] = useState<any[]>([]);

  useEffect(() => {
    const fetchEmployers = async () => {
      // First fetch employer profiles
      const { data: employerProfiles, error: employerError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_type', 'employer');

      if (employerError) {
        console.error('Error fetching employers:', employerError);
        return;
      }

      console.log('Fetched employer profiles:', employerProfiles); // Debug log

      if (employerProfiles) {
        // Then fetch their requirements separately
        const employersWithRequirements = await Promise.all(
          employerProfiles.map(async (employer) => {
            // Debug log the employer ID being queried
            console.log('Fetching requirements for employer ID:', employer.id);
            
            const { data: requirements, error: reqError } = await supabase
              .from('requirements')
              .select('*')
              .eq('user_id', employer.id);
            
            if (reqError) {
              console.error('Error fetching requirements for employer:', employer.id, reqError);
            }
            
            // Log the raw requirements data
            console.log('Raw requirements data for employer:', employer.id, requirements);
            
            return {
              ...employer,
              requirements: requirements || []
            };
          })
        );

        console.log('Final employers data:', employersWithRequirements);
        setEmployers(employersWithRequirements);
      }
    };

    fetchEmployers();
  }, [supabase]);

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Employer Enquiries</h2>
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
                  {employer.requirements?.map((req: any, index: number) => (
                    <div key={req.id} className="mb-2">
                      <p><strong>Requirement {index + 1}:</strong></p>
                      <p>Type: {req.answers?.type || 'N/A'}</p>
                      <p>Industry: {req.answers?.industry || 'N/A'}</p>
                      <p>Duration: {req.answers?.duration || 'N/A'}</p>
                      <p>Experience: {req.answers?.experience || 'N/A'} years</p>
                    </div>
                  ))}
                </TableCell>
                <TableCell>{new Date(employer.created_at).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};