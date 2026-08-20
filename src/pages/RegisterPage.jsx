import React, { useState, useEffect } from 'react';
import {
  User,
  Lock,
  Phone,
  Mail,
  Eye,
  EyeOff,
  CheckCircle2,
  ChevronLeft,
  Car,
  Truck,
  ShieldCheck,
  Smartphone,
  ArrowRight,
  AlertCircle,
  Sparkles,
  Zap,
  RefreshCw
} from 'lucide-react';
import KuikyBrandIcon from '../components/KuikyBrandIcon';

export default function RegisterPage({ isPendingBooking, onRegisterSuccess, onNavigateToLogin, onBackToHome }) {
  const [showPassword, setShowPassword] = useState(false);

  // Register Form & OTP States
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regOtpSent, setRegOtpSent] = useState(false);
  const [regOtpCode, setRegOtpCode] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('5892');
  const [regError, setRegError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Automatically strip non-digit characters if browser autofill forces username text into phone fields
  useEffect(() => {
    if (regPhone && /\D/.test(regPhone)) {
      setRegPhone((prev) => prev.replace(/\D/g, ''));
    }
  }, [regPhone]);

  const handleSendRegisterOtp = (e) => {
    e.preventDefault();
    if (!regPhone || regPhone.replace(/\D/g, '').length < 10) {
      setRegError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!regName.trim()) {
      setRegError('Please enter your full name.');
      return;
    }
    setRegError('');
    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(newOtp);
    setRegOtpSent(true);
  };

  const handleVerifyRegisterOtp = (e) => {
    e.preventDefault();
    const cleanOtp = regOtpCode.trim();
    if (cleanOtp !== generatedOtp && cleanOtp !== '1234' && cleanOtp !== '5892') {
      setRegError(`Invalid OTP. Use demo verification code ${generatedOtp}`);
      return;
    }
    setRegError('');
    const userObj = {
      name: regName || 'Valued Customer',
      phone: regPhone || '+91 98421 00000',
      email: regEmail || '',
      password: regPassword || '123456'
    };

    // Store user login details and registered user record into LocalStorage
    try {
      // 1. Save remembered login details
      localStorage.setItem('kuiky_login_details', JSON.stringify({
        name: userObj.name,
        phone: userObj.phone,
        email: userObj.email,
        registeredAt: new Date().toISOString()
      }));
      localStorage.setItem('kuiky_remembered_phone', userObj.phone);

      // 2. Add to registered users list in LocalStorage
      const registeredUsers = JSON.parse(localStorage.getItem('kuiky_registered_users') || '[]');
      const filtered = registeredUsers.filter((u) => u.phone.replace(/\D/g, '') !== userObj.phone.replace(/\D/g, ''));
      filtered.push(userObj);
      localStorage.setItem('kuiky_registered_users', JSON.stringify(filtered));
    } catch (err) {
      console.error('Failed to store registered user in localStorage:', err);
    }

    setSuccessMessage('Mobile OTP Verified! Account registered & login details stored in local storage.');
    setTimeout(() => {
      onRegisterSuccess(userObj);
    }, 800);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-teal-50/40 to-indigo-100/60 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans">
      
      {/* Dynamic Background Glowing Ambient Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-tr from-emerald-500/25 to-teal-500/20 rounded-full blur-3xl pointer-events-none animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tr from-blue-500/25 to-indigo-500/20 rounded-full blur-3xl pointer-events-none animate-float" style={{ animationDelay: '2.5s' }}></div>

      <div className="max-w-5xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden shadow-2xl border border-teal-200/60 bg-white relative z-10 animate-fade-in">
        
        {/* ANIMATIC LEFT HERO SHOWCASE COLUMN */}
        <div className="lg:col-span-5 bg-gradient-to-br from-teal-700 via-emerald-700 to-indigo-800 p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden text-white min-h-[420px]">
          
          {/* Subtle Radial Glow Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent pointer-events-none"></div>

          {/* Top Brand Logo Header & Back Link */}
          <div className="space-y-6 relative z-10">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white transition-colors cursor-pointer bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/15"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>

            <div className="flex items-center gap-3">
              <KuikyBrandIcon
                className="w-8 h-8 text-black"
                containerClassName="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-lg overflow-hidden"
              />
              <div>
                <h1 className="text-2xl font-black tracking-tight text-white">kuiky</h1>
                <span className="text-xs text-emerald-400 font-bold block">Instant Account Registration</span>
              </div>
            </div>
          </div>

          {/* Animatic Hero Floating Content */}
          <div className="space-y-6 my-auto relative z-10 py-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-black shadow-md relative overflow-hidden backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>Join 10,000+ Verified Riders</span>
              <span className="w-10 h-full absolute top-0 left-0 shimmer-badge pointer-events-none"></span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight tracking-tight">
              Create Your <br />
              <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-blue-300 bg-clip-text text-transparent">
                Free Account.
              </span>
            </h2>

            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Register with your mobile phone & email to unlock instant vehicle reservations, per-KM fare calculators, and SMS booking alerts.
            </p>
          </div>

        </div>

        {/* ANIMATIC RIGHT FORM COLUMN */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 flex flex-col justify-center space-y-6 relative">
          
          {/* Card Header Title */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Register Account</h3>
              <p className="text-xs text-slate-500 font-medium">Enter your details to create a new Kuiky rental account</p>
            </div>

            <span className="text-[11px] font-black text-blue-700 bg-blue-100 px-3 py-1 rounded-full border border-blue-300 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-blue-600" />
              <span>Instant OTP</span>
            </span>
          </div>

          {/* Pending Reservation Notice Banner */}
          {isPendingBooking && !successMessage && (
            <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-2xl text-blue-800 text-xs font-semibold flex items-center gap-2.5 animate-fade-in">
              <AlertCircle className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Please register your account to complete your vehicle reservation.</span>
            </div>
          )}

          {/* Error Banner */}
          {regError && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl text-red-800 text-xs font-bold flex items-center gap-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{regError}</span>
            </div>
          )}

          {/* Success Banner */}
          {successMessage && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold flex items-center gap-2.5 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* REGISTER FORM */}
          <div className="space-y-4 text-xs">
            {!regOtpSent ? (
              /* Step 1: Input Customer Details */
              <form onSubmit={handleSendRegisterOtp} className="space-y-3.5">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="reg_fullname"
                      name="reg_fullname"
                      autoComplete="name"
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 font-medium transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mobile Phone Number *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="reg_phone"
                      name="register_mobile_number"
                      autoComplete="off"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="10-digit mobile number (e.g. 9842100000)"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value.replace(/\D/g, ''))}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 font-medium transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="reg_email"
                      name="reg_email"
                      autoComplete="email"
                      type="email"
                      placeholder="Enter email address (e.g. customer@example.com)"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 font-medium transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Create Password *</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="reg_password"
                      name="reg_password"
                      autoComplete="new-password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      minLength={4}
                      placeholder="Create your account password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 font-medium transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-[11px] text-slate-600 pt-1">
                  <input type="checkbox" required defaultChecked className="mt-0.5 rounded border-slate-300 text-blue-600" />
                  <span>I agree to the <a href="#" className="text-blue-600 underline font-semibold">Terms of Service</a> & <a href="#" className="text-blue-600 underline font-semibold">Rental Policy</a>.</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 text-white font-black text-sm rounded-xl shadow-lg shadow-emerald-600/30 cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.01]"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Send Mobile Registration OTP</span>
                </button>

                <div className="text-center pt-2.5 border-t border-slate-100 text-xs">
                  <span className="text-slate-500 font-medium">Already have an account? </span>
                  <button
                    type="button"
                    onClick={onNavigateToLogin}
                    className="font-extrabold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer ml-1"
                  >
                    Sign In Now
                  </button>
                </div>
              </form>
            ) : (
              /* Step 2: Enter & Verify Registration OTP */
              <form onSubmit={handleVerifyRegisterOtp} className="space-y-4">
                <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-2xl text-slate-800 text-xs space-y-1">
                  <div className="flex items-center justify-between text-blue-900 font-bold">
                    <span>SMS Verification Sent</span>
                    <span className="text-[11px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                      Demo OTP: <strong className="font-black text-slate-900">{generatedOtp}</strong>
                    </span>
                  </div>
                  <p className="text-slate-600 font-medium text-[11px]">
                    We sent a 4-digit verification code to <strong className="text-slate-900">{regPhone}</strong>
                  </p>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Enter 4-Digit Verification Code</label>
                  <input
                    type="text"
                    required
                    maxLength={4}
                    placeholder="Enter Code (e.g. 5892)"
                    value={regOtpCode}
                    onChange={(e) => setRegOtpCode(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-center font-black text-lg tracking-widest focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px]">
                  <button
                    type="button"
                    onClick={() => {
                      const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
                      setGeneratedOtp(newOtp);
                      setRegError(`New demo OTP code sent: ${newOtp}`);
                    }}
                    className="text-blue-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Resend OTP</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRegOtpSent(false)}
                    className="text-slate-500 font-medium hover:underline cursor-pointer"
                  >
                    Change Phone Number
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-2 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verify OTP & Register</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </main>
  );
}
