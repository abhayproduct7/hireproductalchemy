import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

interface PasswordRequirement {
  met: boolean;
  text: string;
}

interface PasswordRequirementsProps {
  requirements: PasswordRequirement[];
  show: boolean;
}

export const PasswordRequirements = ({ requirements, show }: PasswordRequirementsProps) => {
  if (!show) return null;

  return (
    <Alert variant="info" className="animate-fade-in">
      <Info className="h-4 w-4" />
      <AlertDescription>
        <div className="text-sm mt-1">
          Password requirements:
          <ul className="list-disc pl-5 mt-1 space-y-1">
            {requirements.map((req, index) => (
              <li
                key={index}
                className={req.met ? "text-green-600" : "text-blue-600"}
              >
                {req.text} {req.met && "✓"}
              </li>
            ))}
          </ul>
        </div>
      </AlertDescription>
    </Alert>
  );
};