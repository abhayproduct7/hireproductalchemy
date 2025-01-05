import { Brain } from "lucide-react";
import { AIInterfaceShowcase } from "./AIInterfaceShowcase";
import { StepsSection } from "./how-it-works/StepsSection";
import { AIBenefitsSection } from "./how-it-works/AIBenefitsSection";

export const HowItWorksSection = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F5F7F6]/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-[#8E9196] max-w-2xl mx-auto">
            A simple, streamlined process to help you find the perfect product manager for your needs
          </p>
        </div>

        <StepsSection />

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
            <p className="text-lg text-[#8E9196] max-w-3xl mx-auto">
              Our AI copilot helps both employers and product managers achieve better results faster, 
              while significantly reducing costs and improving output quality
            </p>
          </div>

          <AIBenefitsSection />

          <div className="mb-16">
            <AIInterfaceShowcase />
          </div>
        </div>
      </div>
    </section>
  );
};