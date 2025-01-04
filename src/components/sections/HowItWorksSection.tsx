import { ClipboardList, Users, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

export const HowItWorksSection = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A simple, streamlined process to help you find the perfect product manager for your needs
          </p>
        </div>

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

        <div className="text-center">
          <Link
            to="/hire"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-secondary hover:bg-secondary/90 rounded-lg shadow-lg hover:shadow-secondary/30 transition-all duration-200"
          >
            Get Started Now
          </Link>
        </div>
      </div>
    </section>
  );
};

const steps = [
  {
    title: "Share Your Requirements",
    description: "Tell us about your needs - whether you're looking for part-time or full-time talent, project duration, industry focus, and required skill sets.",
    icon: ClipboardList,
  },
  {
    title: "Get Matched",
    description: "Our AI-powered system matches you with the best product managers from our expert community, perfectly aligned with your project needs.",
    icon: Users,
  },
  {
    title: "Simple Subscription",
    description: "Subscribe to our transparent monthly plan with fixed payments and no hidden fees. Easy replacement guarantee if you're not satisfied.",
    icon: CreditCard,
  },
];