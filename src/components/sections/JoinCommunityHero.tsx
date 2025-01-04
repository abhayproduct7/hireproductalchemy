import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const JoinCommunityHero = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/10 via-secondary/5 to-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 animate-fade-up">
            Join Our Product Leadership Community
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 animate-fade-up">
            Connect with forward-thinking companies seeking experienced product leaders for both fractional and full-time roles. Shape the future of products while maintaining the flexibility you desire.
          </p>
          <Button 
            size="lg"
            onClick={() => navigate("/login")}
            className="bg-secondary hover:bg-secondary/90 animate-fade-up"
          >
            Apply to Join
          </Button>
        </div>
      </div>
    </section>
  );
};