import { ClipboardList, Users, CreditCard, ArrowRight } from "lucide-react";

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
    <div className="grid md:grid-cols-3 gap-12 mb-16 relative">
      {steps.map((step, index) => (
        <div key={index} className="relative flex flex-col items-center text-center group">
          {/* Icon Circle */}
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#F5F7F6] mb-6 relative z-10">
            <step.icon className="h-7 w-7 text-secondary" />
          </div>
          
          {/* Content */}
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {step.title}
          </h3>
          <p className="text-[#8E9196] text-base leading-relaxed max-w-sm">
            {step.description}
          </p>

          {/* Arrow */}
          {index < steps.length - 1 && (
            <div className="hidden md:block absolute top-8 -right-6 w-12">
              <ArrowRight className="w-5 h-5 text-secondary absolute top-1/2 -translate-y-1/2" />
              <div className="h-[1px] w-full bg-secondary/20 absolute top-1/2 -translate-y-1/2" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};