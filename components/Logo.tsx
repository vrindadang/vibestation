import React from 'react';

interface LogoProps {
  className?: string;
  withExtras?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "w-6 h-6", withExtras = true }) => {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={className}
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z" />
      {withExtras && (
        <>
          <path d="M18 5 L22 5 M20 3 L20 7" opacity="0.8" />
          <circle cx="5" cy="19" r="1.5" fill="currentColor" stroke="none" />
        </>
      )}
    </svg>
  );
};

export default Logo;