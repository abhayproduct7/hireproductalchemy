export const CompaniesSection = () => {
  const storageUrl = "https://duqgdyzstzpcydztyflb.supabase.co/storage/v1/object/public/assets";
  
  return (
    <div className="text-center mb-16">
      <h2 className="text-2xl font-semibold text-primary mb-8">
        Our Product Managers Come From Elite Tech Companies
      </h2>
      <div className="flex flex-wrap justify-center items-center gap-8 opacity-75">
        <img
          src={`${storageUrl}/google-logo.png`}
          alt="Google"
          className="h-8 grayscale hover:grayscale-0 transition-all"
        />
        <img
          src={`${storageUrl}/meta-logo.png`}
          alt="Meta"
          className="h-8 grayscale hover:grayscale-0 transition-all"
        />
        <img
          src={`${storageUrl}/amazon-logo.png`}
          alt="Amazon"
          className="h-8 grayscale hover:grayscale-0 transition-all"
        />
        <img
          src={`${storageUrl}/apple-logo.png`}
          alt="Apple"
          className="h-8 grayscale hover:grayscale-0 transition-all"
        />
        <img
          src={`${storageUrl}/microsoft-logo.png`}
          alt="Microsoft"
          className="h-8 grayscale hover:grayscale-0 transition-all"
        />
        <img
          src={`${storageUrl}/netflix-logo.png`}
          alt="Netflix"
          className="h-8 grayscale hover:grayscale-0 transition-all"
        />
        <img
          src={`${storageUrl}/uber-logo.png`}
          alt="Uber"
          className="h-8 grayscale hover:grayscale-0 transition-all"
        />
        <img
          src={`${storageUrl}/airbnb-logo.png`}
          alt="Airbnb"
          className="h-8 grayscale hover:grayscale-0 transition-all"
        />
      </div>
    </div>
  );
};