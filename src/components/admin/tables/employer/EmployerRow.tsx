import { TableCell, TableRow } from "@/components/ui/table";
import { RequirementDisplay } from "./RequirementDisplay";
import { Profile } from "./types";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface EmployerRowProps {
  employer: Profile;
}

export const EmployerRow = ({ employer }: EmployerRowProps) => {
  console.log('Employer requirements:', employer.requirements); // Debug log

  return (
    <TableRow key={employer.id}>
      <TableCell>{employer.full_name || 'N/A'}</TableCell>
      <TableCell>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="link" className="p-0 h-auto font-normal">
              {employer.email || 'N/A'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-2">
              <h4 className="font-medium">Requirement Details</h4>
              {employer.requirements && employer.requirements.length > 0 ? (
                employer.requirements.map((req) => (
                  <div key={req.id} className="text-sm space-y-1 border-b pb-2 last:border-0">
                    <p><strong>Type:</strong> {req.answers["1"]}</p>
                    <p><strong>Industry:</strong> {req.answers["2"]}</p>
                    <p><strong>Duration:</strong> {req.answers["3"]}</p>
                    <p><strong>Responsibilities:</strong> {req.answers["4"]}</p>
                    <p><strong>Experience Required:</strong> {req.answers["5"]}</p>
                    <p className="text-xs text-gray-500">
                      Submitted on: {new Date(req.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No requirements submitted</p>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </TableCell>
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