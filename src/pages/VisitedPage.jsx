import React from 'react';
import Navbar from '../components/Navbar';
import {
  MapPin,
  Compass,
  ShieldCheck,
  AlertTriangle,
  Award,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCulturalJourney } from '../context/CulturalJourneyContext';

export default function ProfilePage() {
  const { visitedPlaces } = useCulturalJourney();

  // --------------------------------------------------
  // Calculate places visited for each year
  // --------------------------------------------------
  const yearlyVisits = visitedPlaces.reduce((acc, place) => {
    // Normal visits use visitedDate
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

  // Current total places visited
  const totalPlacesVisited = visitedPlaces.length;

  return (
    <div className="min-h-screen bg-[#FAFBFD] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* =========================================
            PROFILE HEADER
        ========================================= */}
        <div className="bg-white rounded-3xl p-8 border border-black/[0.06] shadow-sm">

          <div className="flex flex-col sm:flex-row items-center gap-6">

            {/* Profile Icon */}
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-orange-50 to-blue-50 border border-orange-100 flex items-center justify-center shadow-sm">
              <svg
                className="w-14 h-14 text-[#E58A63]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 20.25a7.5 7.5 0 0115 0"
                />
              </svg>
            </div>

            {/* Profile Information */}
            <div className="flex-1 text-center sm:text-left">

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-[#D8612F] text-xs font-semibold mb-3">
                <Compass className="w-3.5 h-3.5" />
                Heritage Explorer
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#14171A] tracking-tight">
                Cultural Journey Profile
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Explore. Learn. Preserve.
              </p>

              <div className="flex items-center justify-center sm:justify-start gap-4 mt-4 text-xs font-medium">

                <span className="flex items-center gap-1 text-gray-500">
                  <MapPin className="w-4 h-4" />
                  India
                </span>

                <span className="flex items-center gap-1 text-emerald-600">
                  <ShieldCheck className="w-4 h-4" />
                  Account Active
                </span>

              </div>
            </div>

            {/* Heritage Points */}
            <div className="bg-orange-50 border border-orange-200 rounded-2xl px-8 py-5 text-center">
              <div className="text-3xl font-extrabold text-[#D8612F]">
                100
              </div>

              <div className="text-[11px] font-bold text-gray-700 uppercase tracking-wide">
                Heritage Points
              </div>
            </div>

          </div>
        </div>


        {/* =========================================
            STATISTICS
        ========================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

          {/* Places Visited */}
          <div className="bg-white rounded-3xl p-7 border border-black/[0.06] shadow-sm text-center">

            <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
              <Compass className="w-6 h-6 text-blue-600" />
            </div>

            <div className="text-3xl font-extrabold text-gray-900">
              {totalPlacesVisited}
            </div>

            <h3 className="font-semibold text-gray-700 mt-1">
              Places Visited
            </h3>

            <p className="text-xs text-gray-500 mt-2">
              Verified cultural places logged.
            </p>

          </div>


          {/* Relics */}
          <div className="bg-white rounded-3xl p-7 border border-black/[0.06] shadow-sm text-center">

            <div className="w-12 h-12 mx-auto rounded-2xl bg-orange-50 flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-[#D8612F]" />
            </div>

            <div className="text-3xl font-extrabold text-gray-900">
              1
            </div>

            <h3 className="font-semibold text-gray-700 mt-1">
              Relics Unlocked
            </h3>

            <p className="text-xs text-gray-500 mt-2">
              Heritage Guardian honor earned.
            </p>

          </div>


          {/* At Risk */}
          <div className="bg-white rounded-3xl p-7 border border-black/[0.06] shadow-sm text-center">

            <div className="w-12 h-12 mx-auto rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6 text-gray-600" />
            </div>

            <div className="text-3xl font-extrabold text-gray-900">
              1
            </div>

            <h3 className="font-semibold text-gray-700 mt-1">
              At-Risk Traditions
            </h3>

            <p className="text-xs text-gray-500 mt-2">
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
              Journey Statistics
            </div>

            <h2 className="text-2xl font-bold text-gray-900">
              Yearly Exploration
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Track how many heritage places you visited each year.
            </p>

          </div>


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
        <div className="mt-8 bg-gradient-to-r from-orange-50/70 via-white to-blue-50/60 rounded-3xl p-8 border border-orange-100 flex flex-col sm:flex-row items-center justify-between gap-4">

          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Continue Your Journey
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Explore the interactive India map and discover regional heritage.
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