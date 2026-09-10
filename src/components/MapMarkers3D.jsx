import React from 'react';
import { AlertCircle, Sparkles, Utensils } from 'lucide-react';

/**
 * 🟢 GREEN 3D ARROW
 * For normal/living cultural heritage and places
 */
export function GreenArrowMarker3D({ active, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex flex-col items-center cursor-pointer focus:outline-none -translate-x-1/2 -translate-y-full transition-transform duration-200 hover:scale-115 active:scale-95"
      style={{ zIndex: active ? 40 : 25 }}
      aria-label={label}
    >
      {/* 3D Arrow Graphic */}
      <div className="relative flex flex-col items-center filter drop-shadow-[0_8px_12px_rgba(16,120,60,0.35)]">
        {/* Floating Arrow Head & Body */}
        <div className="relative w-9 h-11 transition-transform duration-200 group-hover:-translate-y-1">
          <svg viewBox="0 0 36 44" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="green3dFront" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34D399" />
                <stop offset="40%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
              <linearGradient id="green3dSide" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#047857" />
                <stop offset="100%" stopColor="#065F46" />
              </linearGradient>
              <linearGradient id="greenHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* 3D Depth / Bevel sides */}
            <path
              d="M 18 40 L 32 18 L 24 18 L 24 4 L 18 4 Z"
              fill="url(#green3dSide)"
              opacity="0.9"
            />

            {/* Front Arrow Face */}
            <path
              d="M 18 38 L 4 18 L 12 18 L 12 2 L 24 2 L 24 18 L 32 18 Z"
              fill="url(#green3dFront)"
              stroke="#047857"
              strokeWidth="0.8"
            />

            {/* Specular Highlight */}
            <path
              d="M 14 4 L 22 4 L 22 16 L 28 16 L 18 32 L 8 16 L 14 16 Z"
              fill="url(#greenHighlight)"
            />

            {/* Center Cultural Sparkle Icon */}
            <circle cx="18" cy="11" r="3.5" fill="#FFFFFF" opacity="0.9" />
            <circle cx="18" cy="11" r="1.8" fill="#047857" />
          </svg>
        </div>

        {/* 3D Ground Shadow Oval */}
        <div className="w-6 h-2 rounded-full bg-emerald-950/35 blur-[2px] mt-0.5" />
      </div>

      {/* Label Pill on Hover / Active */}
      <div className={`mt-1 px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap shadow-md border transition-all duration-200 pointer-events-none ${
        active
          ? 'bg-emerald-700 text-white border-emerald-500 scale-105 opacity-100'
          : 'bg-white/95 text-emerald-900 border-emerald-200 opacity-90 group-hover:opacity-100 group-hover:scale-105'
      }`}>
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1.5 align-middle"></span>
        {label}
      </div>
    </button>
  );
}

/**
 * 🔴 RED 3D ARROW
 * For at-risk/declining cultural traditions
 */
export function RedArrowMarker3D({ active, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex flex-col items-center cursor-pointer focus:outline-none -translate-x-1/2 -translate-y-full transition-transform duration-200 hover:scale-115 active:scale-95"
      style={{ zIndex: active ? 45 : 30 }}
      aria-label={label}
    >
      {/* Pulsing Warning Aura Ring for At-Risk Status */}
      <div className="absolute -top-3 w-12 h-12 rounded-full bg-red-500/25 animate-ping pointer-events-none" />

      {/* 3D Arrow Graphic */}
      <div className="relative flex flex-col items-center filter drop-shadow-[0_8px_14px_rgba(220,38,38,0.45)]">
        {/* Floating Arrow Head & Body */}
        <div className="relative w-10 h-12 transition-transform duration-200 group-hover:-translate-y-1">
          <svg viewBox="0 0 36 44" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="red3dFront" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F87171" />
                <stop offset="40%" stopColor="#EF4444" />
                <stop offset="100%" stopColor="#DC2626" />
              </linearGradient>
              <linearGradient id="red3dSide" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#B91C1C" />
                <stop offset="100%" stopColor="#991B1B" />
              </linearGradient>
              <linearGradient id="redHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* 3D Depth / Bevel sides */}
            <path
              d="M 18 40 L 32 18 L 24 18 L 24 4 L 18 4 Z"
              fill="url(#red3dSide)"
              opacity="0.95"
            />

            {/* Front Arrow Face */}
            <path
              d="M 18 38 L 4 18 L 12 18 L 12 2 L 24 2 L 24 18 L 32 18 Z"
              fill="url(#red3dFront)"
              stroke="#991B1B"
              strokeWidth="0.8"
            />

            {/* Specular Highlight */}
            <path
              d="M 14 4 L 22 4 L 22 16 L 28 16 L 18 32 L 8 16 L 14 16 Z"
              fill="url(#redHighlight)"
            />

            {/* Warning Exclamation Symbol */}
            <circle cx="18" cy="11" r="4.5" fill="#FFFFFF" opacity="0.95" />
            <path d="M 18 8.5 L 18 11.5" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="18" cy="13.5" r="0.8" fill="#DC2626" />
          </svg>
        </div>

        {/* 3D Ground Shadow Oval */}
        <div className="w-7 h-2.5 rounded-full bg-red-950/40 blur-[2px] mt-0.5" />
      </div>

      {/* Label Pill on Hover / Active */}
      <div className={`mt-1 px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap shadow-md border transition-all duration-200 pointer-events-none ${
        active
          ? 'bg-red-600 text-white border-red-400 scale-105 opacity-100'
          : 'bg-white/95 text-red-700 border-red-200 opacity-90 group-hover:opacity-100 group-hover:scale-105'
      }`}>
        <span className="inline-block w-2 h-2 rounded-full bg-red-600 mr-1.5 animate-pulse align-middle"></span>
        <span className="text-[10px] uppercase tracking-wider text-red-500 font-extrabold mr-1">AT-RISK:</span>
        {label}
      </div>
    </button>
  );
}

