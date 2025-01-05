import { HeroHeader } from "./hire-talent/HeroHeader";
import { RoadmapSection } from "./hire-talent/RoadmapSection";

export const HireTalentHero = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/5 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <HeroHeader />
        <RoadmapSection />
      </div>
    </section>
  );
};