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

const AdminDashboard = () => {
  const supabase = useSupabaseClient();
  const [employers, setEmployers] = useState<any[]>([]);
  const [talents, setTalents] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch employers
      const { data: employerData } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_type', 'employer');
      
      if (employerData) {
        setEmployers(employerData);
      }

      // Fetch talents with their profile information
      const { data: talentData } = await supabase
        .from('candidate_applications')
        .select(`
          *,
          user:user_id (
            profiles:profiles(*)
          )
        `);
      
      if (talentData) {
        setTalents(talentData);
      }
    };

    fetchData();
  }, [supabase]);

  return (
    <AdminLayout>
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Employer Enquiries</h2>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Created At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employers.map((employer) => (
                  <TableRow key={employer.id}>
                    <TableCell>{employer.full_name}</TableCell>
                    <TableCell>{employer.email}</TableCell>
                    <TableCell>{employer.company_name}</TableCell>
                    <TableCell>{new Date(employer.created_at).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Talent Applications</h2>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead>Created At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {talents.map((talent) => (
                  <TableRow key={talent.id}>
                    <TableCell>{talent.user?.profiles?.full_name}</TableCell>
                    <TableCell>{talent.years_experience} years</TableCell>
                    <TableCell>{talent.availability_type}</TableCell>
                    <TableCell>{new Date(talent.created_at).toLocaleDateString()}</TableCell>
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