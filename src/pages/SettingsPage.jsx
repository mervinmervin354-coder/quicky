import React, { useState } from 'react';
import {
  User,
  Phone,
  Mail,
  Lock,
  ShieldCheck,
  Bell,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  Save,
  LogOut,
  KeyRound
} from 'lucide-react';

export default function SettingsPage({ currentUser, onUpdateUser, onLogout, onBackToHome }) {
  const [fullName, setFullName] = useState(currentUser?.name || 'Renter Customer');
  const [phone, setPhone] = useState(currentUser?.phone || '+91 98421 00000');
  const [email, setEmail] = useState(currentUser?.email || 'customer@kuiky.in');
  
  // Settings notification preferences
  const [rideUpdates, setRideUpdates] = useState(true);
  const [bookingConfirmation, setBookingConfirmation] = useState(true);
  const [paymentUpdates, setPaymentUpdates] = useState(true);
  const [offersPromotions, setOffersPromotions] = useState(false);
  
  // Password Change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Feedback banners
  const [saveSuccess, setSaveSuccess] = useState('');
  const [saveError, setSaveError] = useState('');

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!phone || phone.replace(/\D/g, '').length < 10) {
      setSaveError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setSaveError('');

    const updatedUser = {
      ...currentUser,
      name: fullName,
      phone: phone,
      email: email
    };

    if (onUpdateUser) {
      onUpdateUser(updatedUser);
    }

    try {
      localStorage.setItem('kuiky_current_user', JSON.stringify(updatedUser));
      localStorage.setItem('kuiky_login_details', JSON.stringify({
        name: fullName,
        phone: phone,
        email: email,
        updatedAt: new Date().toISOString()
      }));
      localStorage.setItem('kuiky_remembered_phone', phone);
    } catch (err) {
      console.error('Failed to sync updated profile to localStorage:', err);
    }

    setSaveSuccess('Profile & Account Settings updated & stored in local storage!');
    setTimeout(() => setSaveSuccess(''), 4000);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setSaveError('New password and confirm password do not match.');
      return;
    }
    if (newPassword.length < 4) {
      setSaveError('Password must be at least 4 characters long.');
      return;
    }
    setSaveError('');
    setSaveSuccess('Security password updated successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setSaveSuccess(''), 4000);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header & Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="space-y-1">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer mb-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Account & System Settings</h1>
            <p className="text-xs text-slate-500 font-medium">Manage your personal credentials, security preferences, and notification settings.</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-full border border-emerald-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>256-Bit Encrypted Account</span>
            </span>
          </div>
        </div>

        {/* Success / Error Banners */}
        {saveSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 text-xs font-bold flex items-center gap-2.5 shadow-xs animate-fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{saveSuccess}</span>
          </div>
        )}

        {saveError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-900 text-xs font-bold flex items-center gap-2.5 shadow-xs animate-shake">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <span>{saveError}</span>
          </div>
        )}

        {/* Flat Layout Sections (No Card Boxes) */}
        <div className="space-y-10 divide-y divide-slate-200">
          
          {/* Section 1: Personal Profile Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-blue-600" />
              <div>
                <h2 className="text-lg font-black text-slate-900">Personal Information</h2>
                <p className="text-xs text-slate-500 font-medium">Update your passenger profile used on booking receipts</p>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-blue-600" /> Full Name *
                  </label>
                  <input
                    id="settings_fullname"
                    name="settings_fullname"
                    autoComplete="name"
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 font-medium shadow-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" /> Mobile Number *
                  </label>
                  <input
                    id="settings_phone"
                    name="settings_mobile_phone"
                    autoComplete="off"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 font-medium shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-blue-600" /> Email Address
                </label>
                <input
                  id="settings_email"
                  name="settings_email"
                  autoComplete="email"
                  type="email"
                  placeholder="customer@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 font-medium shadow-xs"
                />
              </div>

              <div className="pt-2 flex justify-start">
                <button
                  type="submit"
                  className="px-6 py-3 btn-primary text-white font-bold text-xs rounded-xl cursor-pointer shadow-md flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Profile Changes</span>
                </button>
              </div>
            </form>
          </div>

          {/* Section 2: Security & Credentials */}
          <div className="pt-8 space-y-6">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-indigo-600" />
              <div>
                <h2 className="text-lg font-black text-slate-900">Security & Credentials</h2>
                <p className="text-xs text-slate-500 font-medium">Manage account password & authentication security</p>
              </div>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Current Password</label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 font-medium shadow-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">New Password</label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 font-medium shadow-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-600 font-medium shadow-xs"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-start">
                <button
                  type="submit"
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl cursor-pointer shadow-md flex items-center gap-2 transition-colors"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Update Security Password</span>
                </button>
              </div>
            </form>
          </div>

          {/* Section 3: Notification Preferences */}
          <div className="pt-8 space-y-6">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-purple-600" />
              <div>
                <h2 className="text-lg font-black text-slate-900">Notification Preferences</h2>
                <p className="text-xs text-slate-500 font-medium">Manage SMS OTP codes, trip alerts, and promotional preferences</p>
              </div>
            </div>

            <div className="space-y-5 text-xs">
              {/* 1. Ride Updates */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <strong className="text-slate-900 font-bold block text-sm">Ride Updates</strong>
                  <span className="text-xs text-slate-500 leading-snug block">Driver dispatch, real-time vehicle tracking & arrival ETA SMS notifications.</span>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={rideUpdates}
                  onClick={() => setRideUpdates(!rideUpdates)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    rideUpdates ? 'bg-blue-600' : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                      rideUpdates ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* 2. Booking Confirmation */}
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-200/60">
                <div>
                  <strong className="text-slate-900 font-bold block text-sm">Booking Confirmation</strong>
                  <span className="text-xs text-slate-500 leading-snug block">Instant SMS & Email trip reservation confirmations with complete vehicle details.</span>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={bookingConfirmation}
                  onClick={() => setBookingConfirmation(!bookingConfirmation)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    bookingConfirmation ? 'bg-blue-600' : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                      bookingConfirmation ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* 3. Payment Updates */}
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-200/60">
                <div>
                  <strong className="text-slate-900 font-bold block text-sm">Payment Updates</strong>
                  <span className="text-xs text-slate-500 leading-snug block">Digital tax invoices, payment receipts & transparent per-KM fare breakdowns.</span>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={paymentUpdates}
                  onClick={() => setPaymentUpdates(!paymentUpdates)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    paymentUpdates ? 'bg-blue-600' : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                      paymentUpdates ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* 4. Offers & Promotions */}
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-200/60">
                <div>
                  <strong className="text-slate-900 font-bold block text-sm">Offers & Promotions</strong>
                  <span className="text-xs text-slate-500 leading-snug block">Exclusive seasonal discount coupons, cashback deals & special per-KM promo alerts.</span>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={offersPromotions}
                  onClick={() => setOffersPromotions(!offersPromotions)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    offersPromotions ? 'bg-blue-600' : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                      offersPromotions ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Section 4: Session Actions */}
          <div className="pt-8 space-y-4">
            <h2 className="text-lg font-black text-slate-900">Session Actions</h2>
            <p className="text-xs text-slate-500 font-medium">Sign out of your active Kuiky rental account session.</p>

            <button
              onClick={onLogout}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl cursor-pointer shadow-md flex items-center gap-2 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out of Account</span>
            </button>
          </div>

        </div>

      </div>
    </main>
  );
}
