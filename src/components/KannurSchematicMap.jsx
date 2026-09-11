import React, { useState } from 'react';
import { CULTURAL_LOCATIONS } from '../data/culturalLocations';
import { GreenArrowMarker3D, RedArrowMarker3D, FoodMarker3D } from './MapMarkers3D';
import LocationDetailCard from './LocationDetailCard';
import { Compass, Sparkles, Navigation, X, Clock, MapPin, Info } from 'lucide-react';

// Category metadata for user-submitted cultural info (feature: "Add Info")
const CATEGORY_META = {
  place: { label: 'Place', emoji: '📍', markerType: 'green-arrow' },
  food: { label: 'Food', emoji: '🍛', markerType: 'food' },
  art: { label: 'Art Form', emoji: '🎭', markerType: 'red-arrow' },
  other: { label: 'Other', emoji: '✨', markerType: 'green-arrow' },
};

export default function KannurSchematicMap({ onBackToKerala, isNearMe }) {
  // Automatically select Theyyam Centres so the description card is visible on initial open
  const [selectedLocation, setSelectedLocation] = useState(() => {
    return CULTURAL_LOCATIONS.find((loc) => loc.id === 'theyyam-centres') || null;
  });
  const [filterCategory, setFilterCategory] = useState('all'); // 'all' | 'heritage' | 'food' | 'tradition'
  const [activeRoute, setActiveRoute] = useState(null);

  // --- "Add Info" feature state ---
  const [isAddingInfo, setIsAddingInfo] = useState(false);
  const [locationMode, setLocationMode] = useState(null); // 'map' | 'manual' | null
  const [pendingLocation, setPendingLocation] = useState(null); // { x, y, manualName }
  const [manualLocationText, setManualLocationText] = useState('');
  const [showInfoForm, setShowInfoForm] = useState(false);
  const [formCategory, setFormCategory] = useState('place');
  const [formName, setFormName] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formPhotoPreview, setFormPhotoPreview] = useState(null);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationStage, setVerificationStage] = useState('checking'); // 'checking' | 'match' | 'nomatch'
  const [verificationMatch, setVerificationMatch] = useState(null);
  const [userAddedLocations, setUserAddedLocations] = useState([]);

  const filteredLocations = CULTURAL_LOCATIONS.filter((loc) => {
    if (filterCategory === 'all') return true;
    return loc.category === filterCategory;
  });

  // Simulated starting location within Kannur
  const demoStartingPoint = {
    x: 40,
    y: 56,
    name: 'Your Demo Location',
    subtext: 'Kannur Town (Simulated)',
  };

  const handleGetDirections = (destinationLoc) => {
    setActiveRoute({
      from: demoStartingPoint,
      to: destinationLoc,
      distance: '2.8 km',
      duration: '~8 min',
      routeDesc: 'via Kakkad - Chirakkal Sacred Grove Rd',
    });
  };

  // --- "Add Info" feature handlers ---

  const resetAddInfoFlow = () => {
    setIsAddingInfo(false);
    setLocationMode(null);
    setPendingLocation(null);
    setManualLocationText('');
    setShowInfoForm(false);
    setFormCategory('place');
    setFormName('');
    setFormDescription('');
    if (formPhotoPreview) URL.revokeObjectURL(formPhotoPreview);
    setFormPhotoPreview(null);
    setShowVerification(false);
    setVerificationStage('checking');
    setVerificationMatch(null);
  };

  const handleToggleAddInfo = () => {
    if (isAddingInfo || showInfoForm || showVerification) {
      resetAddInfoFlow();
    } else {
      setIsAddingInfo(true);
    }
  };

  const handleMapClick = (e) => {
    if (!isAddingInfo || showInfoForm || showVerification) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLocationMode('map');
    setPendingLocation({ x, y, manualName: null });
  };

  const handleManualLocationSubmit = () => {
    if (!manualLocationText.trim()) return;
    // Prototype position - no real geocoding, place near the demo town center with a slight offset
    const x = 45 + (Math.random() * 10 - 5);
    const y = 50 + (Math.random() * 10 - 5);
    setPendingLocation({ x, y, manualName: manualLocationText.trim() });
  };

  const handleConfirmLocation = () => {
    setShowInfoForm(true);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (formPhotoPreview) URL.revokeObjectURL(formPhotoPreview);
    setFormPhotoPreview(URL.createObjectURL(file));
  };

  const handleRemovePhoto = () => {
    if (formPhotoPreview) URL.revokeObjectURL(formPhotoPreview);
    setFormPhotoPreview(null);
  };

  const handleFormCancel = () => {
    resetAddInfoFlow();
  };

  const handleFormDone = () => {
    if (!formName.trim() || !pendingLocation) return;
    setShowInfoForm(false);
    setShowVerification(true);
    setVerificationStage('checking');

    // Simulated Google Maps verification - PROTOTYPE ONLY, no real API call
    setTimeout(() => {
      const foundMatch = CULTURAL_LOCATIONS.length > 0 && Math.random() > 0.5;
      if (foundMatch) {
        const randomExisting = CULTURAL_LOCATIONS[Math.floor(Math.random() * CULTURAL_LOCATIONS.length)];
        setVerificationMatch({
          name: randomExisting.name,
          distance: `${Math.floor(60 + Math.random() * 150)} m`,
        });
        setVerificationStage('match');
      } else {
        setVerificationMatch(null);
        setVerificationStage('nomatch');
      }
    }, 1600);
  };

  const handleFinalizeAddition = () => {
    if (!pendingLocation) return;
    const meta = CATEGORY_META[formCategory] || CATEGORY_META.other;
    const newLocation = {
      id: `user-${Date.now()}`,
      name: formName.trim(),
      category: formCategory,
      markerType: meta.markerType,
      coordinates: { x: pendingLocation.x, y: pendingLocation.y },
      description: formDescription.trim(),
      image: formPhotoPreview,
      subtext: pendingLocation.manualName || 'Added via prototype',
      isUserAdded: true,
    };
    setUserAddedLocations((prev) => [...prev, newLocation]);
    setSelectedLocation(newLocation);
    resetAddInfoFlow();
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between select-none overflow-hidden rounded-3xl bg-gradient-to-b from-[#EBF5FB] via-[#FAFBFD] to-[#FFF6F0] p-2 sm:p-3 border border-black/[0.06]">
      
      {/* Top Controls & Category Filters */}
      <div className="w-full z-20 flex flex-wrap items-center justify-between gap-2 mb-1.5 flex-shrink-0">
        <div className="flex flex-wrap items-center gap-2">
          {/* Main Title Badge */}
          <div className="flex items-center space-x-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-black/[0.06] shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D8612F] animate-pulse" />
            <span className="text-xs font-black text-gray-900 uppercase tracking-wide">Kannur Cultural Discovery Map</span>
            <span className="text-xs text-gray-400">|</span>
            <span className="text-xs text-gray-500 font-medium">Prototype Schematic View</span>
          </div>

          {/* Near Me Discovered Message Pill */}
          {isNearMe && (
            <div className="flex items-center space-x-2 bg-gradient-to-r from-[#D8612F] to-[#EA7341] text-white px-3.5 py-1.5 rounded-2xl shadow-md border border-orange-300/40 animate-in slide-in-from-left duration-300">
              <span className="text-sm">📍</span>
              <div className="text-left leading-tight">
                <div className="text-[10.5px] font-black uppercase tracking-wider text-orange-100">
                  Cultural places near you
                </div>
                <div className="text-xs font-black text-white">
                  Kannur, Kerala
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Add Info Button + Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={handleToggleAddInfo}
            className={`px-3 py-1.5 rounded-2xl text-xs font-bold shadow-sm border transition-colors ${
              isAddingInfo || showInfoForm || showVerification
                ? 'bg-[#D8612F] text-white border-[#D8612F]'
                : 'bg-white/95 text-[#D8612F] border-black/[0.06] hover:bg-orange-50'
            }`}
          >
            ＋ Add Info
          </button>

          <div className="flex items-center space-x-1.5 bg-white/95 backdrop-blur-md p-1 rounded-2xl border border-black/[0.06] shadow-sm">
            <button
              type="button"
              onClick={() => setFilterCategory('all')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors ${
                filterCategory === 'all'
                  ? 'bg-[#D8612F] text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              All (8)
            </button>
            <button
              type="button"
              onClick={() => setFilterCategory('heritage')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1 ${
                filterCategory === 'heritage'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-emerald-800 hover:bg-emerald-50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Heritage (4)</span>
            </button>
            <button
              type="button"
              onClick={() => setFilterCategory('food')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1 ${
                filterCategory === 'food'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-amber-800 hover:bg-amber-50'
              }`}
            >
              <span>🍽️</span>
              <span>Food (2)</span>
            </button>
            <button
              type="button"
              onClick={() => setFilterCategory('tradition')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1 ${
                filterCategory === 'tradition'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-red-800 hover:bg-red-50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span>At-Risk (2)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Add Info Flow Banner (location selection step) */}
      {isAddingInfo && !showInfoForm && !showVerification && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-40 bg-white/95 backdrop-blur-xl px-4 py-3 rounded-2xl shadow-xl border border-orange-200 animate-in slide-in-from-top-2 duration-200 flex flex-col items-center gap-2 max-w-sm sm:max-w-md text-center">
          <div className="flex items-center gap-1.5 text-xs font-black text-[#D8612F] uppercase tracking-wide">
            <MapPin className="w-3.5 h-3.5" />
            Add Cultural Information
          </div>

          {!pendingLocation ? (
            <>
              <p className="text-xs text-gray-600">
                Click anywhere on the Kannur map to select a location.
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setLocationMode('manual')}
                  className="px-3 py-1.5 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200 transition-colors"
                >
                  Enter location manually
                </button>
                <button
                  type="button"
                  onClick={resetAddInfoFlow}
                  className="px-3 py-1.5 rounded-xl text-gray-400 text-xs font-bold hover:text-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>

              {locationMode === 'manual' && (
                <div className="flex items-center gap-2 w-full mt-1">
                  <input
                    type="text"
                    value={manualLocationText}
                    onChange={(e) => setManualLocationText(e.target.value)}
                    placeholder="e.g. Kannur, Kerala"
                    className="flex-1 px-3 py-1.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#D8612F]/40"
                  />
                  <button
                    type="button"
                    onClick={handleManualLocationSubmit}
                    className="px-3 py-1.5 rounded-xl bg-[#D8612F] text-white text-xs font-bold hover:bg-[#c2551f] transition-colors whitespace-nowrap"
                  >
                    Set
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <p className="text-xs text-gray-600">
                {pendingLocation.manualName
                  ? `Location set: ${pendingLocation.manualName}`
                  : 'Location selected on the map. Click again to move it.'}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleConfirmLocation}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors"
                >
                  ✓ Select Location
                </button>
                <button
                  type="button"
                  onClick={resetAddInfoFlow}
                  className="px-3 py-1.5 rounded-xl text-gray-400 text-xs font-bold hover:text-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Floating Simulated Route Banner */}
      {activeRoute && (
        <div className="absolute top-14 left-4 sm:left-6 z-30 bg-white/95 backdrop-blur-xl px-4 py-2.5 rounded-2xl shadow-xl border border-orange-200 animate-in slide-in-from-top-2 duration-200 flex items-center space-x-3 text-left max-w-sm sm:max-w-md">
          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-[#D8612F] flex-shrink-0">
            <Navigation className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5 text-[11px] font-bold text-amber-800 uppercase tracking-wide">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>Using your current demo location</span>
            </div>
            <div className="text-xs font-extrabold text-gray-900 mt-0.5">
              Route to {activeRoute.to.name}: <span className="text-[#D8612F]">{activeRoute.distance} · {activeRoute.duration}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setActiveRoute(null)}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors ml-2"
            title="Clear Route"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Schematic Discovery Canvas */}
      <div
        className={`relative w-full flex-1 max-w-5xl rounded-3xl overflow-hidden shadow-inner border border-black/[0.05] bg-[#F7F9FB] flex items-center justify-center min-h-0 ${
          isAddingInfo && !showInfoForm && !showVerification ? 'cursor-crosshair' : ''
        }`}
        onClick={handleMapClick}
      >
        
        {/* Custom Stylized Kannur Landscape SVG */}
        <svg
          viewBox="0 0 1000 650"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <defs>
            <linearGradient id="seaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#CBE5F8" />
              <stop offset="50%" stopColor="#A8D4F5" />
              <stop offset="100%" stopColor="#89C4F0" />
            </linearGradient>

            <linearGradient id="sandGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#F3E8D0" stopOpacity="0.4" />
            </linearGradient>

            <linearGradient id="landGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EDF5EE" />
              <stop offset="40%" stopColor="#E2EFE4" />
              <stop offset="100%" stopColor="#D5E6D8" />
            </linearGradient>

            <linearGradient id="hillGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#CBD5E1" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#94A3B8" stopOpacity="0.4" />
            </linearGradient>

            {/* Glowing route gradient */}
            <linearGradient id="routeGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="50%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#DC2626" />
            </linearGradient>
          </defs>

          {/* Layer 1: Arabian Sea */}
          <rect width="1000" height="650" fill="url(#seaGrad)" />

          {/* Ocean Waves Accent */}
          <path
            d="M 20 200 Q 60 180, 100 200 T 180 200 T 260 200"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
            opacity="0.4"
          />
          <path
            d="M 10 380 Q 50 360, 90 380 T 170 380 T 250 380"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
            opacity="0.3"
          />

          {/* Layer 2: Kannur Coastal Sand Beach Strip */}
          <path
            d="M 240 0 C 270 90, 310 180, 340 280 C 370 380, 420 500, 480 650 L 1000 650 L 1000 0 Z"
            fill="url(#sandGrad)"
          />

          {/* Layer 3: Kannur Main Landmass */}
          <path
            d="M 270 0 C 300 90, 340 180, 370 280 C 400 380, 450 500, 510 650 L 1000 650 L 1000 0 Z"
            fill="url(#landGrad)"
            stroke="#94A3B8"
            strokeWidth="1.2"
          />

          {/* Layer 4: Western Ghats Hill Contours */}
          <path
            d="M 750 0 C 780 120, 810 240, 840 360 C 870 480, 900 560, 940 650 L 1000 650 L 1000 0 Z"
            fill="url(#hillGrad)"
          />

          {/* Hill Peaks decorative lines */}
          <path
            d="M 820 60 L 850 30 L 880 70 M 870 180 L 910 140 L 950 190 M 890 340 L 930 300 L 970 350"
            fill="none"
            stroke="#64748B"
            strokeWidth="1.5"
            opacity="0.4"
          />

          {/* River Valapattanam with Tributaries */}
          <path
            d="M 1000 240 Q 800 260, 620 250 T 450 270 T 360 285"
            fill="none"
            stroke="#93C5FD"
            strokeWidth="12"
            strokeLinecap="round"
            opacity="0.75"
          />
          <path
            d="M 1000 240 Q 800 260, 620 250 T 450 270 T 360 285"
            fill="none"
            stroke="#60A5FA"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* River Anjarakkandy (Thalassery / South) */}
          <path
            d="M 980 500 Q 800 510, 670 490 T 520 520 T 440 535"
            fill="none"
            stroke="#93C5FD"
            strokeWidth="9"
            strokeLinecap="round"
            opacity="0.7"
          />
          <path
            d="M 980 500 Q 800 510, 670 490 T 520 520 T 440 535"
            fill="none"
            stroke="#60A5FA"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Schematic Heritage Roads Network */}
          <path
            d="M 370 20 L 400 120 L 450 250 L 490 380 L 530 520 L 570 650"
            fill="none"
            stroke="#CBD5E1"
            strokeWidth="4"
            strokeDasharray="8 6"
            opacity="0.8"
          />

          {/* East-West Highway to Hill Ranges */}
          <path
            d="M 450 250 L 620 230 L 780 200 L 980 180"
            fill="none"
            stroke="#CBD5E1"
            strokeWidth="3.5"
            strokeDasharray="6 5"
            opacity="0.7"
          />

          {/* SIMULATED ROUTE PATH TO THEYYAM CENTRE */}
          {activeRoute && (
            <g className="animate-in fade-in duration-300">
              {/* Route Outer Shadow/Halo */}
              <path
                d="M 400 364 C 418 340, 442 312, 475 285 C 505 260, 528 245, 550 221"
                fill="none"
                stroke="#1E40AF"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.3"
              />
              {/* Route Main Glowing Path */}
              <path
                d="M 400 364 C 418 340, 442 312, 475 285 C 505 260, 528 245, 550 221"
                fill="none"
                stroke="url(#routeGrad)"
                strokeWidth="5.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Animated Directional Dash Arrows */}
              <path
                d="M 400 364 C 418 340, 442 312, 475 285 C 505 260, 528 245, 550 221"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeDasharray="6 10"
                strokeLinecap="round"
                className="animate-pulse"
              />
            </g>
          )}

          {/* Region Label Watermarks */}
          <text x="80" y="80" fill="#2563EB" opacity="0.35" fontSize="18" fontWeight="bold" letterSpacing="4">
            ARABIAN SEA
          </text>
          <text x="32" y="24" fill="#047857" opacity="0.3" fontSize="14" fontWeight="bold" letterSpacing="2" transform="translate(180, 80)">
            ▲ EZHIMALA HEADLAND
          </text>
          <text x="420" y="260" fill="#1D4ED8" opacity="0.4" fontSize="13" fontWeight="600" fontStyle="italic">
            Valapattanam River
          </text>
          <text x="840" y="80" fill="#475569" opacity="0.3" fontSize="16" fontWeight="bold" letterSpacing="3">
            WESTERN GHATS
          </text>
          <text x="390" y="585" fill="#B45309" opacity="0.35" fontSize="16" fontWeight="bold" letterSpacing="2">
            THALASSERY COAST
          </text>
        </svg>

        {/* Simulated Demo Starting Location Marker */}
        {activeRoute && (
          <div
            className="absolute z-30 -translate-x-1/2 -translate-y-1/2 animate-in zoom-in-75 duration-200 pointer-events-none"
            style={{ left: `${demoStartingPoint.x}%`, top: `${demoStartingPoint.y}%` }}
          >
            <div className="relative flex flex-col items-center">
              {/* Pulsing Beacon Ring */}
              <div className="w-10 h-10 rounded-full bg-blue-500/30 animate-ping absolute -top-1" />
              {/* Center Dot */}
              <div className="w-6 h-6 rounded-full bg-blue-600 border-2 border-white shadow-lg flex items-center justify-center text-white">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
              {/* Label Pill */}
              <div className="mt-1 px-2 py-0.5 rounded-md bg-blue-900/90 text-white text-[9.5px] font-bold shadow-md whitespace-nowrap border border-blue-400">
                Demo Location (Kannur Town)
              </div>
            </div>
          </div>
        )}

        {/* New Location Selection Marker (Add Info feature) */}
        {pendingLocation && (isAddingInfo || showInfoForm || showVerification) && (
          <div
            className="absolute z-40 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ left: `${pendingLocation.x}%`, top: `${pendingLocation.y}%` }}
          >
            <div className="relative flex flex-col items-center">
              <div className="absolute w-12 h-12 rounded-full bg-[#D8612F]/25 animate-ping" />
              <div className="relative w-9 h-9 rounded-full bg-[#D8612F] border-4 border-white shadow-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div className="mt-1 px-2.5 py-1 rounded-lg bg-[#D8612F] text-white text-[10px] font-bold shadow-lg whitespace-nowrap">
                New Location
              </div>
            </div>
          </div>
        )}

        {/* 3D Markers Layer */}
        {filteredLocations.map((loc) => {
          const isSelected = selectedLocation?.id === loc.id;

          return (
            <div
              key={loc.id}
              className="absolute transition-all duration-300"
              style={{
                left: `${loc.coordinates.x}%`,
                top: `${loc.coordinates.y}%`,
              }}
            >
              {loc.markerType === 'green-arrow' && (
                <GreenArrowMarker3D
                  active={isSelected}
                  label={loc.name}
                  onClick={() => setSelectedLocation(loc)}
                />
              )}

              {loc.markerType === 'red-arrow' && (
                <RedArrowMarker3D
                  active={isSelected}
                  label={loc.name}
                  onClick={() => setSelectedLocation(loc)}
                />
              )}

              {loc.markerType === 'food' && (
                <FoodMarker3D
                  active={isSelected}
                  label={loc.name}
                  onClick={() => setSelectedLocation(loc)}
                />
              )}
            </div>
          );
        })}

        {/* User-Added Markers Layer (Add Info feature - always visible regardless of filter) */}
        {userAddedLocations.map((loc) => {
          const isSelected = selectedLocation?.id === loc.id;

          return (
            <div
              key={loc.id}
              className="absolute transition-all duration-300"
              style={{
                left: `${loc.coordinates.x}%`,
                top: `${loc.coordinates.y}%`,
              }}
            >
              {loc.markerType === 'green-arrow' && (
                <GreenArrowMarker3D
                  active={isSelected}
                  label={loc.name}
                  onClick={() => setSelectedLocation(loc)}
                />
              )}

              {loc.markerType === 'red-arrow' && (
                <RedArrowMarker3D
                  active={isSelected}
                  label={loc.name}
                  onClick={() => setSelectedLocation(loc)}
                />
              )}

              {loc.markerType === 'food' && (
                <FoodMarker3D
                  active={isSelected}
                  label={loc.name}
                  onClick={() => setSelectedLocation(loc)}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* DETAIL CARD OVERLAY - Responsive, scrollable, fitted properly inside viewport */}
      {selectedLocation && (
        <div className="absolute top-12 bottom-9 right-2 sm:right-4 z-40 w-full sm:w-[390px] md:w-[420px] max-w-[calc(100%-1rem)] flex flex-col justify-end pointer-events-none animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="pointer-events-auto flex flex-col max-h-full min-h-0">
            <LocationDetailCard
              location={selectedLocation}
              onClose={() => setSelectedLocation(null)}
              onGetDirections={handleGetDirections}
              onExplore={(loc) => {
                alert(`Cultural Discovery Feature for "${loc.name}" will unlock in the upcoming stage!`);
              }}
            />
          </div>
        </div>
      )}

      {/* ADD CULTURAL INFORMATION FORM (Add Info feature) */}
      {showInfoForm && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-black/[0.06] p-5 max-h-full overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-black text-gray-900">Add Cultural Information</h3>
              <button
                type="button"
                onClick={handleFormCancel}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mb-3">
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1">Location</div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-800 bg-gray-50 rounded-xl px-3 py-2 border border-gray-100">
                <MapPin className="w-3.5 h-3.5 text-[#D8612F] flex-shrink-0" />
                <span>{pendingLocation?.manualName || 'Selected location on map'}</span>
              </div>
            </div>

            <div className="mb-3">
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1">Category</div>
              <div className="flex flex-wrap gap-1.5">
                {Object.entries(CATEGORY_META).map(([key, meta]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setFormCategory(key)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                      formCategory === key
                        ? 'bg-[#D8612F] text-white border-[#D8612F]'
                        : 'bg-white text-gray-600 border-gray-200 hover:bg-orange-50'
                    }`}
                  >
                    {meta.emoji} {meta.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1">Name</div>
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="e.g. Muthappan Temple"
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#D8612F]/40"
              />
            </div>

            <div className="mb-3">
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1">Description</div>
              <textarea
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                placeholder="Share a short description..."
                rows={3}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#D8612F]/40 resize-none"
              />
            </div>

            <div className="mb-4">
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1">Photo</div>
              {formPhotoPreview ? (
                <div className="relative w-full h-28 rounded-xl overflow-hidden border border-gray-200">
                  <img src={formPhotoPreview} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <label className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl border border-dashed border-gray-300 text-xs font-bold text-gray-500 hover:bg-gray-50 cursor-pointer transition-colors">
                  + Upload Photo
                  <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                </label>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleFormCancel}
                className="flex-1 px-3 py-2 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleFormDone}
                disabled={!formName.trim()}
                className="flex-1 px-3 py-2 rounded-xl bg-[#D8612F] text-white text-xs font-bold hover:bg-[#c2551f] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SIMULATED GOOGLE VERIFICATION UI (Add Info feature - prototype only, no real API calls) */}
      {showVerification && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-black/[0.06] p-5 text-center">
            {verificationStage === 'checking' && (
              <>
                <div className="w-10 h-10 mx-auto mb-3 rounded-full border-4 border-orange-200 border-t-[#D8612F] animate-spin" />
                <div className="text-sm font-black text-gray-900 mb-1">Checking Information...</div>
                <p className="text-xs text-gray-500">
                  Checking Google Maps for a possible matching place near your selected location.
                </p>
              </>
            )}

            {verificationStage === 'match' && verificationMatch && (
              <>
                <div className="text-sm font-black text-gray-900 mb-3">Possible Match Found</div>
                <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-2xl px-3 py-2.5 mb-4 text-left">
                  <MapPin className="w-4 h-4 text-[#D8612F] flex-shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-gray-900">{verificationMatch.name}</div>
                    <div className="text-[10px] text-gray-500">
                      Approx. {verificationMatch.distance} from your selected location
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      alert(
                        `This is a simulated match preview for "${verificationMatch.name}". No real Google Maps connection is made in this prototype.`
                      )
                    }
                    className="flex-1 px-3 py-2 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200 transition-colors"
                  >
                    View Match
                  </button>
                  <button
                    type="button"
                    onClick={handleFinalizeAddition}
                    className="flex-1 px-3 py-2 rounded-xl bg-[#D8612F] text-white text-xs font-bold hover:bg-[#c2551f] transition-colors"
                  >
                    Continue Anyway
                  </button>
                </div>
              </>
            )}

            {verificationStage === 'nomatch' && (
              <>
                <div className="text-sm font-black text-gray-900 mb-1">No Matching Place Found</div>
                <p className="text-xs text-gray-500 mb-4">
                  We couldn't find an existing place near your selected location.
                </p>
                <button
                  type="button"
                  onClick={handleFinalizeAddition}
                  className="w-full px-3 py-2 rounded-xl bg-[#D8612F] text-white text-xs font-bold hover:bg-[#c2551f] transition-colors"
                >
                  Continue Anyway
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Legend & Instructions Bar Bottom */}
      <div className="w-full mt-1.5 flex flex-wrap items-center justify-between text-xs text-gray-500 gap-2 px-2 flex-shrink-0">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm inline-block" />
            <span className="font-semibold text-gray-700">Living Heritage</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="text-sm">🍽️</span>
            <span className="font-semibold text-gray-700">Food & Cuisine</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-red-600 shadow-sm animate-pulse inline-block" />
            <span className="font-bold text-red-700">At-Risk Culture</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-gray-400">
          <Info className="w-3.5 h-3.5" />
          <span>Click Theyyam Centres to view history & get simulated demo directions</span>
        </div>
      </div>
    </div>
  );
}