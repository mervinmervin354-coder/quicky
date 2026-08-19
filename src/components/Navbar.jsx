import React, { useState } from 'react';
import { Car, Truck, ChevronRight, Menu, X, User, LogOut, Settings, Calendar, ChevronDown, ShieldCheck, Phone, Building2 } from 'lucide-react';

import KuikyBrandIcon from './KuikyBrandIcon';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', href: '#' },
  { id: 'vehicles', label: 'Vehicles', href: '#fleet' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'reviews', label: 'Reviews', href: '#reviews' },
  { id: 'contact', label: 'Contact Us', href: 'contact' }
];

export default function Navbar({ activePage, currentUser, bookingCount = 0, onNavigate, onStartBooking, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleNavClick = (itemId, href) => {
    setActiveNav(itemId);
    if (itemId === 'contact') {
      if (onNavigate) onNavigate('contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
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
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo with Custom Animatic Loaded Pickup Moving on Road SVG */}
        <button
          onClick={() => handleNavClick('home', '#')}
          className="flex items-center gap-3 text-left cursor-pointer group relative"
        >
          <KuikyBrandIcon className="w-8 h-8 text-blue-600 group-hover:text-blue-700 transition-colors" />

          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-indigo-600 transition-all">
              kuiky
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
                (item.id === 'contact' && activePage === 'contact') || (activeNav === item.id && activePage === 'home')
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
            <div className="relative group py-2">
              {/* Sleek User Icon Avatar Button */}
              <button
                className="relative flex items-center justify-center p-0.5 rounded-full bg-slate-100 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition-all cursor-pointer shadow-2xs group"
                aria-label="User Account Menu"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-extrabold text-sm shadow-xs group-hover:scale-105 transition-transform">
                  <User className="w-5 h-5 text-white" />
                </div>
                {bookingCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs animate-bounce">
                    {bookingCount}
                  </span>
                )}
              </button>

              {/* Account Dropdown Menu */}
              <div className="absolute right-0 top-full mt-1 w-64 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-2.5 text-xs font-semibold invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50 space-y-1.5">
                
                {/* Account Header */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Signed In Account</span>
                  <div className="text-slate-900 font-extrabold text-xs truncate">
                    {currentUser.name || 'Valued Customer'}
                  </div>
                  {currentUser.phone && (
                    <span className="text-[11px] text-blue-600 font-bold block">{currentUser.phone}</span>
                  )}
                </div>

                <div className="my-1 border-t border-slate-100"></div>

                {/* Option 1: My Bookings */}
                <button
                  onClick={() => onNavigate && onNavigate('my-bookings')}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-blue-50/80 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="font-bold">My Bookings</span>
                  </div>
                  {bookingCount > 0 && (
                    <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-amber-300">
                      {bookingCount} Active
                    </span>
                  )}
                </button>

                {/* Option 2: Settings */}
                <button
                  onClick={() => onNavigate && onNavigate('settings')}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-blue-50/80 transition-colors cursor-pointer"
                >
                  <Settings className="w-4 h-4 text-slate-500" />
                  <span className="font-bold">Settings</span>
                </button>

                {/* Option 2: Logout */}

                <div className="my-1 border-t border-slate-100"></div>

                {/* Option 3: Logout */}
                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-red-600 hover:bg-red-50 transition-colors cursor-pointer font-bold"
                >
                  <LogOut className="w-4 h-4 text-red-500" />
                  <span>Logout</span>
                </button>

              </div>
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
                (item.id === 'contact' && activePage === 'contact') || (activeNav === item.id && activePage === 'home')
                  ? 'text-blue-600 font-extrabold'
                  : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {currentUser ? (
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                  <div className="font-extrabold text-slate-900">{currentUser.name || 'Valued Customer'}</div>
                  <div className="text-blue-600 font-semibold">{currentUser.phone || ''}</div>
                </div>

                <button
                  onClick={() => {
                    if (onNavigate) onNavigate('my-bookings');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 bg-blue-50 text-blue-700 font-bold border border-blue-200 rounded-xl cursor-pointer flex items-center justify-between px-3"
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>My Bookings</span>
                  </div>
                  {bookingCount > 0 && (
                    <span className="bg-amber-500 text-white font-extrabold px-2 py-0.5 rounded-full text-[10px]">
                      {bookingCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => {
                    setIsSettingsOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl cursor-pointer flex items-center gap-2 px-3"
                >
                  <Settings className="w-4 h-4 text-slate-500" />
                  <span>Settings</span>
                </button>

                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 bg-red-50 text-red-600 font-bold rounded-xl cursor-pointer flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4 text-red-500" />
                  <span>Logout</span>
                </button>
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
