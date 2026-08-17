import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Navigation,
  CheckCircle2,
  Car,
  Bike,
  ShieldCheck,
  ChevronLeft,
  User,
  Phone,
  Mail,
  CreditCard,
  QrCode,
  Clock,
  Sparkles,
  Calendar,
  AlertCircle,
  UserCheck,
  Fuel,
  Settings,
  Users,
  FileCheck
} from 'lucide-react';
import { CITIES, calculateDistance, getPerKmRate } from '../data/fleetData';

export default function BookingPage({ vehicle, initialPickup = '', initialDestination = '', currentUser, onBookingComplete, onSelectVehicleDetails, onBackToHome }) {
  const [pickupCity, setPickupCity] = useState(initialPickup || '');
  const [destinationCity, setDestinationCity] = useState(initialDestination || '');
  const [travelDate, setTravelDate] = useState(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  });
  const [travelTime, setTravelTime] = useState('09:00');

  // Customer form details
  const [fullName, setFullName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [pickupAddress, setPickupAddress] = useState('');
  const [driverOption, setDriverOption] = useState('with-driver'); // 'with-driver' or 'self-drive'
  const [paymentMethod, setPaymentMethod] = useState('pay-at-destination'); // 'pay-at-destination', 'upi', 'card'

  // Booking completion state & validation
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [validationError, setValidationError] = useState('');

  // Calculations
  const distance = useMemo(() => {
    if (!pickupCity || !destinationCity) return 0;
    return calculateDistance(pickupCity, destinationCity);
  }, [pickupCity, destinationCity]);

  const perKmRate = useMemo(() => getPerKmRate(vehicle?.category), [vehicle]);
  const totalFare = useMemo(() => {
    if (!pickupCity || !destinationCity || distance === 0) return 0;
    return distance * perKmRate;
  }, [pickupCity, destinationCity, distance, perKmRate]);

  const VehicleIcon = vehicle?.category?.includes('Bike') ? Bike : Car;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!pickupCity || !destinationCity) {
      setValidationError('Please select both Pick-up Location and Reach Destination to complete your booking.');
      return;
    }
    setValidationError('');
    const randomId = 'DE-' + Math.floor(100000 + Math.random() * 900000);
    setBookingId(randomId);

    const newBookingObj = {
      id: randomId,
      vehicle,
      pickupCity,
      destinationCity,
      distance,
      perKmRate,
      totalFare,
      travelDate,
      travelTime,
      fullName,
      phone,
      email,
      pickupAddress,
      driverOption,
      paymentMethod,
      createdAt: new Date().toISOString()
    };

    if (onBookingComplete) onBookingComplete(newBookingObj);

    setBookingConfirmed(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!vehicle) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">No Vehicle Selected</h2>
        <p className="text-slate-600 text-sm">Please select a vehicle from our fleet catalog to proceed with your booking.</p>
        <button
          onClick={onBackToHome}
          className="btn-primary px-6 py-2.5 rounded-xl text-white font-bold text-sm"
        >
          Browse Vehicles
        </button>
      </div>
    );
  }

  return (
    <main className="flex-1 bg-slate-50 py-10 w-full min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-6 mb-8">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Fleet Directory</span>
          </button>
          
          <div className="flex items-center gap-3">
            <span className="text-xs font-black text-blue-700 bg-blue-100 px-3.5 py-1.5 rounded-full border border-blue-200">
              Instant Reservation & Checkout
            </span>
          </div>
        </div>

        {!bookingConfirmed ? (
          <form onSubmit={handleFormSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Full Page Open Form Sections (No Box Cards) */}
            <div className="lg:col-span-7 space-y-10">
              
              {/* Section 1: Route & Schedule Selection */}
              <div className="space-y-6 border-b border-slate-200/90 pb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm shadow-md">
                    1
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">Trip & Route Specifications</h2>
                    <p className="text-xs text-slate-500 font-medium">Choose your pickup location and reach destination</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Pick-up Location */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-blue-600" /> Pick-up Location *
                    </label>
                    <select
                      value={pickupCity}
                      onChange={(e) => { setPickupCity(e.target.value); setValidationError(''); }}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-blue-600 cursor-pointer shadow-xs"
                      required
                    >
                      <option value="">Select Pick-up City</option>
                      {CITIES.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>

                  {/* Reach Destination */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Navigation className="w-4 h-4 text-emerald-600" /> Reach Destination *
                    </label>
                    <select
                      value={destinationCity}
                      onChange={(e) => { setDestinationCity(e.target.value); setValidationError(''); }}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-blue-600 cursor-pointer shadow-xs"
                      required
                    >
                      <option value="">Select Reach Destination</option>
                      {CITIES.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>

                  {/* Travel Date */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-blue-600" /> Travel Date
                    </label>
                    <input
                      type="date"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-blue-600 cursor-pointer shadow-xs"
                    />
                  </div>

                  {/* Pickup Time */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-blue-600" /> Preferred Pickup Time
                    </label>
                    <input
                      type="time"
                      value={travelTime}
                      onChange={(e) => setTravelTime(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-blue-600 cursor-pointer shadow-xs"
                    />
                  </div>
                </div>

                {/* Route Distance Indicator */}
                {pickupCity && destinationCity ? (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-between text-xs font-bold text-slate-800 shadow-xs">
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <span>Route Distance: <strong className="text-blue-700 font-black text-sm">{distance} km</strong></span>
                    </span>
                    <span className="text-blue-800 bg-white px-3 py-1 rounded-xl border border-blue-200 font-black">
                      Rate: ₹{perKmRate} / km
                    </span>
                  </div>
                ) : (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-2 text-xs font-bold text-amber-800">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Select both Pick-up City & Reach Destination to calculate your per-KM fare.</span>
                  </div>
                )}
              </div>

              {/* Section 2: Customer Details */}
              <div className="space-y-6 border-b border-slate-200/90 pb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm shadow-md">
                    2
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">Passenger & Contact Details</h2>
                    <p className="text-xs text-slate-500 font-medium">Verify your contact details for ride pickup</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-blue-600" /> Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-blue-600 shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-blue-600" /> Mobile / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-blue-600 shadow-xs"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-blue-600" /> Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="ramesh@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-blue-600 shadow-xs"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1.5">Specific Pickup Address / Landmark</label>
                    <input
                      type="text"
                      placeholder="e.g. Near Bus Stand / Railway Station"
                      value={pickupAddress}
                      onChange={(e) => setPickupAddress(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-blue-600 shadow-xs"
                    />
                  </div>
                </div>

                {/* Driver Option Choice */}
                <div className="pt-2">
                  <label className="block font-bold text-slate-700 mb-2 text-xs">Driver Choice</label>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <button
                      type="button"
                      onClick={() => setDriverOption('with-driver')}
                      className={`p-4 rounded-xl border font-bold text-left transition-all cursor-pointer flex items-center gap-3 ${
                        driverOption === 'with-driver'
                          ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm'
                          : 'border-slate-300 text-slate-600 bg-white'
                      }`}
                    >
                      <CheckCircle2 className={`w-5 h-5 ${driverOption === 'with-driver' ? 'text-blue-600' : 'text-slate-300'}`} />
                      <div>
                        <div className="font-black text-sm">Professional Chauffeur</div>
                        <span className="text-[11px] font-medium text-slate-500">Included with trip</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDriverOption('self-drive')}
                      className={`p-4 rounded-xl border font-bold text-left transition-all cursor-pointer flex items-center gap-3 ${
                        driverOption === 'self-drive'
                          ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm'
                          : 'border-slate-300 text-slate-600 bg-white'
                      }`}
                    >
                      <CheckCircle2 className={`w-5 h-5 ${driverOption === 'self-drive' ? 'text-blue-600' : 'text-slate-300'}`} />
                      <div>
                        <div className="font-black text-sm">Self-Drive Rental</div>
                        <span className="text-[11px] font-medium text-slate-500">Valid DL required</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Section 3: Payment Options */}
              <div className="space-y-6 border-b border-slate-200/90 pb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm shadow-md">
                    3
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">Payment Preference</h2>
                    <p className="text-xs text-slate-500 font-medium">Pay after reaching destination or online</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pay-at-destination')}
                    className={`p-4 rounded-2xl border font-bold text-left transition-all cursor-pointer space-y-2 ${
                      paymentMethod === 'pay-at-destination'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20 shadow-sm'
                        : 'border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <span className="bg-emerald-600 text-white text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full inline-block">
                      Recommended
                    </span>
                    <div className="flex items-center gap-1.5 text-slate-900 font-black text-base">
                      <Navigation className="w-4 h-4 text-emerald-600" />
                      <span>Pay at Destination</span>
                    </div>
                    <p className="text-[11px] font-medium text-slate-600 leading-snug">
                      Pay cash or UPI directly to owner after reaching {destinationCity || 'destination'}
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-4 rounded-2xl border font-bold text-left transition-all cursor-pointer space-y-1.5 ${
                      paymentMethod === 'upi'
                        ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm'
                        : 'border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <QrCode className="w-5 h-5 text-blue-600" />
                    <div className="font-black text-sm text-slate-900">Online UPI</div>
                    <p className="text-[11px] font-medium text-slate-500">GPay, PhonePe, Paytm</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-2xl border font-bold text-left transition-all cursor-pointer space-y-1.5 ${
                      paymentMethod === 'card'
                        ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm'
                        : 'border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-purple-600" />
                    <div className="font-black text-sm text-slate-900">Credit / Debit Card</div>
                    <p className="text-[11px] font-medium text-slate-500">Visa, Mastercard</p>
                  </button>
                </div>
              </div>

              {/* Validation Alert */}
              {validationError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-800 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              {/* Submit CTA Button */}
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-2xl text-white font-black text-base shadow-xl shadow-blue-600/30 cursor-pointer flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <span>Confirm Vehicle Reservation</span>
                <CheckCircle2 className="w-5 h-5" />
              </button>
            </div>

            {/* Right Column: Full Page Open Summary Sidebar */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-6">
                <div className="border-b border-slate-200 pb-3">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">
                    Vehicle & Fare Summary
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">Selected vehicle specifications & itemized calculation</p>
                </div>

                {/* Vehicle Showcase Box */}
                <div
                  onClick={() => onSelectVehicleDetails && onSelectVehicleDetails(vehicle)}
                  className="p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 rounded-3xl text-white space-y-4 shadow-xl cursor-pointer hover:brightness-110 transition-all group"
                  title="Click to view full vehicle specification page"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-blue-400 border border-white/10 group-hover:scale-105 transition-transform">
                      <VehicleIcon className="w-7 h-7" />
                    </div>
                    <span className="px-3.5 py-1 rounded-full bg-blue-500/30 text-blue-300 text-xs font-black border border-blue-400/30">
                      {vehicle.category} • ₹{perKmRate}/km
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xl font-black text-white group-hover:text-blue-300 transition-colors flex items-center justify-between">
                      <span>{vehicle.name}</span>
                      <span className="text-xs font-bold text-blue-300 bg-white/10 px-2.5 py-1 rounded-lg border border-white/20">
                        View Specs ➔
                      </span>
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 font-medium">{vehicle.tag}</p>
                  </div>

                  {/* Owner & Reg Badges */}
                  <div className="pt-4 border-t border-slate-700/80 space-y-2.5 text-xs">
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="flex items-center gap-1.5 text-slate-400 font-medium">
                        <UserCheck className="w-4 h-4 text-blue-400 shrink-0" /> Verified Partner:
                      </span>
                      <strong className="text-white font-black">{vehicle.ownerName || 'Verified Fleet Owner'}</strong>
                    </div>

                    <div className="flex items-center justify-between text-slate-300">
                      <span className="flex items-center gap-1.5 text-slate-400 font-medium">
                        <Phone className="w-4 h-4 text-emerald-400 shrink-0" /> Owner Hotline:
                      </span>
                      <strong className="text-white font-black">{vehicle.ownerPhone || '+91 98421 00000'}</strong>
                    </div>

                    <div className="flex items-center justify-between text-slate-300">
                      <span className="flex items-center gap-1.5 text-slate-400 font-medium">
                        <FileCheck className="w-4 h-4 text-amber-400 shrink-0" /> Registration No:
                      </span>
                      <strong className="text-emerald-400 font-black">{vehicle.registrationNo || 'TN-37-REG'}</strong>
                    </div>
                  </div>
                </div>

                {/* Technical Specs Open Grid */}
                <div className="space-y-3 text-xs border-b border-slate-200 pb-6">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">
                    Technical Specifications
                  </span>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <span className="text-slate-400 block font-bold text-[10px]">Capacity</span>
                      <strong className="text-slate-900 font-black text-sm">{vehicle.seats} Seats</strong>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <span className="text-slate-400 block font-bold text-[10px]">Transmission</span>
                      <strong className="text-slate-900 font-black text-sm">{vehicle.transmission}</strong>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <span className="text-slate-400 block font-bold text-[10px]">Engine / Fuel</span>
                      <strong className="text-slate-900 font-black text-sm">{vehicle.fuel}</strong>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <span className="text-slate-400 block font-bold text-[10px]">Model & Color</span>
                      <strong className="text-slate-900 font-black text-sm">{vehicle.modelYear || '2024'} ({vehicle.color?.split(' ')[0] || 'White'})</strong>
                    </div>
                  </div>
                </div>

                {/* Itemized Fare Calculation */}
                <div className="space-y-3 text-xs border-b border-slate-200 pb-6">
                  <div className="flex justify-between text-slate-600 font-medium">
                    <span>Base Route Fare {distance > 0 ? `(${distance} km × ₹${perKmRate})` : ''}</span>
                    <span className="font-black text-slate-900 text-sm">{totalFare > 0 ? `₹${totalFare}` : 'Select locations'}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 font-medium">
                    <span>GST & State Toll Charges</span>
                    <span className="text-emerald-600 font-bold">Included</span>
                  </div>
                  <div className="flex justify-between text-slate-600 font-medium">
                    <span>Payment Timing</span>
                    <span className="text-emerald-800 font-bold bg-emerald-100 px-2.5 py-0.5 rounded border border-emerald-200">
                      {paymentMethod === 'pay-at-destination' ? `Pay at ${destinationCity || 'Destination'}` : 'Pay Online'}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-slate-900">
                    <span className="font-black text-base">Total Amount Payable</span>
                    <span className="text-3xl font-black text-blue-600">{totalFare > 0 ? `₹${totalFare}` : '₹0'}</span>
                  </div>
                </div>

                {/* Pay After Arrival Guarantee */}
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 text-xs flex items-start gap-3 shadow-xs">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-black">Pay After Arrival Guarantee</strong>. Pay {totalFare > 0 ? `₹${totalFare}` : 'exact fare'} directly upon safely reaching {destinationCity || 'your destination'}.
                  </div>
                </div>
              </div>
            </div>
          </form>
        ) : (
          /* Confirmation State View */
          <div className="max-w-3xl mx-auto py-12 text-center space-y-8 animate-fade-in">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg border border-emerald-200">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="space-y-3">
              <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-4 py-1.5 rounded-full border border-emerald-200 uppercase tracking-widest">
                Booking Successfully Confirmed
              </span>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">Your Vehicle is Reserved!</h1>
              <p className="text-base text-slate-600 font-medium max-w-xl mx-auto">
                Thank you <strong className="text-slate-900">{fullName || 'Valued Renter'}</strong>. Your driver & vehicle have been assigned for trip pickup.
              </p>
            </div>

            {/* Receipt Summary Open View */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/90 text-left space-y-6 text-xs shadow-md max-w-2xl mx-auto">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider block">Booking Reference ID</span>
                  <div className="text-2xl font-black text-blue-600">{bookingId}</div>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider block">Vehicle</span>
                  <div className="text-lg font-black text-slate-900">{vehicle.name}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-1">
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px] block mb-1">Route Journey</span>
                  <strong className="text-slate-900 text-sm font-bold block">{pickupCity} ➔ {destinationCity}</strong>
                  <span className="text-blue-600 font-bold">{distance} km route</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px] block mb-1">Schedule</span>
                  <strong className="text-slate-900 text-sm font-bold block">{travelDate}</strong>
                  <span className="text-slate-500 font-semibold">Pickup at {travelTime}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px] block mb-1">Payment Mode</span>
                  <strong className="text-emerald-700 bg-emerald-100 px-3 py-1 rounded-lg border border-emerald-200 text-xs font-bold inline-block">
                    Pay ₹{totalFare} Upon Reaching {destinationCity}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px] block mb-1">Total Fare Due</span>
                  <strong className="text-blue-600 text-xl font-black">₹{totalFare}</strong>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-center">
              <button
                onClick={onBackToHome}
                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-sm rounded-2xl shadow-xl shadow-blue-600/30 cursor-pointer hover:scale-105 transition-all"
              >
                Return to Home Page
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
