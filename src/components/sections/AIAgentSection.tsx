import { Brain, CheckCircle2, Users, Brain as BrainIcon } from "lucide-react";
import { AILogo } from "../ai/AILogo";
import { TaskCarousel } from "../ai/TaskCarousel";

export const AIAgentSection = () => {
  return (
    <section className="py-24 bg-muted">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-secondary/80">PRODUCT MANAGEMENT AI</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">AI Assist for Product Managers</h2>
            <p className="text-lg text-muted-foreground">
              Powered by advanced AI, our assistant ensures successful product development by supporting both hiring teams and product talent
            </p>
          </div>
          
          <div className="flex items-center justify-start pl-8">
            <div className="relative flex items-center">
              <AILogo className="w-40 h-40" />
              <div className="absolute left-36">
                <TaskCarousel />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center bg-background rounded-xl p-8 max-w-3xl mx-auto mb-20">
          <h3 className="text-2xl font-semibold mb-4">Experience the Power of AI-Enhanced Product Management</h3>
          <p className="text-muted-foreground mb-6">
            Whether you're hiring or part of our talent community, our AI assistant is here to ensure your product development journey is smooth and successful
          </p>
          <div className="animate-pulse inline-flex items-center gap-2 text-secondary">
            <Brain className="h-5 w-5" />
            <span className="font-medium">AI is actively learning and evolving</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="group">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-muted/50 p-2.5 rounded-full">
                <BrainIcon className="w-4 h-4 text-secondary" />
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