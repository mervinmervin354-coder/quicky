import React from 'react';

export default function KuikyBrandIcon({ className = "w-8 h-8 text-blue-600", containerClassName = "w-12 h-12 rounded-2xl bg-blue-50/90 border border-blue-200/90 flex items-center justify-center shadow-xs overflow-hidden" }) {
  return (
    <div className={containerClassName}>
      <svg
        className={`transition-colors ${className}`}
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Moving Road Track Line */}
        <line
          x1="2" y1="27" x2="30" y2="27"
          strokeWidth="2"
          strokeDasharray="4 4"
          className="animate-move-road stroke-current opacity-90"
        />

        {/* Animated Speed Motion Air Trails */}
        <path d="M2 14H6M3 18H7M2 22H5" strokeWidth="1.5" className="animate-pulse opacity-75 stroke-current" />

        {/* Loaded Pickup Truck Line Art Body */}
        <g className="animate-drive-bounce">
          {/* Stacked Cargo Load Box Outlines */}
          <rect x="9" y="7" width="5" height="7" rx="1" strokeWidth="1.5" className="stroke-current" />
          <rect x="15" y="4" width="6" height="10" rx="1" strokeWidth="1.5" className="stroke-current" />

          {/* Rear Pickup Cargo Deck */}
          <path d="M8 14H20V22H8V14Z" strokeWidth="1.8" />
          
          {/* Front Driver Cabin & Windshield */}
          <path d="M20 10H24L28 16V22H20V10Z" strokeWidth="1.8" />
          <path d="M21 12H24L26.5 16H21V12Z" strokeWidth="1.3" className="stroke-current opacity-70" />

          {/* Front & Rear Wheels */}
          <circle cx="12" cy="23" r="2.5" strokeWidth="1.8" />
          <circle cx="24" cy="23" r="2.5" strokeWidth="1.8" />
        </g>
      </svg>
    </div>
  );
}
