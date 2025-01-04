import { cn } from "@/lib/utils";

export const TrustedBrandsSection = () => {
  const storageUrl = "https://duqgdyzstzpcydztyflb.supabase.co/storage/v1/object/public/assets";
  
  const brands = [
    {
      name: "Bridgestone",
      logo: "bridgestone-logo.png",
      caseStudyLink: "#",
      className: "max-h-8",
    },
    {
      name: "Duolingo",
      logo: "duolingo-logo.png",
      caseStudyLink: "#",
      className: "max-h-8",
    },
    {
      name: "USC",
      logo: "usc-logo.png",
      caseStudyLink: "#",
      className: "max-h-10",
    },
    {
      name: "Shopify",
      logo: "shopify-logo.png",
      caseStudyLink: "#",
      className: "max-h-8",
    },
    {
      name: "Cleveland Cavaliers",
      logo: "cavaliers-logo.png",
      caseStudyLink: "#",
      className: "max-h-12",
    },
  ];

  return (
    <section className="py-16 bg-white border-y">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg font-medium text-gray-600 text-center mb-12">
          TRUSTED BY LEADING BRANDS AND STARTUPS
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center">
          {brands.map((brand, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <img
                src={`${storageUrl}/${brand.logo}`}
                alt={`${brand.name} logo`}
                className={cn(
                  "object-contain grayscale hover:grayscale-0 transition-all duration-300",
                  brand.className
                )}
              />
              <a
                href={brand.caseStudyLink}
                className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
              >
                WATCH THE CASE STUDY
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};