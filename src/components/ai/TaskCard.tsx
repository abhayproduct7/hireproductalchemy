import { FC } from "react";
import { LucideIcon } from "lucide-react";

interface TaskCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color?: string;
}

export const TaskCard: FC<TaskCardProps> = ({ icon: Icon, title, description, color = "#0EA5E9" }) => {
  return (
    <div className="bg-background rounded-lg py-2.5 px-2 border border-secondary/10 h-[48px]">
      <div className="flex items-center gap-2">
        <div 
          className="w-5 h-5 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${color}15` }} // Using 15% opacity version of the color
        >
          <Icon className="h-3 w-3" style={{ color: color }} />
        </div>
        <div>
          <h3 className="text-[11px] font-medium leading-tight">{title}</h3>
          <p className="text-[9px] text-muted-foreground leading-tight">{description}</p>
        </div>
      </div>
    </div>
  );
};