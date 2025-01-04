import { ClipboardList, Users, CreditCard, Brain, Target, FileText, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { AIInterfaceShowcase } from "./AIInterfaceShowcase";

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

        {/* AI Assistant Section */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center bg-secondary/10 px-4 py-2 rounded-full mb-4">
              <Brain className="h-5 w-5 text-secondary mr-2" />
              <span className="text-secondary font-medium">AI-Powered Assistance</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Supercharge Your Product Management with AI
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our AI copilot helps both employers and product managers achieve better results faster, 
              while significantly reducing costs and improving output quality
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-semibold mb-6">For Employers</h3>
              <div className="space-y-4">
                {employerBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-secondary/10 p-2 rounded-lg">
                      <benefit.icon className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">{benefit.title}</h4>
                      <p className="text-gray-600 text-sm">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6">For Product Managers</h3>
              <div className="space-y-4">
                {pmBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-secondary/10 p-2 rounded-lg">
                      <benefit.icon className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">{benefit.title}</h4>
                      <p className="text-gray-600 text-sm">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-16">
            <AIInterfaceShowcase />
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
    description: "Our AI-powered system matches you with the best product specialists from our expert community, perfectly aligned with your project needs.",
    icon: Users,
  },
  {
    title: "Simple Subscription",
    description: "Subscribe to our transparent monthly plan with fixed payments and no hidden fees. Easy replacement guarantee if you're not satisfied.",
    icon: CreditCard,
  },
];

const employerBenefits = [
  {
    title: "Faster Output & Cost Savings",
    description: "Accelerate product development cycles and reduce costs with AI-assisted documentation and decision-making.",
    icon: TrendingUp,
  },
  {
    title: "Quality Validation",
    description: "AI-powered validation of PM outputs ensures consistent quality and alignment with business objectives.",
    icon: CheckCircle,
  },
  {
    title: "Strategic Goal Setting",
    description: "Get AI assistance in setting and tracking the right metrics and goals for your product initiatives.",
    icon: Target,
  },
];

const pmBenefits = [
  {
    title: "Enhanced Documentation",
    description: "Create and improve PRDs, requirement documents, and product strategies with AI assistance.",
    icon: FileText,
  },
  {
    title: "Skill Development",
    description: "Receive coaching and feedback to continuously improve your product management skills.",
    icon: Brain,
  },
  {
    title: "Efficient Ideation",
    description: "Leverage AI to brainstorm features and solutions, accelerating your product innovation.",
    icon: Rocket,
  },
];