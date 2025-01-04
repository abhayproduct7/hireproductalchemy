import { Target, Map, Lightbulb, Users, GitPullRequest, Users2 } from "lucide-react";

export const HireTalentHero = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-secondary/5 via-muted to-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
            Expert Product Managers Ready to Drive Your Success
          </h1>
          <p className="text-lg text-gray-600">
            Access top-tier product management talent to transform your product vision into reality
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto relative">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 via-transparent to-secondary/5 blur-3xl -z-10" />
          
          {deliverables.map((deliverable, index) => (
            <div
              key={index}
              className="group bg-white/50 backdrop-blur-sm p-6 rounded-xl border border-gray-100 hover:border-secondary/20 
                         transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start space-x-4">
                <div className="p-2 rounded-lg bg-secondary/5 group-hover:bg-secondary/10 transition-colors">
                  <deliverable.icon className="text-secondary h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-primary group-hover:text-secondary transition-colors">
                    {deliverable.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {deliverable.description}
                  </p>
                </div>
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