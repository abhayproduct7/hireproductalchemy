import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Profile } from "./types";

interface EmployerRowProps {
  employer: Profile;
  onViewDetails: () => void;
}

export const EmployerRow = ({ employer, onViewDetails }: EmployerRowProps) => {
  return (
    <TableRow>
      <TableCell>{employer.email || 'N/A'}</TableCell>
      <TableCell>{employer.company_name || 'N/A'}</TableCell>
      <TableCell>{employer.location || 'N/A'}</TableCell>
      <TableCell>{new Date(employer.created_at!).toLocaleDateString()}</TableCell>
      <TableCell>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onViewDetails}
        >
          View Details
        </Button>
      </TableCell>
    </TableRow>
  );
};