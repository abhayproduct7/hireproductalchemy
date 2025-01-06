import { Link } from "react-router-dom";
import { Zap, Brain, ArrowRight } from "lucide-react";

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
            <div className="relative bg-white rounded-lg shadow-xl p-8 overflow-hidden">
              {/* AI Processing Visualization */}
              <div className="relative z-10">
                {/* Input Data Section */}
                <div className="mb-8 animate-fade-in">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-gray-600">Input Tasks</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="h-12 bg-blue-50 rounded-md p-2">
                      <div className="text-xs font-medium text-gray-700">Market Research Report</div>
                      <div className="text-[10px] text-gray-500">Est. Time: 40 hours</div>
                    </div>
                    <div className="h-12 bg-blue-50 rounded-md p-2">
                      <div className="text-xs font-medium text-gray-700">Competitor Analysis</div>
                      <div className="text-[10px] text-gray-500">Est. Time: 25 hours</div>
                    </div>
                    <div className="h-12 bg-blue-50 rounded-md p-2">
                      <div className="text-xs font-medium text-gray-700">User Interviews</div>
                      <div className="text-[10px] text-gray-500">Est. Time: 30 hours</div>
                    </div>
                  </div>
                </div>

                {/* AI Processing Section */}
                <div className="mb-8 animate-fade-in delay-200">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 via-secondary/30 to-secondary/20 rounded-lg animate-pulse"></div>
                    <div className="relative flex items-center justify-center py-6">
                      <Brain className="w-12 h-12 text-secondary animate-pulse" />
                      <div className="absolute inset-0 bg-secondary/5 rounded-lg transform rotate-3 animate-pulse"></div>
                      <div className="absolute inset-0 bg-secondary/5 rounded-lg transform -rotate-3 animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* Output Section */}
                <div className="animate-fade-in delay-400">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-600">AI-Optimized Output</span>
                    </div>
                    <Zap className="w-5 h-5 text-secondary" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-12 bg-green-50 rounded-md p-2">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        <div>
                          <div className="text-xs font-medium text-gray-700">Enhanced Market Analysis</div>
                          <div className="text-[10px] text-green-600">Completed in 15 hours</div>
                        </div>
                      </div>
                    </div>
                    <div className="h-12 bg-green-50 rounded-md p-2">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        <div>
                          <div className="text-xs font-medium text-gray-700">AI-Driven Insights</div>
                          <div className="text-[10px] text-green-600">Completed in 8 hours</div>
                        </div>
                      </div>
                    </div>
                    <div className="h-12 bg-green-50 rounded-md p-2">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        <div>
                          <div className="text-xs font-medium text-gray-700">User Feedback Analysis</div>
                          <div className="text-[10px] text-green-600">Completed in 10 hours</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Background Decoration */}
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-secondary/10 rounded-full blur-xl"></div>
              <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-secondary/10 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};