import { Link } from "react-router-dom";
import { Zap, Clock, X, CheckCircle } from "lucide-react";

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
              <div className="grid grid-cols-2 h-full">
                {/* Before Side */}
                <div className="relative p-6 bg-gray-100">
                  <div className="absolute top-4 left-4 bg-white/90 text-gray-700 px-3 py-1 rounded-full text-sm">
                    Before AI
                  </div>
                  <div className="space-y-4">
                    <div className="h-12 bg-white rounded flex items-center px-4 border border-gray-200">
                      <Clock className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">Manual Research: 4hrs</span>
                      <X className="w-4 h-4 text-red-400 ml-auto" />
                    </div>
                    <div className="h-12 bg-white rounded flex items-center px-4 border border-gray-200">
                      <Clock className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">Data Analysis: 6hrs</span>
                      <X className="w-4 h-4 text-red-400 ml-auto" />
                    </div>
                    <div className="h-12 bg-white rounded flex items-center px-4 border border-gray-200">
                      <Clock className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">Documentation: 3hrs</span>
                      <X className="w-4 h-4 text-red-400 ml-auto" />
                    </div>
                  </div>
                </div>
                {/* After Side */}
                <div className="relative p-6 bg-gradient-to-br from-secondary/20 to-secondary/10">
                  <div className="absolute top-4 right-4 bg-secondary text-white px-3 py-1 rounded-full text-sm">
                    With AI
                  </div>
                  <div className="space-y-4">
                    <div className="h-12 bg-white/90 rounded flex items-center px-4">
                      <Zap className="w-4 h-4 text-secondary mr-2" />
                      <span className="text-sm">Research: 1hr</span>
                      <CheckCircle className="w-4 h-4 text-secondary ml-auto" />
                    </div>
                    <div className="h-12 bg-white/90 rounded flex items-center px-4">
                      <Zap className="w-4 h-4 text-secondary mr-2" />
                      <span className="text-sm">Analysis: 2hrs</span>
                      <CheckCircle className="w-4 h-4 text-secondary ml-auto" />
                    </div>
                    <div className="h-12 bg-white/90 rounded flex items-center px-4">
                      <Zap className="w-4 h-4 text-secondary mr-2" />
                      <span className="text-sm">Docs: 30min</span>
                      <CheckCircle className="w-4 h-4 text-secondary ml-auto" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 backdrop-blur-sm rounded-full">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-white text-sm font-medium">
                    2x Faster Product Development with AI Assistance
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