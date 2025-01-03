import { ArrowRight, Users, Zap, Bot } from "lucide-react";
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

      {/* Elite Companies & Features Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Elite Tech Companies */}
          <div className="text-center mb-16">
            <h2 className="text-2xl font-semibold text-primary mb-8">Our Product Managers Come From Elite Tech Companies</h2>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-75">
              <img src="/google-logo.svg" alt="Google" className="h-8 grayscale hover:grayscale-0 transition-all" />
              <img src="/meta-logo.svg" alt="Meta" className="h-8 grayscale hover:grayscale-0 transition-all" />
              <img src="/amazon-logo.svg" alt="Amazon" className="h-8 grayscale hover:grayscale-0 transition-all" />
              <img src="/apple-logo.svg" alt="Apple" className="h-8 grayscale hover:grayscale-0 transition-all" />
              <img src="/microsoft-logo.svg" alt="Microsoft" className="h-8 grayscale hover:grayscale-0 transition-all" />
            </div>
          </div>

          {/* Key Features Grid */}
          <div className="grid md:grid-cols-3 gap-12 mt-16">
            {/* Instant Scaling */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-6">
                <Zap className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Instant Team Scaling</h3>
              <p className="text-gray-600">
                Access pre-vetted product managers immediately and scale your product team on demand.
                No lengthy hiring processes.
              </p>
            </div>

            {/* Flexible Subscription */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-6">
                <Users className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Cancel Anytime</h3>
              <p className="text-gray-600">
                Flexible monthly subscription with no long-term commitments. Replace talent or cancel whenever needed.
              </p>
            </div>

            {/* AI Integration */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-6">
                <Bot className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">AI-Powered Support</h3>
              <p className="text-gray-600">
                Access specialized AI agents trained in product management to support your product journey.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
