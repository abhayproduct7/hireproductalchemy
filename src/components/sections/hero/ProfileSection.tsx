import { Users } from "lucide-react";

export const ProfileSection = () => {
  return (
    <div className="mb-6 animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
          <Users className="w-8 h-8 text-secondary" />
        </div>
        <div className="text-left">
          <h3 className="text-lg font-semibold text-gray-900">Senior Product Manager</h3>
          <p className="text-sm text-gray-600">8+ years experience</p>
        </div>
      </div>
    </div>
  );
};