import { Trophy, Clock, BadgeCheck } from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      title: "Instant Team Scaling",
      description: "Access pre-vetted product managers immediately and scale your product team on demand. No lengthy hiring processes.",
      icon: Trophy,
    },
    {
      title: "Cancel Anytime",
      description: "Flexible monthly subscription with no long-term commitments. Replace talent or cancel whenever needed.",
      icon: Clock,
    },
    {
      title: "AI-Powered Support",
      description: "Access specialized AI agents trained in product management to support your product journey.",
      icon: BadgeCheck,
    },
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-muted p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 min-h-[280px] flex flex-col"
            >
              <div className="flex items-center mb-6">
                <feature.icon className="h-8 w-8 text-secondary mr-3" />
                <h3 className="text-lg font-semibold text-primary">{feature.title}</h3>
              </div>
              <p className="text-gray-600 flex-grow">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};