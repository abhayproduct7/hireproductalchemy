import { useNavigate } from "react-router-dom";

export const HeroHeader = () => {
  return (
    <div className="mb-12 text-center">
      <h1 className="text-3xl font-bold text-[#1A1F2C] leading-tight mb-4 animate-fade-up">
        Hire top product specialists
      </h1>
      <p className="text-base text-[#8E9196] mb-6 animate-fade-up delay-100">
        Connect with experienced product leaders who bring proven expertise in 
        scaling products from ideation to market success.
      </p>
    </div>
  );
};