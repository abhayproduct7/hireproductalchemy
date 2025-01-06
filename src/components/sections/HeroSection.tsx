import { Link } from "react-router-dom";
import { Users } from "lucide-react";
import { ProfileSection } from "./hero/ProfileSection";
import { ProductTasks } from "./hero/ProductTasks";
import { DeliveredResults } from "./hero/DeliveredResults";
import Logo from "../Logo";

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
                <ProfileSection />
                <ProductTasks />
                
                {/* Modern Button-like Element */}
                <div className="relative py-6">
                  <button className="w-full group relative overflow-hidden rounded-lg bg-gradient-to-r from-secondary/5 via-secondary/10 to-secondary/5 px-8 py-4 transition-all hover:shadow-lg">
                    <div className="absolute inset-0 bg-secondary/5 transform transition-transform group-hover:scale-105"></div>
                    <div className="relative flex items-center justify-center gap-3">
                      <div className="w-5 h-5">
                        <Logo showText={false} />
                      </div>
                      <span className="text-secondary text-sm">
                        Our Product Specialists Enhanced by AI Assistant
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-secondary/20 to-transparent"></div>
                  </button>
                </div>

                <DeliveredResults />
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