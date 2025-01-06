import { FC } from "react";

export const AILogo: FC<{ className?: string }> = ({ className = "w-64 h-64" }) => {
  return (
    <div className={`relative animate-pulse ${className}`}>
      <svg
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="karmaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0F4C35" />
            <stop offset="100%" stopColor="#1B5E40" />
          </linearGradient>
        </defs>
        
        <path
          d="M16 4 L26 10 L26 22 L16 28 L6 22 L6 10 Z"
          fill="url(#karmaGradient)"
          opacity="0.9"
          className="animate-pulse"
        />
        
        <path
          d="M16 8 L22 12 M16 8 L10 12 M16 24 L22 20 M16 24 L10 20"
          stroke="white"
          strokeWidth="0.75"
          opacity="0.6"
        />
        
        <circle
          cx="16"
          cy="16"
          r="4"
          fill="white"
          opacity="0.9"
          className="animate-pulse"
        />
        
        <circle cx="16" cy="8" r="2" fill="white" opacity="0.7" />
        <circle cx="22" cy="12" r="2" fill="white" opacity="0.7" />
        <circle cx="22" cy="20" r="2" fill="white" opacity="0.7" />
        <circle cx="16" cy="24" r="2" fill="white" opacity="0.7" />
        <circle cx="10" cy="20" r="2" fill="white" opacity="0.7" />
        <circle cx="10" cy="12" r="2" fill="white" opacity="0.7" />
      </svg>
    </div>
  );
};