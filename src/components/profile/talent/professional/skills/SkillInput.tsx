import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SkillInputProps {
  onAddSkill: (skill: string) => void;
}

export const SkillInput = ({ onAddSkill }: SkillInputProps) => {
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      onAddSkill(newSkill);
      setNewSkill("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        value={newSkill}
        onChange={(e) => setNewSkill(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Add a skill (e.g., Agile, User Research)"
      />
      <Button type="button" onClick={handleAddSkill}>
        Add
      </Button>
    </div>
  );
};