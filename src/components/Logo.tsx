import { Link } from "react-router-dom";

interface LogoProps {
  showText?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const Logo = ({ showText = true, className = "", size = "md" }: LogoProps) => {
  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "w-6 h-6";
      case "lg":
        return "w-12 h-12";
      case "xl":
        return "w-32 h-32";
      default:
        return "w-8 h-8";
    }
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className={`flex-shrink-0 ${getSizeClass()}`}
      >
        <defs>
          <linearGradient id="dotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0F4C35" />
            <stop offset="100%" stopColor="#1B5E40" />
          </linearGradient>
        </defs>
        
        {/* Outer circle of dots */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const cx = 50 + 35 * Math.cos(angle);
          const cy = 50 + 35 * Math.sin(angle);
          const size = i % 2 === 0 ? 8 : 6;
          
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={size}
              fill="url(#dotGradient)"
              opacity={i % 2 === 0 ? 1 : 0.7}
            />
          );
        })}
      </svg>
      
      {showText && (
        <span className="text-2xl font-semibold tracking-tight">
          <span className="text-primary">product</span>
          <span className="text-secondary">hire</span>
          <span className="text-primary">.co.uk</span>
        </span>
      )}
    </div>
  );
};

export default Logo;