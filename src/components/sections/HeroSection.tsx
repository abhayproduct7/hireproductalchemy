import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/10 via-secondary/5 to-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <span className="inline-flex items-center animate-fade-up bg-secondary/20 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4 mr-2" />
              AI-Enhanced Product Talent
            </span>
            <h1 className="animate-fade-up text-4xl md:text-6xl font-bold text-primary mb-6">
              Supercharge Your Product Teams with AI-Powered Talent
            </h1>
            <p className="animate-fade-up text-lg text-gray-600 mb-8 leading-relaxed">
              Access elite product managers enhanced by our specialized AI assistant. Get the perfect blend of human expertise and artificial intelligence to drive innovation, efficiency, and exceptional product outcomes.
            </p>
            <div className="animate-fade-up flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/hire"
                className="bg-secondary hover:bg-secondary/90 text-white w-full sm:w-[240px] px-8 py-4 rounded-lg font-medium inline-flex items-center justify-center transition-colors shadow-lg hover:shadow-secondary/30"
              >
                Hire AI-Enhanced Talent
              </Link>
              <Link
                to="/join"
                className="bg-primary hover:bg-primary/90 text-white w-full sm:w-[240px] px-8 py-4 rounded-lg font-medium inline-flex items-center justify-center transition-colors shadow-lg hover:shadow-primary/30"
              >
                Join Our Community
              </Link>
            </div>
          </div>
          <div className="hidden md:block relative">
            <div className="relative rounded-lg shadow-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
                alt="AI-enhanced product management"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary/80 to-transparent mix-blend-multiply"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 backdrop-blur-sm rounded-full">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-white text-sm font-medium">
                    AI-powered assistance for enhanced productivity
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};