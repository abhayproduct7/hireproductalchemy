import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <svg
        width="40"
        height="40"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Main circular frame */}
        <circle cx="50" cy="50" r="45" stroke="#1A1A1A" strokeWidth="2" />
        
        {/* P shape */}
        <path
          d="M35 25 L35 75 M35 25 L55 25 Q65 25 65 35 L65 40 Q65 50 55 50 L35 50"
          stroke="#1A1A1A"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* H shape */}
        <path
          d="M45 60 L65 60 M55 50 L55 75"
          stroke="#0F4C35"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Decorative elements */}
        <circle cx="65" cy="35" r="3" fill="#0F4C35" />
        <circle cx="35" cy="75" r="3" fill="#1A1A1A" />
      </svg>
      <div className="text-2xl font-semibold">
        <span className="text-primary">Product</span>
        <span className="text-secondary">Hire</span>
      </div>
    </div>
  );
};

export default Logo;