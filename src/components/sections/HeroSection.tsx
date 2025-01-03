import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/5 to-transparent">
      <div className="max-w-7xl mx-auto text-center">
        <span className="inline-block animate-fade-up bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-6">
          Premium Product Management Talent
        </span>
        <h1 className="animate-fade-up text-4xl md:text-6xl font-bold text-primary mb-6">
          Connect with Elite Product Managers
        </h1>
        <p className="animate-fade-up text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Access a curated network of experienced product managers through a simple subscription model.
        </p>
        <div className="animate-fade-up flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/hire"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-medium inline-flex items-center justify-center transition-colors"
          >
            Hire Product Managers
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link
            to="/join"
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-3 rounded-lg font-medium inline-flex items-center justify-center transition-colors"
          >
            Join as Product Manager
          </Link>
        </div>
      </div>
    </section>
  );
};