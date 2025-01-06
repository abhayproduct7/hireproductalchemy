import { Link } from "react-router-dom";

interface LogoProps {
  showText?: boolean;
}

const Logo = ({ showText = true }: LogoProps) => {
  return (
    <div className="flex items-center gap-2">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Gradient background */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0F4C35" />
            <stop offset="100%" stopColor="#1B5E40" />
          </linearGradient>
        </defs>
        
        {/* Main hexagonal shape */}
        <path
          d="M16 4 L26 10 L26 22 L16 28 L6 22 L6 10 Z"
          fill="url(#logoGradient)"
          opacity="0.9"
        />

        {/* Connecting lines representing AI/neural networks */}
        <path
          d="M16 8 L22 12 M16 8 L10 12 M16 24 L22 20 M16 24 L10 20"
          stroke="white"
          strokeWidth="0.75"
          opacity="0.6"
        />

        {/* Central node */}
        <circle
          cx="16"
          cy="16"
          r="4"
          fill="white"
          opacity="0.9"
        />

        {/* Smaller nodes */}
        <circle cx="16" cy="8" r="2" fill="white" opacity="0.7" />
        <circle cx="22" cy="12" r="2" fill="white" opacity="0.7" />
        <circle cx="22" cy="20" r="2" fill="white" opacity="0.7" />
        <circle cx="16" cy="24" r="2" fill="white" opacity="0.7" />
        <circle cx="10" cy="20" r="2" fill="white" opacity="0.7" />
        <circle cx="10" cy="12" r="2" fill="white" opacity="0.7" />
      </svg>
      {showText && (
        <div className="text-lg font-semibold">
          <span className="text-primary">Product</span>
          <span className="text-secondary">Hire</span>
        </div>
      )}
    </div>
  );
};

export default Logo;