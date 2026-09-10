import React from 'react';
import Navbar from '../components/Navbar';
import { User, ShieldCheck, MapPin, Compass, Sparkles, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCulturalJourney } from '../context/CulturalJourneyContext';

export default function ProfilePage() {
  const { heritagePoints, visitedPlaces, unlockedRelics } = useCulturalJourney();

  return (
    <div className="min-h-screen bg-[#FAFBFD] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Profile Card Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-black/[0.06] shadow-sm relative overflow-hidden">
          {/* Subtle gradient background accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-100/60 via-blue-50/40 to-transparent rounded-full blur-3xl -z-0 pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
            {/* Avatar Placeholder */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#EBF3FA] to-[#FFEFE8] border-4 border-white shadow-md flex items-center justify-center flex-shrink-0 text-gray-400">
              <User className="w-12 h-12 text-[#D8612F]/70" />
            </div>

            {/* User Info Header */}
            <div className="flex-1 text-center sm:text-left">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-[#D8612F] text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Heritage Explorer</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#14171A]">
                Cultural Journey Profile
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Explore. Learn. Preserve.
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-gray-500">
                <span className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  <span>India</span>
                </span>
                <span className="flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Account Active</span>
                </span>
              </div>
            </div>

            {/* Live Heritage Points Pill Top-Right */}
            <div className="bg-[#FFEFE8] border border-[#F5C2AF] px-5 py-3 rounded-2xl text-center shadow-xs flex-shrink-0">
              <div className="text-2xl sm:text-3xl font-black text-[#D8612F]">
                {heritagePoints}
              </div>
              <div className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                Heritage Points
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Journey Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-black/[0.06] shadow-sm flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#EBF3FA] flex items-center justify-center text-[#2563EB] mb-4">
              <Compass className="w-6 h-6" />
            </div>
            <div className="text-2xl font-black text-gray-900">{visitedPlaces.length}</div>
            <h3 className="font-semibold text-gray-700 text-sm mt-0.5">Places Visited</h3>
            <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
              {visitedPlaces.length > 0
                ? 'Verified cultural tradition in Kannur logged.'
                : 'Visit locations on the map to log footprints.'}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-black/[0.06] shadow-sm flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#FFEFE8] flex items-center justify-center text-[#D8612F] mb-4">
              <Award className="w-6 h-6" />
            </div>
            <div className="text-2xl font-black text-gray-900">{unlockedRelics.length}</div>
            <h3 className="font-semibold text-gray-700 text-sm mt-0.5">Relics Unlocked</h3>
            <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
              {unlockedRelics.length > 0
                ? 'Heritage Guardian honor earned.'
                : 'Unlock badges by discovering at-risk heritage.'}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-black/[0.06] shadow-sm flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#F4F6F8] flex items-center justify-center text-gray-600 mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="text-2xl font-black text-gray-900">
              {visitedPlaces.length > 0 ? '1' : '0'}
            </div>
            <h3 className="font-semibold text-gray-700 text-sm mt-0.5">At-Risk Traditions</h3>
            <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
              Preserving endangered oral and ritual legacies.
            </p>
          </div>
        </div>

        {/* CTA to Explore Map */}
        <div className="mt-8 bg-gradient-to-r from-orange-50/80 via-white to-blue-50/50 rounded-3xl p-8 border border-orange-100 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Continue Your Journey</h3>
            <p className="text-sm text-gray-500 mt-1">Explore the interactive India map and discover regional borders.</p>
          </div>
          <Link
            to="/map"
            className="px-6 py-3 rounded-full bg-[#D8612F] hover:bg-[#C25222] text-white text-sm font-semibold shadow-sm transition-all"
          >
            Open Interactive Map
          </Link>
        </div>
      </main>
    </div>
  );
}
