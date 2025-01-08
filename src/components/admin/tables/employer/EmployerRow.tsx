import { Database } from "@/integrations/supabase/types";
import { TableCell, TableRow } from "@/components/ui/table";
import { RequirementDisplay } from "./RequirementDisplay";

type Profile = Database["public"]["Tables"]["profiles"]["Row"] & {
  requirements: Database["public"]["Tables"]["requirements"]["Row"][];
};

interface EmployerRowProps {
  employer: Profile;
}

export const EmployerRow = ({ employer }: EmployerRowProps) => {
  return (
    <TableRow key={employer.id}>
      <TableCell>{employer.full_name || 'N/A'}</TableCell>
      <TableCell>{employer.email || 'N/A'}</TableCell>
      <TableCell>{employer.company_name || 'N/A'}</TableCell>
      <TableCell>{employer.location || 'N/A'}</TableCell>
      <TableCell>{employer.phone || 'N/A'}</TableCell>
      <TableCell>
        {employer.requirements && employer.requirements.length > 0 ? (
          employer.requirements.map((req, index) => (
            <RequirementDisplay 
              key={req.id} 
              requirement={req} 
              index={index} 
            />
          ))
        ) : (
          <span className="text-gray-500">No requirements submitted</span>
        )}
      </TableCell>
      <TableCell>{new Date(employer.created_at!).toLocaleDateString()}</TableCell>
    </TableRow>
  );
};