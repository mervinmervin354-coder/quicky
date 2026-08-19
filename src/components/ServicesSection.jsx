import React, { useState } from 'react';
import {
  ShieldCheck,
  DollarSign,
  ThumbsUp,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  X
} from 'lucide-react';

const DETAILED_SERVICES = [
  {
    id: 'verified-fleet',
    category: 'safety',
    title: '100% Certified Commercial Fleet',
    subtitle: 'Legal Compliance & Fitness Guarantee',
    description: 'Every commercial truck in our catalog undergoes 15-point document inspection, active RC Books, Heavy Commercial Insurance, and Valid Fitness Certificates.',
    icon: ShieldCheck,
    badgeText: '100% Verified',
    theme: 'blue',
    features: [
      'Active commercial plate registration',
      'Verified commercial driver DL & background records',
      'Comprehensive cargo & vehicle insurance',
      'Regular mechanical sanitization & vehicle audits'
    ],
    highlightStat: '500+ Active Inspected Commercial Trucks'
  },
  {
    id: 'transparent-pricing',
    category: 'pricing',
    title: 'Fixed Rate Transparency',
    subtitle: 'Zero Hidden Charges Policy',
    description: 'Per-kilometer billing for Medium Vehicles (₹10/km) and Heavy Vehicles (₹12/km) with no surge rates.',
    icon: DollarSign,
    badgeText: 'Standard Fare',
    theme: 'emerald',
    features: [
      '₹10/km for Medium Pickup Vehicles',
      '₹12/km for Heavy Cargo Trucks',
      'Zero night surge or holiday surge fees',
      'Pay at destination or instant online GPay / Card checkout'
    ],
    highlightStat: '100% Upfront Fare Transparency'
  },
  {
    id: 'reliable-support',
    category: 'support',
    title: '24/7 Fleet Dispatch Support',
    subtitle: 'Dedicated Customer & Route Care',
    description: 'Continuous hotline support and live trip SMS alerts for seamless pickup and delivery.',
    icon: ThumbsUp,
    badgeText: '24/7 Service',
    theme: 'amber',
    features: [
      'Instant SMS OTP verification & booking confirmation',
      'Direct vehicle owner hotline contact details',
      'Multi-city coverage across Tamil Nadu',
      'Instant booking cancellation & customer support'
    ],
    highlightStat: '24/7 Active Hotline & SMS Alerts'
  }
];

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <section id="services" className="py-16 bg-gradient-to-b from-slate-50 via-blue-50/30 to-slate-50 border-t border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* 1. SECTION HEADER */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-700 text-xs font-black border border-blue-200">
            <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
            <span>Guaranteed Service Quality</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Vehicle Rental & <br />
            <span className="bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
              Transparent Logistics Platform
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            Experience the most reliable goods truck network with standardized ₹10/km - ₹12/km pricing, 100% legal document verification, and 24/7 fleet support.
          </p>
        </div>

        {/* 2. SERVICE CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {DETAILED_SERVICES.map((service) => {
            const IconComponent = service.icon;

            return (
              <div
                key={service.id}
                onClick={() => setSelectedService(service)}
                className="bg-white rounded-3xl p-7 border border-slate-200/90 hover:border-blue-400/80 transition-all duration-300 cursor-pointer group flex flex-col justify-between shadow-md hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden"
              >
                {/* Background Shimmer Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer-line"></div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200/80 flex items-center justify-center font-black group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-xs">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-black">
                      {service.badgeText}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs font-bold text-slate-500 mt-0.5">{service.subtitle}</p>
                  </div>

                  <p className="text-slate-600 text-xs font-medium leading-relaxed">
                    {service.description}
                  </p>

                  {/* Bullet Highlights */}
                  <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
                    {service.features.slice(0, 2).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-slate-700 text-[11px] font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 flex items-center justify-between text-xs font-black text-blue-600 group-hover:text-blue-700">
                  <span>Explore Full Feature Details</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* 3. FEATURE DETAIL MODAL */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl space-y-6 relative animate-scale-up text-slate-800">
            
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center font-black">
                {React.createElement(selectedService.icon, { className: 'w-6 h-6' })}
              </div>
              <div>
                <span className="text-[11px] font-extrabold text-blue-600 uppercase tracking-wider block">
                  {selectedService.badgeText}
                </span>
                <h3 className="text-xl font-black text-slate-900">{selectedService.title}</h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {selectedService.description}
            </p>

            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold text-slate-900 block">Service Guarantees & Features:</span>
              <div className="space-y-2">
                {selectedService.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {selectedService.highlightStat}
              </span>
              <button
                onClick={() => setSelectedService(null)}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer shadow-md"
              >
                Close Details
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
