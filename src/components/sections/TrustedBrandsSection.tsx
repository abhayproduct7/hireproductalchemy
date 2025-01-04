import { cn } from "@/lib/utils";

export const TrustedBrandsSection = () => {
  const storageUrl = "https://duqgdyzstzpcydztyflb.supabase.co/storage/v1/object/public/assets";
  
  const brands = [
    { 
      name: "EY", 
      logo: "ey-logo-new.png?t=2025-01-04T14%3A01%3A00.395Z", 
      className: "translate-y-[-8px]"
    },
    { name: "Indeed", logo: "indeed-logo.png", className: "scale-[3]" },
    { name: "Revolut", logo: "revolut-logo.png", className: "" },
    { name: "Monzo", logo: "monzo-logo.png", className: "" },
    { name: "BCG", logo: "bcg-logo-new.png", className: "" },
    { name: "Meta", logo: "meta-logo-new.png", className: "scale-[3]" },
    { name: "Google", logo: "google-logo-new.png", className: "" },
    { name: "Amazon", logo: "amazon-logo-new.png", className: "" },
  ];

  return (
    <section className="py-16 bg-white border-y">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg font-medium text-gray-600 text-center mb-12">
          OUR PRODUCT MANAGERS ARE TRUSTED BY LEADING BRANDS AND STARTUPS
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          {brands.map((brand, index) => (
            <div key={index} className="flex flex-col items-center">
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