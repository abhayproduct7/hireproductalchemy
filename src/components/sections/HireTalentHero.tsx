import { Target, Map, Lightbulb, Users, GitPullRequest, Users2, Rocket } from "lucide-react";
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
        {/* Visual roadmap in the right corner */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
          <div className="relative h-full">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-px h-full bg-secondary/50" />
            </div>
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <div
                key={index}
                className="absolute left-1/2 transform -translate-x-1/2"
                style={{ top: `${index * 16.66}%` }}
              >
                <div className="w-4 h-4 rounded-full bg-secondary/50" />
              </div>
            ))}
          </div>
        </div>

        {/* Main content aligned to the left */}
        <div className="w-full lg:w-2/3 pr-8">
          <div className="mb-16">
            <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-6 animate-fade-up">
              Achieving Strategic Product Management Excellence
            </h1>
            <p className="text-lg text-gray-600 mb-8 animate-fade-up delay-100">
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

          <div className="space-y-8">
            {deliverables.map((deliverable, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg bg-white/50 backdrop-blur-sm animate-fade-up hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-secondary/20">
                    <deliverable.icon className="h-6 w-6 text-secondary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className={`text-xl font-semibold mb-2 ${deliverable.titleColor}`}>
                    {deliverable.title}
                  </h3>
                  <p className="text-gray-600">
                    {deliverable.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const deliverables = [
  {
    title: "Stakeholder Management",
    description: "Effectively manage relationships across all levels of the organization.",
    icon: Users2,
    titleColor: "text-purple-500"
  },
  {
    title: "Agile Development",
    description: "Lead agile development processes to ensure efficient product delivery and iteration.",
    icon: GitPullRequest,
    titleColor: "text-red-500"
  },
  {
    title: "User Research & Insights",
    description: "Conduct thorough user research to inform product decisions and feature prioritization.",
    icon: Users,
    titleColor: "text-green-500"
  },
  {
    title: "Ideation & Innovation",
    description: "Drive innovation through structured ideation processes and market analysis.",
    icon: Lightbulb,
    titleColor: "text-yellow-500"
  },
  {
    title: "MVP and Go-to-Market Strategy",
    description: "Define and execute lean MVP development plans and create effective go-to-market strategies for successful product launches.",
    icon: Map,
    titleColor: "text-orange-500"
  },
  {
    title: "Product Strategy & Roadmap",
    description: "Create comprehensive product strategies and strategic roadmaps aligned with business goals and market opportunities.",
    icon: Target,
    titleColor: "text-blue-500"
  }
];