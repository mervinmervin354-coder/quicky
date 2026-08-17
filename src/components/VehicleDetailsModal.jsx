import React from 'react';
import {
  X,
  Car,
  Bike,
  ShieldCheck,
  UserCheck,
  Phone,
  MapPin,
  Star,
  CheckCircle2,
  Users,
  Fuel,
  Settings,
  FileCheck,
  Calendar,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export default function VehicleDetailsModal({ vehicle, isOpen, onClose, onSelectForBooking }) {
  if (!isOpen || !vehicle) return null;

  const VehicleIcon = vehicle.category?.includes('Bike') ? Bike : Car;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/30 border border-blue-400/40 text-blue-400 flex items-center justify-center shrink-0">
              <VehicleIcon className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-blue-500/30 text-blue-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-blue-400/30">
                  {vehicle.category}
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                  {vehicle.registrationNo || 'TN-37-REG'}
                </span>
              </div>
              <h2 className="text-xl font-black text-white">{vehicle.name}</h2>
              <p className="text-xs text-slate-300">{vehicle.tag} • ₹{vehicle.price}/km</p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs">
          
          {/* OWNER & PARTNER INFORMATION CARD */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50/70 p-5 rounded-2xl border border-blue-200/80 space-y-3">
            <div className="flex items-center justify-between border-b border-blue-200/60 pb-3">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
                <UserCheck className="w-5 h-5 text-blue-600" />
                <span>Vehicle Owner & Partner Information</span>
              </div>
              <span className="flex items-center gap-1 bg-amber-100 text-amber-900 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border border-amber-300">
                <Star className="w-3 h-3 text-amber-600 fill-amber-500" />
                <span>{vehicle.ownerRating || 4.9} / 5</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-slate-400 font-bold uppercase text-[10px] block mb-0.5">Owner / Fleet Name</span>
                <strong className="text-slate-900 text-sm font-extrabold block">{vehicle.ownerName || 'Kovai Regional Fleet Partner'}</strong>
                <span className="text-emerald-700 font-semibold text-[11px]">RTO Verified Owner</span>
              </div>

              <div>
                <span className="text-slate-400 font-bold uppercase text-[10px] block mb-0.5">Owner Location / Hub</span>
                <div className="flex items-center gap-1 text-slate-800 font-bold text-xs">
                  <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>{vehicle.ownerLocation || 'Coimbatore Central Depot'}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 font-bold uppercase text-[10px] block mb-0.5">Owner Contact Hotline</span>
                <div className="flex items-center gap-1 text-slate-800 font-bold text-xs">
                  <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{vehicle.ownerPhone || '+91 98421 00000'}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 font-bold uppercase text-[10px] block mb-0.5">Insurance Status</span>
                <div className="flex items-center gap-1 text-emerald-800 font-bold text-xs">
                  <FileCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{vehicle.insuranceValid || 'Valid Insurance'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* TECHNICAL SPECIFICATIONS GRID */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Vehicle Specifications & Details</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 text-[10px] font-bold block uppercase">Registration No</span>
                <strong className="text-slate-900 text-xs font-black">{vehicle.registrationNo || 'TN-37-REG'}</strong>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 text-[10px] font-bold block uppercase">Model & Color</span>
                <strong className="text-slate-900 text-xs font-extrabold">{vehicle.modelYear || '2024'} ({vehicle.color || 'White'})</strong>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 text-[10px] font-bold block uppercase">Rate Per KM</span>
                <strong className="text-blue-600 text-xs font-black">₹{vehicle.price} / km</strong>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 text-[10px] font-bold block uppercase flex items-center gap-1">
                  <Users className="w-3 h-3 text-blue-600" /> Capacity
                </span>
                <strong className="text-slate-900 text-xs font-extrabold">{vehicle.seats} Seats</strong>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 text-[10px] font-bold block uppercase flex items-center gap-1">
                  <Fuel className="w-3 h-3 text-emerald-600" /> Fuel / Engine
                </span>
                <strong className="text-slate-900 text-xs font-extrabold">{vehicle.fuel}</strong>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 text-[10px] font-bold block uppercase flex items-center gap-1">
                  <Settings className="w-3 h-3 text-purple-600" /> Transmission
                </span>
                <strong className="text-slate-900 text-xs font-extrabold">{vehicle.transmission}</strong>
              </div>
            </div>
          </div>

          {/* KEY FEATURES LIST */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Included Amenities & Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(vehicle.features || [
                'Air Conditioning System',
                'GPS Live Tracking',
                'Dual Airbags Safety',
                'Sanitized & Checked before pickup'
              ]).map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 text-slate-800 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SAFETY GUARANTEE */}
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <strong className="font-extrabold text-xs">kuiky.in Inspection Certificate</strong>. This vehicle is owner-verified, fully insured, and sanitized prior to pickup.
            </div>
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
          >
            Close
          </button>

          {onSelectForBooking && (
            <button
              onClick={() => {
                onClose();
                onSelectForBooking(vehicle);
              }}
              className="btn-primary px-6 py-2.5 text-white font-bold text-xs rounded-xl cursor-pointer shadow-md flex items-center gap-1.5"
            >
              <span>Reserve This Vehicle</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
