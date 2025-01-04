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
    <section className="py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Opportunities We're Looking For
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              We partner with companies across various industries and stages, seeking experienced product managers who can drive impact through:
            </p>
            <ul className="space-y-4">
              {opportunities.map((opportunity, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                  <span className="text-gray-700">{opportunity}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
              alt="Product management collaboration"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};