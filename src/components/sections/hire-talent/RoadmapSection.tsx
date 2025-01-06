import { Rocket } from "lucide-react";
import { DeliverableItem } from "./DeliverableItem";
import { deliverables } from "./deliverables";

export const RoadmapSection = () => {
  return (
    <div className="relative mt-16 max-w-4xl mx-auto">
      {/* Vertical roadmap line with gradient */}
      <div className="absolute left-16 top-12 bottom-0 w-px bg-gradient-to-b from-secondary via-secondary/50 to-secondary/20" />
      
      {/* Rocket icon at the top with enhanced styling */}
      <div className="absolute left-16 -top-8 transform -translate-x-1/2">
        <div className="bg-white p-4 rounded-full shadow-xl border-2 border-secondary/20 animate-bounce">
          <Rocket className="h-8 w-8 text-secondary" />
        </div>
      </div>

      {/* Deliverables list with enhanced spacing */}
      <div className="space-y-16 pt-20">
        {deliverables.map((deliverable, index) => (
          <DeliverableItem
            key={index}
            {...deliverable}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};