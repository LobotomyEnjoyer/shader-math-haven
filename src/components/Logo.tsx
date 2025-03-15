
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <Link 
      to="/" 
      className={cn(
        "flex items-center gap-2 font-semibold text-2xl transition-opacity duration-300 hover:opacity-80",
        className
      )}
    >
      <svg 
        width="32" 
        height="32" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="text-ocean-blue"
      >
        <path 
          d="M18 4v16M8 20c0-4.4 3.6-8 8-8c-4.4 0-8-3.6-8-8" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
      <span className="hidden sm:inline-block">ShaderMath</span>
    </Link>
  );
};

export default Logo;
