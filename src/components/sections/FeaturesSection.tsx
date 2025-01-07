import { Zap, Users, Bot } from "lucide-react";
import { CostSavingsGraph } from "../graphs/CostSavingsGraph";

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
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary mb-3">Why Choose ProductHire</h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Experience the future of product management talent acquisition
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Features Column */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-muted p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-start"
              >
                <div className="bg-gray-100 p-3 rounded-full mb-3">
                  <feature.icon className="h-4 w-4 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 text-left leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Graph Column */}
          <div className="lg:sticky lg:top-8">
            <CostSavingsGraph />
          </div>
        </div>
      </div>
    </div>
  );
};