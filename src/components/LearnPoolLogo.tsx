import React from 'react';

interface LearnPoolLogoProps {
  variant?: 'default' | 'white' | 'compact';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showSubtitle?: boolean;
}

export const LearnPoolLogo: React.FC<LearnPoolLogoProps> = ({
  variant = 'default',
  size = 'md',
  className = '',
  showSubtitle = true,
}) => {
  const iconSize = size === 'sm' ? 28 : size === 'lg' ? 44 : 36;
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';
  const subtitleSize = size === 'sm' ? 'text-[9px]' : size === 'lg' ? 'text-[11px]' : 'text-[10px]';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Exact Brand Squircle Icon */}
      <div
        className="relative flex-shrink-0 flex items-center justify-center rounded-[10px] shadow-sm overflow-hidden"
        style={{
          width: iconSize,
          height: iconSize,
          background: 'linear-gradient(140deg, #3b82f6 0%, #2563eb 55%, #1d4ed8 100%)',
        }}
      >
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-1"
        >
          {/* Top Graduation Mortarboard / Apex Peak */}
          <path
            d="M18 7.5L20.8 10.5H15.2L18 7.5Z"
            fill="#ffffff"
            opacity="0.95"
          />

          {/* Upper Ripple Wave (Soft Sky Blue) */}
          <path
            d="M8.5 17.2C11 14.2 14.5 14.2 18 17C21.5 14.2 25 14.2 27.5 17.2"
            stroke="#93c5fd"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Lower Ripple Wave (Pure Crisp White) */}
          <path
            d="M8.5 23.2C11 20.2 14.5 20.2 18 23C21.5 20.2 25 20.2 27.5 23.2"
            stroke="#ffffff"
            strokeWidth="2.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Brand Text */}
      {variant !== 'compact' && (
        <div className="flex flex-col leading-tight">
          <div className={`font-extrabold tracking-tight flex items-baseline ${textSize}`}>
            <span className={variant === 'white' ? 'text-white' : 'text-slate-900'}>
              Learn
            </span>
            <span className={variant === 'white' ? 'text-blue-300' : 'text-blue-600'}>
              Pool
            </span>
          </div>
          {showSubtitle && (
            <span
              className={`font-bold uppercase tracking-[0.22em] ${subtitleSize} ${
                variant === 'white' ? 'text-blue-200/80' : 'text-slate-500'
              }`}
            >
              Collegiate LMS
            </span>
          )}
        </div>
      )}
    </div>
  );
};
