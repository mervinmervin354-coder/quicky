import React, { useState, useMemo, useEffect } from 'react';
import {
  MapPin,
  Navigation,
  Search,
  Star,
  Users,
  Fuel,
  Zap,
  ChevronRight,
  Sparkles,
  Car,
  Truck,
  ArrowRight,
  Check
} from 'lucide-react';
import { FLEET_DATA, CATEGORIES, CITIES, calculateDistance } from '../data/vehiclesData';
import ServicesSection from '../components/ServicesSection';
import ReviewsSection from '../components/ReviewsSection';

// SCROLL TO ZOOM IN CARD ANIMATION WRAPPER
function ScrollZoomCard({ children, index }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const currentElem = cardRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) {
        observer.unobserve(currentElem);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      style={{
        transitionDelay: `${(index % 3) * 120}ms`
      }}
      className={`transition-all duration-700 ease-out transform ${
        isVisible
          ? 'opacity-100 scale-100 translate-y-0'
          : 'opacity-0 scale-75 translate-y-12'
      }`}
    >
      {children}
    </div>
  );
}

export default function Home({ onSelectVehicleForBooking, onSelectVehicleDetails, onNavigateToLogin }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [pickupCity, setPickupCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');

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
    if (category === 'All') return null;
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
    } else if (onNavigateToLogin) {
      onNavigateToLogin();
    }
  };

  // HERO 3-IMAGE SLIDER CAROUSEL DATA
  const HERO_SLIDES = [
    {
      id: 1,
      image: '/trucks/hero_slide_1.jpg',
      badge: '#1 Rated Goods Transport Fleet',
      title: 'Tata Ace & Mini Trucks',
      highlightTitle: 'Fast Local & Intercity Freight',
      description: 'Book verified Tata Ace (Chota Hathi), Bolero Pickups, and heavy container trucks for instant local & intercity goods transport with transparent ₹10/km - ₹12/km pricing & full verification.'
    },
    {
      id: 2,
      image: '/trucks/hero_slide_2.jpg',
      badge: '500+ Inspected Goods Carrying Trucks',
      title: 'Eicher & Heavy Cargo Containers',
      highlightTitle: 'Heavy Freight & Industrial Logistics',
      description: 'Inspected 1.5 Ton to 5 Ton heavy cargo trucks available across Coimbatore, Erode, Tiruppur, Salem, Ooty, and surrounding industrial hubs.'
    },
    {
      id: 3,
      image: '/trucks/hero_slide_3.jpg',
      badge: 'Fixed ₹10/km Medium • ₹12/km Heavy Rates',
      title: 'Mahindra Bolero Pickup Fleet',
      highlightTitle: 'Zero Hidden Charges • Pay at Destination',
      description: 'Calculate exact route distance between cities and book verified cargo transport with 2-step mobile OTP verification.'
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
      
      {/* 1. HERO SLIDER CAROUSEL SECTION */}
      <section className="relative pt-12 pb-24 overflow-hidden bg-slate-900 text-white border-b border-slate-200/80 min-h-[580px] flex items-center justify-center">
        
        {/* HERO CAROUSEL BACKGROUND IMAGES */}
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 z-0 transition-opacity duration-1000 flex items-center justify-center ${
              idx === currentSlideIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center max-sm:object-[center_center] filter brightness-105 contrast-115 saturate-[1.1] transition-transform duration-1000 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-slate-900/40 to-slate-950/50"></div>
          </div>
        ))}

        {/* Ambient Glow */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none animate-float"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none animate-float" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-6 w-full">
          <div key={activeSlide.id} className="max-w-3xl space-y-6 animate-slide-up text-center sm:text-left mx-auto sm:mx-0 flex flex-col items-center sm:items-start">
            
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

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2">
              <button
                onClick={() => onSelectVehicleForBooking ? onSelectVehicleForBooking(FLEET_DATA[0], pickupCity, destinationCity) : (onNavigateToLogin && onNavigateToLogin())}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-sm shadow-lg shadow-blue-600/40 flex items-center gap-2 cursor-pointer hover:scale-105 transition-all duration-300"
              >
                <Truck className="w-5 h-5 text-blue-200" />
                <span>Book Goods Truck</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleSearchVehicles}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-black text-sm shadow-lg shadow-emerald-600/30 border border-emerald-400/40 backdrop-blur-md flex items-center gap-2 cursor-pointer hover:scale-105 transition-all duration-300"
              >
                <Sparkles className="w-5 h-5 text-emerald-200" />
                <span>Drive and Earn</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-slate-700/80">
              <div className="grid grid-cols-3 gap-4 max-w-xl flex-1">
                <div className="bg-slate-900/80 backdrop-blur-md p-3.5 rounded-2xl border border-slate-700/80 shadow-md text-center sm:text-left">
                  <h4 className="text-xl sm:text-2xl font-black text-white">500+</h4>
                  <p className="text-xs text-slate-300 font-bold">Active Vehicles</p>
                </div>
                <div className="bg-slate-900/80 backdrop-blur-md p-3.5 rounded-2xl border border-slate-700/80 shadow-md text-center sm:text-left">
                  <h4 className="text-xl sm:text-2xl font-black text-emerald-400">100%</h4>
                  <p className="text-xs text-slate-300 font-bold">Verified Fleet</p>
                </div>
                <div className="bg-slate-900/80 backdrop-blur-md p-3.5 rounded-2xl border border-slate-700/80 shadow-md text-center sm:text-left">
                  <h4 className="text-xl sm:text-2xl font-black text-amber-400">4.9 ★</h4>
                  <p className="text-xs text-slate-300 font-bold">Customer Rating</p>
                </div>
              </div>

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

      {/* 2. FLOATING ROUTE SEARCH ENGINE STRIP */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="glass-card-light rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200/90 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-600/30 shrink-0">
                <Navigation className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm font-black text-slate-900 truncate sm:whitespace-normal">Plan Route & Live Rates</h3>
                <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium leading-tight">Select pickup & destination cities for live per-KM fare estimate</p>
              </div>
            </div>
            <span className="text-[10px] sm:text-[11px] font-extrabold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-300 animate-pulse shrink-0 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Live Rates</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs items-end">
            <div>
              <label className="block font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-600" /> Pickup Location *
              </label>
              <div className="relative">
                <input
                  type="text"
                  list="pickup_cities_list"
                  value={pickupCity}
                  onChange={(e) => setPickupCity(e.target.value)}
                  placeholder="Type or select pickup location..."
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-blue-600 cursor-text shadow-xs placeholder:text-slate-400 placeholder:font-medium text-xs sm:text-sm"
                />
                <datalist id="pickup_cities_list">
                  {CITIES.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-emerald-600" /> Destination Location *
              </label>
              <div className="relative">
                <input
                  type="text"
                  list="destination_cities_list"
                  value={destinationCity}
                  onChange={(e) => setDestinationCity(e.target.value)}
                  placeholder="Type or select destination location..."
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-emerald-600 cursor-text shadow-xs placeholder:text-slate-400 placeholder:font-medium text-xs sm:text-sm"
                />
                <datalist id="destination_cities_list">
                  {CITIES.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </div>
            </div>

            <div>
              <button
                onClick={handleSearchVehicles}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs rounded-xl cursor-pointer shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02]"
              >
                <Search className="w-4 h-4" />
                <span>Search Available Vehicles</span>
              </button>
            </div>
          </div>

          {routeDistance > 0 ? (
            <div className="p-3.5 bg-gradient-to-r from-blue-50 via-indigo-50 to-emerald-50 border border-blue-200 rounded-2xl space-y-2 text-slate-800 shadow-xs animate-fade-in">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold">
                <span className="text-slate-600 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>Route Distance ({pickupCity} ➔ {destinationCity}):</span>
                </span>
                <span className="text-blue-700 font-black text-sm sm:text-base">{routeDistance} km</span>
              </div>
              <div className="text-[11px] font-bold text-slate-700 flex flex-wrap items-center justify-between gap-2 border-t border-blue-200/80 pt-2">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Live Estimated Route Fare:</span>
                </span>
                <span className="text-emerald-700 font-black text-sm sm:text-base bg-white px-2.5 py-0.5 rounded-lg border border-emerald-200 shadow-2xs">
                  ₹{routeDistance * 10} - ₹{routeDistance * 12}
                </span>
              </div>
              <div className="text-[10px] font-semibold text-slate-500 flex flex-wrap items-center justify-between gap-1 pt-0.5">
                <span>Rates: ₹10/km Medium • ₹12/km Heavy</span>
                <span className="text-emerald-600 font-bold">Zero Midnight Surge</span>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-blue-50/80 border border-blue-200/80 rounded-2xl flex flex-wrap items-center justify-between gap-2 text-[11px] font-semibold text-blue-900">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Live Rates: ₹10/km (Medium Vehicles) • ₹12/km (Heavy Cargo)</span>
              </span>
              <span className="text-[10px] text-blue-700 bg-white px-2 py-0.5 rounded font-extrabold border border-blue-200 shrink-0">
                Select Pickup & Destination
              </span>
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
                {Icon && <Icon className="w-4 h-4" />}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Vehicle Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {filteredFleet.map((vehicle, idx) => {
            const Icon = getCategoryIcon(vehicle.category);
            return (
              <ScrollZoomCard key={vehicle.id} index={idx}>
                <div
                  className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden group flex flex-col justify-between shadow-md hover:shadow-lg hover:border-slate-300 transition-all duration-300 relative h-full"
                >
                  <div>
                    <div className="relative h-60 w-full bg-slate-900 overflow-hidden">
                      <img
                        src={vehicle.image}
                        alt={vehicle.name}
                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out opacity-95 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>

                      {/* Category Pill */}
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/50 text-[11px] font-black text-slate-900 flex items-center gap-1.5 shadow-md">
                        {Icon && <Icon className="w-3.5 h-3.5 text-blue-600 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />}
                        <span>{vehicle.category}</span>
                      </div>

                      {/* Fare Rate Pill */}
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 text-white text-[11px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-lg shadow-emerald-600/30 group-hover:scale-105 transition-transform duration-300">
                        ₹{vehicle.price} / km
                      </div>

                      {/* Bottom Floating Rating Badge */}
                      <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-amber-400 text-xs font-black flex items-center gap-1 border border-white/20">
                        <Star className="w-3.5 h-3.5 fill-amber-400 animate-pulse" />
                        <span>{vehicle.rating}</span>
                      </div>
                    </div>

                    <div className="p-5 space-y-3.5">
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-base font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                            {vehicle.name}
                          </h3>
                          <span className="text-[10px] font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 shrink-0">
                            {vehicle.modelYear}
                          </span>
                        </div>
                        <span className="text-[11px] font-bold text-slate-500 block mt-0.5">
                          Category / Type: <strong className="text-blue-700">{vehicle.category}</strong>
                        </span>
                      </div>

                      {/* 6 Key Specifications Grid */}
                      <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-bold text-slate-400 uppercase block">Reg Number</span>
                          <strong className="text-slate-900 font-extrabold block text-[11px] truncate">{vehicle.registrationNo}</strong>
                        </div>

                        <div className="space-y-0.5">
                          <span className="text-[10px] font-bold text-slate-400 uppercase block">Load Capacity</span>
                          <strong className="text-emerald-700 font-extrabold block text-[11px] truncate">{vehicle.loadCapacity}</strong>
                        </div>

                        <div className="space-y-0.5">
                          <span className="text-[10px] font-bold text-slate-400 uppercase block">Body Dimensions</span>
                          <strong className="text-blue-700 font-extrabold block text-[11px] truncate">{vehicle.bodyDimensions}</strong>
                        </div>

                        <div className="space-y-0.5">
                          <span className="text-[10px] font-bold text-slate-400 uppercase block">Fuel Type</span>
                          <strong className="text-slate-800 font-bold block text-[11px] truncate">{vehicle.fuel}</strong>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-2">
                        <span>Owner: <strong className="text-slate-800 font-semibold">{vehicle.ownerName}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 grid grid-cols-2 gap-2.5">
                    <button
                      onClick={() => {
                        if (onSelectVehicleDetails) {
                          onSelectVehicleDetails(vehicle);
                        }
                      }}
                      className="py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs rounded-xl cursor-pointer hover:scale-[1.02] active:scale-95 transition-all duration-300"
                    >
                      View Details
                    </button>

                    <button
                      onClick={() => handleReserveVehicle(vehicle)}
                      className="py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs rounded-xl cursor-pointer shadow-md shadow-blue-600/30 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-1.5"
                    >
                      <span>Book Now</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                </div>
              </ScrollZoomCard>
            );
          })}
        </div>
      </section>

      {/* 4. SERVICES SECTION */}
      <ServicesSection />

      {/* 5. REVIEWS SECTION */}
      <ReviewsSection />

      {/* 6. INSTANT VEHICLE BOOKING BANNER */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-3xl p-8 sm:p-12 text-white shadow-2xl shadow-blue-600/20 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md">
                <Truck className="w-3.5 h-3.5 text-white" />
                <span>Instant Freight & Goods Logistics</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">Need a Goods Transport Truck Today?</h3>
              <p className="text-blue-50 text-xs sm:text-sm font-medium leading-relaxed">
                Book verified heavy cargo trucks with kuiky.in for transparent ₹12/km rates, instant SMS verification, and guaranteed pickup.
              </p>
            </div>

            <button
              onClick={() => onSelectVehicleForBooking ? onSelectVehicleForBooking(FLEET_DATA[0], pickupCity, destinationCity) : (onNavigateToLogin && onNavigateToLogin())}
              className="px-8 py-4 bg-white text-blue-900 hover:bg-slate-100 font-black text-sm rounded-2xl cursor-pointer shadow-lg shrink-0 flex items-center gap-2 transition-transform hover:scale-105"
            >
              <span>Book Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}
