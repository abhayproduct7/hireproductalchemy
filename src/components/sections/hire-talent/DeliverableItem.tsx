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
      className="flex items-start gap-6 pl-24 animate-fade-up group"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Connection line with gradient on hover */}
      <div className="relative">
        <div className="absolute left-[-4rem] top-1/2 w-6 h-px bg-gradient-to-r from-secondary/30 to-secondary group-hover:from-secondary group-hover:to-secondary/50 transition-colors duration-300" />
        
        {/* Icon container with enhanced styling */}
        <div className="w-8 h-8 rounded-lg bg-white shadow-md flex items-center justify-center border border-secondary/20 group-hover:border-secondary/40 transition-all duration-300">
          <Icon className="h-4 w-4 text-secondary" />
        </div>
      </div>

      {/* Content container with hover effect */}
      <div className="overflow-hidden">
        <h3 className="text-base font-medium text-secondary group-hover:text-secondary/80 transition-colors cursor-pointer mb-1">
          {title}
        </h3>
        <div className="h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
          <p className="text-sm text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};