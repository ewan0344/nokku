import React, { useState, useEffect, useRef } from 'react';
import India from '@react-map/india';
import KeralaDistrictMap from './KeralaDistrictMap';
import KannurSchematicMap from './KannurSchematicMap';
import { ChevronRight, RotateCcw, MapPin, Loader2, Sparkles } from 'lucide-react';

/**
 * All 28 Indian States and 8 Union Territories with percentage coordinates
 */
const ALL_INDIAN_STATES = [
  // 28 States
  { id: 'Andhra Pradesh', name: 'Andhra Pradesh', x: 47, y: 70 },
  { id: 'Arunachal Pradesh', name: 'Arunachal Pradesh', x: 89, y: 28 },
  { id: 'Assam', name: 'Assam', x: 83, y: 36 },
  { id: 'Bihar', name: 'Bihar', x: 61, y: 40 },
  { id: 'Chhattisgarh', name: 'Chhattisgarh', x: 53, y: 53 },
  { id: 'Goa', name: 'Goa', x: 25, y: 70 },
  { id: 'Gujarat', name: 'Gujarat', x: 17, y: 46 },
  { id: 'Haryana', name: 'Haryana', x: 32, y: 28 },
  { id: 'Himachal Pradesh', name: 'Himachal Pradesh', x: 35, y: 19 },
  { id: 'Jharkhand', name: 'Jharkhand', x: 62, y: 47 },
  { id: 'Karnataka', name: 'Karnataka', x: 33, y: 73 },
  { id: 'Kerala', name: 'Kerala', x: 32, y: 86, isSpecial: true },
  { id: 'Madhya Pradesh', name: 'Madhya Pradesh', x: 40, y: 48 },
  { id: 'Maharashtra', name: 'Maharashtra', x: 31, y: 58 },
  { id: 'Manipur', name: 'Manipur', x: 91, y: 43 },
  { id: 'Meghalaya', name: 'Meghalaya', x: 79, y: 40 },
  { id: 'Mizoram', name: 'Mizoram', x: 88, y: 49 },
  { id: 'Nagaland', name: 'Nagaland', x: 92, y: 37 },
  { id: 'Odisha', name: 'Odisha', x: 61, y: 57 },
  { id: 'Punjab', name: 'Punjab', x: 29, y: 23 },
  { id: 'Rajasthan', name: 'Rajasthan', x: 23, y: 35 },
  { id: 'Sikkim', name: 'Sikkim', x: 70, y: 33 },
  { id: 'Tamil Nadu', name: 'Tamil Nadu', x: 43, y: 85 },
  { id: 'Telangana', name: 'Telangana', x: 45, y: 62 },
  { id: 'Tripura', name: 'Tripura', x: 82, y: 47 },
  { id: 'Uttar Pradesh', name: 'Uttar Pradesh', x: 45, y: 35 },
  { id: 'Uttarakhand', name: 'Uttarakhand', x: 41, y: 24 },
  { id: 'West Bengal', name: 'West Bengal', x: 70, y: 48 },

  // Union Territories
  { id: 'Jammu and Kashmir', name: 'Jammu & Kashmir', x: 29, y: 14 },
  { id: 'Ladakh', name: 'Ladakh', x: 39, y: 9 },
  { id: 'Delhi', name: 'Delhi', x: 36, y: 29 },
  { id: 'Chandigarh', name: 'Chandigarh', x: 33, y: 22 },
  { id: 'Puducherry', name: 'Puducherry', x: 49, y: 81 },
  { id: 'Dadra and Nagar Haveli and Daman and Diu', name: 'Daman & Diu', x: 19, y: 55 },
  { id: 'Lakshadweep', name: 'Lakshadweep', x: 18, y: 85 },
  { id: 'Andaman and Nicobar Islands', name: 'Andaman & Nicobar', x: 88, y: 82 },
];

