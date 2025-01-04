import { Brain, Target, CheckCircle, TrendingUp, FileText, Rocket } from "lucide-react";

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

const BenefitList = ({ title, benefits }: { title: string; benefits: typeof employerBenefits }) => (
  <div>
    <h3 className="text-2xl font-semibold mb-6">{title}</h3>
    <div className="space-y-4">
      {benefits.map((benefit, index) => (
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
);

export const AIBenefitsSection = () => {
  return (
    <div className="grid md:grid-cols-2 gap-12 mb-16">
      <BenefitList title="For Employers" benefits={employerBenefits} />
      <BenefitList title="For Product Managers" benefits={pmBenefits} />
    </div>
  );
};