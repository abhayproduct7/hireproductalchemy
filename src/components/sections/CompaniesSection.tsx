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
      name: "Amazon", 
      logo: "amazon-logo-new.png", 
      className: "h-12 w-auto" 
    },
    { 
      name: "EY", 
      logo: "ey-logo-new.png?t=2025-01-04T14%3A01%3A00.395Z", 
      className: "h-12 w-auto" 
    },
    { 
      name: "Indeed", 
      logo: "indeed-logo.png", 
      className: "h-10 w-auto" 
    },
    { 
      name: "Revolut", 
      logo: "revolut-logo.png", 
      className: "h-8 w-auto" 
    },
    { 
      name: "Monzo", 
      logo: "monzo-logo.png", 
      className: "h-10 w-auto" 
    },
    { 
      name: "BCG", 
      logo: "bcg-logo-new.png", 
      className: "h-12 w-auto" 
    },
    { 
      name: "Meta", 
      logo: "meta-logo-new.png", 
      className: "h-10 w-auto" 
    },
    { 
      name: "Google", 
      logo: "google-logo-new.png", 
      className: "h-8 w-auto" 
    }
  ];

  const autoplayOptions = {
    delay: 3000,
    rootNode: (emblaRoot: HTMLElement) => emblaRoot.parentElement,
  };

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-primary text-center mb-12">
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
                  className="pl-4 basis-1/2 md:basis-1/4 lg:basis-1/4"
                >
                  <div className="h-24 flex items-center justify-center p-4 bg-white rounded-lg">
                    <img
                      src={`${storageUrl}/${company.logo}`}
                      alt={`${company.name} logo`}
                      className={`object-contain ${company.className} transition-all duration-300 hover:opacity-80`}
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