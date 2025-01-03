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
        <circle cx="30" cy="20" r="4" fill="#0EA5E9" />
        <circle cx="50" cy="30" r="4" fill="#9B87F5" />
        <circle cx="70" cy="20" r="4" fill="#0EA5E9" />
        <circle cx="20" cy="50" r="4" fill="#0EA5E9" />
        <circle cx="40" cy="60" r="4" fill="#9B87F5" />
        <circle cx="60" cy="50" r="4" fill="#9B87F5" />
        <circle cx="30" cy="80" r="4" fill="#0EA5E9" />
        <circle cx="50" cy="70" r="4" fill="#9B87F5" />
        <line x1="30" y1="20" x2="50" y2="30" stroke="#0EA5E9" strokeWidth="2" />
        <line x1="50" y1="30" x2="70" y2="20" stroke="#9B87F5" strokeWidth="2" />
        <line x1="20" y1="50" x2="40" y2="60" stroke="#0EA5E9" strokeWidth="2" />
        <line x1="40" y1="60" x2="60" y2="50" stroke="#9B87F5" strokeWidth="2" />
        <line x1="30" y1="80" x2="50" y2="70" stroke="#0EA5E9" strokeWidth="2" />
        <line x1="50" y1="30" x2="40" y2="60" stroke="#9B87F5" strokeWidth="2" />
        <line x1="50" y1="70" x2="60" y2="50" stroke="#9B87F5" strokeWidth="2" />
      </svg>
      <div className="text-2xl font-semibold">
        <span className="text-[#0EA5E9]">Product</span>
        <span className="text-[#33C3F0]">Hire</span>
      </div>
    </div>
  );
};

export default Logo;