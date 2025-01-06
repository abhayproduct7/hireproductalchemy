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
        {/* Main circular frame */}
        <circle 
          cx="16" 
          cy="16" 
          r="15" 
          fill="none" 
          stroke="#1A1A1A" 
          strokeWidth="1.5"
        />
        
        {/* P letter */}
        <path
          d="M10 8 L10 24 M10 8 H16 Q20 8 20 12 T16 16 H10"
          fill="none"
          stroke="#1A1A1A"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* H letter */}
        <path
          d="M14 16 L22 16 M18 12 L18 24"
          fill="none"
          stroke="#0F4C35"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Decorative dots */}
        <circle cx="10" cy="24" r="1.5" fill="#1A1A1A" />
        <circle cx="22" cy="16" r="1.5" fill="#0F4C35" />
      </svg>
      <div className="text-xl font-semibold">
        <span className="text-primary">Product</span>
        <span className="text-secondary">Hire</span>
      </div>
    </div>
  );
};

export default Logo;