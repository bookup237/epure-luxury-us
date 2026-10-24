import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top banner */}
      <div className="bg-[#1a1a1a] text-white text-center text-xs py-2 tracking-widest uppercase">
        Free Shipping on Orders Over $500 &mdash; Luxury Furs, Made in the USA
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <NavLink to="/" className="flex items-center">
            <span className="text-3xl font-bold text-[#1a1a1a] font-['Playfair_Display']">
              SAMARA'S FURS
            </span>
          </NavLink>

          {/* Desktop links */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm uppercase tracking-widest transition-colors duration-200 ${
                  isActive
                    ? 'text-[#b8860b] border-b-2 border-[#b8860b] pb-1'
                    : 'text-gray-700 hover:text-[#b8860b]'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-sm uppercase tracking-widest transition-colors duration-200 ${
                  isActive
                    ? 'text-[#b8860b] border-b-2 border-[#b8860b] pb-1'
                    : 'text-gray-700 hover:text-[#b8860b]'
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-sm uppercase tracking-widest transition-colors duration-200 ${
                  isActive
                    ? 'text-[#b8860b] border-b-2 border-[#b8860b] pb-1'
                    : 'text-gray-700 hover:text-[#b8860b]'
                }`
              }
            >
              Contact
            </NavLink>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t">
          <NavLink to="/" onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-sm uppercase tracking-widest text-gray-700 hover:bg-gray-50">Home</NavLink>
          <NavLink to="/about" onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-sm uppercase tracking-widest text-gray-700 hover:bg-gray-50">About</NavLink>
          <NavLink to="/contact" onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-sm uppercase tracking-widest text-gray-700 hover:bg-gray-50">Contact</NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
