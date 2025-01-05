import { CheckCircle2 } from "lucide-react";

export const OpportunitiesSection = () => {
  const opportunities = [
    "Early-stage startups seeking experienced product leadership",
    "Scale-ups looking for strategic product guidance",
    "Enterprise companies needing specialized product expertise",
    "Innovation projects requiring dedicated product management",
    "Digital transformation initiatives across industries",
    "Product strategy and roadmap development",
  ];

  return (
    <section className="py-24 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#8B5CF6]/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#8B5CF6]/10 rounded-full blur-2xl" />
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
              alt="Product management collaboration"
              className="rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] relative z-10"
            />
          </div>
          <div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-[#2D2B2F] mb-4">
                Opportunities We're Looking For
              </h2>
              <p className="text-lg text-[#6B6A6D] mb-8">
                We partner with companies across various industries and stages, seeking experienced product managers who can drive impact through:
              </p>
              <ul className="space-y-5">
                {opportunities.map((opportunity, index) => (
                  <li key={index} className="flex items-start gap-4 animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="bg-[#E5DEFF] rounded-full p-1 mt-1">
                      <CheckCircle2 className="w-5 h-5 text-[#8B5CF6]" />
                    </div>
                    <span className="text-[#4A4950]">{opportunity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};