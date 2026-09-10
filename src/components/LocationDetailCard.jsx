import React from 'react';
import { X, MapPin, Sparkles, AlertTriangle, Navigation, ArrowRight, CheckCircle2, Loader2, Check } from 'lucide-react';
import { useCulturalJourney } from '../context/CulturalJourneyContext';

export default function LocationDetailCard({ location, onClose, onExplore, onGetDirections }) {
  if (!location) return null;

  const { isTheyyamVerified, verificationState, verifyTheyyamVisit } = useCulturalJourney();

  const isAtRisk = location.status === 'at-risk';
  const isFood = location.status === 'food';
  const isLiving = location.status === 'living';
  const isTheyyam = location.id === 'theyyam-centres';

  const isConfirmed = isTheyyam && (isTheyyamVerified || verificationState === 'confirmed');
  const isChecking = isTheyyam && verificationState === 'checking';

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-2xl border border-black/[0.08] w-full flex flex-col max-h-full min-h-0 relative overflow-hidden text-left select-text">
      {/* Header Accent Bar */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 ${
        isAtRisk ? 'bg-gradient-to-r from-red-500 to-rose-600' :
        isFood ? 'bg-gradient-to-r from-amber-400 to-orange-500' :
        'bg-gradient-to-r from-emerald-500 to-teal-600'
      }`} />

      {/* Close Button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-3.5 right-3.5 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors z-10"
        aria-label="Close details"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Category / Status Badge */}
      <div className="flex items-center space-x-2 mb-1.5 pt-0.5 flex-shrink-0 pr-8">
        {isAtRisk && (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-red-50 text-red-700 border border-red-200 tracking-wide uppercase">
            <AlertTriangle className="w-3.5 h-3.5 text-red-600 animate-pulse" />
            <span>AT-RISK CULTURE</span>
          </span>
        )}

        {isFood && (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200 tracking-wide uppercase">
            <span className="text-xs">🍽️</span>
            <span>FOOD / CUISINE</span>
          </span>
        )}

        {isLiving && (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>LIVING HERITAGE</span>
          </span>
        )}
      </div>

      {/* Location Name */}
      <h3 className="text-lg sm:text-xl font-extrabold text-[#14171A] tracking-tight leading-snug flex-shrink-0">
        {location.name}
      </h3>

      {/* Regional String */}
      <div className="flex items-center space-x-1.5 text-xs text-gray-500 font-medium mt-0.5 mb-2 flex-shrink-0">
        <MapPin className="w-3.5 h-3.5 text-[#D8612F]" />
        <span>{location.locationStr}</span>
      </div>

      {/* Description Body - Scrollable if content exceeds available viewport height */}
      <div className="flex-1 min-h-0 overflow-y-auto pr-1.5 my-1 text-xs sm:text-[13px] text-gray-600 leading-relaxed font-normal space-y-2.5 [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
        {location.fullDesc ? (
          location.fullDesc.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))
        ) : (
          <p>{location.shortDesc}</p>
        )}
      </div>

      {/* Tags */}
      {location.tags && (
        <div className="flex flex-wrap gap-1.5 my-2 flex-shrink-0">
          {location.tags.map((tag) => (
            <span
              key={tag}
              className={`text-[10px] sm:text-[10.5px] font-semibold px-2 py-0.5 rounded-md ${
                tag.includes('AT-RISK')
                  ? 'bg-red-100/80 text-red-800 font-bold'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Action Buttons - Always anchored and visible */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-2.5 border-t border-gray-100 mt-auto flex-shrink-0">
        <div className="text-[11px] text-gray-400 font-medium hidden sm:block">
          NOKKU Cultural Archive
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
          {isTheyyam ? (
            <>
              {/* "Get Directions →" Button */}
              {onGetDirections && (
                <button
                  type="button"
                  onClick={() => onGetDirections(location)}
                  className="inline-flex items-center justify-center space-x-1 px-3.5 py-2 rounded-full text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-150 active:scale-95"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#D8612F]" />
                  <span>Get Directions →</span>
                </button>
              )}

              {/* Prototype "Visited" Button ONLY for Theyyam */}
              <button
                type="button"
                disabled={isConfirmed || isChecking}
                onClick={verifyTheyyamVisit}
                className={`inline-flex items-center justify-center space-x-1.5 px-4 py-2 rounded-full text-xs font-bold text-white shadow-md transition-all duration-200 active:scale-95 ${
                  isConfirmed
                    ? 'bg-emerald-600 text-white cursor-default'
                    : isChecking
                    ? 'bg-amber-600 cursor-wait'
                    : 'bg-[#D8612F] hover:bg-[#C25222] hover:shadow-lg'
                }`}
              >
                {isChecking ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Checking your visit...</span>
                  </>
                ) : isConfirmed ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>✓ Visit Confirmed</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Visited</span>
                  </>
                )}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => onExplore ? onExplore(location) : null}
              className={`inline-flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-white shadow-sm hover:shadow transition-all duration-150 active:scale-95 ${
                isAtRisk
                  ? 'bg-red-600 hover:bg-red-700'
                  : isFood
                  ? 'bg-amber-600 hover:bg-amber-700'
                  : 'bg-[#D8612F] hover:bg-[#C25222]'
              }`}
            >
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
