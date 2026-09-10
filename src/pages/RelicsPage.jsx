import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Award, Lock, Sparkles, Compass, ShieldCheck, CheckCircle2, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCulturalJourney } from '../context/CulturalJourneyContext';

export default function RelicsPage() {
  const { unlockedRelics, resetDemoProgress } = useCulturalJourney();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const hasRelics = unlockedRelics.length > 0;

  return (
    <div className="min-h-screen bg-[#FAFBFD] flex flex-col font-sans relative">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-orange-50 border border-orange-100 text-[#D8612F] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cultural Relics & Badges ({unlockedRelics.length})</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#14171A] tracking-tight">
            Relics Collection
          </h1>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            Relics represent your achievements, badges, and honors earned as you explore and safeguard India's living cultural traditions.
          </p>
        </div>

        {/* UNLOCKED RELICS SHOWCASE */}
        {hasRelics ? (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.06] shadow-sm">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#D8612F] mb-4">
                Unlocked Relics
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {unlockedRelics.map((relic) => (
                  <div
                    key={relic.id}
                    className="p-5 rounded-2xl bg-gradient-to-br from-[#FFF9F5] to-white border-2 border-orange-200/80 shadow-md flex items-start space-x-4 relative overflow-hidden"
                  >
                    {/* Glowing Accent */}
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#D8612F] to-amber-500 flex items-center justify-center text-white shadow-lg flex-shrink-0">
                      <Award className="w-8 h-8" />
                    </div>

                    <div className="flex-1 text-left">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center space-x-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>UNLOCKED</span>
                        </span>
                        <span className="text-xs font-bold text-amber-600">+{relic.pointsReward} Points</span>
                      </div>

                      <h4 className="text-lg font-extrabold text-[#14171A] tracking-tight mt-1">
                        {relic.title}
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed font-normal mt-1">
                        {relic.description}
                      </p>
                      <div className="text-[10.5px] text-gray-400 mt-2">
                        Achieved on {relic.unlockedAt}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Locked Future Badges Placeholder */}
            <div className="bg-white/80 rounded-3xl p-6 border border-black/[0.04] text-center">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                Upcoming Cultural Relics to Unlock
              </h4>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 opacity-50 max-w-lg mx-auto">
                {['Coastal Fortress Explorer', 'Spice Route Gourmet', 'Sacred Grove Chronicler', 'Textile Heritage Patron', 'Monsoon Voyager'].map((badge) => (
                  <div
                    key={badge}
                    className="aspect-square rounded-2xl bg-gray-50 border border-dashed border-gray-300 flex flex-col items-center justify-center p-2 text-center"
                  >
                    <Lock className="w-4 h-4 text-gray-400 mb-1" />
                    <span className="text-[9px] font-semibold text-gray-500 leading-tight line-clamp-2">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Empty State when no relics unlocked yet */
          <div className="bg-white rounded-3xl p-10 sm:p-14 border border-black/[0.06] shadow-sm text-center relative overflow-hidden">
            <div className="max-w-md mx-auto flex flex-col items-center">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#FFEFE8] to-[#F3F7FA] flex items-center justify-center text-[#D8612F] mb-6 shadow-inner">
                <Award className="w-10 h-10" />
              </div>

              <h2 className="text-xl font-bold text-gray-900">
                Badge & Achievement System Ready
              </h2>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                Visit and verify cultural traditions on the map to unlock your first relic honor.
              </p>

              <div className="mt-8">
                <Link
                  to="/map"
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#D8612F] hover:bg-[#C25222] text-white text-sm font-semibold shadow-sm transition-all"
                >
                  <Compass className="w-4 h-4" />
                  <span>Explore the India Map</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Small Reset/Retry Button in bottom-right corner */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="relative group">
          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            aria-label="Reset Demo"
            className="w-10 h-10 rounded-full bg-white/95 backdrop-blur border border-black/10 shadow-lg hover:shadow-xl text-gray-500 hover:text-[#D8612F] flex items-center justify-center transition-all duration-150 hover:scale-110 active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 transition-transform group-hover:-rotate-90 duration-300" />
          </button>
          
          {/* Tooltip on hover */}
          <div className="absolute bottom-full right-0 mb-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap">
            <div className="bg-[#14171A] text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg shadow-md">
              Reset Demo
            </div>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Dialog */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-sm w-full shadow-2xl border border-black/10 text-center animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#D8612F] border border-orange-200 flex items-center justify-center mx-auto mb-4">
              <RotateCcw className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-gray-900 tracking-tight">
              Reset demo progress?
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed">
              This will remove your prototype visit, points and achievement.
            </p>

            <div className="flex items-center space-x-3 mt-6">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2.5 px-4 rounded-full border border-gray-200 text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-50 active:scale-95 transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowResetConfirm(false);
                  resetDemoProgress();
                }}
                className="flex-1 py-2.5 px-4 rounded-full bg-[#D8612F] hover:bg-[#C25222] text-xs sm:text-sm font-bold text-white shadow-md active:scale-95 transition-all"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
