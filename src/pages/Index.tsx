import { ArrowRight, Star, Users, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block animate-fade-up bg-muted text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
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
              className="btn-primary px-8 py-3 rounded-lg font-medium inline-flex items-center justify-center"
            >
              Hire Product Managers
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/join"
              className="btn-secondary px-8 py-3 rounded-lg font-medium inline-flex items-center justify-center"
            >
              Join as Product Manager
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="animate-fade-up text-center p-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm card-hover">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-6">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Premium Talent</h3>
                <p className="text-gray-600">
                  Access pre-vetted product managers with proven track records.
                </p>
              </div>
            </div>
            <div className="animate-fade-up text-center p-6 delay-100">
              <div className="bg-white rounded-2xl p-6 shadow-sm card-hover">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-6">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Simple Subscription</h3>
                <p className="text-gray-600">
                  Fixed monthly cost with flexibility to change talent as needed.
                </p>
              </div>
            </div>
            <div className="animate-fade-up text-center p-6 delay-200">
              <div className="bg-white rounded-2xl p-6 shadow-sm card-hover">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-6">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Resource Library</h3>
                <p className="text-gray-600">
                  Access shared product management resources and templates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;