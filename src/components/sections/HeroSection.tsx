import { Link } from "react-router-dom";
import { Users, Brain, ArrowRight, ChartBar, Search, Shuffle } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/10 via-secondary/5 to-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <span className="inline-flex items-center animate-fade-up bg-secondary/20 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Users className="w-4 h-4 mr-2" />
              Elite Product Talent
            </span>
            <h1 className="animate-fade-up text-4xl md:text-6xl font-bold text-primary mb-6">
              Expert Product Managers, Enhanced by AI
            </h1>
            <p className="animate-fade-up text-lg text-gray-600 mb-8 leading-relaxed">
              Connect with seasoned product managers who leverage AI to deliver exceptional results. Get the perfect blend of human expertise and AI assistance to drive your product success.
            </p>
            <div className="animate-fade-up flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/hire"
                className="bg-secondary hover:bg-secondary/90 text-white w-full sm:w-[240px] px-8 py-4 rounded-lg font-medium inline-flex items-center justify-center transition-colors shadow-lg hover:shadow-secondary/30"
              >
                Hire Product Talent
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
              <div className="relative z-10">
                {/* Product Manager Profile Section */}
                <div className="mb-8 animate-fade-in">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-secondary" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-gray-900">Senior Product Manager</h3>
                      <p className="text-sm text-gray-600">8+ years experience</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="h-12 bg-[#33C3F0]/10 rounded-md p-2">
                      <div className="flex items-center">
                        <Search className="w-4 h-4 text-[#33C3F0] mr-2" />
                        <div>
                          <div className="text-xs font-medium text-gray-700">Market Research</div>
                          <div className="text-[10px] text-gray-500">Strategic Analysis</div>
                        </div>
                      </div>
                    </div>
                    <div className="h-12 bg-[#0EA5E9]/10 rounded-md p-2">
                      <div className="flex items-center">
                        <ChartBar className="w-4 h-4 text-[#0EA5E9] mr-2" />
                        <div>
                          <div className="text-xs font-medium text-gray-700">Data Analytics</div>
                          <div className="text-[10px] text-gray-500">Performance Insights</div>
                        </div>
                      </div>
                    </div>
                    <div className="h-12 bg-[#1EAEDB]/10 rounded-md p-2">
                      <div className="flex items-center">
                        <Shuffle className="w-4 h-4 text-[#1EAEDB] mr-2" />
                        <div>
                          <div className="text-xs font-medium text-gray-700">A/B Testing</div>
                          <div className="text-[10px] text-gray-500">Data-Driven Decisions</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Assistant Indicator */}
                <div className="mb-8 animate-fade-in delay-200">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 via-secondary/20 to-secondary/10 rounded-lg"></div>
                    <div className="relative flex items-center justify-center gap-3 py-4">
                      <span className="text-sm font-medium text-secondary">Powered by AI Assistant</span>
                      <Brain className="w-5 h-5 text-secondary" />
                    </div>
                  </div>
                </div>

                {/* Results Section */}
                <div className="animate-fade-in delay-400">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-600">Delivered Results</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-secondary" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-12 bg-green-50 rounded-md p-2">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        <div>
                          <div className="text-xs font-medium text-gray-700">Strategic Market Insights</div>
                          <div className="text-[10px] text-green-600">Expert Analysis + Data-Driven Validation</div>
                        </div>
                      </div>
                    </div>
                    <div className="h-12 bg-green-50 rounded-md p-2">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        <div>
                          <div className="text-xs font-medium text-gray-700">Competitive Edge</div>
                          <div className="text-[10px] text-green-600">Human Strategy + AI-Powered Research</div>
                        </div>
                      </div>
                    </div>
                    <div className="h-12 bg-green-50 rounded-md p-2">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        <div>
                          <div className="text-xs font-medium text-gray-700">User-Centric Solutions</div>
                          <div className="text-[10px] text-green-600">Deep Understanding + Pattern Recognition</div>
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
