import React, { useState } from 'react';
import { Sparkles, Info } from 'lucide-react';

/**
 * 14 Districts of Kerala with schematic vector contours
 * Uses responsive SVG viewBox scaling with comfortable margins so the entire state
 * from Kasaragod/Kannur in the north to Thiruvananthapuram in the south is 100% visible on screen.
 * All 14 district names are directly visible on the map.
 * Clicking Kannur directly triggers the zoom into the Kannur cultural map.
 */
export default function KeralaDistrictMap({ onSelectDistrict }) {
  const [hoveredDistrict, setHoveredDistrict] = useState(null);

  const districts = [
    { 
      id: 'kasaragod', 
      name: 'Kasaragod', 
      path: 'M 140 30 C 145 45, 155 60, 160 80 L 190 70 C 180 50, 165 35, 150 25 Z', 
      labelPos: { x: 165, y: 55 },
      isKannur: false 
    },
    { 
      id: 'kannur', 
      name: 'Kannur', 
      path: 'M 160 80 C 168 100, 180 125, 195 150 L 235 130 C 220 100, 205 80, 190 70 Z', 
      labelPos: { x: 195, y: 110 },
      isKannur: true 
    },
    { 
      id: 'wayanad', 
      name: 'Wayanad', 
      path: 'M 235 130 L 265 145 L 255 185 L 210 175 C 205 160, 220 145, 235 130 Z', 
      labelPos: { x: 245, y: 155 },
      isKannur: false 
    },
    { 
      id: 'kozhikode', 
      name: 'Kozhikode', 
      path: 'M 195 150 C 205 175, 218 200, 230 220 L 260 205 L 255 185 L 210 175 Z', 
      labelPos: { x: 225, y: 185 },
      isKannur: false 
    },
    { 
      id: 'malappuram', 
      name: 'Malappuram', 
      path: 'M 230 220 C 242 245, 255 270, 270 290 L 305 270 L 290 230 L 260 205 Z', 
      labelPos: { x: 265, y: 245 },
      isKannur: false 
    },
    { 
      id: 'palakkad', 
      name: 'Palakkad', 
      path: 'M 290 230 L 335 240 L 345 285 L 270 290 Z', 
      labelPos: { x: 310, y: 260 },
      isKannur: false 
    },
    { 
      id: 'thrissur', 
      name: 'Thrissur', 
      path: 'M 270 290 C 280 315, 292 340, 305 365 L 340 345 L 335 310 L 305 270 Z', 
      labelPos: { x: 305, y: 320 },
      isKannur: false 
    },
    { 
      id: 'ernakulam', 
      name: 'Ernakulam', 
      path: 'M 305 365 C 315 390, 328 415, 340 440 L 375 420 L 365 385 L 340 345 Z', 
      labelPos: { x: 335, y: 390 },
      isKannur: false 
    },
    { 
      id: 'idukki', 
      name: 'Idukki', 
      path: 'M 365 385 L 420 400 L 410 460 L 375 420 Z', 
      labelPos: { x: 390, y: 425 },
      isKannur: false 
    },
    { 
      id: 'kottayam', 
      name: 'Kottayam', 
      path: 'M 340 440 L 375 445 L 370 480 L 335 470 Z', 
      labelPos: { x: 355, y: 460 },
      isKannur: false 
    },
    { 
      id: 'alappuzha', 
      name: 'Alappuzha', 
      path: 'M 340 440 C 348 465, 355 490, 362 515 L 370 480 L 340 440 Z', 
      labelPos: { x: 345, y: 490 },
      isKannur: false 
    },
    { 
      id: 'pathanamthitta', 
      name: 'Pathanamthitta', 
      path: 'M 370 480 L 415 490 L 405 530 L 365 520 Z', 
      labelPos: { x: 390, y: 505 },
      isKannur: false 
    },
    { 
      id: 'kollam', 
      name: 'Kollam', 
      path: 'M 362 515 C 370 540, 380 565, 390 590 L 418 575 L 405 530 Z', 
      labelPos: { x: 385, y: 550 },
      isKannur: false 
    },
    { 
      id: 'thiruvananthapuram', 
      name: 'Thiruvananthapuram', 
      path: 'M 390 590 C 400 620, 415 650, 430 680 L 455 660 L 430 610 L 418 575 Z', 
      labelPos: { x: 415, y: 630 },
      isKannur: false 
    },
  ];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-2 sm:p-4 select-none overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#EBF3FA]/70 via-[#FFFFFF] to-[#FFF3EB]/60 rounded-3xl -z-10" />

      {/* Top Header Tag */}
      <div className="w-full flex items-center justify-between px-3 py-1 mb-1 z-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#FFEFE8] border border-[#FCD8C8] text-[#D8612F] text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Kerala Districts View (14 Districts)</span>
        </div>
        <div className="hidden sm:flex items-center space-x-1.5 text-xs text-gray-500 font-medium">
          <Info className="w-3.5 h-3.5 text-[#D8612F]" />
          <span>Click <strong className="text-[#D8612F]">Kannur</strong> directly to zoom into cultural map</span>
        </div>
      </div>

      {/* SVG Container fitted to available height */}
      <div className="relative flex-1 w-full max-h-[calc(100vh-190px)] flex items-center justify-center overflow-hidden">
        <svg
          viewBox="80 15 400 690"
          className="h-full w-auto max-w-full max-h-full object-contain filter drop-shadow-[0_12px_24px_rgba(30,64,110,0.12)]"
        >
          {/* Arabian Sea Coastal Waves (Left) */}
          <path
            d="M 90 30 Q 130 180 170 320 Q 220 480 360 690"
            fill="none"
            stroke="#93C5FD"
            strokeWidth="2"
            strokeDasharray="4 6"
            opacity="0.4"
          />

          {/* District Polygons */}
          {districts.map((d) => {
            const isHovered = hoveredDistrict === d.id;
            const isKannur = d.isKannur;

            return (
              <g
                key={d.id}
                onClick={() => onSelectDistrict(d.id)}
                onMouseEnter={() => setHoveredDistrict(d.id)}
                onMouseLeave={() => setHoveredDistrict(null)}
                className="cursor-pointer transition-all duration-200"
              >
                <path
                  d={d.path}
                  fill={
                    isKannur
                      ? isHovered ? '#EA580C' : '#D8612F'
                      : isHovered ? '#E2E8F0' : '#F1F5F9'
                  }
                  stroke={isKannur ? '#9A3412' : '#CBD5E1'}
                  strokeWidth={isKannur ? 2.5 : 1.2}
                  className="transition-colors duration-200"
                />

                {/* Kannur Special Subtle Highlight Aura */}
                {isKannur && (
                  <circle cx="195" cy="110" r="24" fill="#EA580C" opacity="0.2" className="animate-pulse" />
                )}

                {/* District Name Label */}
                <g className="pointer-events-none select-none">
                  <rect
                    x={d.labelPos.x - (d.name.length * 3.4) - 4}
                    y={d.labelPos.y - 7}
                    width={(d.name.length * 6.8) + 8}
                    height="14"
                    rx="4"
                    fill={isKannur ? '#9A3412' : '#FFFFFF'}
                    opacity={isKannur ? 0.95 : 0.88}
                    stroke={isKannur ? '#EA580C' : '#CBD5E1'}
                    strokeWidth="0.6"
                  />
                  <text
                    x={d.labelPos.x}
                    y={d.labelPos.y + 3.5}
                    textAnchor="middle"
                    fill={isKannur ? '#FFFFFF' : '#1E293B'}
                    fontSize={isKannur ? '10' : '8.5'}
                    fontWeight={isKannur ? '800' : '600'}
                    letterSpacing="0.2"
                  >
                    {d.name}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
