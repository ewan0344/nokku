import React from 'react';
import Navbar from '../components/Navbar';
import { MapPin, Compass, ArrowRight, CheckCircle2, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCulturalJourney } from '../context/CulturalJourneyContext';

export default function VisitedPage() {
  const { visitedPlaces } = useCulturalJourney();
  const hasVisited = visitedPlaces.length > 0;

  return (
    <div className="min-h-screen bg-[#FAFBFD] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#2563EB] text-xs font-semibold mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Places Log ({visitedPlaces.length})</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#14171A] tracking-tight">
            Visited Places
          </h1>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            A verified record of historical monuments, cultural sanctuaries, and living traditions you have experienced in person.
          </p>
        </div>

        {/* VERIFIED PLACES LIST */}
        {hasVisited ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {visitedPlaces.map((place) => (
                <div
                  key={place.id}
                  className="bg-white rounded-3xl p-6 border border-black/[0.06] shadow-sm hover:shadow-md transition-all duration-200 relative overflow-hidden flex flex-col justify-between"
                >
                  {/* Top Status & Verification Badge */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-red-50 text-red-700 border border-red-200 uppercase tracking-wider">
                        <AlertTriangle className="w-3 h-3 text-red-600" />
                        <span>AT-RISK CULTURE</span>
                      </span>

                      <span className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>✓ Visit Verified</span>
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#14171A] tracking-tight">
                      {place.name}
                    </h3>
                    <div className="flex items-center space-x-1 text-xs text-gray-500 font-medium mt-1 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-[#D8612F]" />
                      <span>{place.locationStr}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                      {place.shortDesc}
                    </p>
                  </div>

                  {/* Footer metadata */}
                  <div className="pt-4 mt-5 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-gray-400 font-medium">
                      Simulated Prototype Visit • {place.verifiedDate}
                    </span>
                    <Link
                      to="/map"
                      className="inline-flex items-center space-x-1 text-[#D8612F] hover:text-[#C25222] font-semibold"
                    >
                      <span>View on Map</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Explore More CTA */}
            <div className="bg-gradient-to-r from-orange-50/70 via-white to-blue-50/60 rounded-3xl p-8 border border-orange-100 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
              <div>
                <h4 className="font-bold text-gray-900 text-base">Continue Your Heritage Journey</h4>
                <p className="text-xs text-gray-500 mt-0.5">Explore Kannur's living forts and culinary traditions on the interactive map.</p>
              </div>
              <Link
                to="/map"
                className="px-5 py-2.5 rounded-full bg-[#D8612F] hover:bg-[#C25222] text-white text-xs font-semibold shadow-sm transition-all"
              >
                Explore More on Map
              </Link>
            </div>
          </div>
        ) : (
          /* Clean Empty State if not verified yet */
          <div className="bg-white rounded-3xl p-10 sm:p-16 border border-black/[0.06] shadow-sm text-center relative overflow-hidden">
            <div className="max-w-md mx-auto flex flex-col items-center">
              <div className="w-20 h-20 rounded-3xl bg-[#EBF3FA] flex items-center justify-center text-[#2563EB] mb-6 shadow-inner">
                <MapPin className="w-10 h-10 text-[#2563EB]" />
              </div>

              <h2 className="text-xl font-bold text-gray-900">
                Your cultural journey will appear here.
              </h2>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                As you visit heritage sites and verify your visits through photo validation, your travel footprints and cultural logs will be preserved in this gallery.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
                <Link
                  to="/map"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-[#D8612F] hover:bg-[#C25222] text-white text-sm font-semibold shadow-sm transition-all"
                >
                  <Compass className="w-4 h-4" />
                  <span>Start Exploring Map</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
