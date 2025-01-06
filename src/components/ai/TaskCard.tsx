import { FC } from "react";
import { LucideIcon } from "lucide-react";

interface TaskCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const TaskCard: FC<TaskCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-background rounded-lg py-2.5 px-3 border border-secondary/10 h-[48px]">
      <div className="flex items-center gap-2.5">
        <div className="bg-secondary/10 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">
          <Icon className="h-3 w-3 text-secondary" />
        </div>
        <div>
          <h3 className="text-xs font-medium leading-tight">{title}</h3>
          <p className="text-[10px] text-muted-foreground leading-tight">{description}</p>
        </div>
      </div>
    </div>
  );
};