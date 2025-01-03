import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/c48ed142-2a69-4c2f-b7b9-e0691e03aa53.png" 
                alt="ProductHire Logo" 
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/hire" className="nav-link">
              Hire Talent
            </Link>
            <Link to="/join" className="nav-link">
              Join as Talent
            </Link>
            <Link to="/resources" className="nav-link">
              Resources
            </Link>
            <Link
              to="/signup"
              className="btn-primary px-4 py-2 rounded-md font-medium"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-b border-gray-100">
            <Link
              to="/hire"
              className="block px-3 py-2 rounded-md text-base nav-link"
            >
              Hire Talent
            </Link>
            <Link
              to="/join"
              className="block px-3 py-2 rounded-md text-base nav-link"
            >
              Join as Talent
            </Link>
            <Link
              to="/resources"
              className="block px-3 py-2 rounded-md text-base nav-link"
            >
              Resources
            </Link>
            <Link
              to="/signup"
              className="block px-3 py-2 rounded-md text-base btn-primary text-center"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};