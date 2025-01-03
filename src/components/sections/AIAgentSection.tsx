import { Brain, Users, CheckCircle } from "lucide-react";

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
          <div>
            <img
              src="https://images.unsplash.com/photo-1701977406599-99b9cd7699c3"
              alt="Modern AI Chat Interface"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Skill Assessment Card */}
          <div className="bg-background rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-6">
              <div className="bg-secondary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Skillset Assessment</h3>
              <p className="text-muted-foreground">
                Karma analyzes your project requirements and helps identify the exact skillset and experience level needed for your product manager
              </p>
            </div>
          </div>

          {/* Talent Support Card */}
          <div className="bg-background rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-6">
              <div className="bg-secondary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Talent Empowerment</h3>
              <p className="text-muted-foreground">
                Assists product managers with frameworks, tools, and best practices to deliver exceptional product strategy and management
              </p>
            </div>
          </div>

          {/* Work Validation Card */}
          <div className="bg-background rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-6">
              <div className="bg-secondary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality Assurance</h3>
              <p className="text-muted-foreground">
                Helps non-technical teams assess and validate work quality, ensuring alignment with business objectives
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center bg-background rounded-xl p-8 max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold mb-4">Experience the Power of AI-Enhanced Product Management</h3>
          <p className="text-muted-foreground mb-6">
            Whether you're hiring or part of our talent community, Karma is here to ensure your product development journey is smooth and successful
          </p>
          <div className="animate-pulse inline-flex items-center gap-2 text-secondary">
            <Brain className="h-5 w-5" />
            <span className="font-medium">Karma is actively learning and evolving</span>
          </div>
        </div>
      </div>
    </section>
  );
};