import { Target, Map, Lightbulb, Users, GitPullRequest, Users2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const HireTalentHero = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b">
      <div className="max-w-6xl mx-auto">
        {/* Hero content */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-6">
            Hire Elite Product Specialists
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Work with the top 3% of product specialists who have proven track records 
            in driving successful product initiatives across various industries.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate("/requirements")}
            className="bg-primary hover:bg-primary/90"
          >
            Get Started Now
          </Button>
        </div>

        {/* Featured capabilities grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {deliverables.map((deliverable, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-md bg-secondary/10 shrink-0">
                  <deliverable.icon className="text-secondary h-5 w-5" />
                </div>
                <h3 className="font-medium text-gray-900">
                  {deliverable.title}
                </h3>
              </div>
              <p className="text-sm text-gray-600">
                {deliverable.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const deliverables = [
  {
    title: "Product Strategy & Roadmap Development",
    description: "Create comprehensive product strategies and strategic roadmaps aligned with business goals and market opportunities.",
    icon: Target,
  },
  {
    title: "MVP and Go-to-Market Strategy",
    description: "Define and execute lean MVP development plans and create effective go-to-market strategies for successful product launches.",
    icon: Map,
  },
  {
    title: "Ideation and Innovation",
    description: "Drive innovation through structured ideation processes and market analysis.",
    icon: Lightbulb,
  },
  {
    title: "User Research & Insights",
    description: "Conduct thorough user research to inform product decisions and feature prioritization.",
    icon: Users,
  },
  {
    title: "Agile Product Development",
    description: "Lead agile development processes to ensure efficient product delivery and iteration.",
    icon: GitPullRequest,
  },
  {
    title: "Stakeholder Management",
    description: "Effectively manage relationships with stakeholders across all levels of the organization.",
    icon: Users2,
  },
];