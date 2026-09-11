import React from 'react';
import Navbar from '../components/Navbar';
import {
  User,
  ShieldCheck,
  MapPin,
  Compass,
  Sparkles,
  Award,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCulturalJourney } from '../context/CulturalJourneyContext';

export default function ProfilePage() {
  const {
    heritagePoints,
    visitedPlaces,
    unlockedRelics,
  } = useCulturalJourney();

  // --------------------------------------------------
  // Calculate places visited for each year
  // --------------------------------------------------
  const yearlyVisits = visitedPlaces.reduce((acc, place) => {
    // Normal places use visitedDate
    // Theyyam verification uses verifiedDate
    const visitDate = place.visitedDate || place.verifiedDate;

    if (!visitDate) {
      return acc;
    }

    const date = new Date(visitDate);
    const year = date.getFullYear();

    if (!isNaN(year)) {
      acc[year] = (acc[year] || 0) + 1;
    }

    return acc;
  }, {});

  // Sort years from newest to oldest
  const years = Object.keys(yearlyVisits)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="min-h-screen bg-[#FAFBFD] flex flex-col font-sans">

      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* =========================================
            PROFILE CARD HEADER
        ========================================= */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-black/[0.06] shadow-sm relative overflow-hidden">

          {/* Subtle gradient background accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-100/60 via-blue-50/40 to-transparent rounded-full blur-3xl -z-0 pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">

            {/* Avatar */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#EBF3FA] to-[#FFEFE8] border-4 border-white shadow-md flex items-center justify-center flex-shrink-0 text-gray-400">

              <User className="w-12 h-12 text-[#D8612F]/70" />

            </div>


            {/* User Info */}
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


            {/* Heritage Points */}
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


        {/* =========================================
            DYNAMIC JOURNEY STATS
        ========================================= */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">


          {/* Places Visited */}
          <div className="bg-white rounded-3xl p-6 border border-black/[0.06] shadow-sm flex flex-col items-center text-center">

            <div className="w-12 h-12 rounded-2xl bg-[#EBF3FA] flex items-center justify-center text-[#2563EB] mb-4">

              <Compass className="w-6 h-6" />

            </div>


            <div className="text-2xl font-black text-gray-900">

              {visitedPlaces.length}

            </div>


            <h3 className="font-semibold text-gray-700 text-sm mt-0.5">

              Places Visited

            </h3>


            <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">

              {visitedPlaces.length > 0
                ? 'Cultural places logged in your journey.'
                : 'Visit locations on the map to log footprints.'}

            </p>

          </div>


          {/* Relics Unlocked */}
          <div className="bg-white rounded-3xl p-6 border border-black/[0.06] shadow-sm flex flex-col items-center text-center">

            <div className="w-12 h-12 rounded-2xl bg-[#FFEFE8] flex items-center justify-center text-[#D8612F] mb-4">

              <Award className="w-6 h-6" />

            </div>


            <div className="text-2xl font-black text-gray-900">

              {unlockedRelics.length}

            </div>


            <h3 className="font-semibold text-gray-700 text-sm mt-0.5">

              Relics Unlocked

            </h3>


            <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">

              {unlockedRelics.length > 0
                ? 'Heritage Guardian honor earned.'
                : 'Unlock badges by discovering at-risk heritage.'}

            </p>

          </div>


          {/* At-Risk Traditions */}
          <div className="bg-white rounded-3xl p-6 border border-black/[0.06] shadow-sm flex flex-col items-center text-center">

            <div className="w-12 h-12 rounded-2xl bg-[#F4F6F8] flex items-center justify-center text-gray-600 mb-4">

              <MapPin className="w-6 h-6" />

            </div>


            <div className="text-2xl font-black text-gray-900">

              {visitedPlaces.length > 0 ? '1' : '0'}

            </div>


            <h3 className="font-semibold text-gray-700 text-sm mt-0.5">

              At-Risk Traditions

            </h3>


            <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">

              Preserving endangered oral and ritual legacies.

            </p>

          </div>

        </div>


        {/* =========================================
            YEARLY EXPLORATION
        ========================================= */}
        <div className="mt-8 bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.06] shadow-sm">

          <div className="mb-6">

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-[#D8612F] text-xs font-semibold mb-3">

              <Compass className="w-3.5 h-3.5" />

              <span>Journey Statistics</span>

            </div>


            <h2 className="text-2xl font-bold text-gray-900">

              Yearly Exploration

            </h2>


            <p className="text-sm text-gray-500 mt-1">

              Track how many heritage places you visited each year.

            </p>

          </div>


          {/* Yearly Cards */}
          {years.length > 0 ? (

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">

              {years.map((year) => (

                <div
                  key={year}
                  className="rounded-2xl bg-gradient-to-br from-orange-50 via-white to-blue-50 border border-orange-100 p-6 text-center hover:shadow-md transition-all duration-200"
                >

                  <div className="text-sm font-bold text-gray-500">

                    {year}

                  </div>


                  <div className="text-4xl font-extrabold text-[#D8612F] mt-2">

                    {yearlyVisits[year]}

                  </div>


                  <div className="text-sm font-semibold text-gray-600 mt-1">

                    {yearlyVisits[year] === 1
                      ? 'Place Visited'
                      : 'Places Visited'}

                  </div>

                </div>

              ))}

            </div>

          ) : (

            /* No Visits */
            <div className="rounded-2xl bg-gray-50 border border-gray-100 p-8 text-center">

              <Compass className="w-8 h-8 text-gray-400 mx-auto mb-3" />


              <h3 className="font-semibold text-gray-700">

                No visits recorded yet

              </h3>


              <p className="text-sm text-gray-500 mt-1">

                Visit a heritage place to start building your yearly journey.

              </p>


              <Link
                to="/map"
                className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-full bg-[#D8612F] hover:bg-[#C25222] text-white text-sm font-semibold transition-all"
              >

                <Compass className="w-4 h-4" />

                Explore Map

              </Link>

            </div>

          )}

        </div>


        {/* =========================================
            CONTINUE JOURNEY
        ========================================= */}
        <div className="mt-8 bg-gradient-to-r from-orange-50/80 via-white to-blue-50/50 rounded-3xl p-8 border border-orange-100 flex flex-col sm:flex-row items-center justify-between gap-6">

          <div>

            <h3 className="text-lg font-bold text-gray-900">

              Continue Your Journey

            </h3>


            <p className="text-sm text-gray-500 mt-1">

              Explore the interactive India map and discover regional borders.

            </p>

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