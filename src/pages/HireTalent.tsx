import { Navigation } from "@/components/Navigation";
import { HireTalentHero } from "@/components/sections/HireTalentHero";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { TrustedBrandsSection } from "@/components/sections/TrustedBrandsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ProcessComparisonGraph } from "@/components/graphs/ProcessComparisonGraph";
import { useEffect } from "react";

const HireTalent = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = "Hire Product Managers | ProductHire Talent Solutions";
  }, []);

  const handleGetStarted = () => {
    console.log("Navigating to requirements page from CTA");
    navigate("/requirements");
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <HireTalentHero />
      <TrustedBrandsSection />
      
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto space-y-20">
          <ProcessComparisonGraph />
        </div>
      </section>

      <HowItWorksSection />
      
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-6">
            Ready to Transform Your Product Development?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Start your journey with ProductHire today and connect with top product management talent.
          </p>
          <Button size="lg" onClick={handleGetStarted}>
            Get Started Now
          </Button>
        </div>
      </section>

      <FAQSection />
      <Footer />
    </div>
  );
};

export default HireTalent;