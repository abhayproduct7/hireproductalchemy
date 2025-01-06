import { Brain, FileEdit, Target, Rocket, MessagesSquare } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export const AIAgentSection = () => {
  const autoplayOptions = {
    delay: 3000,
    rootNode: (emblaRoot: HTMLElement) => emblaRoot.parentElement,
  };

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
          
          <div className="flex gap-4 items-center justify-center">
            {/* Hexagonal AI Logo */}
            <div className="w-64 h-64 relative animate-pulse">
              <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <defs>
                  <linearGradient id="karmaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0F4C35" />
                    <stop offset="100%" stopColor="#1B5E40" />
                  </linearGradient>
                </defs>
                
                <path
                  d="M16 4 L26 10 L26 22 L16 28 L6 22 L6 10 Z"
                  fill="url(#karmaGradient)"
                  opacity="0.9"
                  className="animate-pulse"
                />
                
                <path
                  d="M16 8 L22 12 M16 8 L10 12 M16 24 L22 20 M16 24 L10 20"
                  stroke="white"
                  strokeWidth="0.75"
                  opacity="0.6"
                />
                
                <circle
                  cx="16"
                  cy="16"
                  r="4"
                  fill="white"
                  opacity="0.9"
                  className="animate-pulse"
                />
                
                <circle cx="16" cy="8" r="2" fill="white" opacity="0.7" />
                <circle cx="22" cy="12" r="2" fill="white" opacity="0.7" />
                <circle cx="22" cy="20" r="2" fill="white" opacity="0.7" />
                <circle cx="16" cy="24" r="2" fill="white" opacity="0.7" />
                <circle cx="10" cy="20" r="2" fill="white" opacity="0.7" />
                <circle cx="10" cy="12" r="2" fill="white" opacity="0.7" />
              </svg>
            </div>

            {/* Vertical Carousel */}
            <div className="w-48">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                  axis: "y"
                }}
                plugins={[
                  Autoplay(autoplayOptions)
                ]}
                className="w-full"
              >
                <CarouselContent className="-mt-2 h-[200px]">
                  <CarouselItem className="pt-2 basis-full">
                    <div className="bg-background rounded-lg p-2 border border-secondary/10">
                      <div className="flex items-center gap-2">
                        <div className="bg-secondary/10 w-5 h-5 rounded-full flex items-center justify-center">
                          <FileEdit className="h-3 w-3 text-secondary" />
                        </div>
                        <div>
                          <h3 className="text-xs font-medium">Create PRD</h3>
                          <p className="text-[10px] text-muted-foreground">Get help writing requirements</p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>

                  <CarouselItem className="pt-2 basis-full">
                    <div className="bg-background rounded-lg p-2 border border-secondary/10">
                      <div className="flex items-center gap-2">
                        <div className="bg-secondary/10 w-5 h-5 rounded-full flex items-center justify-center">
                          <Target className="h-3 w-3 text-secondary" />
                        </div>
                        <div>
                          <h3 className="text-xs font-medium">Validate Work</h3>
                          <p className="text-[10px] text-muted-foreground">Review deliverables</p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>

                  <CarouselItem className="pt-2 basis-full">
                    <div className="bg-background rounded-lg p-2 border border-secondary/10">
                      <div className="flex items-center gap-2">
                        <div className="bg-secondary/10 w-5 h-5 rounded-full flex items-center justify-center">
                          <Rocket className="h-3 w-3 text-secondary" />
                        </div>
                        <div>
                          <h3 className="text-xs font-medium">Plan Features</h3>
                          <p className="text-[10px] text-muted-foreground">Brainstorm and prioritize</p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>

                  <CarouselItem className="pt-2 basis-full">
                    <div className="bg-background rounded-lg p-2 border border-secondary/10">
                      <div className="flex items-center gap-2">
                        <div className="bg-secondary/10 w-5 h-5 rounded-full flex items-center justify-center">
                          <MessagesSquare className="h-3 w-3 text-secondary" />
                        </div>
                        <div>
                          <h3 className="text-xs font-medium">Get Feedback</h3>
                          <p className="text-[10px] text-muted-foreground">Improve decisions</p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
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