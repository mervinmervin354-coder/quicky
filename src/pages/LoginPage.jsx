import React, { useState, useEffect } from 'react';
import {
  User,
  Lock,
  Phone,
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
  KeyRound,
  RefreshCw
} from 'lucide-react';
import KuikyBrandIcon from '../components/KuikyBrandIcon';

const DEFAULT_DEMO_USERS = [
  {
    name: 'Ramesh Kumar',
    phone: '9842100000',
    email: 'ramesh@example.com',
    password: 'password123'
  },
  {
    name: 'Priya Sharma',
    phone: '9876543210',
    email: 'priya@example.com',
    password: '123456'
  }
];

const getRegisteredUsers = () => {
  try {
    const stored = localStorage.getItem('kuiky_registered_users');
    if (!stored) {
      localStorage.setItem('kuiky_registered_users', JSON.stringify(DEFAULT_DEMO_USERS));
      return DEFAULT_DEMO_USERS;
    }
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem('kuiky_registered_users', JSON.stringify(DEFAULT_DEMO_USERS));
      return DEFAULT_DEMO_USERS;
    }
    return parsed;
  } catch (err) {
    return DEFAULT_DEMO_USERS;
  }
};

export default function LoginPage({ isPendingBooking, onLoginSuccess, onNavigateToRegister, onBackToHome }) {
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'otp'
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [hasSavedDetails, setHasSavedDetails] = useState(false);

  // Login Form States
  const [loginPhone, setLoginPhone] = useState('');
  const [password, setPassword] = useState('');

  // Mobile OTP Sign-in States
  const [otpPhone, setOtpPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('5892');

  // Feedback Messages
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Automatically restore stored login details from LocalStorage on mount
  useEffect(() => {
    try {
      const savedDetails = localStorage.getItem('kuiky_login_details');
      const savedPhone = localStorage.getItem('kuiky_remembered_phone');
      let phoneToUse = savedPhone || '';

      if (!phoneToUse && savedDetails) {
        const parsed = JSON.parse(savedDetails);
        phoneToUse = parsed?.phone || '';
      }

      if (phoneToUse) {
        setLoginPhone(phoneToUse);
        setOtpPhone(phoneToUse);
        setHasSavedDetails(true);
      }
    } catch (err) {
      console.error('Error loading saved login details from localStorage:', err);
    }
  }, []);

  // Automatically strip non-digit characters if browser autofill forces username text into phone fields
  useEffect(() => {
    if (loginPhone && /\D/.test(loginPhone)) {
      setLoginPhone((prev) => prev.replace(/\D/g, ''));
    }
  }, [loginPhone]);

  useEffect(() => {
    if (otpPhone && /\D/.test(otpPhone)) {
      setOtpPhone((prev) => prev.replace(/\D/g, ''));
    }
  }, [otpPhone]);

  const handleClearSavedDetails = () => {
    try {
      localStorage.removeItem('kuiky_login_details');
      localStorage.removeItem('kuiky_remembered_phone');
      setHasSavedDetails(false);
      setLoginPhone('');
      setOtpPhone('');
      setErrorMessage('Saved login details cleared from local storage.');
      setTimeout(() => setErrorMessage(''), 3500);
    } catch (err) {
      console.error('Failed to clear saved login details:', err);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const cleanPhone = loginPhone.replace(/\D/g, '');

    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your account password.');
      return;
    }

    setErrorMessage('');

    // 1. Fetch registered users from LocalStorage and verify user exists
    const registeredUsers = getRegisteredUsers();
    const foundUser = registeredUsers.find(
      (u) => u.phone.replace(/\D/g, '') === cleanPhone
    );

    if (!foundUser) {
      setErrorMessage('Account not found! Only registered users can sign in. Please register an account first.');
      return;
    }

    // 2. Validate password matches registered user password
    if (foundUser.password && foundUser.password !== password) {
      setErrorMessage('Incorrect password! Please enter the correct password for your account.');
      return;
    }

    // Save login details to LocalStorage if "Remember me" is selected
    if (rememberMe) {
      try {
        const loginData = {
          phone: cleanPhone,
          lastLoginTime: new Date().toISOString()
        };
        localStorage.setItem('kuiky_login_details', JSON.stringify(loginData));
        localStorage.setItem('kuiky_remembered_phone', cleanPhone);
      } catch (err) {
        console.error('Failed to save login details to localStorage:', err);
      }
    } else {
      try {
        localStorage.removeItem('kuiky_login_details');
        localStorage.removeItem('kuiky_remembered_phone');
      } catch (err) {
        console.error('Failed to clear login details from localStorage:', err);
      }
    }

    const userObj = {
      name: foundUser.name || 'Valued Customer',
      phone: foundUser.phone || cleanPhone,
      email: foundUser.email || ''
    };

    setSuccessMessage(`Login successful! Welcome back, ${userObj.name}. Redirecting...`);
    setTimeout(() => {
      onLoginSuccess(userObj);
    }, 800);
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    const cleanPhone = otpPhone.replace(/\D/g, '');

    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    const registeredUsers = getRegisteredUsers();
    const foundUser = registeredUsers.find(
      (u) => u.phone.replace(/\D/g, '') === cleanPhone
    );

    if (!foundUser) {
      setErrorMessage('Mobile number is not registered. Only registered users can sign in via OTP. Please register first.');
      return;
    }

    setErrorMessage('');
    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(newOtp);
    setOtpSent(true);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const cleanOtp = otpCode.trim();
    if (cleanOtp !== generatedOtp && cleanOtp !== '1234' && cleanOtp !== '5892') {
      setErrorMessage(`Invalid OTP code. Use demo code ${generatedOtp}`);
      return;
    }
    setErrorMessage('');

    const targetPhone = otpPhone.replace(/\D/g, '') || loginPhone.replace(/\D/g, '');
    const registeredUsers = getRegisteredUsers();
    const foundUser = registeredUsers.find(
      (u) => u.phone.replace(/\D/g, '') === targetPhone
    );

    if (!foundUser) {
      setErrorMessage('Account not found. Only registered users can sign in. Please register first.');
      return;
    }

    if (rememberMe) {
      try {
        const loginData = {
          phone: targetPhone,
          lastLoginTime: new Date().toISOString()
        };
        localStorage.setItem('kuiky_login_details', JSON.stringify(loginData));
        localStorage.setItem('kuiky_remembered_phone', targetPhone);
      } catch (err) {
        console.error('Failed to save login details to localStorage:', err);
      }
    }

    const userObj = {
      name: foundUser.name || 'Valued Customer',
      phone: foundUser.phone || targetPhone,
      email: foundUser.email || ''
    };

    setSuccessMessage(`Mobile OTP Verified! Welcome back, ${userObj.name}. Redirecting...`);
    setTimeout(() => {
      onLoginSuccess(userObj);
    }, 800);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50/50 to-indigo-100/60 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans">
      
      {/* Dynamic Background Glowing Ambient Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-tr from-blue-500/30 to-indigo-500/20 rounded-full blur-3xl pointer-events-none animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tr from-purple-500/25 to-pink-500/20 rounded-full blur-3xl pointer-events-none animate-float" style={{ animationDelay: '2.5s' }}></div>

      <div className="max-w-5xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden shadow-2xl border border-blue-200/60 bg-white relative z-10 animate-fade-in">
        
        {/* ANIMATIC LEFT HERO SHOWCASE COLUMN */}
        <div className="lg:col-span-5 bg-gradient-to-br from-blue-700 via-indigo-700 to-violet-800 p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden text-white min-h-[420px]">
          
          {/* Subtle Shimmer Texture */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent pointer-events-none"></div>

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
                <span className="text-xs text-blue-300 font-bold block">Certified Fleet Logistics</span>
              </div>
            </div>
          </div>

          {/* Animatic Hero Floating Content */}
          <div className="space-y-6 my-auto relative z-10 py-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-black shadow-md relative overflow-hidden backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
              <span>Instant OTP Authentication</span>
              <span className="w-10 h-full absolute top-0 left-0 shimmer-badge pointer-events-none"></span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight tracking-tight">
              Welcome Back to <br />
              <span className="bg-gradient-to-r from-blue-300 via-teal-200 to-emerald-300 bg-clip-text text-transparent">
                Your Next Ride.
              </span>
            </h2>

            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Access verified vehicles in your region with transparent per-KM rates and 256-bit encrypted security.
            </p>
          </div>

        </div>

        {/* ANIMATIC RIGHT FORM COLUMN */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-12 flex flex-col justify-center space-y-6 relative">
          
          {/* Card Title Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                {authMode === 'otp' ? 'Mobile OTP Sign In' : 'Account Sign In'}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {authMode === 'otp' ? 'Sign in via instant 4-digit SMS OTP code' : 'Sign in to manage bookings and reserve vehicles'}
              </p>
            </div>

            <span className="text-[11px] font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified</span>
            </span>
          </div>

          {/* Pending Reservation Notice Banner */}
          {isPendingBooking && !successMessage && (
            <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-2xl text-blue-800 text-xs font-semibold flex items-center gap-2.5 animate-fade-in">
              <AlertCircle className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Please sign in to complete your pending vehicle reservation.</span>
            </div>
          )}

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl text-red-800 text-xs font-bold flex items-center gap-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Success Banner */}
          {successMessage && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold flex items-center gap-2.5 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* FORM MODE 1: PASSWORD SIGN IN */}
          {authMode === 'login' && (
            <form onSubmit={handleLoginSubmit} autoComplete="off" className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Mobile Phone Number *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="login_phone"
                    name="mobile_number"
                    autoComplete="off"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="Enter 10-digit mobile number (e.g. 9842100000)"
                    value={loginPhone}
                    onChange={(e) => setLoginPhone(e.target.value.replace(/\D/g, ''))}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 font-medium transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-bold text-slate-700">Password</label>
                  <a href="#" onClick={(e) => e.preventDefault()} className="text-[11px] font-bold text-blue-600 hover:underline">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="login_password"
                    name="login_password"
                    autoComplete="current-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 font-medium transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/20"
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
                <label className="flex items-center gap-2 cursor-pointer text-slate-600 font-semibold">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <span>Remember login details (Local Storage)</span>
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
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-sm rounded-xl shadow-lg shadow-blue-600/30 cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.01]"
              >
                <span>Sign In to Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-3 border-t border-slate-100 text-xs">
                <span className="text-slate-500 font-medium">Don't have an account? </span>
                <button
                  type="button"
                  onClick={onNavigateToRegister}
                  className="font-extrabold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer ml-1"
                >
                  Sign Up / Register Now
                </button>
              </div>
            </form>
          )}

          {/* FORM MODE 2: MOBILE OTP SIGN IN */}
          {authMode === 'otp' && (
            <div className="space-y-4 text-xs">
              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Mobile Phone Number *</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="otp_phone"
                        name="otp_mobile_number"
                        autoComplete="off"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="10-digit mobile number (e.g. 9842100000)"
                        value={otpPhone}
                        onChange={(e) => setOtpPhone(e.target.value.replace(/\D/g, ''))}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-sm rounded-xl shadow-lg shadow-blue-600/30 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Send Mobile Login OTP</span>
                  </button>

                  <div className="text-center pt-1 text-[11px]">
                    <button
                      type="button"
                      onClick={() => setAuthMode('login')}
                      className="font-bold text-slate-600 hover:text-blue-600 hover:underline cursor-pointer"
                    >
                      ← Back to Password Sign In
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-2xl text-slate-800 text-xs space-y-1">
                    <div className="flex items-center justify-between text-blue-900 font-bold">
                      <span>SMS Verification Sent</span>
                      <span className="text-[11px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                        Demo OTP: <strong className="font-black text-slate-900">{generatedOtp}</strong>
                      </span>
                    </div>
                    <p className="text-slate-600 font-medium text-[11px]">
                      Enter 4-digit code sent to <strong className="text-slate-900">{otpPhone}</strong>
                    </p>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Enter 4-Digit OTP Code</label>
                    <input
                      type="text"
                      required
                      maxLength={4}
                      placeholder="Enter Code (e.g. 5892)"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-center font-black text-lg tracking-widest focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <button
                      type="button"
                      onClick={() => {
                        const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
                        setGeneratedOtp(newOtp);
                        setErrorMessage(`New demo OTP sent: ${newOtp}`);
                      }}
                      className="text-blue-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Resend OTP</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="text-slate-500 font-medium hover:underline cursor-pointer"
                    >
                      Change Number
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-2 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verify OTP & Sign In</span>
                  </button>
                </form>
              )}

              <div className="text-center pt-3 border-t border-slate-100 text-xs">
                <span className="text-slate-500 font-medium">Don't have an account? </span>
                <button
                  type="button"
                  onClick={onNavigateToRegister}
                  className="font-extrabold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer ml-1"
                >
                  Sign Up / Register Now
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </main>
  );
}
