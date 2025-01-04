import { Target, Map, Lightbulb, Users, GitPullRequest, Users2 } from "lucide-react";

export const HireTalentHero = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left column - Main content */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              Hire Elite Product Managers
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Work with the top 3% of product management talent who have proven track records 
              in driving successful product initiatives across various industries.
            </p>
          </div>

          {/* Right column - Key deliverables */}
          <div className="grid grid-cols-2 gap-4">
            {deliverables.slice(0, 4).map((deliverable, index) => (
              <div
                key={index}
                className="group p-4 bg-gray-50 rounded-lg hover:bg-white hover:shadow-md 
                         transition-all duration-300"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <deliverable.icon className="text-secondary h-5 w-5" />
                  <h3 className="text-sm font-semibold text-gray-900">
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

        {/* Bottom section - Additional value props */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-8">
          {deliverables.slice(4).map((deliverable, index) => (
            <div
              key={index}
              className="flex items-start space-x-3"
            >
              <div className="p-2 rounded-md bg-secondary/5">
                <deliverable.icon className="text-secondary h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  {deliverable.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {deliverable.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const deliverables = [
  {
    title: "Product Strategy Development",
    description: "Create comprehensive product strategies aligned with business goals and market opportunities.",
    icon: Target,
  },
  {
    title: "Product Roadmap Development",
    description: "Design and maintain strategic roadmaps that balance customer needs with business objectives.",
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