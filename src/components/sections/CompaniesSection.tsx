export const CompaniesSection = () => {
  return (
    <div className="text-center mb-16">
      <h2 className="text-2xl font-semibold text-primary mb-8">
        Our Product Managers Come From Elite Tech Companies
      </h2>
      <div className="flex flex-wrap justify-center items-center gap-8 opacity-75">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
          alt="Google"
          className="h-8 grayscale hover:grayscale-0 transition-all"
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Meta-Logo.png/640px-Meta-Logo.png"
          alt="Meta"
          className="h-8 grayscale hover:grayscale-0 transition-all"
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg"
          alt="Amazon"
          className="h-8 grayscale hover:grayscale-0 transition-all"
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
          alt="Apple"
          className="h-8 grayscale hover:grayscale-0 transition-all"
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg"
          alt="Microsoft"
          className="h-8 grayscale hover:grayscale-0 transition-all"
        />
      </div>
    </div>
  );
};