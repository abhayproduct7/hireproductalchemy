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

        <div className="relative mt-16"> {/* Added mt-16 for spacing below the content */}
          {/* Vertical roadmap line */}
          <div className="absolute left-16 top-12 h-full w-px bg-secondary/30" /> {/* Adjusted top spacing */}
          
          {/* Rocket icon at the top with increased bottom margin */}
          <div className="absolute left-16 -top-8 transform -translate-x-1/2 mb-16"> {/* Added mb-16 */}
            <div className="bg-white p-3 rounded-full shadow-lg border-2 border-secondary/20">
              <Rocket className="h-8 w-8 text-secondary" />
            </div>
          </div>

          {/* Added pt-16 to create space between rocket and first item */}
          <div className="space-y-12 pt-16">
            {deliverables.map((deliverable, index) => (
              <div
                key={index}
                className="flex items-start gap-8 pl-32 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon with connecting line */}
                <div className="relative">
                  <div className="absolute left-[-5.5rem] top-1/2 w-8 h-px bg-secondary/30" />
                  <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center border-2 border-secondary/20">
                    <deliverable.icon className="h-5 w-5 text-secondary" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 -mt-1">
                  <h3 className={`text-lg font-semibold mb-1 ${deliverable.titleColor}`}>
                    {deliverable.title}
                  </h3>
                  <p className="text-sm text-[#8E9196]">
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
    titleColor: "text-[#9b87f5]"
  },
  {
    title: "Agile Development",
    description: "Lead agile development processes to ensure efficient product delivery and iteration.",
    icon: GitPullRequest,
    titleColor: "text-[#7E69AB]"
  },
  {
    title: "User Research & Insights",
    description: "Conduct thorough user research to inform product decisions and feature prioritization.",
    icon: Users,
    titleColor: "text-[#6E59A5]"
  },
  {
    title: "Ideation & Innovation",
    description: "Drive innovation through structured ideation processes and market analysis.",
    icon: Lightbulb,
    titleColor: "text-[#8B5CF6]"
  },
  {
    title: "MVP and Go-to-Market Strategy",
    description: "Define and execute lean MVP development plans and create effective go-to-market strategies for successful product launches.",
    icon: Map,
    titleColor: "text-[#D6BCFA]"
  },
  {
    title: "Product Strategy & Roadmap",
    description: "Create comprehensive product strategies and strategic roadmaps aligned with business goals and market opportunities.",
    icon: Target,
    titleColor: "text-[#9b87f5]"
  }
];