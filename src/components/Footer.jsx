import React from 'react';
import { Car } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const handleLinkClick = (href) => {
    if (onNavigate) onNavigate('home');
    if (href.startsWith('#') && href !== '#') {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                <Car className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white">kuiky.in</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Your trusted partner for professional, transparent vehicle rentals across top destinations.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-3">Quick Navigation</h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={() => handleLinkClick('#')} className="hover:text-white cursor-pointer">Home Page</button></li>
              <li><button onClick={() => handleLinkClick('#fleet')} className="hover:text-white cursor-pointer">Vehicle Directory</button></li>
              <li><button onClick={() => handleLinkClick('#services')} className="hover:text-white cursor-pointer">Services</button></li>
              <li><button onClick={() => handleLinkClick('#reviews')} className="hover:text-white cursor-pointer">Reviews</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-3">Vehicle Categories</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#fleet" className="hover:text-white">2-Wheeler Bikes</a></li>
              <li><a href="#fleet" className="hover:text-white">3-Wheeler Autos</a></li>
              <li><a href="#fleet" className="hover:text-white">4-Wheeler Cars</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-3">Contact Support</h4>
            <p className="text-slate-400 mb-1">Hotline: +91 98765 43210</p>
            <p className="text-slate-400 mb-1">Email: support@kuiky.in</p>
            <p className="text-slate-400">Location: Coimbatore & Erode, Tamil Nadu</p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© 2026 kuiky.in Inc. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>Rental Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
