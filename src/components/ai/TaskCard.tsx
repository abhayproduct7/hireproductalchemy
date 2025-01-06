import { FC } from "react";
import { LucideIcon } from "lucide-react";

interface TaskCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const TaskCard: FC<TaskCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-background rounded-lg p-2 border border-secondary/10">
      <div className="flex items-center gap-2">
        <div className="bg-secondary/10 w-5 h-5 rounded-full flex items-center justify-center">
          <Icon className="h-3 w-3 text-secondary" />
        </div>
        <div>
          <h3 className="text-xs font-medium">{title}</h3>
          <p className="text-[10px] text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};