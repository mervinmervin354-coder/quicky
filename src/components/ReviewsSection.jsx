import React, { useState, useEffect } from 'react';
import {
  Star,
  Quote,
  CheckCircle2,
  ThumbsUp,
  MessageSquare,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Car,
  Truck,
  PlusCircle,
  X,
  Send,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { REVIEWS_DATA } from '../data/reviewsData';

const EXTRA_REVIEWS = [
  {
    id: 'rev-4',
    author: 'P. Karthik',
    initials: 'PK',
    location: 'Gandhipuram, Coimbatore',
    vehicleBooked: 'Mahindra Bolero Pickup',
    category: 'trucks',
    rating: 5,
    comment: '"Rented a Bolero Pickup for moving textile machinery from Tiruppur to Coimbatore. Excellent loading support, ₹12/km billing was exact to the meter."',
    badge: 'Verified Logistics',
    colorTheme: 'emerald',
    helpfulCount: 14
  },
  {
    id: 'rev-5',
    author: 'V. Divya',
    initials: 'VD',
    location: 'Junction Main Rd, Salem',
    vehicleBooked: 'Hyundai i20 Petrol',
    category: 'cars',
    rating: 5,
    comment: '"2-step Mobile OTP sign-in took only 10 seconds. The vehicle was spotlessly sanitized and delivered right at Salem junction station. 5 stars!"',
    badge: 'Verified Ride',
    colorTheme: 'blue',
    helpfulCount: 22
  },
  {
    id: 'rev-6',
    author: 'T. Gokulakrishnan',
    initials: 'TG',
    location: 'Perundurai, Erode',
    vehicleBooked: 'Eicher 14ft Commercial Truck',
    category: 'trucks',
    rating: 5,
    comment: '"Pay at Destination feature gave complete peace of mind. Paid cash directly to driver after goods arrived safely. Will definitely book again!"',
    badge: 'Verified Logistics',
    colorTheme: 'indigo',
    helpfulCount: 19
  }
];

export default function ReviewsSection() {
  const [reviewsList, setReviewsList] = useState(() => [
    ...REVIEWS_DATA.map((r) => ({ ...r, helpfulCount: Math.floor(Math.random() * 15) + 8, category: r.vehicleBooked.includes('Truck') || r.vehicleBooked.includes('Ace') ? 'trucks' : 'cars' })),
    ...EXTRA_REVIEWS
  ]);

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // New review form states
  const [newAuthor, setNewAuthor] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newVehicle, setNewVehicle] = useState('Maruti Suzuki Swift');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Carousel timer for featured review spotlight
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % reviewsList.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [reviewsList.length]);

  const featuredReview = reviewsList[currentSlideIndex] || reviewsList[0];

  const handleAddReviewSubmit = (e) => {
    e.preventDefault();
    if (!newAuthor || !newComment) return;

    const createdReview = {
      id: 'rev-' + Date.now(),
      author: newAuthor,
      initials: newAuthor.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || 'UK',
      location: newLocation || 'Coimbatore, TN',
      vehicleBooked: newVehicle,
      category: newVehicle.includes('Truck') || newVehicle.includes('Ace') ? 'trucks' : 'cars',
      rating: Number(newRating),
      comment: `"${newComment}"`,
      badge: 'Verified Customer',
      colorTheme: 'blue',
      helpfulCount: 1
    };

    setReviewsList([createdReview, ...reviewsList]);
    setCurrentSlideIndex(0);
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setIsWriteModalOpen(false);
      setNewAuthor('');
      setNewLocation('');
      setNewComment('');
    }, 1200);
  };

  return (
    <section id="reviews" className="py-20 bg-slate-50 text-slate-800 relative overflow-hidden border-t border-slate-200/90 font-sans">
      
      {/* Light Theme Background Ambient Glow */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* 1. HEADER SECTION BANNER & RATING OVERVIEW */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/90 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/80 text-blue-700 border border-blue-200/90 text-xs font-black shadow-xs">
              <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
              <span>Verified Customer Feedback</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Trusted by 50,000+ Renters Across <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent">
                Tamil Nadu Destinations
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              Read authentic reviews from renters who booked 4-wheeler cars and commercial goods trucks with fixed per-KM rates and 100% pay at destination guarantee.
            </p>
          </div>

          {/* Overall Rating & Add Review CTA */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-md flex items-center gap-4">
              <div className="text-center border-r border-slate-100 pr-4">
                <div className="text-3xl font-black text-slate-900">4.9</div>
                <div className="flex items-center gap-0.5 text-amber-400 mt-0.5 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>

              <div className="text-xs space-y-0.5">
                <strong className="text-slate-900 font-extrabold block">1,250+ Verified Ratings</strong>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px]">
                  99.4% Satisfaction Rate
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="px-6 py-4 btn-primary text-white font-black text-xs rounded-2xl shadow-lg shadow-blue-600/30 cursor-pointer flex items-center justify-center gap-2 hover:scale-105 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* 2. FEATURED TESTIMONIAL SPOTLIGHT CAROUSEL BANNER */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xl relative overflow-hidden">
          <div className="absolute top-6 right-8 text-slate-200/60 pointer-events-none">
            <Quote className="w-24 h-24" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-8 space-y-5">
              <div className="flex items-center gap-3">
                <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{featuredReview.badge}</span>
                </span>

                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(featuredReview.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 animate-pulse" />
                  ))}
                </div>
              </div>

              <blockquote className="text-lg sm:text-2xl font-bold text-slate-900 leading-snug tracking-tight italic">
                {featuredReview.comment}
              </blockquote>

              <div className="flex items-center gap-4 pt-2">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-black text-base flex items-center justify-center shadow-md">
                  {featuredReview.initials}
                </div>

                <div>
                  <h4 className="text-base font-black text-slate-900">{featuredReview.author}</h4>
                  <p className="text-xs text-slate-500 font-semibold">
                    {featuredReview.location} • Booked <strong className="text-blue-600">{featuredReview.vehicleBooked}</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-between space-y-6 lg:border-l border-slate-100 lg:pl-8">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                  Verified Trip Guarantee
                </span>
                <div className="flex items-center gap-2 font-bold text-slate-800 text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Fixed Fare • No Surge Price</span>
                </div>
                <p className="text-slate-500 text-[11px] font-medium leading-relaxed">
                  Every feedback is verified with 2-step Mobile SMS OTP verification.
                </p>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {reviewsList.slice(0, 5).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlideIndex(idx)}
                      className={`h-2.5 rounded-full transition-all cursor-pointer ${
                        idx === currentSlideIndex ? 'w-8 bg-blue-600' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                      }`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentSlideIndex((prev) => (prev === 0 ? reviewsList.length - 1 : prev - 1))}
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCurrentSlideIndex((prev) => (prev + 1) % reviewsList.length)}
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* 5. WRITE A REVIEW MODAL DRAWER */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl space-y-6 relative animate-scale-up text-slate-800">
            
            <button
              onClick={() => setIsWriteModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center font-black">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">Share Your Experience</h3>
                <p className="text-xs text-slate-500 font-medium">Write a review for your recent Kuiky vehicle rental</p>
              </div>
            </div>

            {submitSuccess ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-black text-emerald-950">Thank You for Your Feedback!</h4>
                <p className="text-xs text-emerald-700 font-medium">Your verified review has been published successfully.</p>
              </div>
            ) : (
              <form onSubmit={handleAddReviewSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">City / Location *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Gandhipuram, Coimbatore"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Vehicle Rented *</label>
                    <select
                      value={newVehicle}
                      onChange={(e) => setNewVehicle(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-blue-600 cursor-pointer"
                    >
                      <option value="Maruti Suzuki Swift">Maruti Suzuki Swift (Car)</option>
                      <option value="Toyota Innova Crysta">Toyota Innova Crysta (Car)</option>
                      <option value="Hyundai i20 Petrol">Hyundai i20 Petrol (Car)</option>
                      <option value="Tata Ace Gold Truck">Tata Ace Gold (Truck)</option>
                      <option value="Mahindra Bolero Pickup">Mahindra Bolero (Truck)</option>
                      <option value="Eicher 14ft Commercial Truck">Eicher 14ft (Truck)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Overall Star Rating *</label>
                    <select
                      value={newRating}
                      onChange={(e) => setNewRating(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-blue-600 cursor-pointer"
                    >
                      <option value={5}>5 ★★★★★ (Excellent)</option>
                      <option value={4}>4 ★★★★☆ (Good)</option>
                      <option value={3}>3 ★★★☆☆ (Average)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Review Comment *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe your trip, vehicle condition, driver punctuality, or service..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:border-blue-600"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 btn-primary text-white font-black text-xs rounded-xl shadow-lg cursor-pointer flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Customer Review</span>
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
