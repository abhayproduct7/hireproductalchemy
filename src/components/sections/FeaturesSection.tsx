import { Leaf, Lightbulb, Shield } from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      title: "Elite Product Managers",
      description: "Access top-tier product management talent from leading tech companies",
      icon: Lightbulb,
    },
    {
      title: "Flexible Engagement",
      description: "Work with product managers on a project basis or ongoing collaboration",
      icon: Leaf,
    },
    {
      title: "Quality Guaranteed",
      description: "Every product manager is thoroughly vetted for excellence",
      icon: Shield,
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