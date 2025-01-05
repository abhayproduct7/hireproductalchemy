import { LucideIcon } from "lucide-react";

interface DeliverableItemProps {
  title: string;
  description: string;
  icon: LucideIcon;
  index: number;
}

export const DeliverableItem = ({ 
  title, 
  description, 
  icon: Icon, 
  index 
}: DeliverableItemProps) => {
  return (
    <div
      className="flex items-start gap-8 pl-32 animate-fade-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative">
        <div className="absolute left-[-5.5rem] top-1/2 w-8 h-px bg-secondary/30" />
        <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center border-2 border-secondary/20">
          <Icon className="h-5 w-5 text-secondary" />
        </div>
      </div>

      <div className="flex-1 -mt-1">
        <h3 className="text-lg font-semibold mb-1 text-secondary">
          {title}
        </h3>
        <p className="text-sm text-[#8E9196]">
          {description}
        </p>
      </div>
    </div>
  );
};