/**
 * 🍽️ 3D FOOD MARKER
 * For food/cuisine (NOT arrows - elevated 3D cloche/dish)
 */
export function FoodMarker3D({ active, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex flex-col items-center cursor-pointer focus:outline-none -translate-x-1/2 -translate-y-full transition-transform duration-200 hover:scale-115 active:scale-95"
      style={{ zIndex: active ? 40 : 25 }}
      aria-label={label}
    >
      {/* 3D Elevated Serving Dish / Cloche Icon */}
      <div className="relative flex flex-col items-center filter drop-shadow-[0_8px_14px_rgba(216,97,47,0.38)]">
        {/* Animated Aroma Steam Lines */}
        <div className="absolute -top-3 flex space-x-1 opacity-75 group-hover:opacity-100 transition-opacity">
          <span className="w-0.5 h-2.5 bg-amber-400/80 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-0.5 h-3.5 bg-amber-500/80 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-0.5 h-2.5 bg-amber-400/80 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>

        {/* 3D Cloche Dome & Pedestal */}
        <div className="relative w-11 h-11 transition-transform duration-200 group-hover:-translate-y-1">
          <svg viewBox="0 0 44 44" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="foodGoldDome" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE68A" />
                <stop offset="35%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
              <linearGradient id="foodBasePlate" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#B45309" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#92400E" />
              </linearGradient>
              <linearGradient id="foodHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Base Serving Platter (Elliptical 3D Tray) */}
            <ellipse cx="22" cy="31" rx="18" ry="4.5" fill="url(#foodBasePlate)" stroke="#78350F" strokeWidth="0.8" />
            <ellipse cx="22" cy="30" rx="16" ry="3.5" fill="#FBBF24" opacity="0.6" />

            {/* Dome Cloche Lid */}
            <path
              d="M 8 30 C 8 16, 36 16, 36 30 Z"
              fill="url(#foodGoldDome)"
              stroke="#B45309"
              strokeWidth="0.8"
            />

            {/* Specular curved reflection on dome */}
            <path
              d="M 12 28 C 13 19, 31 19, 32 28 C 30 22, 14 22, 12 28 Z"
              fill="url(#foodHighlight)"
            />

            {/* Cloche Top Handle Knob */}
            <circle cx="22" cy="15.5" r="3" fill="#FDE68A" stroke="#B45309" strokeWidth="0.8" />
            <circle cx="22" cy="14.5" r="1.2" fill="#FFFFFF" opacity="0.9" />

            {/* Fork & Spoon / Cuisine icon badge */}
            <circle cx="22" cy="24" r="5" fill="#78350F" opacity="0.95" />
            <path
              d="M 20 22 L 20 26 M 24 22 L 24 26 M 19 22 L 21 22 M 23 22 L 25 22"
              stroke="#FDE68A"
              strokeWidth="0.9"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Ground Shadow */}
        <div className="w-8 h-2.5 rounded-full bg-amber-950/35 blur-[2px] mt-0.5" />
      </div>

      {/* Label Pill on Hover / Active */}
      <div className={`mt-1 px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap shadow-md border transition-all duration-200 pointer-events-none ${
        active
          ? 'bg-amber-600 text-white border-amber-400 scale-105 opacity-100'
          : 'bg-white/95 text-amber-900 border-amber-200 opacity-90 group-hover:opacity-100 group-hover:scale-105'
      }`}>
        <span className="inline-block mr-1">🍽️</span>
        {label}
      </div>
    </button>
  );
}
