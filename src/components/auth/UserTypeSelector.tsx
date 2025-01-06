import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface UserTypeSelectorProps {
  userType: "talent" | "employer" | null;
  onUserTypeChange: (value: "talent" | "employer") => void;
}

export const UserTypeSelector = ({ userType, onUserTypeChange }: UserTypeSelectorProps) => {
  return (
    <div className="space-y-4 mb-6">
      <Label className="text-base font-medium">Join as:</Label>
      <RadioGroup
        value={userType || ""}
        onValueChange={(value) => onUserTypeChange(value as "talent" | "employer")}
        className="grid grid-cols-2 gap-4"
      >
        <div className="flex items-center space-x-2 border rounded-md p-4 hover:bg-gray-50 cursor-pointer">
          <RadioGroupItem value="talent" id="talent" />
          <Label htmlFor="talent" className="cursor-pointer">Talent</Label>
        </div>
        <div className="flex items-center space-x-2 border rounded-md p-4 hover:bg-gray-50 cursor-pointer">
          <RadioGroupItem value="employer" id="employer" />
          <Label htmlFor="employer" className="cursor-pointer">Employer</Label>
        </div>
      </RadioGroup>
    </div>
  );
};