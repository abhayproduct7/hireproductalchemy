import { Rocket } from "lucide-react";
import { DeliverableItem } from "./DeliverableItem";
import { deliverables } from "./deliverables";

export const RoadmapSection = () => {
  return (
    <div className="relative mt-12 max-w-3xl mx-auto">
      {/* Vertical roadmap line with gradient */}
      <div className="absolute left-12 top-10 bottom-0 w-px bg-gradient-to-b from-secondary via-secondary/50 to-secondary/20" />
      
      {/* Rocket icon at the top */}
      <div className="absolute left-12 -top-6 transform -translate-x-1/2">
        <div className="bg-white p-2 rounded-full shadow-md border border-secondary/20 animate-bounce">
          <Rocket className="h-5 w-5 text-secondary" />
        </div>
      </div>

      {/* Deliverables list with enhanced spacing */}
      <div className="space-y-8 pt-12">
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