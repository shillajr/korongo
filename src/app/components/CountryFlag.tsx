import React from 'react';

interface CountryFlagProps {
  country: 'kenya' | 'tanzania' | 'uganda';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function CountryFlag({ country, size = 'md', className = '' }: CountryFlagProps) {
  const sizeClasses = {
    sm: 'w-5 h-4',
    md: 'w-8 h-6',
    lg: 'w-12 h-9'
  };

  const flags = {
    kenya: (
      <svg viewBox="0 0 48 36" className={`${sizeClasses[size]} ${className}`} aria-label="Kenya flag">
        <rect width="48" height="36" fill="#000000" />
        <rect width="48" height="27" fill="#BB0000" />
        <rect width="48" height="18" fill="#FFFFFF" />
        <rect width="48" height="9" fill="#006600" />
        <g transform="translate(24, 18)">
          <ellipse cx="0" cy="0" rx="8" ry="10" fill="#BB0000" stroke="#FFFFFF" strokeWidth="1.5" />
          <path d="M-6,-8 L6,8 M6,-8 L-6,8" stroke="#FFFFFF" strokeWidth="1.5" />
        </g>
      </svg>
    ),
    tanzania: (
      <svg viewBox="0 0 48 36" className={`${sizeClasses[size]} ${className}`} aria-label="Tanzania flag">
        <rect width="48" height="36" fill="#1EB53A" />
        <rect width="48" height="36" fill="#00A3DD" />
        <polygon points="0,0 48,36 48,0" fill="#1EB53A" />
        <polygon points="0,0 0,36 48,36" fill="#00A3DD" />
        <path d="M0,0 L48,36" stroke="#000000" strokeWidth="6" />
        <path d="M0,0 L48,36" stroke="#FCD116" strokeWidth="3" />
      </svg>
    ),
    uganda: (
      <svg viewBox="0 0 48 36" className={`${sizeClasses[size]} ${className}`} aria-label="Uganda flag">
        <rect width="48" height="36" fill="#000000" />
        <rect width="48" height="6" y="0" fill="#000000" />
        <rect width="48" height="6" y="6" fill="#FCDC04" />
        <rect width="48" height="6" y="12" fill="#D90000" />
        <rect width="48" height="6" y="18" fill="#000000" />
        <rect width="48" height="6" y="24" fill="#FCDC04" />
        <rect width="48" height="6" y="30" fill="#D90000" />
        <circle cx="24" cy="18" r="8" fill="#FFFFFF" />
        <circle cx="24" cy="18" r="6" fill="#FFFFFF" stroke="#000000" strokeWidth="0.5" />
        <path d="M21,16 L22,18 L21,20 L27,20 L26,18 L27,16 Z" fill="#D90000" />
        <circle cx="24" cy="18" r="1.5" fill="#000000" />
      </svg>
    )
  };

  return flags[country];
}
