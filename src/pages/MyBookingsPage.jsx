import React, { useState } from 'react';
import {
  Car,
  Bike,
  Calendar,
  Clock,
  MapPin,
  Navigation,
  CheckCircle2,
  ChevronLeft,
  User,
  Phone,
  FileText,
  ShieldCheck,
  Users,
  Fuel,
  Settings,
  Sparkles,
  Info
} from 'lucide-react';
import VehicleDetailsModal from '../components/VehicleDetailsModal';

export default function MyBookingsPage({ bookings = [], currentUser, onSelectVehicleDetails, onBackToHome, onBookNewVehicle }) {
  const [selectedVehicleDetails, setSelectedVehicleDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="flex-1 bg-slate-50 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <button
            onClick={onBookNewVehicle}
            className="btn-primary px-4 py-2 rounded-xl text-white font-bold text-xs shadow-sm cursor-pointer"
          >
            + Book New Vehicle
          </button>
        </div>

        {/* Page Title */}
        <div className="mb-8 space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Vehicle Reservations
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            View active bookings, full vehicle & owner information, and pay-at-destination receipts for {currentUser?.name || 'Customer'}.
          </p>
        </div>

        {/* Bookings List */}
        {bookings.length > 0 ? (
          <div className="space-y-6">
            {bookings.map((booking, index) => {
              const VehicleIcon = booking.vehicle?.category?.includes('Bike') ? Bike : Car;

              return (
                <div
                  key={booking.id || index}
                  className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/90 space-y-6 hover:shadow-md transition-all"
                >
                  {/* Top Bar: Booking Ref ID & Reserved Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <span className="text-slate-400 uppercase text-[10px] font-bold tracking-wider block">Booking Reference ID</span>
                      <span className="text-base font-black text-blue-600">{booking.id}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-bold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Vehicle Reserved</span>
                      </span>
                    </div>
                  </div>

                  {/* Vehicle Information Box (Single Display of Vehicle Name & Specs) */}
                  <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white rounded-2xl p-5 space-y-4 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/80 pb-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-400/30">
                          <VehicleIcon className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-lg font-black text-white">{booking.vehicle?.name}</h4>
                            <span className="text-[10px] font-bold text-blue-300 bg-blue-500/30 px-2.5 py-0.5 rounded-full border border-blue-400/30">
                              {booking.vehicle?.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 mt-0.5 font-medium">
                            Owner: <strong className="text-white">{booking.vehicle?.ownerName || 'RTO Verified Partner'}</strong> ({booking.vehicle?.ownerPhone || '+91 98421 00000'})
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          if (onSelectVehicleDetails && booking.vehicle) {
                            onSelectVehicleDetails(booking.vehicle);
                          } else {
                            setSelectedVehicleDetails(booking.vehicle);
                            setIsModalOpen(true);
                          }
                        }}
                        className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                      >
                        <Info className="w-4 h-4" />
                        <span>View Full Specification Page ➔</span>
                      </button>
                    </div>

                    {/* Vehicle Specifications Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-300">
                      <div className="bg-white/5 p-2.5 rounded-xl border border-white/10 flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-400 shrink-0" />
                        <div>
                          <span className="text-[10px] text-slate-400 block font-semibold">Capacity</span>
                          <strong className="text-white font-bold">{booking.vehicle?.seats} Persons</strong>
                        </div>
                      </div>

                      <div className="bg-white/5 p-2.5 rounded-xl border border-white/10 flex items-center gap-2">
                        <Fuel className="w-4 h-4 text-emerald-400 shrink-0" />
                        <div>
                          <span className="text-[10px] text-slate-400 block font-semibold">Engine / Fuel</span>
                          <strong className="text-white font-bold">{booking.vehicle?.fuel}</strong>
                        </div>
                      </div>

                      <div className="bg-white/5 p-2.5 rounded-xl border border-white/10 flex items-center gap-2">
                        <Settings className="w-4 h-4 text-purple-400 shrink-0" />
                        <div>
                          <span className="text-[10px] text-slate-400 block font-semibold">Transmission</span>
                          <strong className="text-white font-bold">{booking.vehicle?.transmission}</strong>
                        </div>
                      </div>

                      <div className="bg-white/5 p-2.5 rounded-xl border border-white/10 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                        <div>
                          <span className="text-[10px] text-slate-400 block font-semibold">Reg No</span>
                          <strong className="text-emerald-400 font-bold">{booking.vehicle?.registrationNo || 'TN-37-REG'}</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Route & Schedule Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-xs">
                    <div>
                      <span className="text-slate-400 font-bold uppercase text-[10px] block mb-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-blue-600" /> Pick-up Location
                      </span>
                      <strong className="text-slate-900 text-sm font-bold block">{booking.pickupCity}</strong>
                      <span className="text-slate-500 text-[11px]">{booking.pickupAddress || 'Central Pickup Point'}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 font-bold uppercase text-[10px] block mb-1 flex items-center gap-1">
                        <Navigation className="w-3 h-3 text-emerald-600" /> Reach Destination
                      </span>
                      <strong className="text-slate-900 text-sm font-bold block">{booking.destinationCity}</strong>
                      <span className="text-blue-600 text-[11px] font-bold">{booking.distance} km route</span>
                    </div>

                    <div>
                      <span className="text-slate-400 font-bold uppercase text-[10px] block mb-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-blue-600" /> Date & Time
                      </span>
                      <strong className="text-slate-900 text-sm font-bold block">{booking.travelDate}</strong>
                      <span className="text-slate-600 text-[11px] font-semibold flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-slate-400" /> Pickup at {booking.travelTime}
                      </span>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
                    <div className="space-y-1.5">
                      <span className="text-slate-400 font-bold uppercase text-[10px] block">Renter Information</span>
                      <div className="flex items-center gap-1.5 text-slate-800 font-medium">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>{booking.fullName}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-800 font-medium">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>{booking.phone}</span>
                      </div>
                      <div className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded inline-block border border-blue-200">
                        {booking.driverOption === 'with-driver' ? 'Includes Professional Chauffeur' : 'Self-Drive Rental'}
                      </div>
                    </div>

                    <div className="space-y-1.5 sm:text-right">
                      <span className="text-slate-400 font-bold uppercase text-[10px] block">Payment Summary</span>
                      <div className="text-2xl font-black text-blue-600">₹{booking.totalFare}</div>
                      <div className="inline-block bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg border border-emerald-200 text-[11px] font-bold">
                        Pay ₹{booking.totalFare} upon reaching {booking.destinationCity}
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <span>100% Fixed Fare • No Surge Pricing</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => alert(`Receipt downloaded for Booking ${booking.id}`)}
                        className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <FileText className="w-3.5 h-3.5 text-slate-500" />
                        <span>Download Receipt</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-slate-200 space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
              <Car className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">No Active Vehicle Bookings</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              You haven't made any vehicle reservations yet. Choose from our 2-wheelers, 3-wheeler autos, or 4-wheeler cars for local travel.
            </p>
            <button
              onClick={onBookNewVehicle}
              className="btn-primary px-6 py-2.5 rounded-xl text-white font-bold text-xs shadow-md cursor-pointer inline-block"
            >
              Browse Available Vehicles
            </button>
          </div>
        )}
      </div>

      <VehicleDetailsModal
        vehicle={selectedVehicleDetails}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}
