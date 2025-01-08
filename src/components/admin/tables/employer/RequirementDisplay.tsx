import { Requirement } from "./types";

interface RequirementDisplayProps {
  requirement: Requirement;
  index: number;
}

export const RequirementDisplay = ({ requirement, index }: RequirementDisplayProps) => {
  if (!requirement.answers) {
    return null;
  }

  return (
    <div className="mb-2 p-2 bg-gray-50 rounded">
      <p className="font-medium mb-1">Requirement {index + 1}:</p>
      <ul className="list-disc pl-4 space-y-1 text-sm">
        <li>Role Type: {requirement.answers.type || 'N/A'}</li>
        <li>Industry: {requirement.answers.industry || 'N/A'}</li>
        <li>Duration: {requirement.answers.duration || 'N/A'}</li>
        <li>Experience: {requirement.answers.experience || 'N/A'} years</li>
        <li>Timeline: {requirement.answers.timeline || 'N/A'}</li>
        <li>Key Responsibilities: {requirement.answers.responsibilities || 'N/A'}</li>
      </ul>
    </div>
  );
};