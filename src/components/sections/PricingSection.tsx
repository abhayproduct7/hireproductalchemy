import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export const PricingSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/requirements");
  };

  return (
    <section id="pricing-section" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose the perfect plan for your product management needs
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
          <Card className="relative">
            <CardHeader>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Fractional</h3>
                <div className="text-sm text-muted-foreground">Starting from</div>
                <div className="text-4xl font-bold">£1,000/week</div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="font-medium text-muted-foreground">
                  Ideal for strategic product leadership
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <svg
                      className=" h-4 w-4 flex-shrink-0"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="ml-2">Flexible engagement</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className=" h-4 w-4 flex-shrink-0"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="ml-2">Experienced product leaders</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className=" h-4 w-4 flex-shrink-0"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="ml-2">Strategic guidance</span>
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline" onClick={handleGetStarted}>
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card className="relative">
            <CardHeader>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Full Time</h3>
                <div className="text-sm text-muted-foreground">Starting from</div>
                <div className="text-4xl font-bold">£1,750/week</div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="font-medium text-muted-foreground">
                  Perfect for end-to-end product ownership
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <svg
                      className=" h-4 w-4 flex-shrink-0"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="ml-2">Full-time dedication</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className=" h-4 w-4 flex-shrink-0"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="ml-2">Complete product ownership</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className=" h-4 w-4 flex-shrink-0"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="ml-2">Deep team integration</span>
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleGetStarted}>
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};
