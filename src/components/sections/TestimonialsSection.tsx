import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export const TestimonialsSection = () => {
  const testimonials = [
    {
      company: "TechGiant Inc.",
      testimonial:
        "The product manager we hired through this platform transformed our product development process. Their expertise in AI and machine learning helped us launch our flagship product 3 months ahead of schedule.",
      author: "Sarah Chen",
      designation: "VP of Engineering",
    },
    {
      company: "InnovateCorp",
      testimonial:
        "Having access to both an experienced product manager and their AI tools has been game-changing for our startup. We've seen a 40% increase in feature adoption since implementing their suggested strategies.",
      author: "Michael Rodriguez",
      designation: "Chief Technology Officer",
    },
    {
      company: "FutureScale",
      testimonial:
        "The flexibility to scale our product team up or down as needed has been invaluable. The product manager's deep expertise in B2B SaaS has helped us refine our product-market fit.",
      author: "Amanda Foster",
      designation: "Director of Product",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-secondary/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See how our product managers have helped companies transform their
            product development process and achieve remarkable results.
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
  );
};