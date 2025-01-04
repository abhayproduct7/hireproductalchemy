import { Target, Map, Lightbulb, Users, GitPullRequest, Users2 } from "lucide-react";

export const HireTalentHero = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/10 via-secondary/5 to-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Expert Product Managers Ready to Drive Your Success
          </h1>
          <p className="text-base text-gray-600">
            Access top-tier product management talent to transform your product vision into reality
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {deliverables.map((deliverable, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow animate-fade-up flex items-start"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <deliverable.icon className="text-secondary h-6 w-6 mt-1 flex-shrink-0" />
              <div className="ml-3">
                <h3 className="text-lg font-semibold mb-1">{deliverable.title}</h3>
                <p className="text-sm text-gray-600">{deliverable.description}</p>
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