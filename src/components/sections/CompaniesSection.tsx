import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export const CompaniesSection = () => {
  const storageUrl = "https://duqgdyzstzpcydztyflb.supabase.co/storage/v1/object/public/assets";
  
  const companies = [
    { 
      name: "EY", 
      logo: "ey-logo-new.png?t=2025-01-04T14%3A01%3A00.395Z", 
      className: "h-14 -translate-y-[8px]" 
    },
    { 
      name: "Indeed", 
      logo: "indeed-logo.png", 
      className: "h-48" 
    },
    { 
      name: "Revolut", 
      logo: "revolut-logo.png", 
      className: "h-24" 
    },
    { 
      name: "Monzo", 
      logo: "monzo-logo.png", 
      className: "h-24" 
    },
    { 
      name: "BCG", 
      logo: "bcg-logo-new.png", 
      className: "h-8" 
    },
    { 
      name: "Meta", 
      logo: "meta-logo-new.png", 
      className: "h-48" 
    },
    { 
      name: "Google", 
      logo: "google-logo-new.png", 
      className: "h-24" 
    },
    { 
      name: "Amazon", 
      logo: "amazon-logo-new.png", 
      className: "h-24" 
    },
  ];

  const autoplayOptions = {
    delay: 3000,
    rootNode: (emblaRoot: HTMLElement) => emblaRoot.parentElement,
  };

  return (
    <div className="bg-white py-12">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-primary mb-12">
          Our Product Managers Come From Elite Tech Companies
        </h2>
        <div className="max-w-6xl mx-auto px-4">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            plugins={[Autoplay(autoplayOptions)]}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {companies.map((company, index) => {
                const imageUrl = `${storageUrl}/${company.logo}`;
                return (
                  <CarouselItem 
                    key={index} 
                    className="pl-2 md:pl-4 basis-1/2 md:basis-1/4 lg:basis-1/4"
                  >
                    <div className="h-48 flex items-center justify-center p-4">
                      <img
                        src={imageUrl}
                        alt={company.name}
                        className={`w-auto object-contain ${company.className}`}
                      />
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
};