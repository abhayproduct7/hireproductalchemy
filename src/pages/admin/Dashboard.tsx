import { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

const AdminDashboard = () => {
  const supabase = useSupabaseClient();
  const [employers, setEmployers] = useState<any[]>([]);
  const [talents, setTalents] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // First fetch employer profiles
      const { data: employerProfiles, error: employerProfileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_type', 'employer');

      if (employerProfileError) {
        console.error('Error fetching employer profiles:', employerProfileError);
        return;
      }

      // Then fetch their requirements separately
      if (employerProfiles) {
        const employersWithRequirements = await Promise.all(
          employerProfiles.map(async (employer) => {
            const { data: requirements } = await supabase
              .from('requirements')
              .select('*')
              .eq('user_id', employer.id);
            return {
              ...employer,
              requirements: requirements || []
            };
          })
        );
        setEmployers(employersWithRequirements);
      }

      // First fetch all candidate applications
      const { data: applications, error: applicationsError } = await supabase
        .from('candidate_applications')
        .select('*');

      if (applicationsError) {
        console.error('Error fetching applications:', applicationsError);
        return;
      }

      if (applications) {
        // Then fetch all related data for each application
        const talentsWithDetails = await Promise.all(
          applications.map(async (application) => {
            const [
              { data: profile },
              { data: skills },
              { data: experiences }
            ] = await Promise.all([
              // Get profile
              supabase
                .from('profiles')
                .select('*')
                .eq('id', application.user_id)
                .single(),
              // Get skills
              supabase
                .from('candidate_skills')
                .select('skills(name)')
                .eq('application_id', application.id),
              // Get work experiences
              supabase
                .from('work_experiences')
                .select('*')
                .eq('application_id', application.id)
            ]);

            return {
              ...application,
              profile,
              skills: skills || [],
              work_experiences: experiences || []
            };
          })
        );

        setTalents(talentsWithDetails);
      }
    };

    fetchData();
  }, [supabase]);

  return (
    <AdminLayout>
      <div className="space-y-8">
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

        <section>
          <h2 className="text-2xl font-bold mb-4">Talent Applications</h2>
          <div className="bg-white shadow rounded-lg overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Location</TableHead>
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
                {talents.map((talent) => (
                  <TableRow key={talent.id}>
                    <TableCell>{talent.profile?.full_name}</TableCell>
                    <TableCell>{talent.profile?.email}</TableCell>
                    <TableCell>{talent.profile?.location || 'N/A'}</TableCell>
                    <TableCell>{talent.years_experience} years</TableCell>
                    <TableCell>{talent.availability_type}</TableCell>
                    <TableCell>
                      {talent.earliest_start_date 
                        ? format(new Date(talent.earliest_start_date), 'PP')
                        : 'N/A'}
                    </TableCell>
                    <TableCell>
                      {talent.preferred_schedule ? (
                        <div>
                          <p>Hours/week: {talent.preferred_schedule.hoursPerWeek}</p>
                          <p>Timezone: {talent.preferred_schedule.timeZone}</p>
                        </div>
                      ) : 'N/A'}
                    </TableCell>
                    <TableCell>
                      {talent.skills?.map((skill: any) => (
                        <span key={skill.skills.name} className="inline-block bg-gray-100 rounded px-2 py-1 text-sm mr-1 mb-1">
                          {skill.skills.name}
                        </span>
                      ))}
                    </TableCell>
                    <TableCell>
                      {talent.work_experiences?.map((exp: any) => (
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
                        {talent.professional_summary}
                      </div>
                    </TableCell>
                    <TableCell>{format(new Date(talent.created_at), 'PP')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;