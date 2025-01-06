import { Brain, CheckCircle2, Users, Brain as BrainIcon } from "lucide-react";
import { AILogo } from "../ai/AILogo";
import { TaskCarousel } from "../ai/TaskCarousel";

export const AIAgentSection = () => {
  return (
    <section className="py-24 bg-muted">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-4xl font-bold mb-4">Meet Karma, Your AI Product Assistant</h2>
            <p className="text-lg text-muted-foreground">
              Powered by advanced AI, Karma ensures successful product development by supporting both hiring teams and product talent
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
            Whether you're hiring or part of our talent community, Karma is here to ensure your product development journey is smooth and successful
          </p>
          <div className="animate-pulse inline-flex items-center gap-2 text-secondary">
            <Brain className="h-5 w-5" />
            <span className="font-medium">Karma is actively learning and evolving</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-12 mt-16">
          <div className="space-y-4 group">
            <div className="bg-muted/50 p-4 rounded-full w-fit">
              <BrainIcon className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-2xl font-semibold group-hover:text-secondary transition-colors">
              Skillset Assessment
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Karma analyzes your project requirements and helps identify the exact skillset and experience level needed for your product manager
            </p>
          </div>

          <div className="space-y-4 group">
            <div className="bg-muted/50 p-4 rounded-full w-fit">
              <Users className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-2xl font-semibold group-hover:text-secondary transition-colors">
              Talent Empowerment
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Assists product managers with frameworks, tools, and best practices to deliver exceptional product strategy and management
            </p>
          </div>

          <div className="space-y-4 group">
            <div className="bg-muted/50 p-4 rounded-full w-fit">
              <CheckCircle2 className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-2xl font-semibold group-hover:text-secondary transition-colors">
              Quality Assurance
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Helps non-technical teams assess and validate work quality, ensuring alignment with business objectives
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};