import React, { useState, useMemo, useEffect } from 'react';
import {
  MapPin,
  Navigation,
  Search,
  Star,
  Users,
  Fuel,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Car,
  Bike,
  Truck,
  Clock,
  ArrowRight,
  DollarSign,
  ThumbsUp
} from 'lucide-react';
import { FLEET_DATA, CATEGORIES, CITIES, calculateDistance } from '../data/fleetData';
import ReservationModal from '../components/ReservationModal';
import VehicleDetailsModal from '../components/VehicleDetailsModal';

export default function Home({ onSelectVehicleForBooking, onSelectVehicleDetails, onNavigateToLogin }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [pickupCity, setPickupCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [activeVehicle, setActiveVehicle] = useState(null);

  // Vehicle Details Modal State
  const [detailsVehicle, setDetailsVehicle] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const routeDistance = useMemo(() => calculateDistance(pickupCity, destinationCity), [pickupCity, destinationCity]);

  const filteredFleet = useMemo(() => {
    return FLEET_DATA.filter((car) => {
      const matchesCategory = selectedCategory === 'All' || car.category === selectedCategory;
      const matchesSearch =
        car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.fuel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const getCategoryIcon = (category) => {
    if (category.includes('2-Wheeler') || category.includes('Bike')) return Bike;
    if (category.includes('3-Wheeler') || category.includes('Auto')) return Bike;
    if (category.includes('Commercial') || category.includes('Truck')) return Truck;
    return Car;
  };

  const handleSearchVehicles = () => {
    const el = document.getElementById('fleet');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleReserveVehicle = (vehicle) => {
    if (onSelectVehicleForBooking) {
      onSelectVehicleForBooking(vehicle, pickupCity, destinationCity);
    } else {
      setActiveVehicle(vehicle);
    }
  };

  // HERO 3-IMAGE SLIDER CAROUSEL DATA
  const HERO_SLIDES = [
    {
      id: 1,
      image: '/hero_slide_1.jpg',
      badge: '#1 Rated Local Vehicle Rental Network',
      title: 'Rent Premium Vehicles',
      highlightTitle: 'For Local Travel & Rentals',
      description: 'Book verified 2-wheelers, 3-wheeler autos, and 4-wheeler cars for instant local travel with transparent per-KM pricing & RTO compliance.'
    },
    {
      id: 2,
      image: '/hero_slide_2.jpg',
      badge: '500+ Verified Fleet Vehicles',
      title: 'Inspected & Sanitized',
      highlightTitle: 'Bikes, Autos & Cars Available',
      description: 'Clean, sanitized, and fully insured vehicles available across Coimbatore, Erode, Tiruppur, Salem, Ooty, and surrounding hubs.'
    },
    {
      id: 3,
      image: '/hero_slide_3.jpg',
      badge: 'Transparent Per-KM Rates',
      title: 'Instant Booking & Pickup',
      highlightTitle: '₹8/km Bikes • ₹10/km Autos • ₹12/km Cars',
      description: 'Zero hidden surge pricing. Calculate exact route distance and book with 2-step mobile OTP verification.'
    }
  ];

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [HERO_SLIDES.length]);

  const activeSlide = HERO_SLIDES[currentSlideIndex];

  return (
    <main className="flex-1 bg-slate-50 text-slate-800 font-sans">
      
      {/* 1. HERO SLIDER CAROUSEL SECTION WITH 3 IMAGES & MICRO-ANIMATIONS */}
      <section className="relative pt-12 pb-24 overflow-hidden bg-slate-900 text-white border-b border-slate-200/80 min-h-[580px] flex items-center">
        
        {/* HERO CAROUSEL BACKGROUND IMAGES (UNIFORM HEIGHT & FADE TRANSITION) */}
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 z-0 transition-opacity duration-1000 ${
              idx === currentSlideIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className={`w-full h-full object-cover filter brightness-105 contrast-115 saturate-[1.1] transition-transform duration-1000 ${
                slide.id === 1 ? 'object-[center_40%] scale-110' : 'object-center scale-105'
              }`}
            />
            {/* Crystal Clear Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 via-slate-900/25 to-slate-950/35"></div>
          </div>
        ))}

        {/* Soft Decorative Ambient Circles */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none animate-float"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none animate-float" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-6 w-full">
          {/* Active Slide Content - Normal Text Layout (No Card Box) */}
          <div key={activeSlide.id} className="max-w-3xl space-y-6 animate-slide-up">
            
            {/* Floating Shimmer Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-blue-200/90 text-blue-700 text-xs font-black shadow-md shadow-blue-500/5 relative overflow-hidden">
              <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
              <span>{activeSlide.badge}</span>
              <span className="w-10 h-full absolute top-0 left-0 shimmer-badge pointer-events-none"></span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              {activeSlide.title} <br />
              <span className="bg-gradient-to-r from-blue-300 via-teal-200 to-emerald-300 bg-clip-text text-transparent">
                {activeSlide.highlightTitle}
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-100 leading-relaxed max-w-2xl font-medium drop-shadow-sm">
              {activeSlide.description}
            </p>

            {/* HERO ACTION BUTTONS */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigateToLogin && onNavigateToLogin()}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-sm shadow-lg shadow-blue-600/40 flex items-center gap-2 cursor-pointer hover:scale-105 transition-all duration-300"
              >
                <Car className="w-5 h-5 text-blue-200" />
                <span>Book a Ride</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('fleet');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-black text-sm border border-white/40 backdrop-blur-md flex items-center gap-2 cursor-pointer hover:scale-105 transition-all duration-300"
              >
                <Sparkles className="w-5 h-5 text-emerald-300" />
                <span>Explore Fleet Directory</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Stats & Slide Indicators */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-slate-700/80">
              <div className="grid grid-cols-3 gap-4 max-w-xl flex-1">
                <div className="bg-slate-900/80 backdrop-blur-md p-3.5 rounded-2xl border border-slate-700/80 shadow-md text-center sm:text-left">
                  <h4 className="text-xl sm:text-2xl font-black text-white">500+</h4>
                  <p className="text-xs text-slate-300 font-bold">Active Vehicles</p>
                </div>
                <div className="bg-slate-900/80 backdrop-blur-md p-3.5 rounded-2xl border border-slate-700/80 shadow-md text-center sm:text-left">
                  <h4 className="text-xl sm:text-2xl font-black text-emerald-400">100%</h4>
                  <p className="text-xs text-slate-300 font-bold">RTO Verified</p>
                </div>
                <div className="bg-slate-900/80 backdrop-blur-md p-3.5 rounded-2xl border border-slate-700/80 shadow-md text-center sm:text-left">
                  <h4 className="text-xl sm:text-2xl font-black text-amber-400">4.9 ★</h4>
                  <p className="text-xs text-slate-300 font-bold">Customer Rating</p>
                </div>
              </div>

              {/* 3 SLIDE INDICATOR DOTS */}
              <div className="flex items-center gap-2 self-center">
                {HERO_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlideIndex(idx)}
                    className={`h-2.5 rounded-full transition-all cursor-pointer ${
                      idx === currentSlideIndex ? 'w-8 bg-blue-400' : 'w-2.5 bg-white/40 hover:bg-white/70'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. FLOATING ROUTE SEARCH ENGINE STRIP BELOW HERO */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="glass-card-light rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200/90 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-600/30">
                <Navigation className="w-4 h-4" />
              </div>
              <div>
                <span className="text-sm font-black text-slate-900 block">Plan Your Route & Estimate Fares</span>
                <span className="text-[11px] text-slate-500 font-medium">Select pickup & destination cities for live per-KM rates</span>
              </div>
            </div>
            <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-100 px-3 py-0.5 rounded-full border border-emerald-300 animate-pulse">
              Live Rates
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs items-end">
            <div>
              <label className="block font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-600" /> Pickup Location *
              </label>
              <select
                value={pickupCity}
                onChange={(e) => setPickupCity(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-blue-600 cursor-pointer shadow-xs"
              >
                <option value="">Select Pickup City / Hub</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-emerald-600" /> Destination Location *
              </label>
              <select
                value={destinationCity}
                onChange={(e) => setDestinationCity(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-blue-600 cursor-pointer shadow-xs"
              >
                <option value="">Select Destination City</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <button
                onClick={handleSearchVehicles}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs rounded-xl cursor-pointer shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02]"
              >
                <Search className="w-4 h-4" />
                <span>Search Available Fleet</span>
              </button>
            </div>
          </div>

          {routeDistance > 0 && (
            <div className="p-3.5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl space-y-1 text-slate-800 shadow-xs animate-fade-in">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-600">Calculated Distance:</span>
                <span className="text-blue-700 font-black text-base">{routeDistance} km</span>
              </div>
              <div className="text-[11px] font-bold text-slate-600 flex items-center justify-between border-t border-blue-200/60 pt-1">
                <span>Estimated Fare (2W / 3W / 4W):</span>
                <span className="text-emerald-700 font-black text-sm">₹{routeDistance * 8} - ₹{routeDistance * 12}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. FLEET DIRECTORY SECTION */}
      <section id="fleet" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-blue-600 uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" /> Certified Fleet Directory
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Explore Available Vehicles</h2>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search model or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs font-medium focus:outline-none focus:border-blue-600 shadow-xs"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => {
            const Icon = getCategoryIcon(cat);
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/90'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Vehicle Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {filteredFleet.map((vehicle) => {
            const Icon = getCategoryIcon(vehicle.category);
            return (
              <div
                key={vehicle.id}
                className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden card-hover group flex flex-col justify-between shadow-md"
              >
                <div>
                  {/* Card Header & Image (Or Category Banner if No Image) */}
                  {vehicle.image ? (
                    <div className="relative h-48 bg-slate-100 overflow-hidden">
                      <img
                        src={vehicle.image}
                        alt={vehicle.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-slate-200 text-[11px] font-black text-slate-900 flex items-center gap-1.5 shadow-xs">
                        <Icon className="w-3.5 h-3.5 text-blue-600" />
                        <span>{vehicle.category}</span>
                      </div>

                      <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                        ₹{vehicle.price} / km
                      </div>
                    </div>
                  ) : (
                    <div className="relative h-28 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 p-4 flex flex-col justify-between border-b border-slate-700/60">
                      <div className="flex items-center justify-between">
                        <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[11px] font-black text-white flex items-center gap-1.5 shadow-xs">
                          <Icon className="w-3.5 h-3.5 text-blue-400" />
                          <span>{vehicle.category}</span>
                        </div>

                        <div className="bg-emerald-500 text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                          ₹{vehicle.price} / km
                        </div>
                      </div>
                      <div className="text-white font-black text-base flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-300 border border-blue-400/30">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span>{vehicle.name}</span>
                      </div>
                    </div>
                  )}

                  {/* Vehicle Info Specs */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-black text-slate-900 tracking-tight">{vehicle.name}</h3>
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{vehicle.rating}</span>
                      </div>
                    </div>

                    {/* Technical Pills */}
                    <div className="grid grid-cols-3 gap-2 text-[11px]">
                      <div className="bg-slate-100/80 p-2 rounded-xl border border-slate-200/80 text-slate-700 flex items-center gap-1.5 font-semibold">
                        <Users className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{vehicle.seats} Seats</span>
                      </div>
                      <div className="bg-slate-100/80 p-2 rounded-xl border border-slate-200/80 text-slate-700 flex items-center gap-1.5 font-semibold">
                        <Fuel className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{vehicle.fuel}</span>
                      </div>
                      <div className="bg-slate-100/80 p-2 rounded-xl border border-slate-200/80 text-slate-700 flex items-center gap-1.5 font-semibold">
                        <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="truncate">{vehicle.transmission}</span>
                      </div>
                    </div>

                    {/* Owner & Legal Badges */}
                    <div className="pt-2 border-t border-slate-100 space-y-1 text-xs">
                      <div className="flex items-center justify-between text-slate-500 text-[11px]">
                        <span>Reg No:</span>
                        <strong className="text-slate-900 font-extrabold uppercase">{vehicle.registrationNo || 'TN-37-REG'}</strong>
                      </div>
                      <div className="flex items-center justify-between text-slate-500 text-[11px]">
                        <span>Verified Partner:</span>
                        <strong className="text-emerald-700 font-bold">{vehicle.ownerName || 'kuiky.in Fleet Partner'}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action CTAs */}
                <div className="p-6 pt-0 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      if (onSelectVehicleDetails) {
                        onSelectVehicleDetails(vehicle);
                      } else {
                        setDetailsVehicle(vehicle);
                        setIsDetailsModalOpen(true);
                      }
                    }}
                    className="py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl cursor-pointer transition-colors"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => handleReserveVehicle(vehicle)}
                    className="py-3 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl cursor-pointer shadow-md transition-colors"
                  >
                    Book Ride
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* 4. WHY CHOOSE KUIKY.IN SERVICES SECTION */}
      <section id="services" className="py-16 bg-white border-t border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase text-blue-600 tracking-wider">Professional Guarantee</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Why Riders Trust kuiky.in Services</h2>
            <p className="text-xs text-slate-500 font-medium">Transparent per-KM rates, RTO verified documentation, and instant SMS OTP verification.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/80 space-y-3 card-hover">
              <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-black text-slate-900">100% RTO Verified</h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                All listed 2-wheelers, 3-wheelers, and cars undergo strict DL, RC, and Insurance document verification.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/80 space-y-3 card-hover">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="text-base font-black text-slate-900">Fixed Per-KM Rates</h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                Clear per-kilometer pricing (₹8/km for 2W, ₹10/km for 3W, ₹12/km for 4W) with zero hidden surge charges.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/80 space-y-3 card-hover">
              <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-black text-slate-900">Instant SMS OTP</h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                Quick 2-step mobile OTP verification for customer sign-in and booking confirmation.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/80 space-y-3 card-hover">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                <ThumbsUp className="w-5 h-5" />
              </div>
              <h3 className="text-base font-black text-slate-900">24/7 Roadside Support</h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                Dedicated customer assistance and breakdown support across all destination hubs.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. VERIFIED REVIEWS & TESTIMONIALS SECTION */}
      <section id="reviews" className="py-16 bg-slate-100/70 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase text-amber-600 tracking-wider">Verified Customer Feedback</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">What Our Riders Say</h2>
            <p className="text-xs text-slate-500 font-medium">Rated 4.9 / 5 stars by over 1,200+ local commuters across Tamil Nadu.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 space-y-4 shadow-sm card-hover">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <span className="text-[11px] font-extrabold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200">Verified Ride</span>
              </div>
              <p className="text-xs text-slate-600 font-medium leading-relaxed italic">
                "Booked a Royal Enfield Classic 350 for a day trip to Ooty. The bike condition was brand new, RC and insurance papers were complete. Highly recommend kuiky.in!"
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center">
                  RA
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900">R. Arunkumar</h4>
                  <span className="text-[11px] text-slate-400 font-semibold">Peelamedu, Coimbatore</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 space-y-4 shadow-sm card-hover">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <span className="text-[11px] font-extrabold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200">Verified Ride</span>
              </div>
              <p className="text-xs text-slate-600 font-medium leading-relaxed italic">
                "Needed a 7-seater Innova Crysta for a family trip from Erode to Salem. Transparent ₹12/km rate with zero surge pricing. Vehicle arrived 15 mins early!"
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center">
                  SK
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900">S. Kausalya</h4>
                  <span className="text-[11px] text-slate-400 font-semibold">Collectorate Hub, Erode</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 space-y-4 shadow-sm card-hover">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <span className="text-[11px] font-extrabold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200">Verified Ride</span>
              </div>
              <p className="text-xs text-slate-600 font-medium leading-relaxed italic">
                "Booked a Bajaj RE Auto for local shopping in Tiruppur. Quick SMS OTP sign in and driver was extremely polite. Best local rental service!"
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                  MN
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900">M. Narendran</h4>
                  <span className="text-[11px] text-slate-400 font-semibold">Avinashi Road, Tiruppur</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. INSTANT VEHICLE BOOKING BANNER */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-3xl p-8 sm:p-12 text-white shadow-2xl shadow-blue-600/20 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md">
                <Car className="w-3.5 h-3.5 text-white" />
                <span>Instant Vehicle Booking & Rental Program</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">Need a Bike, Auto, or Car Today?</h3>
              <p className="text-blue-50 text-xs sm:text-sm font-medium leading-relaxed">
                Book verified vehicles with kuiky.in for transparent per-KM rates, instant SMS verification, and guaranteed pickup across Tamil Nadu.
              </p>
            </div>

            <button
              onClick={() => onNavigateToLogin && onNavigateToLogin()}
              className="px-8 py-4 bg-white text-blue-900 hover:bg-slate-100 font-black text-sm rounded-2xl cursor-pointer shadow-lg shrink-0 flex items-center gap-2 transition-transform hover:scale-105"
            >
              <span>Sign In & Book Ride</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Modals */}
      {activeVehicle && (
        <ReservationModal
          vehicle={activeVehicle}
          initialPickup={pickupCity}
          initialDestination={destinationCity}
          onClose={() => setActiveVehicle(null)}
        />
      )}

      {isDetailsModalOpen && detailsVehicle && (
        <VehicleDetailsModal
          vehicle={detailsVehicle}
          onClose={() => setIsDetailsModalOpen(false)}
          onStartBooking={() => {
            setIsDetailsModalOpen(false);
            handleReserveVehicle(detailsVehicle);
          }}
        />
      )}

    </main>
  );
}
