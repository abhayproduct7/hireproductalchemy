import { Zap, Users, Bot } from "lucide-react";
import { CostSavingsGraph } from "../graphs/CostSavingsGraph";

export const FeaturesSection = () => {
  const features = [
    {
      title: "Instant Team Scaling",
      description: "Access pre-vetted product managers immediately and scale your product team on demand.",
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
    <div className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-primary mb-2">Why Choose ProductHire</h2>
          <p className="text-sm text-gray-600 max-w-xl mx-auto">
            Experience the future of product management talent acquisition
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Features Column */}
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-muted p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-start"
              >
                <div className="bg-gray-100 p-2 rounded-full mb-2">
                  <feature.icon className="h-3.5 w-3.5 text-secondary" />
                </div>
                <h3 className="text-base font-semibold text-primary mb-1">{feature.title}</h3>
                <p className="text-xs text-gray-600 text-left leading-relaxed">{feature.description}</p>
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