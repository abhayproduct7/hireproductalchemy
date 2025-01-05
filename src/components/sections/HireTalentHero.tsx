import { HeroHeader } from "./hire-talent/HeroHeader";
import { RoadmapSection } from "./hire-talent/RoadmapSection";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const HireTalentHero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    console.log("Navigating to requirements page");
    navigate("/requirements");
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/5 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <HeroHeader />
        <RoadmapSection />
        
        {/* CTA Button centered below roadmap */}
        <div className="mt-20 text-center animate-fade-up">
          <Button 
            size="lg" 
            onClick={handleGetStarted}
            className="bg-secondary hover:bg-secondary/90"
          >
            Get Started Now
          </Button>
        </div>
      </div>
    </section>
  );
};