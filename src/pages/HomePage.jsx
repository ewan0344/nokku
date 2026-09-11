import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  X,
  ArrowRight,
  Compass,
  User,
  Award,
  MapPin,
  Trophy
} from 'lucide-react';

export default function HomePage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="relative w-full min-h-screen h-screen overflow-hidden bg-white text-[#11161B] flex flex-col justify-between select-none font-sans">

      {/* 1. RECREATED BACKGROUND GRADIENT & ATMOSPHERE */}

      {/* Soft Pastel Blue Gradient on the Left */}
      <div
        className="absolute top-0 left-0 w-[55vw] h-[70vh] pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(circle at 12% 22%, rgba(168, 204, 238, 0.75) 0%, rgba(200, 225, 248, 0.45) 35%, rgba(255, 255, 255, 0) 70%)'
        }}
      />

      {/* Soft Warm Orange Gradient on the Right */}
      <div
        className="absolute top-0 right-0 w-[55vw] h-[75vh] pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(circle at 90% 32%, rgba(255, 178, 120, 0.7) 0%, rgba(255, 210, 175, 0.35) 40%, rgba(255, 255, 255, 0) 72%)'
        }}
      />

      {/* 2. RECREATED SUN & BIRDS */}

      {/* Soft Sun Disk in Upper Right */}
      <div
        className="absolute top-[28%] right-[-5%] sm:right-[0%] w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-full pointer-events-none z-[1]"
        style={{
          background:
            'radial-gradient(circle, rgba(255, 175, 115, 0.45) 0%, rgba(255, 185, 135, 0.25) 55%, rgba(255, 195, 150, 0.05) 70%, transparent 75%)',
          filter: 'blur(4px)'
        }}
      />

      {/* Subtle Sun Outline Arc */}
      <div
        className="absolute top-[32%] right-[-2%] sm:right-[3%] w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] rounded-full border border-orange-300/25 pointer-events-none z-[1]"
        style={{ filter: 'blur(1px)' }}
      />

      {/* Birds flying near the sun */}
      <div className="absolute top-[44%] right-[11%] sm:right-[13%] pointer-events-none z-10 flex items-center space-x-3 opacity-70">

        {/* Bird 1 */}
        <svg
          className="w-4 h-3 transform -rotate-6"
          viewBox="0 0 24 14"
          fill="#6B4028"
        >
          <path d="M 1 6 Q 6 1 12 5 Q 18 1 23 6 Q 18 7 12 6 Q 6 7 1 6 Z" />
        </svg>

        {/* Bird 2 */}
        <svg
          className="w-5 h-3.5 -mt-3 transform rotate-3"
          viewBox="0 0 24 14"
          fill="#6B4028"
        >
          <path d="M 1 6 Q 6 1 12 5 Q 18 1 23 6 Q 18 7 12 6 Q 6 7 1 6 Z" />
        </svg>

        {/* Bird 3 */}
        <svg
          className="w-4 h-3 transform rotate-12"
          viewBox="0 0 24 14"
          fill="#6B4028"
        >
          <path d="M 1 6 Q 6 1 12 5 Q 18 1 23 6 Q 18 7 12 6 Q 6 7 1 6 Z" />
        </svg>

      </div>

      {/* 3. EXTRACTED EARTH/GLOBE */}

      <div className="absolute bottom-0 left-0 right-0 w-full pointer-events-none z-[2]">
        <img
          src="/earth-globe.png"
          alt="Earth visual from reference with India"
          className="w-full h-auto block pointer-events-none select-none"
          style={{
            imageRendering: '-webkit-optimize-contrast',
            willChange: 'transform'
          }}
        />
      </div>

      {/* 4. HEADER */}

      <header className="relative z-20 w-full px-8 sm:px-12 lg:px-16 pt-8 sm:pt-10 flex items-center justify-between">

        {/* Top-left Brand */}
        <Link
          to="/home"
          className="text-2xl sm:text-[28px] font-extrabold tracking-tight text-[#11161B] hover:opacity-85 transition-opacity"
        >
          nokku
        </Link>

        {/* Top-right Hamburger Menu */}
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="p-1 text-[#11161B] hover:opacity-75 focus:outline-none transition-opacity"
          aria-label="Toggle menu"
        >
          <div className="w-6 flex flex-col space-y-1.5 items-end">
            <span className="block w-6 h-[2px] bg-[#11161B] rounded-full"></span>
            <span className="block w-6 h-[2px] bg-[#11161B] rounded-full"></span>
            <span className="block w-6 h-[2px] bg-[#11161B] rounded-full"></span>
          </div>
        </button>

      </header>

      {/* 5. CENTER HERO */}

      <main className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-4 -mt-6 sm:-mt-8">

        {/* Large Brand Title */}
        <h1 className="text-7xl sm:text-8xl md:text-[98px] font-extrabold tracking-[-0.04em] text-[#11161B] leading-none mb-3 sm:mb-4 select-none">
          nokku
        </h1>

        {/* Navigation Row */}
        <nav
          aria-label="Hero Navigation"
          className="flex items-center space-x-5 sm:space-x-7 lg:space-x-10 mb-5 sm:mb-6 flex-wrap justify-center"
        >

          {/* Home */}
          <Link
            to="/home"
            className="text-[14px] sm:text-[15px] font-semibold text-[#D8612F] relative py-1 transition-colors"
          >
            Home
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D8612F] rounded-full" />
          </Link>

          {/* Profile */}
          <Link
            to="/profile"
            className="text-[14px] sm:text-[15px] font-semibold text-[#4B5563] hover:text-[#D8612F] py-1 transition-colors"
          >
            Profile
          </Link>

          {/* Relics */}
          <Link
            to="/relics"
            className="text-[14px] sm:text-[15px] font-semibold text-[#4B5563] hover:text-[#D8612F] py-1 transition-colors"
          >
            Relics
          </Link>

          {/* Visited */}
          <Link
            to="/visited"
            className="text-[14px] sm:text-[15px] font-semibold text-[#4B5563] hover:text-[#D8612F] py-1 transition-colors"
          >
            Visited Place
          </Link>

          {/* Treasure Hunt */}
          <Link
            to="/treasure-hunt/kerala-heritage-hunt"
            className="text-[14px] sm:text-[15px] font-semibold text-[#4B5563] hover:text-[#D8612F] py-1 transition-colors"
          >
            Treasure Hunt
          </Link>

        </nav>

        {/* Tagline */}
        <div className="text-[10.5px] sm:text-[11.5px] font-bold tracking-[0.26em] text-[#6B7280] uppercase mb-2.5 sm:mb-3 select-none">
          EXPLORE &nbsp;•&nbsp; DISCOVER &nbsp;•&nbsp; PRESERVE
        </div>

        {/* Description */}
        <p className="text-[13.5px] sm:text-[15px] text-[#555E68] max-w-sm sm:max-w-md mx-auto leading-relaxed mb-5 sm:mb-6 font-normal">
          Your guide to India's rich cultural heritage —
          <br className="hidden sm:inline" />
          from timeless traditions to hidden gems.
        </p>

        {/* Start Exploring Button */}
        <Link
          to="/map"
          className="inline-flex items-center space-x-2 px-7 py-3 rounded-full bg-[#D8612F] hover:bg-[#C25222] text-white font-medium text-[14px] sm:text-[15px] shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] group"
        >
          <span>Start Exploring</span>
          <ArrowRight className="w-4 h-4 stroke-[2.2] group-hover:translate-x-0.5 transition-transform duration-150" />
        </Link>

      </main>

      {/* 6. BOTTOM-LEFT TEXT */}

      <div className="relative z-20 pb-8 pl-8 sm:pb-12 sm:pl-12 lg:pl-16 select-none pointer-events-none">

        <div className="text-[10px] sm:text-[11px] font-bold tracking-[0.18em] text-[#717A84] leading-snug uppercase">
          REAL PLACES
          <br />
          REAL CULTURE
          <br />
          LASTING IMPACT
        </div>

        <div className="w-6 h-[2px] bg-[#D8612F] mt-1.5 rounded-full" />

      </div>

      {/* 7. SLIDE-OUT NAVIGATION DRAWER */}

      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">

          <div className="w-full max-w-sm bg-white h-full shadow-2xl p-6 flex flex-col justify-between animate-in slide-in-from-right duration-300">

            <div>

              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-gray-100">

                <span className="text-2xl font-extrabold text-[#11161B]">
                  nokku
                </span>

                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>

              </div>

              {/* Drawer Navigation */}
              <div className="mt-8 space-y-2">

                {/* Home */}
                <Link
                  to="/home"
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl text-[#D8612F] bg-orange-50 font-semibold"
                >
                  <span>Home</span>
                </Link>

                {/* Map */}
                <Link
                  to="/map"
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 font-medium"
                >
                  <Compass className="w-5 h-5 text-[#D8612F]" />
                  <span>Start Exploring Map</span>
                </Link>

                {/* Profile */}
                <Link
                  to="/profile"
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 font-medium"
                >
                  <User className="w-5 h-5 text-gray-400" />
                  <span>Profile</span>
                </Link>

                {/* Relics */}
                <Link
                  to="/relics"
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 font-medium"
                >
                  <Award className="w-5 h-5 text-gray-400" />
                  <span>Relics</span>
                </Link>

                {/* Visited Places */}
                <Link
                  to="/visited"
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 font-medium"
                >
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span>Visited Place</span>
                </Link>

                {/* Treasure Hunt */}
                <Link
                  to="/treasure-hunt/kerala-heritage-hunt"
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 font-medium"
                >
                  <Trophy className="w-5 h-5 text-[#D8612F]" />
                  <span>Treasure Hunt</span>
                </Link>

              </div>

            </div>

            {/* Drawer Bottom Button */}
            <div className="pt-6 border-t border-gray-100">

              <Link
                to="/map"
                onClick={() => setDrawerOpen(false)}
                className="w-full flex items-center justify-center space-x-2 py-3.5 px-4 rounded-full bg-[#D8612F] hover:bg-[#C25222] text-white font-semibold text-sm shadow-md transition-all"
              >
                <span>Start Exploring</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}