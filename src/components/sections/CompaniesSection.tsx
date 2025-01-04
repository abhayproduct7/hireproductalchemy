import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export const CompaniesSection = () => {
  const storageUrl = "https://duqgdyzstzpcydztyflb.supabase.co/storage/v1/object/public/assets";
  
  const companies = [
    { name: "EY", logo: "ey-logo.png" },
    { name: "Indeed", logo: "indeed-logo.png" },
    { name: "Revolut", logo: "revolut-logo.png" },
    { name: "Monzo", logo: "monzo-logo.png" },
    { name: "BCG", logo: "bcg-logo-new.png" },
    { name: "Meta", logo: "meta-logo.png" },
    { name: "Google", logo: "google-logo.png" },
    { name: "Amazon", logo: "amazon-logo.png" },
  ];

  const autoplayOptions = {
    delay: 3000,
    rootNode: (emblaRoot: HTMLElement) => emblaRoot.parentElement,
  };

  return (
    <div className="bg-white py-16">
      <div className="text-center mb-16">
        <h2 className="text-2xl font-semibold text-primary mb-8">
          Our Product Managers Come From Elite Tech Companies
        </h2>
        <div className="max-w-5xl mx-auto px-8">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[Autoplay(autoplayOptions)]}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {companies.map((company, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/4 lg:basis-1/4">
                  <div className="h-40 flex items-center justify-center p-4">
                    <img
                      src={`${storageUrl}/${company.logo}`}
                      alt={company.name}
                      className="h-20 w-auto object-contain mix-blend-multiply hover:mix-blend-normal transition-all duration-300"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
};