import { FC } from "react";
import { LucideIcon, Clock } from "lucide-react";

interface TaskCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  traditionalHours: number;
  enhancedHours: number;
}

export const TaskCard: FC<TaskCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  traditionalHours,
  enhancedHours 
}) => {
  return (
    <div className="bg-background rounded-lg py-2.5 px-2 border border-secondary/10 h-[56px]">
      <div className="flex items-center gap-2">
        <div className="bg-secondary/10 w-5 h-5 rounded-full flex items-center justify-center">
          <Icon className="h-3 w-3 text-secondary" />
        </div>
        <div className="flex-1">
          <h3 className="text-[11px] font-medium leading-tight">{title}</h3>
          <p className="text-[9px] text-muted-foreground leading-tight">{description}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <div className="flex items-center gap-1">
              <Clock className="h-2.5 w-2.5 text-muted-foreground" />
              <span className="text-[8px] text-muted-foreground line-through">{traditionalHours}h</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-2.5 w-2.5 text-green-500" />
              <span className="text-[8px] text-green-500 font-medium">{enhancedHours}h</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};