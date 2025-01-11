import { TableCell, TableRow } from "@/components/ui/table";
import { Profile } from "./types";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EmployerRowProps {
  employer: Profile;
}

export const EmployerRow = ({ employer }: EmployerRowProps) => {
  console.log("Full employer data:", employer);
  console.log("Requirements data:", employer.requirements);

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
            <Button variant="link" className="p-0 h-auto font-normal underline">
              {employer.email || 'N/A'}
            </Button>
          </PopoverTrigger>
          <PopoverContent 
            className="w-[400px] bg-white border border-gray-200 shadow-lg rounded-md p-0" 
            sideOffset={5}
          >
            <div className="bg-secondary px-4 py-3 rounded-t-md">
              <h4 className="font-medium text-white">Requirements</h4>
            </div>
            <ScrollArea className="h-[300px] p-4">
              {employer.requirements && employer.requirements.length > 0 ? (
                employer.requirements.map((req) => {
                  console.log("Processing requirement:", req);
                  return (
                    <div key={req.id} className="mb-4 last:mb-0">
                      <div className="bg-muted rounded-md p-3 space-y-2">
                        {Object.keys(questionLabels).map((key) => (
                          <p key={key} className="text-sm">
                            <strong className="text-secondary">
                              {questionLabels[key as keyof typeof questionLabels]}:
                            </strong>{' '}
                            <span className="text-gray-700">
                              {formatRequirementAnswer(req.answers[key as keyof typeof req.answers], key)}
                            </span>
                          </p>
                        ))}
                        <p className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-200">
                          Submitted: {new Date(req.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-gray-500 p-4">No requirements submitted</p>
              )}
            </ScrollArea>
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