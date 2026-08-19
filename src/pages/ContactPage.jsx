import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ChevronLeft,
  MessageSquare,
  Building2,
  ShieldCheck,
  Sparkles,
  HelpCircle,
  ChevronDown,
  Car,
  Truck
} from 'lucide-react';

export default function ContactPage({ onBackToHome }) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const BRANCHES = [
    {
      city: 'Coimbatore Hub',
      address: 'No. 42, Cross Cut Road, Gandhipuram, Coimbatore - 641012',
      phone: '+91 98765 43210',
      timing: '24/7 Open • Daily Operations',
      type: 'Regional HQ & Main Depot'
    },
    {
      city: 'Erode Logistics Hub',
      address: 'Plot 18, Bhavani Main Road, Perundurai, Erode - 638002',
      phone: '+91 98765 43211',
      timing: '06:00 AM - 11:00 PM',
      type: 'Commercial Truck Depot'
    },
    {
      city: 'Tiruppur Fleet Branch',
      address: 'Near Old Bus Stand, Avinashi Road, Tiruppur - 641602',
      phone: '+91 98765 43212',
      timing: '07:00 AM - 10:00 PM',
      type: 'Passenger Cars & Cabs'
    },
    {
      city: 'Salem Hub',
      address: 'No. 105, Junction Main Road, Salem - 636005',
      phone: '+91 98765 43213',
      timing: '24/7 Support Hotline',
      type: 'Intercity Fleet Hub'
    }
  ];

  const FAQS = [
    {
      q: 'How does Kuiky per-KM pricing work?',
      a: 'We calculate exact Google Maps route distance between your pickup location and destination. Cars are billed at ₹10/km and commercial goods trucks at ₹12/km with zero surge fee.'
    },
    {
      q: 'Can I pay cash at destination?',
      a: 'Yes! We support 100% Pay-at-Destination guarantee. You can pay cash or UPI directly to the driver after safely reaching your destination.'
    },
    {
      q: 'Are drivers included with the vehicles?',
      a: 'Yes, professional verified chauffeurs are included by default. We also offer Self-Drive rentals if you upload a valid Driving License.'
    },
    {
      q: 'How can I register as a vehicle owner partner?',
      a: 'You can attach your 4-wheeler cars or commercial goods trucks with Kuiky. Contact our partner hotline or use our Partner Attachment portal.'
    }
  ];

  return (
    <main className="flex-1 bg-slate-50 text-slate-800 font-sans pb-16">
      
      {/* 1. CONTACT HERO BANNER */}
      <section className="relative py-16 bg-slate-900 text-white overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15 backdrop-blur-md transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-black">
              <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
              <span>We're Here To Help 24/7</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Contact <span className="bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">Kuiky Support</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base font-medium leading-relaxed">
              Have questions about booking a car or commercial goods truck? Reach out to our customer care team, visit our local depots, or send us a message.
            </p>
          </div>
        </div>
      </section>

      {/* 2. DIRECT CONTACT INFO CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200/90 flex items-start gap-4 hover:shadow-2xl transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center shrink-0 shadow-sm">
              <Phone className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block">Customer Support Hotline</span>
              <h3 className="text-base font-black text-slate-900">+91 98765 43210</h3>
              <p className="text-xs text-slate-500 font-medium">Toll-free 24/7 instant hotline for bookings & emergency support.</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200/90 flex items-start gap-4 hover:shadow-2xl transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 text-emerald-600 flex items-center justify-center shrink-0 shadow-sm">
              <Mail className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block">Official Email Address</span>
              <h3 className="text-base font-black text-slate-900">kuiky@gmail.com</h3>
              <p className="text-xs text-slate-500 font-medium">Send us your queries, invoices, or feedback anytime.</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200/90 flex items-start gap-4 hover:shadow-2xl transition-all">
            <div className="w-12 h-12 rounded-2xl bg-purple-600/10 text-purple-600 flex items-center justify-center shrink-0 shadow-sm">
              <Clock className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block">Working Hours</span>
              <h3 className="text-base font-black text-slate-900">24 Hours / 7 Days</h3>
              <p className="text-xs text-slate-500 font-medium">Round-the-clock vehicle dispatch.</p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. MAIN CONTACT FORM & DETAILS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 shadow-xl border border-slate-200/90 space-y-6">
            <div className="border-b border-slate-100 pb-4 space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-black text-blue-600 uppercase">
                <MessageSquare className="w-4 h-4" /> Send Us a Message
              </div>
              <h2 className="text-2xl font-black text-slate-900">We'd Love to Hear From You</h2>
              <p className="text-xs text-slate-500 font-medium">Fill in your details below and our team will get back to you within 30 minutes.</p>
            </div>

            {formSubmitted ? (
              <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-4 animate-scale-up">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-emerald-900">Message Delivered Successfully!</h3>
                <p className="text-xs text-emerald-700 font-medium max-w-md mx-auto leading-relaxed">
                  Thank you <strong className="text-emerald-950">{fullName || 'Valued Customer'}</strong>. Our customer relations team has received your message and will call you on <strong className="text-emerald-950">{phone || 'your phone number'}</strong> shortly.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setMessage('');
                  }}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl cursor-pointer shadow-md transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:border-blue-600 shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Mobile Phone Number *</label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:border-blue-600 shadow-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="ramesh@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:border-blue-600 shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Inquiry Subject *</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-blue-600 cursor-pointer shadow-xs"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Vehicle Booking Assistance">Vehicle Booking Assistance</option>
                      <option value="Fleet Partner Attachment">Fleet Partner Attachment</option>
                      <option value="Corporate / Bulk Rental">Corporate / Bulk Rental</option>
                      <option value="Feedback / Complaint">Feedback / Complaint</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Your Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Type your message, inquiry details, or pickup requirement..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:border-blue-600 shadow-xs"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 btn-primary text-white font-black text-sm rounded-2xl shadow-lg shadow-blue-600/30 cursor-pointer flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Local Depots & Quick Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl border border-slate-800">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">Kuiky Regional Depots</h3>
                  <p className="text-xs text-slate-400">Main regional vehicle hubs</p>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                {BRANCHES.map((branch, idx) => (
                  <div key={idx} className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700/80 space-y-2 hover:border-blue-500/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <strong className="text-sm font-black text-white">{branch.city}</strong>
                      <span className="text-[10px] font-extrabold text-blue-400 bg-blue-500/20 px-2 py-0.5 rounded border border-blue-400/30">
                        {branch.type}
                      </span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span>{branch.address}</span>
                    </p>
                    <div className="flex items-center justify-between pt-1 text-[11px] border-t border-slate-700/60">
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <Phone className="w-3 h-3 text-emerald-400" /> {branch.phone}
                      </span>
                      <span className="text-slate-400 font-medium">{branch.timing}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Trust Badge */}
            <div className="p-5 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-3xl space-y-2 text-xs text-emerald-900 shadow-sm">
              <div className="flex items-center gap-2 font-black text-sm text-emerald-950">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Instant Verified Booking Guarantee</span>
              </div>
              <p className="text-emerald-800 text-[11px] leading-relaxed">
                All inquiries and vehicle reservations are protected by Kuiky's transparent per-KM pricing policy with 24/7 roadside assistance.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 4. FREQUENTLY ASKED QUESTIONS (FAQ) SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200/90 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-blue-600 uppercase">
              <HelpCircle className="w-4 h-4" /> Frequently Asked Questions
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Have Questions Before Booking?</h2>
            <p className="text-xs text-slate-500 font-medium">Quick answers to common questions about our vehicles, pricing, and services.</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3 pt-2">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-5 py-4 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left cursor-pointer transition-colors"
                  >
                    <span className="font-extrabold text-slate-900 text-xs sm:text-sm">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 py-4 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-100 font-medium">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </main>
  );
}
