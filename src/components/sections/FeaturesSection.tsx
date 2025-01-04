import { Zap, Users, Bot } from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      title: "Instant Team Scaling",
      description: "Access pre-vetted product managers immediately and scale your product team on demand. No lengthy hiring processes.",
      icon: Zap,
    },
    {
      title: "Cancel Anytime",
      description: "Flexible monthly subscription with no long-term commitments. Replace talent or cancel whenever needed.",
      icon: Users,
    },
    {
      title: "AI-Powered Support",
      description: "Access specialized AI agents trained in product management to support your product journey.",
      icon: Bot,
    },
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-muted p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 min-h-[320px] flex flex-col items-start"
            >
              <div className="bg-gray-100 p-4 rounded-full mb-6">
                <feature.icon className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-2xl font-semibold text-primary mb-4">{feature.title}</h3>
              <p className="text-gray-600 text-left leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};