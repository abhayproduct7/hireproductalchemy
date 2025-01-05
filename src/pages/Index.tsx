import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { CompaniesSection } from "@/components/sections/CompaniesSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { RequirementsSection } from "@/components/sections/RequirementsSection";
import { AIAgentSection } from "@/components/sections/AIAgentSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    // Only redirect to login if we're sure there's no session
    if (session === null) {
      navigate("/login");
    }
  }, [session, navigate]);

  // Don't render anything while checking session
  if (session === undefined) {
    return null;
  }

  // If we have a session, render the page
  if (session) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <HeroSection />
        <CompaniesSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <AIAgentSection />
        <RequirementsSection />
        <ContactSection />
        <Footer />
      </div>
    );
  }

  return null;
};

export default Index;