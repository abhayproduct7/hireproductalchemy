import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/10 via-secondary/5 to-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <span className="inline-block animate-fade-up bg-secondary/20 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-6">
              Premium Product Management Talent
            </span>
            <h1 className="animate-fade-up text-4xl md:text-6xl font-bold text-primary mb-6">
              Connect with Elite Product Managers
            </h1>
            <p className="animate-fade-up text-lg md:text-xl text-gray-600 mb-8">
              Access a curated network of experienced product managers through a simple subscription model.
            </p>
            <div className="animate-fade-up flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/hire"
                className="bg-secondary hover:bg-secondary/90 text-white px-8 py-3 rounded-lg font-medium inline-flex items-center justify-center transition-colors shadow-lg hover:shadow-secondary/30"
              >
                Hire Product Managers
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/join"
                className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-lg font-medium inline-flex items-center justify-center transition-colors shadow-lg hover:shadow-accent/30"
              >
                Join as Product Manager
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
              alt="Product Manager working"
              className="rounded-lg shadow-xl animate-fade-up"
            />
          </div>
        </div>
      </div>
    </section>
  );
};