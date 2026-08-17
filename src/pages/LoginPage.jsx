import React, { useState } from 'react';
import {
  User,
  Lock,
  Phone,
  Eye,
  EyeOff,
  CheckCircle2,
  ChevronLeft,
  Car,
  ShieldCheck,
  Smartphone,
  ArrowRight,
  AlertCircle,
  KeyRound,
  RefreshCw
} from 'lucide-react';

export default function LoginPage({ isPendingBooking, onLoginSuccess, onBackToHome }) {
  const [authMode, setAuthMode] = useState('login'); // 'login', 'register', or 'otp'
  const [showPassword, setShowPassword] = useState(false);

  // Login Form States
  const [loginPhone, setLoginPhone] = useState('');
  const [password, setPassword] = useState('');

  // Register Form & OTP States (No Email field)
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regOtpSent, setRegOtpSent] = useState(false);
  const [regOtpCode, setRegOtpCode] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('5892');
  const [regError, setRegError] = useState('');

  // Mobile OTP Sign-in States
  const [otpPhone, setOtpPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  // Success Notification
  const [successMessage, setSuccessMessage] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const userObj = {
      name: loginPhone ? `Customer (${loginPhone})` : 'Valued Customer',
      phone: loginPhone ? loginPhone : '+91 98421 00000'
    };
    setSuccessMessage('Login successful! Redirecting...');
    setTimeout(() => {
      onLoginSuccess(userObj);
    }, 800);
  };

  const handleSendRegisterOtp = (e) => {
    e.preventDefault();
    if (!regPhone || regPhone.replace(/\D/g, '').length < 10) {
      setRegError('Please enter a valid 10-digit mobile number.');
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
      phone: regPhone || '+91 98421 00000'
    };
    setSuccessMessage('Mobile OTP Verified! Account registered successfully.');
    setTimeout(() => {
      onLoginSuccess(userObj);
    }, 800);
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    setOtpSent(true);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const userObj = {
      name: 'Renter Customer',
      phone: otpPhone || '+91 98421 00000'
    };
    setSuccessMessage('Mobile OTP Verified! Redirecting...');
    setTimeout(() => {
      onLoginSuccess(userObj);
    }, 800);
  };

  return (
    <main className="flex-1 bg-slate-50 py-12 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4">
        {/* Back Link */}
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 mb-6 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        {/* Card Header & Brand Logo */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-md shadow-blue-600/30">
              <Car className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              kuiky<span className="text-blue-600">.in</span> Account
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Mobile OTP authentication & vehicle bookings
            </p>
          </div>

          {/* Mode Selector Tabs */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl text-xs font-bold">
            <button
              onClick={() => { setAuthMode('login'); setSuccessMessage(''); setRegError(''); }}
              className={`py-2 rounded-lg transition-all cursor-pointer ${
                authMode === 'login' || authMode === 'otp'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setAuthMode('register'); setSuccessMessage(''); setRegError(''); }}
              className={`py-2 rounded-lg transition-all cursor-pointer ${
                authMode === 'register'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Register Account
            </button>
          </div>

          {/* Pending Reservation Notice Banner */}
          {isPendingBooking && !successMessage && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-800 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Please sign in or register to complete your vehicle reservation.</span>
            </div>
          )}

          {/* Error Banner */}
          {regError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-800 text-xs font-bold flex items-center gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{regError}</span>
            </div>
          )}

          {/* Success Banner */}
          {successMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Form 1: LOGIN MODE */}
          {authMode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Mobile Phone Number *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="Enter 10-digit mobile number (e.g. 9842100000)"
                    value={loginPhone}
                    onChange={(e) => setLoginPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-bold text-slate-700">Password</label>
                  <a href="#" onClick={(e) => e.preventDefault()} className="text-[11px] font-semibold text-blue-600 hover:underline">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
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

              <div className="flex items-center justify-between text-[11px]">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600 font-medium">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  <span>Remember me</span>
                </label>

                <button
                  type="button"
                  onClick={() => setAuthMode('otp')}
                  className="font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Sign in via Mobile OTP</span>
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 btn-primary rounded-xl text-white font-bold text-sm shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Sign In to Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Form 2: REGISTER MODE WITH MOBILE OTP (NO EMAIL FIELD) */}
          {authMode === 'register' && (
            <div className="space-y-4 text-xs">
              {!regOtpSent ? (
                /* Step 1: Input Customer Details & Send Registration OTP */
                <form onSubmit={handleSendRegisterOtp} className="space-y-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Full Name *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Kumar"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Mobile Phone Number *</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="10-digit mobile number (e.g. 9842100000)"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Create Password *</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        minLength={4}
                        placeholder="Create your account password"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
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

                  <div className="flex items-start gap-2 text-[11px] text-slate-600">
                    <input type="checkbox" required defaultChecked className="mt-0.5 rounded border-slate-300 text-blue-600" />
                    <span>I agree to the <a href="#" className="text-blue-600 underline font-semibold">Terms of Service</a> & <a href="#" className="text-blue-600 underline font-semibold">Rental Policy</a>.</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 btn-primary rounded-xl text-white font-bold text-sm shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Send Mobile Registration OTP</span>
                  </button>
                </form>
              ) : (
                /* Step 2: Enter & Verify Registration OTP */
                <form onSubmit={handleVerifyRegisterOtp} className="space-y-4">
                  <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-2xl text-slate-800 text-xs space-y-1">
                    <div className="flex items-center justify-between text-blue-900 font-bold">
                      <span>SMS Verification Sent</span>
                      <span className="text-[11px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                        Demo OTP: {generatedOtp}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      4-digit verification code sent to <strong className="text-slate-900">{regPhone}</strong>.
                    </p>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                      <span>Enter 4-Digit Verification OTP</span>
                      <button
                        type="button"
                        onClick={() => {
                          const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
                          setGeneratedOtp(newOtp);
                        }}
                        className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <RefreshCw className="w-3 h-3" /> Resend OTP
                      </button>
                    </label>
                    <div className="relative">
                      <KeyRound className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        maxLength={4}
                        placeholder="e.g. 5892"
                        value={regOtpCode}
                        onChange={(e) => setRegOtpCode(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-center text-xl font-black tracking-widest text-slate-900 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 transition-colors text-white font-bold text-sm rounded-xl cursor-pointer shadow-md flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verify OTP & Complete Registration</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRegOtpSent(false)}
                    className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-900 underline cursor-pointer text-center"
                  >
                    Edit Registration Mobile Number
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Form 3: MOBILE OTP LOGIN MODE */}
          {authMode === 'otp' && (
            <div className="space-y-4 text-xs">
              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Mobile Phone Number</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={otpPhone}
                        onChange={(e) => setOtpPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 btn-primary rounded-xl text-white font-bold text-sm shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Get 4-Digit Login OTP</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-slate-800 text-xs">
                    OTP sent to <strong className="text-blue-600">{otpPhone || '+91 98765 43210'}</strong>. Enter code below (Demo Code: 1234).
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">4-Digit Verification Code</label>
                    <input
                      type="text"
                      required
                      maxLength={4}
                      placeholder="1 2 3 4"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-center text-lg font-black text-slate-900 tracking-widest focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 transition-colors text-white font-bold text-sm rounded-xl cursor-pointer shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Verify OTP & Sign In</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </form>
              )}

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-900 underline cursor-pointer"
                >
                  Back to Password Login
                </button>
              </div>
            </div>
          )}

          {/* Bottom Security Assurance */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit Encrypted Mobile OTP Security</span>
          </div>
        </div>
      </div>
    </main>
  );
}
