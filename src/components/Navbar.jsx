import React, { useState } from 'react';
import { Car, ChevronRight, Menu, X, User, LogOut } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', href: '#' },
  { id: 'vehicles', label: 'Vehicles', href: '#fleet' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'reviews', label: 'Reviews', href: '#reviews' }
];

export default function Navbar({ activePage, currentUser, bookingCount = 0, onNavigate, onStartBooking, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');

  const handleNavClick = (itemId, href) => {
    setActiveNav(itemId);
    if (onNavigate) onNavigate('home');
    setTimeout(() => {
      if (href.startsWith('#') && href !== '#') {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: 'smooth' });
      } else if (href === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home', '#')}
          className="flex items-center gap-3 text-left cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-2xl overflow-hidden shadow-md border border-blue-100 group-hover:scale-105 transition-transform duration-300">
            <img src="/logo.jpg" alt="kuiky.in Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
              Kuiky
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-semibold text-sm">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id, item.href)}
              className={`transition-all duration-200 py-1 cursor-pointer ${
                activeNav === item.id && activePage === 'home'
                  ? 'text-blue-600 font-extrabold border-b-2 border-blue-600'
                  : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {currentUser ? (
            <div className="flex items-center gap-3">
              {currentUser.role === 'owner' ? (
                <button
                  onClick={() => onNavigate && onNavigate('owner-dashboard')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-extrabold transition-all cursor-pointer ${
                    activePage === 'owner-dashboard'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                  }`}
                >
                  <User className="w-4 h-4 text-emerald-600" />
                  <span>{currentUser?.name ? `Owner (${currentUser.name})` : 'Owner Dashboard'}</span>
                </button>
              ) : (
                <button
                  onClick={() => onNavigate && onNavigate('my-bookings')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-extrabold transition-all cursor-pointer ${
                    activePage === 'my-bookings'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                  }`}
                >
                  <User className="w-4 h-4 text-blue-600" />
                  <span>My Bookings {bookingCount > 0 ? `(${bookingCount})` : ''}</span>
                </button>
              )}

              <button
                onClick={onLogout}
                title="Sign Out"
                className="p-2 text-slate-500 hover:text-red-600 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => onNavigate && onNavigate('login')}
              className="btn-primary px-4 py-2 rounded-xl text-xs font-extrabold text-white shadow-sm cursor-pointer flex items-center gap-2"
            >
              <User className="w-4 h-4 text-white" />
              <span>Account Sign In</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 font-medium text-sm">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                handleNavClick(item.id, item.href);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-1.5 transition-colors cursor-pointer ${
                activeNav === item.id && activePage === 'home'
                  ? 'text-blue-600 font-extrabold'
                  : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {currentUser ? (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    if (onNavigate) onNavigate('my-bookings');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 bg-blue-50 text-blue-700 font-bold border border-blue-200 rounded-lg cursor-pointer text-xs flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4" />
                  <span>My Bookings {bookingCount > 0 ? `(${bookingCount})` : ''}</span>
                </button>
                <div className="flex items-center justify-between py-1 px-1 text-xs">
                  <span className="font-bold text-slate-800">Signed in as {currentUser.name}</span>
                  <button onClick={onLogout} className="text-red-600 font-bold cursor-pointer">Sign Out</button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  if (onNavigate) onNavigate('login');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 btn-primary text-white text-center font-bold rounded-xl cursor-pointer text-xs flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4 text-white" />
                <span>Account Sign In</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
