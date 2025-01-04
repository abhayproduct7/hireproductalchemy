import { Target, Map, Lightbulb, Users, GitPullRequest, Users2 } from "lucide-react";

export const HireTalentHero = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-secondary/5 via-background to-muted">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 animate-fade-up">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">
            Expert Product Managers Ready to Drive Your Success
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Access top-tier product management talent to transform your product vision into reality
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 animate-fade-up">
          {deliverables.map((deliverable, index) => (
            <div
              key={index}
              className="group bg-white/80 p-4 rounded-lg border border-gray-100 hover:border-secondary/20 
                       transition-all duration-300 hover:shadow-sm"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center space-x-3">
                <div className="p-1.5 rounded-md bg-secondary/5 group-hover:bg-secondary/10 transition-colors">
                  <deliverable.icon className="text-secondary h-4 w-4" />
                </div>
                <h3 className="text-sm font-medium text-primary group-hover:text-secondary transition-colors">
                  {deliverable.title}
                </h3>
              </div>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
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