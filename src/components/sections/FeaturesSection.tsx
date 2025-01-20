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
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Why Choose ProductHire
          </h2>
          <p className="text-base text-gray-600 max-w-xl mx-auto">
            Experience the future of product management talent acquisition
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-6 lg:self-stretch flex flex-col justify-between">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-muted p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex-1"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-gray-100 p-2 rounded-full shrink-0">
                    <feature.icon className="h-4 w-4 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:h-full flex items-stretch">
            <CostSavingsGraph />
          </div>
        </div>
      </div>
    </div>
  );
};