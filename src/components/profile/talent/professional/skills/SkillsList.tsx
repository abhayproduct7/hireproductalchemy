import { Loader2, X } from "lucide-react";

interface SkillsListProps {
  skills: string[];
  isLoading: boolean;
  onRemoveSkill: (skill: string) => void;
}

export const SkillsList = ({ skills, isLoading, onRemoveSkill }: SkillsListProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center">
        <Loader2 className="h-4 w-4 animate-spin mr-2" />
        Loading skills...
      </div>
    );
  }

  if (skills.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No skills added yet. Add some skills to help match with opportunities.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <div
          key={skill}
          className="flex items-center gap-1 bg-secondary/20 px-3 py-1 rounded-full"
        >
          <span>{skill}</span>
          <button
            type="button"
            onClick={() => onRemoveSkill(skill)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
};