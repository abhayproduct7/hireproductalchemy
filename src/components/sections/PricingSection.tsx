import { Check, ArrowRight, User, Bolt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export const PricingSection = () => {
  const handleGetStarted = () => {
    // Find the contact form section and scroll to it
    const contactSection = document.querySelector('#contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your business needs. Get matched with exceptional product management talent quickly and efficiently.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Fractional Plan */}
          <Card className="relative border-2 hover:border-secondary transition-all duration-300">
            <CardHeader className="text-center pb-8 pt-6">
              <h3 className="text-2xl font-bold">Fractional</h3>
              <p className="text-muted-foreground mt-2">20 hours/week</p>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">Starting from</p>
                <span className="text-4xl font-bold">£1,000</span>
                <span className="text-muted-foreground">/week</span>
              </div>
              <p className="text-sm text-secondary mt-3">Ideal for strategic product leadership</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {[
                  "Dedicated fractional product manager",
                  "20 hours of weekly coverage",
                  "Flexible scheduling",
                  "Full platform support",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="text-secondary h-5 w-5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline" onClick={handleGetStarted}>
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          {/* Full Time Plan */}
          <Card className="relative border-2 border-secondary bg-secondary/5">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-secondary text-white text-sm rounded-full">
              Most Popular
            </div>
            <CardHeader className="text-center pb-8 pt-6">
              <h3 className="text-2xl font-bold">Full Time</h3>
              <p className="text-muted-foreground mt-2">40 hours/week</p>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">Starting from</p>
                <span className="text-4xl font-bold">£1,750</span>
                <span className="text-muted-foreground">/week</span>
              </div>
              <p className="text-sm text-secondary mt-3">Perfect for end-to-end product ownership</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {[
                  "Dedicated full-time product manager",
                  "40 hours of weekly coverage",
                  "Complete product ownership",
                  "Priority platform support",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="text-secondary h-5 w-5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleGetStarted}>
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Process Description */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-6">Seamless Hiring Process</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                <Bolt className="h-6 w-6 text-secondary" />
              </div>
              <h4 className="font-semibold mb-2">Quick Setup</h4>
              <p className="text-muted-foreground">Subscribe and get started in minutes</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                <User className="h-6 w-6 text-secondary" />
              </div>
              <h4 className="font-semibold mb-2">Perfect Match</h4>
              <p className="text-muted-foreground">We match you with the ideal product manager</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-secondary" />
              </div>
              <h4 className="font-semibold mb-2">Hassle-free Billing</h4>
              <p className="text-muted-foreground">Simple monthly billing, no hidden fees</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};