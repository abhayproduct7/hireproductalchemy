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
      className: "h-16 scale-110" 
    },
    { 
      name: "Indeed", 
      logo: "indeed-logo.png", 
      className: "h-8 scale-125" 
    },
    { 
      name: "Revolut", 
      logo: "revolut-logo.png", 
      className: "h-8 scale-125" 
    },
    { 
      name: "Monzo", 
      logo: "monzo-logo.png", 
      className: "h-12 scale-110" 
    },
    { 
      name: "BCG", 
      logo: "bcg-logo-new.png", 
      className: "h-20 scale-125" 
    },
    { 
      name: "Meta", 
      logo: "meta-logo-new.png", 
      className: "h-8 scale-110" 
    },
    { 
      name: "Google", 
      logo: "google-logo-new.png", 
      className: "h-8 scale-110" 
    },
    { 
      name: "Amazon", 
      logo: "amazon-logo-new.png", 
      className: "h-12 scale-110" 
    }
  ];

  const autoplayOptions = {
    delay: 3000,
    rootNode: (emblaRoot: HTMLElement) => emblaRoot.parentElement,
  };

  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-semibold text-primary text-center mb-20">
          Our Product Managers Come From Elite Tech Companies
        </h2>
        <div className="max-w-6xl mx-auto">
          <Carousel
            opts={{
              align: "center",
              loop: true,
              skipSnaps: false,
              containScroll: "trimSnaps",
            }}
            plugins={[Autoplay(autoplayOptions)]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {companies.map((company, index) => (
                <CarouselItem 
                  key={index} 
                  className="pl-4 basis-1/3 md:basis-1/4 lg:basis-1/4"
                >
                  <div className="h-32 flex items-center justify-center p-6">
                    <img
                      src={`${storageUrl}/${company.logo}`}
                      alt={`${company.name} logo`}
                      className={`object-contain ${company.className} transition-all duration-300`}
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