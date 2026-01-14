import React from 'react';

interface CulturalPatternProps {
  variant?: 'kitenge' | 'beadwork' | 'geometric';
  className?: string;
  opacity?: number;
}

export function CulturalPattern({ variant = 'geometric', className = '', opacity = 0.05 }: CulturalPatternProps) {
  const patterns = {
    // Geometric pattern inspired by East African textiles
    geometric: (
      <pattern id="geometric-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="10" cy="10" r="2" fill="currentColor" />
        <circle cx="30" cy="10" r="2" fill="currentColor" />
        <circle cx="10" cy="30" r="2" fill="currentColor" />
        <circle cx="30" cy="30" r="2" fill="currentColor" />
        <path d="M10,10 L30,30 M30,10 L10,30" stroke="currentColor" strokeWidth="0.5" />
        <rect x="18" y="18" width="4" height="4" fill="currentColor" />
      </pattern>
    ),
    
    // Kitenge-inspired pattern
    kitenge: (
      <pattern id="kitenge-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
        <circle cx="15" cy="15" r="8" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="45" cy="15" r="8" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="15" cy="45" r="8" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="45" cy="45" r="8" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="30" cy="30" r="6" fill="currentColor" />
        <path d="M15,15 Q30,0 45,15 Q60,30 45,45 Q30,60 15,45 Q0,30 15,15" fill="none" stroke="currentColor" strokeWidth="0.5" />
      </pattern>
    ),
    
    // Beadwork-inspired pattern
    beadwork: (
      <pattern id="beadwork-pattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
        <circle cx="7.5" cy="7.5" r="3" fill="currentColor" />
        <circle cx="22.5" cy="7.5" r="3" fill="currentColor" />
        <circle cx="7.5" cy="22.5" r="3" fill="currentColor" />
        <circle cx="22.5" cy="22.5" r="3" fill="currentColor" />
        <circle cx="15" cy="15" r="3" fill="currentColor" />
        <line x1="7.5" y1="7.5" x2="22.5" y2="22.5" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        <line x1="22.5" y1="7.5" x2="7.5" y2="22.5" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      </pattern>
    )
  };

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} style={{ opacity }}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {patterns[variant]}
        </defs>
        <rect width="100%" height="100%" fill={`url(#${variant}-pattern)`} />
      </svg>
    </div>
  );
}
