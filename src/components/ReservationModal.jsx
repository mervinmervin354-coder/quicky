import React, { useState } from 'react';
import { X, CheckCircle2, Car, Truck, MapPin, Navigation } from 'lucide-react';
import { calculateDistance, getPerKmRate } from '../data/vehiclesData';

export default function ReservationModal({ activeVehicle, onClose, pickupCity, destinationCity }) {
  const [renterName, setRenterName] = useState('');
  const [renterEmail, setRenterEmail] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  if (!activeVehicle) return null;

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
  };

  const distance = calculateDistance(pickupCity, destinationCity);
  const rate = getPerKmRate(activeVehicle.category);
  const totalFare = distance > 0 ? distance * rate : rate * 20;
  const VehicleIcon = activeVehicle.category.includes('Truck') ? Truck : Car;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 overflow-hidden space-y-6">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase">Reservation Checkout</span>
            <h3 className="text-xl font-bold text-slate-900">{activeVehicle.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!bookingSuccess ? (
          <form onSubmit={handleBookingSubmit} className="space-y-4">
            {/* Vehicle Summary */}
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center shrink-0">
                <VehicleIcon className="w-6 h-6" />
              </div>
              <div className="flex-1 text-xs">
                <h4 className="font-bold text-slate-900 text-sm">{activeVehicle.name}</h4>
                <div className="text-slate-600 mt-1 flex items-center gap-1.5 flex-wrap font-medium">
                  <span className="inline-flex items-center gap-1 text-slate-800 font-bold">
                    <MapPin className="w-3 h-3 text-blue-600" /> {pickupCity || 'Select Pick-up'}
                  </span>
                  <span className="text-blue-600 font-bold">➔</span>
                  <span className="inline-flex items-center gap-1 text-slate-800 font-bold">
                    <Navigation className="w-3 h-3 text-emerald-600" /> {destinationCity || 'Select Destination'}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-[11px]">
                  <span className="font-bold text-slate-700 bg-slate-200/70 px-2 py-0.5 rounded">
                    Distance: {distance > 0 ? `${distance} km` : 'Local Route'}
                  </span>
                  <span className="font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                    Rate: ₹{rate} / km ({activeVehicle.category})
                  </span>
                </div>
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Jane Doe"
                  value={renterName}
                  onChange={(e) => setRenterName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="jane@example.com"
                  value={renterEmail}
                  onChange={(e) => setRenterEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            {/* Price Total */}
            <div className="p-3.5 bg-blue-50/70 rounded-xl border border-blue-100 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-800 block">Total Calculated Fare</span>
                <span className="text-[11px] text-slate-500 font-medium">
                  {distance > 0 ? `${distance} km × ₹${rate}/km (${activeVehicle.category})` : `Rate: ₹${rate}/km`}
                </span>
              </div>
              <span className="text-xl font-black text-blue-600">₹{totalFare}</span>
            </div>

            <button
              type="submit"
              className="w-full py-3 btn-primary text-white font-bold text-sm rounded-xl cursor-pointer shadow-md"
            >
              Confirm Reservation
            </button>
          </form>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Reservation Confirmed!</h3>
            <p className="text-xs text-slate-600">
              Thank you <strong className="text-slate-900">{renterName || 'Valued Client'}</strong>! Your booking confirmation for the <strong className="text-blue-600">{activeVehicle.name}</strong> has been processed.
            </p>

            {/* Total Fare Due Card */}
            <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-white flex items-center justify-between text-left shadow-md">
              <div>
                <span className="text-[10px] font-black uppercase text-blue-200 block">Total Fare Due</span>
                <span className="text-xs font-medium text-blue-100">Pay at destination ({destinationCity || 'Arrival'})</span>
              </div>
              <span className="text-2xl font-black text-white">₹{totalFare}</span>
            </div>

            <button
              onClick={onClose}
              className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-extrabold cursor-pointer w-full transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
