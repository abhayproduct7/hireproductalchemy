import { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Database } from "@/integrations/supabase/types";

interface Requirement {
  id: number;
  created_at: string;
  answers: {
    type: string;
    email: string;
    company: string;
    duration: string;
    industry: string;
    timeline: string;
    responsibilities: string;
  };
  user_id?: string;
}

export const EmployerTable = () => {
  const supabase = useSupabaseClient<Database>();
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('requirements')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching requirements:', error);
          throw error;
        }

        console.log('Requirements data:', data);
        setRequirements(data || []);
        
      } catch (error) {
        console.error('Error:', error);
        toast({
          title: "Error",
          description: "Failed to fetch requirements data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRequirements();
  }, [supabase, toast]);

  if (loading) {
    return <div className="flex justify-center p-8">Loading requirements data...</div>;
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Employer Requirements</h2>
      {requirements.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-6 text-center">
          No requirements found
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role Type</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Timeline</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requirements.map((requirement) => (
                <TableRow key={requirement.id}>
                  <TableCell>{requirement.answers.company}</TableCell>
                  <TableCell>{requirement.answers.email}</TableCell>
                  <TableCell>{requirement.answers.type}</TableCell>
                  <TableCell>{requirement.answers.industry}</TableCell>
                  <TableCell>{requirement.answers.duration}</TableCell>
                  <TableCell>{requirement.answers.timeline}</TableCell>
                  <TableCell>{new Date(requirement.created_at).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </section>
  );
};