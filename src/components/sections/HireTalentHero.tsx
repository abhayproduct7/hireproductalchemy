import { Target, Map, Lightbulb, Users, GitPullRequest, Users2 } from "lucide-react";

export const HireTalentHero = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b">
      <div className="max-w-6xl mx-auto">
        {/* Main content area */}
        <div className="grid md:grid-cols-2 gap-16 items-start mb-16">
          {/* Left column - Hero content */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              Hire Elite Product Managers
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Work with the top 3% of product management talent who have proven track records 
              in driving successful product initiatives across various industries.
            </p>
          </div>

          {/* Right column - Featured capabilities */}
          <div className="grid grid-cols-2 gap-6">
            {deliverables.slice(0, 4).map((deliverable, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 rounded-md bg-secondary/10">
                    <deliverable.icon className="text-secondary h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    {deliverable.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {deliverable.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional capabilities */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deliverables.slice(4).map((deliverable, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg"
            >
              <div className="p-2 rounded-md bg-secondary/10 shrink-0">
                <deliverable.icon className="text-secondary h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {deliverable.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
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