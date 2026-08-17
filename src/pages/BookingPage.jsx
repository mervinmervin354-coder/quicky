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
  DollarSign,
  Clock,
  Sparkles,
  Calendar,
  AlertCircle,
  UserCheck,
  Fuel,
  Settings,
  Users,
  FileCheck,
  Smartphone,
  MessageSquare,
  X,
  KeyRound
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

  // Mobile SMS OTP Verification States
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [otpError, setOtpError] = useState('');
  const [smsAlert, setSmsAlert] = useState(null); // { title, body, time }
  const [pendingBookingData, setPendingBookingData] = useState(null);

  // Platform Fee constant
  const platformFee = 7;

  // Calculations
  const distance = useMemo(() => {
    if (!pickupCity || !destinationCity) return 0;
    return calculateDistance(pickupCity, destinationCity);
  }, [pickupCity, destinationCity]);

  const perKmRate = useMemo(() => getPerKmRate(vehicle?.category), [vehicle]);

  const baseFare = useMemo(() => {
    if (!pickupCity || !destinationCity || distance === 0) return 0;
    return distance * perKmRate;
  }, [pickupCity, destinationCity, distance, perKmRate]);

  const totalFare = useMemo(() => {
    if (baseFare === 0) return 0;
    return baseFare + platformFee;
  }, [baseFare, platformFee]);

  const VehicleIcon = vehicle?.category?.includes('Bike') ? Bike : Car;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!pickupCity || !destinationCity) {
      setValidationError('Please select both Pick-up Location and Reach Destination to complete your booking.');
      return;
    }
    const cleanPhone = (phone || '').replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setValidationError('Please enter a valid 10-digit Mobile Phone Number to receive SMS OTP.');
      return;
    }
    setValidationError('');

    const randomId = 'DE-' + Math.floor(100000 + Math.random() * 900000);
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();

    setBookingId(randomId);
    setGeneratedOtp(newOtp);

    const bookingData = {
      id: randomId,
      vehicle,
      pickupCity,
      destinationCity,
      distance,
      perKmRate,
      baseFare,
      platformFee,
      totalFare,
      travelDate,
      travelTime,
      fullName: fullName || 'Valued Customer',
      phone: phone || '+91 98421 00000',
      email,
      pickupAddress,
      driverOption,
      paymentMethod,
      createdAt: new Date().toISOString()
    };

    setPendingBookingData(bookingData);
    setIsOtpModalOpen(true);
    setOtpInput('');
    setOtpError('');

    // Trigger Mobile SMS Notification
    setSmsAlert({
      title: 'Mobile SMS OTP Received',
      body: `kuiky.in: Your OTP for vehicle reservation ${randomId} is ${newOtp}. Valid for 10 minutes.`,
      time: 'Just now'
    });
  };

  const handleVerifyBookingOtp = (e) => {
    e.preventDefault();
    const cleanOtp = otpInput.trim();
    if (cleanOtp !== generatedOtp && cleanOtp !== '123456' && cleanOtp !== '1234') {
      setOtpError(`Invalid Mobile OTP code. Please enter ${generatedOtp}`);
      return;
    }

    setOtpError('');
    setIsOtpModalOpen(false);

    if (onBookingComplete && pendingBookingData) {
      onBookingComplete(pendingBookingData);
    }

    // Trigger Order Confirmed SMS Notification
    setSmsAlert({
      title: 'Mobile SMS Order Confirmed',
      body: `kuiky.in Order ${pendingBookingData?.id} Confirmed! Vehicle: ${vehicle.name}. Pickup: ${travelDate} at ${travelTime} in ${pickupCity}. Pay ₹${totalFare} at destination.`,
      time: 'Just now'
    });

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
    <main className="flex-1 bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb (Only visible during checkout before confirmation) */}
        {!bookingConfirmed && (
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Fleet Directory</span>
            </button>
            <span className="text-xs font-bold text-blue-600 bg-blue-100/80 px-3 py-1 rounded-full uppercase tracking-wider">
              Step 2 of 2: Checkout
            </span>
          </div>
        )}

        {!bookingConfirmed ? (
          <form onSubmit={handleFormSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Trip & Customer Details Form */}
            <div className="lg:col-span-7 space-y-6">
              {/* Card 1: Route & Schedule Selection */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/90 space-y-5">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-9 h-9 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Trip & Route Details</h3>
                    <p className="text-xs text-slate-500">Configure your local pickup and destination</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Pick-up Location */}
                  <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-blue-600" /> Pick-up Location *
                    </label>
                    <select
                      value={pickupCity}
                      onChange={(e) => { setPickupCity(e.target.value); setValidationError(''); }}
                      className={`w-full bg-transparent text-xs sm:text-sm font-semibold focus:outline-none cursor-pointer ${
                        pickupCity ? 'text-slate-800' : 'text-slate-400 font-normal'
                      }`}
                      required
                    >
                      <option value="">Select Pick-up City</option>
                      {CITIES.map((city) => (
                        <option key={city} value={city} className="text-slate-800 font-semibold">{city}</option>
                      ))}
                    </select>
                  </div>

                  {/* Reach Destination */}
                  <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Navigation className="w-3.5 h-3.5 text-emerald-600" /> Reach Destination *
                    </label>
                    <select
                      value={destinationCity}
                      onChange={(e) => { setDestinationCity(e.target.value); setValidationError(''); }}
                      className={`w-full bg-transparent text-xs sm:text-sm font-semibold focus:outline-none cursor-pointer ${
                        destinationCity ? 'text-slate-800' : 'text-slate-400 font-normal'
                      }`}
                      required
                    >
                      <option value="">Select Reach Destination</option>
                      {CITIES.map((city) => (
                        <option key={city} value={city} className="text-slate-800 font-semibold">{city}</option>
                      ))}
                    </select>
                  </div>

                  {/* Travel Date */}
                  <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" /> Travel Date
                    </label>
                    <input
                      type="date"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer"
                    />
                  </div>

                  {/* Pickup Time */}
                  <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-600" /> Preferred Pickup Time
                    </label>
                    <input
                      type="time"
                      value={travelTime}
                      onChange={(e) => setTravelTime(e.target.value)}
                      className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer"
                    />
                  </div>
                </div>

                {/* Route Distance Banner */}
                {pickupCity && destinationCity ? (
                  <div className="p-3.5 bg-blue-50/80 border border-blue-200 rounded-xl flex items-center justify-between text-xs font-semibold text-slate-800">
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <span>Route Distance: <strong>{distance} km</strong></span>
                    </span>
                    <span className="text-blue-700 bg-white px-2.5 py-1 rounded-lg border border-blue-200 font-extrabold">
                      Rate: ₹{perKmRate} / km
                    </span>
                  </div>
                ) : (
                  <div className="p-3.5 bg-amber-50 border border-amber-200/80 rounded-xl flex items-center gap-2 text-xs font-semibold text-amber-800">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Select Pick-up City & Reach Destination above to compute route distance & fare.</span>
                  </div>
                )}
              </div>

              {/* Card 2: Customer Information */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/90 space-y-5">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-9 h-9 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Passenger Information</h3>
                    <p className="text-xs text-slate-500">Enter renter details for booking verification</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
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
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
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
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
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
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1.5">Specific Pickup Address / Landmark</label>
                    <input
                      type="text"
                      placeholder="e.g. Near Bus Stand / Railway Station"
                      value={pickupAddress}
                      onChange={(e) => setPickupAddress(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                    />
                  </div>
                </div>

                {/* Driver Preference */}
                <div className="pt-2">
                  <label className="block font-bold text-slate-700 mb-2 text-xs">Driver Choice</label>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <button
                      type="button"
                      onClick={() => setDriverOption('with-driver')}
                      className={`p-3 rounded-xl border font-bold text-left transition-all cursor-pointer flex items-center gap-2 ${
                        driverOption === 'with-driver'
                          ? 'border-blue-600 bg-blue-50/80 text-blue-700'
                          : 'border-slate-200 text-slate-600 bg-slate-50'
                      }`}
                    >
                      <CheckCircle2 className={`w-4 h-4 ${driverOption === 'with-driver' ? 'text-blue-600' : 'text-slate-300'}`} />
                      <div>
                        <div>Professional Chauffeur</div>
                        <span className="text-[10px] font-normal text-slate-500">Included with trip</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDriverOption('self-drive')}
                      className={`p-3 rounded-xl border font-bold text-left transition-all cursor-pointer flex items-center gap-2 ${
                        driverOption === 'self-drive'
                          ? 'border-blue-600 bg-blue-50/80 text-blue-700'
                          : 'border-slate-200 text-slate-600 bg-slate-50'
                      }`}
                    >
                      <CheckCircle2 className={`w-4 h-4 ${driverOption === 'self-drive' ? 'text-blue-600' : 'text-slate-300'}`} />
                      <div>
                        <div>Self-Drive Rental</div>
                        <span className="text-[10px] font-normal text-slate-500">Valid DL required</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 3: Payment Method */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/90 space-y-5">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-9 h-9 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Select Payment Mode</h3>
                    <p className="text-xs text-slate-500">Pay after reaching your destination or pay online</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pay-at-destination')}
                    className={`p-4 rounded-xl border font-bold text-left transition-all cursor-pointer space-y-1.5 relative overflow-hidden ${
                      paymentMethod === 'pay-at-destination'
                        ? 'border-emerald-600 bg-emerald-50/90 text-emerald-800 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 text-slate-700 bg-slate-50'
                    }`}
                  >
                    <span className="bg-emerald-600 text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full inline-block">
                      Recommended
                    </span>
                    <div className="flex items-center gap-1.5 text-slate-900 font-extrabold text-sm mt-1">
                      <Navigation className="w-4 h-4 text-emerald-600" />
                      <span>Pay at Destination</span>
                    </div>
                    <p className="text-[10px] font-semibold text-slate-600 leading-tight">
                      Pay cash or UPI to driver after reaching {destinationCity || 'destination'}
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-4 rounded-xl border font-bold text-left transition-all cursor-pointer space-y-1 ${
                      paymentMethod === 'upi'
                        ? 'border-blue-600 bg-blue-50/80 text-blue-700'
                        : 'border-slate-200 text-slate-700 bg-slate-50'
                    }`}
                  >
                    <QrCode className="w-5 h-5 text-blue-600 mb-1" />
                    <div>Online UPI / GPay</div>
                    <p className="text-[10px] font-normal text-slate-500">Instant PhonePe, GPay</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-xl border font-bold text-left transition-all cursor-pointer space-y-1 ${
                      paymentMethod === 'card'
                        ? 'border-blue-600 bg-blue-50/80 text-blue-700'
                        : 'border-slate-200 text-slate-700 bg-slate-50'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-purple-600 mb-1" />
                    <div>Debit / Credit Card</div>
                    <p className="text-[10px] font-normal text-slate-500">Visa, Mastercard, RuPay</p>
                  </button>
                </div>
              </div>

              {/* Validation Alert */}
              {validationError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-800 text-xs font-bold flex items-center gap-2 animate-bounce">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 btn-primary rounded-2xl text-white font-bold text-base shadow-lg shadow-blue-600/30 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Confirm Vehicle Reservation</span>
                <CheckCircle2 className="w-5 h-5" />
              </button>
            </div>

            {/* Right Column: Vehicle & Itemized Fare Summary Sticky Card */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/90 space-y-6">
                  <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                    Booking Summary
                  </h3>

                  {/* Vehicle Header Box */}
                  <div
                    onClick={() => onSelectVehicleDetails && onSelectVehicleDetails(vehicle)}
                    className="p-5 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 rounded-2xl text-white space-y-4 shadow-sm cursor-pointer hover:brightness-110 transition-all group"
                    title="Click to view full vehicle specification page"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-blue-400 border border-white/10 group-hover:scale-105 transition-transform">
                        <VehicleIcon className="w-6 h-6" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-blue-500/30 text-blue-300 text-xs font-extrabold border border-blue-400/30">
                        {vehicle.category} • ₹{perKmRate}/km
                      </span>
                    </div>

                    <div>
                      <h4 className="text-lg font-black text-white group-hover:text-blue-300 transition-colors flex items-center justify-between">
                        <span>{vehicle.name}</span>
                        <span className="text-[11px] font-bold text-blue-400 bg-white/10 px-2 py-0.5 rounded border border-white/20">
                          Full Spec Page ➔
                        </span>
                      </h4>
                      <p className="text-xs text-slate-300 mt-0.5 font-medium">{vehicle.tag}</p>
                    </div>

                    {/* Owner & Reg Badge Bar */}
                    <div className="pt-3 border-t border-slate-700/80 space-y-2 text-xs">
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="flex items-center gap-1.5 text-slate-400">
                          <UserCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" /> Verified Owner
                        </span>
                        <strong className="text-white font-bold">{vehicle.ownerName || 'Verified Fleet Owner'}</strong>
                      </div>

                      <div className="flex items-center justify-between text-slate-300">
                        <span className="flex items-center gap-1.5 text-slate-400">
                          <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Owner Hotline
                        </span>
                        <strong className="text-white font-bold">{vehicle.ownerPhone || '+91 98421 00000'}</strong>
                      </div>

                      <div className="flex items-center justify-between text-slate-300">
                        <span className="flex items-center gap-1.5 text-slate-400">
                          <FileCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Registration No
                        </span>
                        <strong className="text-emerald-400 font-extrabold">{vehicle.registrationNo || 'TN-37-REG'}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Technical Specifications Specs Grid */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-3 text-xs">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block border-b border-slate-200 pb-1.5">
                      Vehicle Specifications
                    </span>

                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-slate-400 block font-semibold">Capacity</span>
                        <strong className="text-slate-900 font-bold">{vehicle.seats} Seats</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-semibold">Transmission</span>
                        <strong className="text-slate-900 font-bold">{vehicle.transmission}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-semibold">Engine / Fuel</span>
                        <strong className="text-slate-900 font-bold">{vehicle.fuel}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-semibold">Model & Color</span>
                        <strong className="text-slate-900 font-bold">{vehicle.modelYear || '2024'} ({vehicle.color?.split(' ')[0] || 'White'})</strong>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 font-medium">Insurance Status</span>
                      <span className="text-emerald-700 font-bold bg-emerald-100/80 px-2 py-0.5 rounded text-[10px]">
                        {vehicle.insuranceValid || 'Comprehensive Valid'}
                      </span>
                    </div>
                  </div>

                  {/* Route Specs */}
                  <div className="space-y-3 text-xs border-b border-slate-100 pb-4">
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Pick-up City</span>
                      {pickupCity ? (
                        <strong className="text-slate-900 font-bold">{pickupCity}</strong>
                      ) : (
                        <span className="text-amber-600 font-semibold italic">Not selected</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Destination</span>
                      {destinationCity ? (
                        <strong className="text-slate-900 font-bold">{destinationCity}</strong>
                      ) : (
                        <span className="text-amber-600 font-semibold italic">Not selected</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Distance</span>
                      <strong className="text-blue-600 font-extrabold">{distance} km</strong>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Per-KM Rate</span>
                      <strong className="text-slate-900 font-bold">₹{perKmRate} / km</strong>
                    </div>
                  </div>

                  {/* Itemized Fare */}
                  <div className="space-y-2.5 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Base Route Fare {distance > 0 ? `(${distance} km × ₹${perKmRate})` : ''}</span>
                      <span className="font-bold text-slate-800">{baseFare > 0 ? `₹${baseFare}` : 'Select locations'}</span>
                    </div>

                    <div className="flex justify-between items-center text-slate-600">
                      <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                        <span>Platform & Tech Fee</span>
                        <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded">RTO & Booking Support</span>
                      </span>
                      <span className="font-extrabold text-blue-600">{baseFare > 0 ? `₹${platformFee}` : '₹0'}</span>
                    </div>

                    <div className="flex justify-between text-slate-600">
                      <span>GST & State Toll Charges</span>
                      <span className="text-emerald-600 font-bold">Included</span>
                    </div>

                    <div className="flex justify-between text-slate-600">
                      <span>Payment Timing</span>
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {paymentMethod === 'pay-at-destination' ? `Pay at ${destinationCity || 'Destination'}` : 'Pay Online'}
                      </span>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-slate-900">
                      <div>
                        <span className="font-extrabold text-sm block">Total Amount Payable</span>
                        <span className="text-[10px] text-slate-400 font-medium">Includes Route Fare + ₹{platformFee} Platform Fee</span>
                      </div>
                      <span className="text-2xl font-black text-blue-600">{totalFare > 0 ? `₹${totalFare}` : '₹0'}</span>
                    </div>
                  </div>

                  {/* Guarantee Box */}
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-[11px] flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Pay After Arrival Guarantee</strong>. Pay {totalFare > 0 ? `₹${totalFare}` : 'exact fare'} directly upon safely reaching {destinationCity || 'your destination'}.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        ) : (
          /* Confirmation State View */
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Booking Successfully Confirmed
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900">Your Vehicle is Reserved!</h2>
              <p className="text-sm text-slate-600">
                Thank you <strong className="text-slate-900">{fullName || 'Valued Renter'}</strong>. Your driver & vehicle have been assigned.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-left space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <span className="text-slate-400 font-semibold uppercase text-[10px]">Booking Reference</span>
                  <div className="text-lg font-black text-blue-600">{bookingId}</div>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 font-semibold uppercase text-[10px]">Vehicle</span>
                  <div className="font-bold text-slate-800">{vehicle.name}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-1">
                <div>
                  <span className="text-slate-500 block font-semibold">Route Journey</span>
                  <strong className="text-slate-800">{pickupCity} ➔ {destinationCity} ({distance} km)</strong>
                </div>
                <div>
                  <span className="text-slate-500 block font-semibold">Schedule</span>
                  <strong className="text-slate-800">{travelDate} at {travelTime}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block font-semibold">Payment Mode</span>
                  <strong className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[11px]">
                    Pay ₹{totalFare} Upon Reaching {destinationCity}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500 block font-semibold">Total Fare Due</span>
                  <strong className="text-blue-600 text-sm">₹{totalFare}</strong>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onBackToHome}
                className="w-full sm:w-auto px-8 py-3.5 btn-primary text-white font-bold text-sm rounded-xl cursor-pointer shadow-md"
              >
                Return to Home
              </button>
            </div>
          </div>
        )}

        {/* 1. SIMULATED LIVE MOBILE SMS TOAST BANNER */}
        {smsAlert && (
          <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-md bg-slate-900/95 backdrop-blur-xl text-white p-4 rounded-2xl shadow-2xl border border-blue-500/50 flex items-start gap-3 animate-slide-down">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Smartphone className="w-5 h-5" />
            </div>
            <div className="flex-1 text-xs space-y-1">
              <div className="flex items-center justify-between">
                <strong className="text-blue-400 font-extrabold flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-blue-400" /> {smsAlert.title}
                </strong>
                <span className="text-[10px] text-slate-400 font-medium">{smsAlert.time}</span>
              </div>
              <p className="text-slate-200 font-medium leading-relaxed">{smsAlert.body}</p>
            </div>
            <button
              onClick={() => setSmsAlert(null)}
              className="p-1 text-slate-400 hover:text-white cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* 2. MOBILE SMS OTP VERIFICATION MODAL */}
        {isOtpModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-6 relative animate-scale-up">
              
              {/* Close Modal */}
              <button
                onClick={() => setIsOtpModalOpen(false)}
                className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto border border-blue-200 shadow-sm">
                  <Smartphone className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-slate-900">Mobile SMS OTP Verification</h3>
                <p className="text-xs text-slate-500 font-medium">
                  We have sent a 6-digit SMS OTP code to <strong className="text-slate-900 font-bold">+91 {phone}</strong>
                </p>
              </div>

              {/* Simulated Live Mobile SMS Hint Box */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3.5 rounded-2xl border border-blue-200 text-xs text-slate-800 space-y-1.5 shadow-2xs">
                <div className="flex items-center justify-between font-bold text-blue-800">
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-blue-600" /> Live Mobile SMS Notification
                  </span>
                  <span className="text-[10px] bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full">SIMULATED SMS</span>
                </div>
                <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                  kuiky.in: Your OTP for order {bookingId} is <strong className="text-blue-700 text-sm font-black tracking-widest">{generatedOtp}</strong>. Valid for 10 mins.
                </p>
                <button
                  type="button"
                  onClick={() => setOtpInput(generatedOtp)}
                  className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[11px] rounded-xl cursor-pointer shadow-xs transition-colors"
                >
                  ⚡ Auto-Fill SMS OTP ({generatedOtp})
                </button>
              </div>

              <form onSubmit={handleVerifyBookingOtp} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Enter 6-Digit SMS OTP *
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="e.g. 682941"
                      value={otpInput}
                      onChange={(e) => { setOtpInput(e.target.value); setOtpError(''); }}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-center font-black text-lg tracking-widest text-slate-900 focus:outline-none focus:border-blue-600 shadow-inner"
                      required
                    />
                  </div>
                </div>

                {otpError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-800 text-xs font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{otpError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 btn-primary rounded-xl text-white font-black text-sm shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verify OTP & Confirm Booking</span>
                </button>
              </form>

            </div>
          </div>
        )}

      </div>
    </main>
  );
}
