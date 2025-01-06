import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Main circular frame */}
        <circle 
          cx="50" 
          cy="50" 
          r="45" 
          fill="none" 
          stroke="#1A1A1A" 
          strokeWidth="2" 
        />
        
        {/* P letter */}
        <path
          d="M30 30 L30 70 M30 30 H50 Q65 30 65 45 T50 60 H30"
          fill="none"
          stroke="#1A1A1A"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* H letter */}
        <path
          d="M45 45 L70 45 M57.5 35 L57.5 70"
          fill="none"
          stroke="#0F4C35"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Decorative dots */}
        <circle cx="30" cy="70" r="3" fill="#1A1A1A" />
        <circle cx="70" cy="45" r="3" fill="#0F4C35" />
      </svg>
      <div className="text-2xl font-semibold">
        <span className="text-primary">Product</span>
        <span className="text-secondary">Hire</span>
      </div>
    </div>
  );
};

export default Logo;