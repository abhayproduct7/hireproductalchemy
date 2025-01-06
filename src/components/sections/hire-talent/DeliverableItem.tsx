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
      className="flex items-start gap-8 pl-32 animate-fade-up group"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Connection line with gradient on hover */}
      <div className="relative">
        <div className="absolute left-[-5.5rem] top-1/2 w-8 h-px bg-gradient-to-r from-secondary/30 to-secondary group-hover:from-secondary group-hover:to-secondary/50 transition-colors duration-300" />
        
        {/* Icon container with enhanced styling */}
        <div className="w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center border-2 border-secondary/20 group-hover:border-secondary/40 transition-all duration-300 transform group-hover:-translate-y-1">
          <Icon className="h-6 w-6 text-secondary" />
        </div>
      </div>

      {/* Content with enhanced typography and hover effects */}
      <div className="flex-1 -mt-1 bg-white/50 p-6 rounded-lg border border-secondary/10 group-hover:border-secondary/20 transition-all duration-300 transform group-hover:-translate-y-1 group-hover:shadow-lg">
        <h3 className="text-xl font-semibold mb-2 text-secondary group-hover:text-secondary/80 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};