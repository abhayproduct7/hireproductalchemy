import { Requirement } from "./types";

interface RequirementDisplayProps {
  requirement: Requirement;
  index: number;
}

export const RequirementDisplay = ({ requirement, index }: RequirementDisplayProps) => {
  if (!requirement.answers) {
    return null;
  }

  const answers = requirement.answers;

  return (
    <div className="mb-2 p-2 bg-gray-50 rounded">
      <p className="font-medium mb-1">Requirement {index + 1}:</p>
      <ul className="list-disc pl-4 space-y-1 text-sm">
        <li>Role Type: {answers["1"] || 'N/A'}</li>
        <li>Industry: {answers["2"] || 'N/A'}</li>
        <li>Duration: {answers["3"] || 'N/A'}</li>
        <li>Key Responsibilities: {answers["4"] || 'N/A'}</li>
        <li>Experience: {answers["5"] || 'N/A'} years</li>
      </ul>
    </div>
  );
};