import { Brain, FileText, Users, Sparkles } from "lucide-react";

export const CommunityAdvantagesSection = () => {
  const advantages = [
    {
      icon: Brain,
      title: "AI-Powered Product Management",
      description: "Our AI copilot assists with PRDs, feature planning, and market research, helping you deliver higher quality work faster.",
      features: [
        "Automated documentation assistance",
        "Smart feature prioritization",
        "Market analysis support",
        "Real-time feedback on deliverables"
      ]
    },
    {
      icon: FileText,
      title: "Premium Templates & Frameworks",
      description: "Access battle-tested templates and frameworks created by experienced product leaders.",
      features: [
        "Product requirement documents",
        "Go-to-market strategies",
        "Product roadmap templates",
        "User research frameworks"
      ]
    },
    {
      icon: Users,
      title: "Community Learning & Growth",
      description: "Regular workshops and knowledge sharing sessions with industry experts and fellow product managers.",
      features: [
        "Weekly workshops",
        "Peer learning sessions",
        "Expert mentorship",
        "Case study discussions"
      ]
    }
  ];

  return (
    <section className="py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center bg-secondary/10 px-4 py-2 rounded-full mb-4">
            <Sparkles className="h-5 w-5 text-secondary mr-2" />
            <span className="text-secondary font-medium">Community Benefits</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Tools and Resources for Success
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join a community that empowers you with cutting-edge tools, knowledge, and support
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-secondary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <advantage.icon className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{advantage.title}</h3>
              <p className="text-gray-600 mb-6">{advantage.description}</p>
              <ul className="space-y-3">
                {advantage.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2">
                    <div className="mt-1">
                      <div className="h-2 w-2 bg-secondary rounded-full" />
                    </div>
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};