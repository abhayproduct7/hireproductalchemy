import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Neural network inspired background */}
        <defs>
          <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0F4C35" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#1A1A1A" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        {/* Background circle with gradient */}
        <circle 
          cx="16" 
          cy="16" 
          r="15" 
          fill="url(#neuralGradient)"
          stroke="#1A1A1A"
          strokeWidth="1"
        />

        {/* Abstract neural network connections */}
        <path
          d="M8 12 Q16 8 24 12 Q16 16 8 20 Q16 24 24 20"
          fill="none"
          stroke="#0F4C35"
          strokeWidth="0.75"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* Main logo shape - abstract P */}
        <path
          d="M12 10 C16 10 20 12 20 16 C20 20 16 22 12 22 L12 10"
          fill="none"
          stroke="#1A1A1A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Secondary shape - abstract H */}
        <path
          d="M16 14 L22 14 M19 11 L19 20"
          fill="none"
          stroke="#0F4C35"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Decorative nodes */}
        <circle cx="12" cy="10" r="1" fill="#1A1A1A" />
        <circle cx="22" cy="14" r="1" fill="#0F4C35" />
        <circle cx="12" cy="22" r="1" fill="#1A1A1A" />
      </svg>
      <div className="text-lg font-semibold">
        <span className="text-primary">Product</span>
        <span className="text-secondary">Hire</span>
      </div>
    </div>
  );
};

export default Logo;