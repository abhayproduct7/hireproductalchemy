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
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { Database } from "@/integrations/supabase/types";

type CandidateApplication = Database['public']['Tables']['candidate_applications']['Row'] & {
  skills?: { skills: { name: string } }[];
  work_experiences?: Database['public']['Tables']['work_experiences']['Row'][];
};

export const TalentTable = () => {
  const supabase = useSupabaseClient<Database>();
  const [applications, setApplications] = useState<CandidateApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch candidate applications with their skills and work experiences
        const { data, error: fetchError } = await supabase
          .from('candidate_applications')
          .select(`
            *,
            skills:candidate_skills(skills(name)),
            work_experiences(*)
          `);

        if (fetchError) {
          console.error('Error fetching applications:', fetchError);
          throw fetchError;
        }

        console.log("Fetched applications:", data);
        setApplications(data || []);
        
      } catch (err) {
        console.error('Error in fetchApplications:', err);
        setError('Failed to fetch applications');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [supabase]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4">
        {error}
      </div>
    );
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Talent Applications ({applications.length})</h2>
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Experience</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Schedule</TableHead>
              <TableHead>Skills</TableHead>
              <TableHead>Work History</TableHead>
              <TableHead>Professional Summary</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4">
                  No applications found
                </TableCell>
              </TableRow>
            ) : (
              applications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell>{application.years_experience} years</TableCell>
                  <TableCell>{application.availability_type}</TableCell>
                  <TableCell>
                    {application.earliest_start_date 
                      ? format(new Date(application.earliest_start_date), 'PP')
                      : 'N/A'}
                  </TableCell>
                  <TableCell>
                    {application.preferred_schedule ? (
                      <div>
                        <p>Hours/week: {application.preferred_schedule.hoursPerWeek}</p>
                        <p>Timezone: {application.preferred_schedule.timeZone}</p>
                      </div>
                    ) : 'N/A'}
                  </TableCell>
                  <TableCell>
                    {application.skills?.map((skill, index) => (
                      <span key={index} className="inline-block bg-gray-100 rounded px-2 py-1 text-sm mr-1 mb-1">
                        {skill.skills.name}
                      </span>
                    ))}
                  </TableCell>
                  <TableCell>
                    {application.work_experiences?.map((exp) => (
                      <div key={exp.id} className="mb-2">
                        <p><strong>{exp.role_title}</strong></p>
                        <p>{exp.company_name}</p>
                        <p>{exp.industry}</p>
                        <p>{format(new Date(exp.start_date), 'PP')} - 
                           {exp.end_date ? format(new Date(exp.end_date), 'PP') : 'Present'}</p>
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs overflow-hidden text-ellipsis">
                      {application.professional_summary}
                    </div>
                  </TableCell>
                  <TableCell>{format(new Date(application.created_at), 'PP')}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};