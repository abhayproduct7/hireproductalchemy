export const CompaniesSection = () => {
  return (
    <div className="text-center mb-16">
      <h2 className="text-2xl font-semibold text-primary mb-8">
        Our Product Managers Come From Elite Tech Companies
      </h2>
      <div className="flex flex-wrap justify-center items-center gap-8 opacity-75">
        <img
          src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
          alt="Google"
          className="h-8 grayscale hover:grayscale-0 transition-all"
        />
        <img
          src="https://about.meta.com/brand/resources/facebookapp/logo/logo-primary.png"
          alt="Meta"
          className="h-8 grayscale hover:grayscale-0 transition-all"
        />
        <img
          src="https://m.media-amazon.com/images/G/01/gc/designs/livepreview/amazon_dkblue_noto_email_v2016_us-main._CB468775337_.png"
          alt="Amazon"
          className="h-8 grayscale hover:grayscale-0 transition-all"
        />
        <img
          src="https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png"
          alt="Apple"
          className="h-8 grayscale hover:grayscale-0 transition-all"
        />
        <img
          src="https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31"
          alt="Microsoft"
          className="h-8 grayscale hover:grayscale-0 transition-all"
        />
      </div>
    </div>
  );
};