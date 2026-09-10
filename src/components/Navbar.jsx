import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Compass, Globe } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/home' },
    { name: 'Profile', path: '/profile' },
    { name: 'Relics', path: '/relics' },
    { name: 'Visited Place', path: '/visited' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-black/[0.06] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link 
          to="/home" 
          className="text-3xl font-extrabold tracking-tight text-[#14171A] hover:opacity-85 transition-opacity"
        >
          nokku
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `text-[15px] font-semibold tracking-wide transition-all relative py-2 ${
                  isActive
                    ? 'text-[#D8612F]'
                    : 'text-[#3E454F] hover:text-[#D8612F]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D8612F] rounded-full" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right Action */}
        <div className="flex items-center space-x-4">
          <Link
            to="/map"
            className={`hidden sm:inline-flex items-center space-x-2 px-5 py-2.5 rounded-full text-sm font-medium shadow-sm hover:shadow transition-all duration-200 ${
              location.pathname === '/map'
                ? 'bg-[#14171A] text-white'
                : 'bg-[#D8612F] hover:bg-[#C25222] text-white'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>{location.pathname === '/map' ? 'Interactive Map' : 'Explore Map'}</span>
          </Link>

          {/* Hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#D8612F] transition-colors md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-lg border-b border-gray-100 px-6 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-xl text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-[#FFEFE8] text-[#D8612F] font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
          <div className="pt-2 border-t border-gray-100">
            <Link
              to="/map"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center space-x-2 w-full py-3 rounded-xl bg-[#D8612F] text-white font-medium text-sm shadow-sm"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Interactive Map</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
