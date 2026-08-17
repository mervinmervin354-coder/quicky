import React, { useState, useMemo } from 'react';
import {
  Car,
  Bike,
  ChevronLeft,
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
  ShieldCheck,
  ArrowRight,
  Navigation
} from 'lucide-react';
import { CITIES, calculateDistance } from '../data/fleetData';

export default function VehicleDetailsPage({ vehicle, onStartBooking, onBackToHome }) {
  const [pickupCity, setPickupCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');

  const distance = useMemo(() => {
    if (!pickupCity || !destinationCity) return 0;
    return calculateDistance(pickupCity, destinationCity);
  }, [pickupCity, destinationCity]);

  const perKmRate = vehicle?.price || 8;
  const estimatedFare = useMemo(() => distance * perKmRate, [distance, perKmRate]);

  if (!vehicle) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">No Vehicle Selected</h2>
        <p className="text-slate-600 text-sm">Please select a vehicle from our fleet catalog.</p>
        <button onClick={onBackToHome} className="btn-primary px-6 py-2.5 rounded-xl text-white font-bold text-sm">
          Browse Vehicles
        </button>
      </div>
    );
  }

  const VehicleIcon = vehicle.category?.includes('Bike') ? Bike : Car;

  return (
    <main className="flex-1 bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Fleet Directory</span>
          </button>

          <span className="text-xs font-bold text-blue-600 bg-blue-100/80 px-3.5 py-1 rounded-full uppercase tracking-wider">
            Vehicle Specification Sheet
          </span>
        </div>

        {/* Hero Banner Box */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-blue-500/30 text-blue-300 text-xs font-bold px-3 py-1 rounded-full border border-blue-400/30">
                  {vehicle.category}
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-400/30">
                  {vehicle.registrationNo || 'TN-37-REG'}
                </span>
                <span className="flex items-center gap-1 bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/30">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>{vehicle.rating || 4.9} ({vehicle.reviews || 120} reviews)</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                {vehicle.name}
              </h1>

              <p className="text-sm text-slate-300 font-medium leading-relaxed">
                {vehicle.tag} • Official RTO Registered Vehicle owned by <strong className="text-white">{vehicle.ownerName}</strong>.
              </p>
            </div>

            {/* Price Badge CTA Box */}
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center space-y-3 shrink-0">
              <span className="text-slate-300 text-xs font-semibold block uppercase">Per Kilometer Fare</span>
              <div className="text-4xl font-black text-white">₹{perKmRate}<span className="text-sm font-normal text-slate-300"> / km</span></div>
              <button
                onClick={() => onStartBooking(vehicle, pickupCity, destinationCity)}
                className="w-full py-3 btn-primary text-white font-extrabold text-xs rounded-xl cursor-pointer shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
              >
                <span>Reserve Vehicle Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Owner & Technical Details */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Owner & Partner Profile Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/90 space-y-5">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center font-bold text-sm">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Vehicle Owner & Partner Information</h3>
                  <p className="text-xs text-slate-500">RTO verified partner credentials & depot contact</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-1">
                  <span className="text-slate-400 font-bold uppercase text-[10px] block">Owner / Fleet Name</span>
                  <strong className="text-slate-900 text-base font-extrabold block">{vehicle.ownerName || 'Verified Partner'}</strong>
                  <span className="inline-block text-emerald-700 font-bold text-[11px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    ✓ RTO Verified Partner
                  </span>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-1">
                  <span className="text-slate-400 font-bold uppercase text-[10px] block">Owner Location / Hub</span>
                  <div className="flex items-center gap-1.5 text-slate-900 font-extrabold text-sm">
                    <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{vehicle.ownerLocation || 'Coimbatore Depot'}</span>
                  </div>
                  <span className="text-slate-500 text-[11px]">Primary Pick-up Depot</span>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-1">
                  <span className="text-slate-400 font-bold uppercase text-[10px] block">Owner Hotline Contact</span>
                  <div className="flex items-center gap-1.5 text-slate-900 font-extrabold text-sm">
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{vehicle.ownerPhone || '+91 98421 00000'}</span>
                  </div>
                  <span className="text-slate-500 text-[11px]">24/7 Hotline Support</span>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-1">
                  <span className="text-slate-400 font-bold uppercase text-[10px] block">Insurance & Registration</span>
                  <div className="flex items-center gap-1.5 text-slate-900 font-extrabold text-xs">
                    <FileCheck className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{vehicle.insuranceValid || 'Valid Comprehensive Insurance'}</span>
                  </div>
                  <span className="text-emerald-700 text-[11px] font-bold">Registration: {vehicle.registrationNo}</span>
                </div>
              </div>
            </div>

            {/* Technical Specifications Grid */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/90 space-y-5">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center font-bold text-sm">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Technical Specifications</h3>
                  <p className="text-xs text-slate-500">Engine, capacity, and transmission specs</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                  <span className="text-slate-400 font-bold uppercase text-[10px] flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-blue-600" /> Seating Capacity
                  </span>
                  <strong className="text-slate-900 text-sm font-black block">{vehicle.seats} Persons</strong>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                  <span className="text-slate-400 font-bold uppercase text-[10px] flex items-center gap-1">
                    <Fuel className="w-3.5 h-3.5 text-emerald-600" /> Engine & Fuel
                  </span>
                  <strong className="text-slate-900 text-sm font-black block">{vehicle.fuel}</strong>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                  <span className="text-slate-400 font-bold uppercase text-[10px] flex items-center gap-1">
                    <Settings className="w-3.5 h-3.5 text-purple-600" /> Transmission
                  </span>
                  <strong className="text-slate-900 text-sm font-black block">{vehicle.transmission}</strong>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Model Year</span>
                  <strong className="text-slate-900 text-sm font-black block">{vehicle.modelYear || '2024'}</strong>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Color Shade</span>
                  <strong className="text-slate-900 text-sm font-black block">{vehicle.color || 'Standard White'}</strong>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Per KM Rate</span>
                  <strong className="text-blue-600 text-sm font-black block">₹{perKmRate} / km</strong>
                </div>
              </div>
            </div>

            {/* Features & Amenities List */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/90 space-y-5">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Vehicle Amenities & Safety Features
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {(vehicle.features || [
                  'Air Conditioning System',
                  'GPS Live Tracking',
                  'Dual Airbags Safety',
                  'Sanitized & Inspected before pickup'
                ]).map((feat, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 font-bold text-slate-800 flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Route Calculator & Booking Sticky Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              
              {/* Route & Estimator Box */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/90 space-y-5">
                <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Calculate Trip Fare
                </h3>

                <div className="space-y-4 text-xs">
                  {/* Pick-up Location */}
                  <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <label className="font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 text-[10px]">
                      <MapPin className="w-3.5 h-3.5 text-blue-600" /> Pick-up Location
                    </label>
                    <select
                      value={pickupCity}
                      onChange={(e) => setPickupCity(e.target.value)}
                      className="w-full bg-transparent text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer"
                    >
                      <option value="">Select Pick-up City</option>
                      {CITIES.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>

                  {/* Reach Destination */}
                  <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <label className="font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 text-[10px]">
                      <Navigation className="w-3.5 h-3.5 text-emerald-600" /> Reach Destination
                    </label>
                    <select
                      value={destinationCity}
                      onChange={(e) => setDestinationCity(e.target.value)}
                      className="w-full bg-transparent text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer"
                    >
                      <option value="">Select Reach Destination</option>
                      {CITIES.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>

                  {/* Distance & Fare Summary */}
                  {pickupCity && destinationCity ? (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-2 text-xs">
                      <div className="flex justify-between text-slate-600">
                        <span>Calculated Distance</span>
                        <strong className="text-blue-600 font-extrabold">{distance} km</strong>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Category Per-KM Rate</span>
                        <strong className="text-slate-900 font-bold">₹{perKmRate} / km</strong>
                      </div>
                      <div className="pt-2 border-t border-blue-200/80 flex justify-between items-center text-slate-900">
                        <span className="font-extrabold text-xs">Estimated Fare</span>
                        <strong className="text-xl font-black text-blue-600">₹{estimatedFare}</strong>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] font-semibold text-amber-800">
                      Select pick-up and destination to view live distance & route fare.
                    </div>
                  )}

                  <button
                    onClick={() => onStartBooking(vehicle, pickupCity, destinationCity)}
                    className="w-full py-3.5 btn-primary rounded-xl text-white font-extrabold text-xs shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Reserve Vehicle</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Safety & Pay At Destination Guarantee */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 text-xs space-y-2">
                <div className="flex items-center gap-2 font-extrabold text-sm">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Pay at Destination Guarantee</span>
                </div>
                <p className="text-[11px] leading-relaxed text-emerald-800 font-medium">
                  Zero advance payment required. Reserve online now and pay cash or UPI directly upon reaching your destination.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