export default function IndiaMap() {
  // Navigation camera levels: 'india' | 'kerala' | 'kannur'
  const [level, setLevel] = useState('india');
  const [isZooming, setIsZooming] = useState(false);
  const [hoveredState, setHoveredState] = useState(null);

  // Prototype "Discover Near Me" states
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [discoveryStep, setDiscoveryStep] = useState(''); // 'finding' | 'found' | ''
  const [isNearMeActive, setIsNearMeActive] = useState(false);

  // Dynamic map size calculated to fit the available container bounds
  const containerRef = useRef(null);
  const [mapSize, setMapSize] = useState(520);

  useEffect(() => {
    const calculateBounds = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        if (clientWidth > 0 && clientHeight > 0) {
          // Reserve padding so labels and furthest points (Ladakh, Kerala, Andaman, Gujarat) fit comfortably
          const available = Math.min(clientWidth * 0.90, clientHeight * 0.90);
          const computed = Math.max(300, Math.min(available, 640));
          setMapSize(Math.round(computed));
        }
      }
    };

    calculateBounds();
    window.addEventListener('resize', calculateBounds);
    return () => window.removeEventListener('resize', calculateBounds);
  }, [level]);

  // Directly triggers smooth camera zoom into Kerala
  const handleSelectKerala = () => {
    setIsZooming(true);
    setTimeout(() => {
      setLevel('kerala');
      setIsZooming(false);
    }, 600);
  };

  // Directly triggers smooth camera zoom into Kannur
  const handleSelectKannur = () => {
    setIsZooming(true);
    setTimeout(() => {
      setLevel('kannur');
      setIsZooming(false);
    }, 600);
  };

  // State selection handler from map polygon click
  const handleStateClick = (stateName) => {
    if (stateName === 'Kerala') {
      handleSelectKerala();
    } else {
      alert(`${stateName} will be populated with cultural locations in upcoming stages. Please click KERALA to explore the prototype!`);
    }
  };

  // Prototype "Discover Near Me" simulated sequence
  const handleDiscoverNearMe = () => {
    if (isDiscovering) return;

    setIsDiscovering(true);
    setDiscoveryStep('finding');

    // Step 1: Simulate searching (~1.4s)
    setTimeout(() => {
      setDiscoveryStep('found');

      // Step 2: Show "Location Found: Kannur, Kerala" (~1.1s), then start smooth zoom transition
      setTimeout(() => {
        setIsDiscovering(false);
        setDiscoveryStep('');

        // Step 3: Smooth zoom India -> Kerala
        setIsZooming(true);
        setTimeout(() => {
          setLevel('kerala');
          setIsZooming(false);

          // Step 4: After a brief pause in Kerala, smoothly zoom into Kannur (~0.9s)
          setTimeout(() => {
            setIsZooming(true);
            setTimeout(() => {
              setLevel('kannur');
              setIsNearMeActive(true);
              setIsZooming(false);
            }, 600);
          }, 900);

        }, 600);
      }, 1100);
    }, 1400);
  };

  return (
    <div className="relative w-full h-full flex-1 bg-gradient-to-b from-[#F2F7FB] via-[#FAFBFD] to-[#FFF7F2] rounded-3xl overflow-hidden border border-black/[0.06] shadow-sm flex flex-col select-none">
      
      {/* Top Breadcrumb & Actions Bar */}
      <div className="w-full z-30 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between border-b border-black/[0.04] bg-white/85 backdrop-blur-md gap-2">
        {/* Interactive Breadcrumb Hierarchy */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-1.5 sm:space-x-2 text-xs sm:text-sm font-semibold">
          <button
            type="button"
            onClick={() => {
              setLevel('india');
              setIsNearMeActive(false);
            }}
            className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl transition-all ${
              level === 'india'
                ? 'bg-[#14171A] text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            India Map
          </button>

          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />

          <button
            type="button"
            onClick={() => {
              if (level === 'kannur') setLevel('kerala');
              else if (level === 'india') handleSelectKerala();
            }}
            className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl transition-all ${
              level === 'kerala'
                ? 'bg-[#D8612F] text-white shadow-sm'
                : level === 'kannur'
                ? 'text-[#D8612F] hover:bg-orange-50'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Kerala
          </button>

          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />

          <button
            type="button"
            disabled={level !== 'kannur'}
            className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl transition-all ${
              level === 'kannur'
                ? 'bg-[#D8612F] text-white shadow-sm'
                : 'text-gray-300 cursor-not-allowed'
            }`}
          >
            Kannur Cultural Map
          </button>
        </nav>

        {/* Action Controls: Discover Near Me & Reset */}
        <div className="flex items-center space-x-2">
          {level === 'india' && (
            <button
              type="button"
              onClick={handleDiscoverNearMe}
              disabled={isDiscovering}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#D8612F] to-[#EA7341] hover:from-[#C25222] hover:to-[#D8612F] shadow-sm hover:shadow-md transition-all active:scale-95 border border-orange-300/40 cursor-pointer"
              title="Simulate locating cultural sites near you"
            >
              <span className="text-sm">📍</span>
              <span>Discover Near Me</span>
            </button>
          )}

          {level !== 'india' && (
            <button
              type="button"
              onClick={() => {
                setLevel('india');
                setIsNearMeActive(false);
              }}
              className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl text-xs font-semibold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to India</span>
            </button>
          )}
        </div>
      </div>

      {/* Simulated Location Discovery Overlay */}
      {isDiscovering && (
        <div className="absolute inset-0 z-50 bg-black/35 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-black/10 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-orange-100 to-amber-100 text-[#D8612F] flex items-center justify-center mx-auto mb-4 relative">
              {discoveryStep === 'finding' ? (
                <>
                  <div className="w-16 h-16 rounded-3xl bg-orange-400/20 animate-ping absolute inset-0" />
                  <Loader2 className="w-8 h-8 animate-spin" />
                </>
              ) : (
                <MapPin className="w-8 h-8 animate-bounce text-[#D8612F]" />
              )}
            </div>

            {discoveryStep === 'finding' ? (
              <>
                <h3 className="text-base sm:text-lg font-extrabold text-gray-900 tracking-tight">
                  Finding cultural places near you...
                </h3>
                <p className="text-xs text-gray-500 mt-1.5">
                  Scanning regional living heritage and oral traditions...
                </p>
              </>
            ) : (
              <>
                <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-extrabold border border-emerald-200 mb-1.5 uppercase">
                  <span>Location Identified</span>
                </div>
                <h3 className="text-xl font-black text-[#14171A] tracking-tight">
                  Kannur, Kerala
                </h3>
                <p className="text-xs text-[#D8612F] font-semibold mt-1 flex items-center justify-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Taking you to nearby cultural treasures...</span>
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Camera Viewport Canvas */}
      <div 
        ref={containerRef}
        className="relative flex-1 w-full h-full overflow-hidden flex items-center justify-center p-2"
      >
        {/* LEVEL 1: INDIA MAP VIEW */}
        {level === 'india' && (
          <div
            className={`relative w-full h-full flex items-center justify-center transition-all duration-700 ease-in-out ${
              isZooming
                ? 'scale-[3.5] translate-x-[-18%] translate-y-[-30%] opacity-0 filter blur-sm'
                : 'scale-100 translate-x-0 translate-y-0 opacity-100'
            }`}
          >
            {/* India Vector Map Container calculated to fit inside screen bounds */}
            <div 
              style={{ width: `${mapSize}px`, height: `${mapSize}px` }}
              className="relative flex items-center justify-center transition-all duration-200"
            >
              <India
                type="select-single"
                size={mapSize}
                mapColor="#EDF2F7"
                strokeColor="#94A3B8"
                strokeWidth={0.8}
                hoverColor="#FED7AA"
                selectColor="#D8612F"
                hints={false}
                onSelect={(state) => handleStateClick(state)}
              />

              {/* ALL STATE LABELS OVERLAY */}
              <div className="absolute inset-0 pointer-events-none">
                {ALL_INDIAN_STATES.map((st) => {
                  const isKerala = st.id === 'Kerala';
                  const isHovered = hoveredState === st.id;

                  return (
                    <div
                      key={st.id}
                      style={{
                        left: `${st.x}%`,
                        top: `${st.y}%`,
                      }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                    >
                      <button
                        type="button"
                        onClick={() => handleStateClick(st.id)}
                        onMouseEnter={() => setHoveredState(st.id)}
                        onMouseLeave={() => setHoveredState(null)}
                        className={`px-1 py-0.5 rounded text-[8.5px] sm:text-[9.5px] whitespace-nowrap shadow-xs transition-all duration-150 cursor-pointer font-bold ${
                          isKerala
                            ? 'bg-[#D8612F] text-white border-2 border-white shadow-md scale-110 ring-2 ring-[#D8612F]/50 z-30 animate-pulse'
                            : isHovered
                            ? 'bg-gray-900 text-white scale-110 shadow-sm z-30'
                            : 'bg-white/88 text-[#1E293B] border border-slate-300/70 hover:bg-white hover:text-black'
                        }`}
                        title={st.name}
                      >
                        {st.name}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* LEVEL 2: KERALA DISTRICT VIEW */}
        {level === 'kerala' && (
          <div
            className={`relative w-full h-full flex items-center justify-center transition-all duration-700 ease-in-out animate-in zoom-in-75 fade-in ${
              isZooming
                ? 'scale-[3.2] translate-x-[-12%] translate-y-[20%] opacity-0 filter blur-sm'
                : 'scale-100 opacity-100'
            }`}
          >
            <KeralaDistrictMap
              onSelectDistrict={(districtId) => {
                if (districtId === 'kannur') {
                  handleSelectKannur();
                } else {
                  alert(`${districtId.toUpperCase()} will be populated with cultural locations in upcoming stages. Please click KANNUR to explore prototype markers!`);
                }
              }}
            />
          </div>
        )}

        {/* LEVEL 3: KANNUR CULTURAL SCHEMATIC VIEW */}
        {level === 'kannur' && (
          <div className="relative w-full h-full flex items-center justify-center animate-in zoom-in-90 fade-in duration-500">
            <KannurSchematicMap 
              onBackToKerala={() => setLevel('kerala')} 
              isNearMe={isNearMeActive}
            />
          </div>
        )}
      </div>
    </div>
  );
}
