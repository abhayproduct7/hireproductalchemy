import { Zap, Clock, DollarSign, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const BenefitsSection = () => {
  const navigate = useNavigate();
  const benefits = [
    {
      icon: Zap,
      title: "Accelerate Your Career",
      description: "Access high-impact opportunities and fast-track your product management journey"
    },
    {
      icon: Clock,
      title: "Flexible Engagement",
      description: "Choose between full-time roles or fractional commitments that suit your lifestyle"
    },
    {
      icon: DollarSign,
      title: "Competitive Compensation",
      description: "Earn market-leading rates while working with innovative companies"
    },
    {
      icon: Users,
      title: "Strong Network",
      description: "Connect with fellow product leaders and expand your professional network"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-[#F5F3FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-[#2D2B2F] mb-4">
            Benefits of Joining Our Community
          </h2>
          <p className="text-lg text-[#6B6A6D]">
            Unlock your potential and enjoy the perks of being part of our exclusive product management network
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_25px_rgba(139,92,246,0.12)] transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B5CF6]/5 rounded-full translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] mb-6">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-[#2D2B2F] mb-3">
                  {benefit.title}
                </h3>
                
                <p className="text-[#6B6A6D]">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={() => navigate("/login")}
            size="lg"
            className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Apply to Join Our Community
          </Button>
        </div>
      </div>
    </section>
  );
};