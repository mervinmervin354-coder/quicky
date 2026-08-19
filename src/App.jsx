import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BookingPage from './pages/BookingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MyBookingsPage from './pages/MyBookingsPage';
import VehicleDetailsPage from './pages/VehicleDetailsPage';
import SettingsPage from './pages/SettingsPage';
import ContactPage from './pages/ContactPage';
import Footer from './components/Footer';
import { FLEET_DATA } from './data/vehiclesData';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedVehicle, setSelectedVehicle] = useState(FLEET_DATA[0]);
  const [bookingPickup, setBookingPickup] = useState('');
  const [bookingDestination, setBookingDestination] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [pendingBooking, setPendingBooking] = useState(false);
  const [customerBookings, setCustomerBookings] = useState([]);

  // Initialize browser history entry & sync back/forward browser button navigation
  useEffect(() => {
    if (!window.history.state || !window.history.state.page) {
      window.history.replaceState({ page: 'home' }, '');
    }

    const handlePopState = (e) => {
      if (e.state && e.state.page) {
        setCurrentPage(e.state.page);
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToPage = (nextPage, replace = false) => {
    setCurrentPage(nextPage);
    if (replace) {
      window.history.replaceState({ page: nextPage }, '');
    } else {
      window.history.pushState({ page: nextPage }, '');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackNavigation = () => {
    if (window.history.state && window.history.state.page && window.history.state.page !== 'home') {
      window.history.back();
    } else {
      navigateToPage('home');
    }
  };

  const handleStartBooking = (vehicle, pickup = '', destination = '') => {
    if (vehicle) setSelectedVehicle(vehicle);
    setBookingPickup(pickup);
    setBookingDestination(destination);

    if (!currentUser) {
      setPendingBooking(true);
      navigateToPage('login');
    } else {
      navigateToPage('booking');
    }
  };

  const handleViewVehicleDetails = (vehicle) => {
    if (vehicle) setSelectedVehicle(vehicle);
    navigateToPage('vehicle-details');
  };

  const handleNavigate = (page) => {
    navigateToPage(page);
  };

  const handleLoginSuccess = (userObj) => {
    setCurrentUser(userObj);
    if (pendingBooking) {
      setPendingBooking(false);
      navigateToPage('booking', true);
    } else {
      navigateToPage('home', true);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigateToPage('login');
  };

  const handleBookingComplete = (newBookingObj) => {
    setCustomerBookings((prev) => [newBookingObj, ...prev]);
  };

  const handleCancelBooking = (bookingId) => {
    setCustomerBookings((prev) => prev.filter((b) => b.id !== bookingId));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {currentPage !== 'login' && currentPage !== 'register' && (
        <Navbar
          activePage={currentPage}
          currentUser={currentUser}
          bookingCount={customerBookings.length}
          onNavigate={handleNavigate}
          onStartBooking={() => handleStartBooking(selectedVehicle || FLEET_DATA[0], bookingPickup, bookingDestination)}
          onLogout={handleLogout}
        />
      )}

      {currentPage === 'home' && (
        <Home
          onSelectVehicleForBooking={handleStartBooking}
          onSelectVehicleDetails={handleViewVehicleDetails}
          onNavigateToLogin={() => handleNavigate('login')}
        />
      )}

      {currentPage === 'booking' && (
        <BookingPage
          vehicle={selectedVehicle}
          initialPickup={bookingPickup}
          initialDestination={bookingDestination}
          currentUser={currentUser}
          onBookingComplete={handleBookingComplete}
          onSelectVehicleDetails={handleViewVehicleDetails}
          onBackToHome={handleBackNavigation}
        />
      )}

      {currentPage === 'login' && (
        <LoginPage
          isPendingBooking={pendingBooking}
          onLoginSuccess={handleLoginSuccess}
          onNavigateToRegister={() => handleNavigate('register')}
          onBackToHome={handleBackNavigation}
        />
      )}

      {currentPage === 'register' && (
        <RegisterPage
          isPendingBooking={pendingBooking}
          onRegisterSuccess={handleLoginSuccess}
          onNavigateToLogin={() => handleNavigate('login')}
          onBackToHome={handleBackNavigation}
        />
      )}

      {currentPage === 'my-bookings' && (
        <MyBookingsPage
          bookings={customerBookings}
          currentUser={currentUser}
          onSelectVehicleDetails={handleViewVehicleDetails}
          onCancelBooking={handleCancelBooking}
          onBackToHome={handleBackNavigation}
          onBookNewVehicle={() => handleNavigate('home')}
        />
      )}

      {currentPage === 'vehicle-details' && (
        <VehicleDetailsPage
          vehicle={selectedVehicle}
          onStartBooking={handleStartBooking}
          onBackToHome={handleBackNavigation}
        />
      )}

      {currentPage === 'settings' && (
        <SettingsPage
          currentUser={currentUser}
          onUpdateUser={(updatedUser) => setCurrentUser(updatedUser)}
          onLogout={handleLogout}
          onBackToHome={handleBackNavigation}
        />
      )}

      {currentPage === 'contact' && (
        <ContactPage
          onBackToHome={handleBackNavigation}
        />
      )}

      {currentPage !== 'login' && currentPage !== 'register' && currentPage !== 'booking' && currentPage !== 'settings' && (
        <Footer onNavigate={handleNavigate} />
      )}
    </div>
  );
}
