import { Brain, FileText, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const CommunityAdvantagesSection = () => {
  const navigate = useNavigate();
  const advantages = [
    {
      icon: Brain,
      title: "AI-Powered Product Management",
      description: "Our AI copilot assists with PRDs, feature planning, and market research, helping you deliver higher quality work faster.",
      features: [
        "Automated documentation assistance",
        "Smart feature prioritization",
        "Market analysis support",
        "Real-time feedback on deliverables"
      ]
    },
    {
      icon: FileText,
      title: "Premium Templates & Frameworks",
      description: "Access battle-tested templates and frameworks created by experienced product leaders.",
      features: [
        "Product requirement documents",
        "Go-to-market strategies",
        "Product roadmap templates",
        "User research frameworks"
      ]
    },
    {
      icon: Users,
      title: "Community Learning & Growth",
      description: "Regular workshops and knowledge sharing sessions with industry experts and fellow product managers.",
      features: [
        "Weekly workshops",
        "Peer learning sessions",
        "Expert mentorship",
        "Case study discussions"
      ]
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-secondary/10 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center bg-[#8B5CF6] px-4 py-2 rounded-full mb-4">
            <Sparkles className="h-5 w-5 text-white mr-2" />
            <span className="text-white font-medium">Community Benefits</span>
          </div>
          <h2 className="text-3xl font-bold text-[#403E43] mb-4">
            Tools and Resources for Success
          </h2>
          <p className="text-lg text-[#8A898C] max-w-2xl mx-auto">
            Join a community that empowers you with cutting-edge tools, knowledge, and support
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_25px_rgba(139,92,246,0.15)] transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="bg-[#E5DEFF] w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <advantage.icon className="h-7 w-7 text-[#8B5CF6]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#403E43]">{advantage.title}</h3>
              <p className="text-[#8A898C] mb-6">{advantage.description}</p>
              <ul className="space-y-3">
                {advantage.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <div className="mt-1.5">
                      <div className="h-2 w-2 bg-[#8B5CF6] rounded-full" />
                    </div>
                    <span className="text-sm text-[#8A898C]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center space-y-4">
          <Button
            onClick={() => navigate("/login")}
            size="lg"
            className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Your Application
          </Button>
          <p className="text-sm text-[#8A898C]">
            Join hundreds of product leaders already benefiting from our community
          </p>
        </div>
      </div>
    </section>
  );
};