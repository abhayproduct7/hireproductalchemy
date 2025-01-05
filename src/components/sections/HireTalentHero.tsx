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
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/5 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
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

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 transform -translate-x-1/2" />
          
          {/* Rocket icon at the top */}
          <div className="absolute left-1/2 -top-8 transform -translate-x-1/2">
            <div className="bg-white p-2 rounded-full shadow-lg">
              <Rocket className="h-6 w-6 text-secondary animate-bounce" />
            </div>
          </div>

          <div className="space-y-24">
            {deliverables.map((deliverable, index) => (
              <div
                key={index}
                className={`flex items-center gap-8 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                } animate-fade-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                  <h3 className={`text-xl font-semibold mb-2 ${deliverable.titleColor}`}>
                    {deliverable.title}
                  </h3>
                  <p className="text-gray-600">
                    {deliverable.description}
                  </p>
                </div>

                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-secondary/20">
                    <deliverable.icon className="h-6 w-6 text-secondary" />
                  </div>
                </div>

                <div className="flex-1" />
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