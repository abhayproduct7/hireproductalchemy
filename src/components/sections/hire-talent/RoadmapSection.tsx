import { Rocket } from "lucide-react";
import { DeliverableItem } from "./DeliverableItem";
import { deliverables } from "./deliverables";

export const RoadmapSection = () => {
  return (
    <div className="relative mt-16">
      {/* Vertical roadmap line */}
      <div className="absolute left-16 top-12 h-full w-px bg-secondary/30" />
      
      {/* Rocket icon at the top */}
      <div className="absolute left-16 -top-8 transform -translate-x-1/2 mb-16">
        <div className="bg-white p-3 rounded-full shadow-lg border-2 border-secondary/20">
          <Rocket className="h-8 w-8 text-secondary" />
        </div>
      </div>

      {/* Deliverables list */}
      <div className="space-y-12 pt-16">
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