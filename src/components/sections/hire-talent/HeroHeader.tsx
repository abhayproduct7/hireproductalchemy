import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const HeroHeader = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    console.log("Navigating to requirements page");
    navigate("/requirements");
  };

  return (
    <div className="mb-12">
      <h1 className="text-3xl font-bold text-[#1A1F2C] leading-tight mb-4 animate-fade-up">
        Achieving Strategic Product Management Excellence
      </h1>
      <p className="text-base text-[#8E9196] mb-6 animate-fade-up delay-100">
        Connect with experienced product leaders who bring proven expertise in 
        scaling products from ideation to market success.
      </p>
      <Button 
        size="lg" 
        onClick={handleGetStarted}
        className="bg-secondary hover:bg-secondary/90 animate-fade-up delay-200"
      >
        Get Started Now
      </Button>
    </div>
  );
};