import { ArrowRight, List, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export const RequirementsSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Tell Us About Your Needs</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Help us understand your requirements so we can match you with the perfect product manager from our community
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <List className="h-8 w-8 text-secondary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Skills & Expertise</h3>
                <p className="text-muted-foreground">
                  Specify the technical skills, methodologies, and tools your ideal product manager should master
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Industry Experience</h3>
                <p className="text-muted-foreground">
                  Tell us about your industry and the specific domain expertise you're looking for
                </p>
              </div>
            </div>
          </div>

          <div className="bg-muted rounded-lg p-8 space-y-6">
            <h3 className="text-2xl font-semibold">Ready to Find Your Perfect Match?</h3>
            <p className="text-muted-foreground">
              Subscribe to view our community of experienced product managers and find the perfect fit for your team
            </p>
            <Button className="w-full group" size="lg">
              View Available Product Managers
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};