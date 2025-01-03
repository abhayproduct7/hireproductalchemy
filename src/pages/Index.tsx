import { ArrowRight, Users, Zap, Bot } from "lucide-react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const testimonials = [
    {
      company: "TechGiant Inc.",
      testimonial: "The product manager we hired through this platform transformed our product development process. Their expertise in AI and machine learning helped us launch our flagship product 3 months ahead of schedule.",
      author: "Sarah Chen",
      designation: "VP of Engineering",
    },
    {
      company: "InnovateCorp",
      testimonial: "Having access to both an experienced product manager and their AI tools has been game-changing for our startup. We've seen a 40% increase in feature adoption since implementing their suggested strategies.",
      author: "Michael Rodriguez",
      designation: "Chief Technology Officer",
    },
    {
      company: "FutureScale",
      testimonial: "The flexibility to scale our product team up or down as needed has been invaluable. The product manager's deep expertise in B2B SaaS has helped us refine our product-market fit.",
      author: "Amanda Foster",
      designation: "Director of Product",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block animate-fade-up bg-muted text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            Premium Product Management Talent
          </span>
          <h1 className="animate-fade-up text-4xl md:text-6xl font-bold text-primary mb-6">
            Connect with Elite Product Managers
          </h1>
          <p className="animate-fade-up text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Access a curated network of experienced product managers through a simple subscription model.
          </p>
          <div className="animate-fade-up flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/hire"
              className="btn-primary px-8 py-3 rounded-lg font-medium inline-flex items-center justify-center"
            >
              Hire Product Managers
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/join"
              className="btn-secondary px-8 py-3 rounded-lg font-medium inline-flex items-center justify-center"
            >
              Join as Product Manager
            </Link>
          </div>
        </div>
      </section>

      {/* Elite Companies & Features Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Elite Tech Companies */}
          <div className="text-center mb-16">
            <h2 className="text-2xl font-semibold text-primary mb-8">Our Product Managers Come From Elite Tech Companies</h2>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-75">
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-8 grayscale hover:grayscale-0 transition-all" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Meta_Platforms_Inc._logo.svg" alt="Meta" className="h-8 grayscale hover:grayscale-0 transition-all" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg" alt="Amazon" className="h-8 grayscale hover:grayscale-0 transition-all" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="h-8 grayscale hover:grayscale-0 transition-all" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" alt="Microsoft" className="h-8 grayscale hover:grayscale-0 transition-all" />
            </div>
          </div>

          {/* Key Features Grid */}
          <div className="grid md:grid-cols-3 gap-12 mt-16">
            {/* Instant Scaling */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-6">
                <Zap className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Instant Team Scaling</h3>
              <p className="text-gray-600">
                Access pre-vetted product managers immediately and scale your product team on demand.
                No lengthy hiring processes.
              </p>
            </div>

            {/* Flexible Subscription */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-6">
                <Users className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Cancel Anytime</h3>
              <p className="text-gray-600">
                Flexible monthly subscription with no long-term commitments. Replace talent or cancel whenever needed.
              </p>
            </div>

            {/* AI Integration */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-6">
                <Bot className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">AI-Powered Support</h3>
              <p className="text-gray-600">
                Access specialized AI agents trained in product management to support your product journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See how our product managers have helped companies transform their product development process and achieve remarkable results.
            </p>
          </div>

          <div className="relative px-12">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-5xl mx-auto"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/1">
                    <Card className="border-none shadow-lg mx-2">
                      <CardContent className="p-8">
                        <div className="flex flex-col items-center space-y-6">
                          <blockquote className="text-lg text-gray-700 text-center italic">
                            "{testimonial.testimonial}"
                          </blockquote>
                          <div className="text-center">
                            <div className="font-semibold text-primary">
                              {testimonial.author}
                            </div>
                            <div className="text-sm text-gray-600">
                              {testimonial.designation}
                            </div>
                            <div className="text-sm text-secondary mt-1">
                              {testimonial.company}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2" />
              <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2" />
            </Carousel>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
