import { cn } from "@/lib/utils";

export const TrustedBrandsSection = () => {
  const storageUrl = "https://duqgdyzstzpcydztyflb.supabase.co/storage/v1/object/public/assets";
  
  const brands = [
    { 
      name: "EY", 
      logo: "ey-logo-new.png?t=2025-01-04T14%3A01%3A00.395Z", 
      className: "translate-y-[-8px] h-8 scale-[2]"
    },
    { name: "Indeed", logo: "indeed-logo.png", className: "scale-[2] h-6" },
    { name: "Revolut", logo: "revolut-logo.png", className: "h-8 scale-[2]" },
    { name: "Monzo", logo: "monzo-logo.png", className: "h-8 scale-[2]" },
    { name: "BCG", logo: "bcg-logo-new.png", className: "h-8 scale-[0.5]" },
    { name: "Meta", logo: "meta-logo-new.png", className: "scale-[2] h-6" },
    { name: "Google", logo: "google-logo-new.png", className: "h-8 scale-[2]" },
    { name: "Amazon", logo: "amazon-logo-new.png", className: "h-8 scale-[2]" },
  ];

  return (
    <section className="py-12 bg-white border-y">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg font-medium text-gray-600 text-center mb-8">
          OUR PRODUCT MANAGERS ARE TRUSTED BY LEADING BRANDS AND STARTUPS
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-8 items-center justify-items-center">
          {brands.map((brand, index) => (
            <div key={index} className="flex items-center justify-center w-full h-12">
              <img
                src={`${storageUrl}/${brand.logo}`}
                alt={`${brand.name} logo`}
                className={cn(
                  "object-contain grayscale hover:grayscale-0 transition-all duration-300",
                  brand.className
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};