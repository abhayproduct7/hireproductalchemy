import { Database } from "@/integrations/supabase/types";

type Requirement = Database["public"]["Tables"]["requirements"]["Row"];

interface RequirementDisplayProps {
  requirement: Requirement;
  index: number;
}

export const RequirementDisplay = ({ requirement, index }: RequirementDisplayProps) => {
  return (
    <div className="mb-2 p-2 bg-gray-50 rounded">
      <p><strong>Requirement {index + 1}:</strong></p>
      <ul className="list-disc pl-4 space-y-1">
        <li>Role Type: {requirement.answers?.type || 'N/A'}</li>
        <li>Industry: {requirement.answers?.industry || 'N/A'}</li>
        <li>Duration: {requirement.answers?.duration || 'N/A'}</li>
        <li>Experience: {requirement.answers?.experience || 'N/A'} years</li>
        <li>Timeline: {requirement.answers?.timeline || 'N/A'}</li>
        <li>Key Responsibilities: {requirement.answers?.responsibilities || 'N/A'}</li>
      </ul>
    </div>
  );
};