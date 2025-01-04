import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const CompaniesSection = () => {
  const storageUrl = "https://duqgdyzstzpcydztyflb.supabase.co/storage/v1/object/public/assets";
  
  const companies = [
    { name: "EY", logo: "ey-logo.png" },
    { name: "Indeed", logo: "indeed-logo.png" },
    { name: "Revolut", logo: "revolut-logo.png" },
    { name: "Monzo", logo: "monzo-logo.png" },
    { name: "BCG", logo: "bcg-logo.png" },
    { name: "Meta", logo: "meta-logo.png" },
    { name: "Google", logo: "google-logo.png" },
    { name: "Amazon", logo: "amazon-logo.png" },
  ];

  return (
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
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {companies.map((company, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/4 lg:basis-1/4">
                <div className="h-32 flex items-center justify-center p-4">
                  <img
                    src={`${storageUrl}/${company.logo}`}
                    alt={company.name}
                    className="h-12 md:h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </div>
  );
};