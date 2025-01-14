import { Wand, CheckCircle2, Users, Brain } from "lucide-react";
import { TaskCarousel } from "../ai/TaskCarousel";
import Logo from "../Logo";

export const AIAgentSection = () => {
  return (
    <section className="py-24 bg-muted">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Wand className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-secondary/80">PRODUCT MANAGEMENT AI</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">AI Assist for Product Managers</h2>
            <p className="text-lg text-muted-foreground">
              Powered by advanced AI, our assistant ensures successful product development by supporting both hiring teams and product talent
            </p>
          </div>
          
          <div className="flex items-center justify-start pl-8">
            <div className="relative flex items-center gap-4">
              <Logo size="xl" showText={false} className="w-32 h-32" />
              <div className="absolute left-24">
                <TaskCarousel />
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="group">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-muted/50 p-2.5 rounded-full">
                <Brain className="w-4 h-4 text-secondary" />
              </div>
              <h3 className="text-lg font-medium group-hover:text-secondary transition-colors">
                Skillset Assessment
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed pl-[52px]">
              Our AI analyzes your project requirements and helps identify the exact skillset and experience level needed for your product manager
            </p>
          </div>

          <div className="group">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-muted/50 p-2.5 rounded-full">
                <Users className="w-4 h-4 text-secondary" />
              </div>
              <h3 className="text-lg font-medium group-hover:text-secondary transition-colors">
                Talent Empowerment
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed pl-[52px]">
              Assists product managers with frameworks, tools, and best practices to deliver exceptional product strategy and management
            </p>
          </div>

          <div className="group">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-muted/50 p-2.5 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-secondary" />
              </div>
              <h3 className="text-lg font-medium group-hover:text-secondary transition-colors">
                Quality Assurance
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed pl-[52px]">
              Helps non-technical teams assess and validate work quality, ensuring alignment with business objectives
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};