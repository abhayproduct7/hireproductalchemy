import { Users, Zap, Bot } from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      icon: <Zap className="h-6 w-6 text-secondary" />,
      title: "Instant Team Scaling",
      description:
        "Access pre-vetted product managers immediately and scale your product team on demand. No lengthy hiring processes.",
    },
    {
      icon: <Users className="h-6 w-6 text-secondary" />,
      title: "Cancel Anytime",
      description:
        "Flexible monthly subscription with no long-term commitments. Replace talent or cancel whenever needed.",
    },
    {
      icon: <Bot className="h-6 w-6 text-secondary" />,
      title: "AI-Powered Support",
      description:
        "Access specialized AI agents trained in product management to support your product journey.",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-12 mt-16">
      {features.map((feature, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all border border-secondary/10"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-6">
            {feature.icon}
          </div>
          <h3 className="text-xl font-semibold mb-4 text-primary">
            {feature.title}
          </h3>
          <p className="text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};