import { TableCell, TableRow } from "@/components/ui/table";
import { Profile } from "./types";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface EmployerRowProps {
  employer: Profile;
}

export const EmployerRow = ({ employer }: EmployerRowProps) => {
  console.log("Full employer data:", employer); // Debug log
  console.log("Requirements data:", employer.requirements); // Debug log

  const formatRequirementAnswer = (answer: string | null, questionKey: string) => {
    if (!answer) return 'Not specified';
    
    switch (questionKey) {
      case '1': // Role Type
        return answer;
      case '2': // Industry
        return answer;
      case '3': // Duration
        return answer;
      case '4': // Responsibilities
        return answer;
      case '5': // Experience
        return `${answer} years`;
      default:
        return answer;
    }
  };

  const questionLabels = {
    "1": "Role Type",
    "2": "Industry",
    "3": "Duration",
    "4": "Responsibilities",
    "5": "Experience Required"
  };

  return (
    <TableRow>
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
              <h4 className="font-medium">Requirements</h4>
              {employer.requirements && employer.requirements.length > 0 ? (
                employer.requirements.map((req) => {
                  console.log("Processing requirement:", req); // Debug log for each requirement
                  return (
                    <div key={req.id} className="text-sm space-y-1 border-b pb-2 last:border-0">
                      {Object.keys(questionLabels).map((key) => (
                        <p key={key}>
                          <strong>{questionLabels[key as keyof typeof questionLabels]}:</strong>{' '}
                          {formatRequirementAnswer(req.answers[key as keyof typeof req.answers], key)}
                        </p>
                      ))}
                      <p className="text-xs text-gray-500">
                        Submitted: {new Date(req.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  );
                })
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
        <span className="text-sm">
          {employer.requirements ? employer.requirements.length : 0} requirement{employer.requirements && employer.requirements.length !== 1 ? 's' : ''} submitted
        </span>
      </TableCell>
      <TableCell>{new Date(employer.created_at!).toLocaleDateString()}</TableCell>
    </TableRow>
  );
};