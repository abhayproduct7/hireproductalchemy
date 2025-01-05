import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { X } from "lucide-react";
import { JoinFormValues } from "../schema";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SkillsFieldProps {
  form: UseFormReturn<JoinFormValues>;
}

export const SkillsField = ({ form }: SkillsFieldProps) => {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    const skill = newSkill.trim();
    const currentSkills = form.getValues().skills || [];
    if (skill && !currentSkills.includes(skill)) {
      form.setValue("skills", [...currentSkills, skill]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const currentSkills = form.getValues().skills || [];
    form.setValue(
      "skills",
      currentSkills.filter((skill) => skill !== skillToRemove)
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <FormField
      control={form.control}
      name="skills"
      render={() => (
        <FormItem>
          <FormLabel>Skills</FormLabel>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a skill (e.g., Agile, User Research)"
              />
              <Button type="button" onClick={addSkill}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(form.getValues().skills || []).map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-1 bg-secondary/20 px-3 py-1 rounded-full"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};