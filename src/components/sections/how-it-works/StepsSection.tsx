import { ClipboardList, Users, CreditCard } from "lucide-react";

const steps = [
  {
    title: "Share Your Requirements",
    description: "Tell us about your needs - whether you're looking for part-time or full-time talent, project duration, industry focus, and required skill sets.",
    icon: ClipboardList,
  },
  {
    title: "Get Matched",
    description: "Our AI-powered system matches you with the best product specialists from our expert community, perfectly aligned with your project needs.",
    icon: Users,
  },
  {
    title: "Simple Subscription",
    description: "Subscribe to our transparent monthly plan with fixed payments and no hidden fees. Easy replacement guarantee if you're not satisfied.",
    icon: CreditCard,
  },
];

export const StepsSection = () => {
  return (
    <div className="grid md:grid-cols-3 gap-8 mb-16">
      {steps.map((step, index) => (
        <div
          key={index}
          className="relative flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm"
        >
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-secondary/10 mb-6">
            <step.icon className="h-8 w-8 text-secondary" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {step.title}
          </h3>
          <p className="text-gray-600">
            {step.description}
          </p>
          {index < steps.length - 1 && (
            <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
              <div className="w-8 h-0.5 bg-gray-300"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};