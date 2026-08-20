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
  // Restore current page state from sessionStorage or browser history state upon refresh
  const [currentPage, setCurrentPage] = useState(() => {
    try {
      const savedPage = sessionStorage.getItem('kuiky_current_page') || window.history.state?.page;
      return savedPage || 'home';
    } catch (e) {
      return 'home';
    }
  });

  // Restore selected vehicle from sessionStorage upon refresh
  const [selectedVehicle, setSelectedVehicle] = useState(() => {
    try {
      const savedVehicle = sessionStorage.getItem('kuiky_selected_vehicle');
      if (savedVehicle) {
        const parsed = JSON.parse(savedVehicle);
        const match = FLEET_DATA.find((v) => v.id === parsed.id || v.name === parsed.name);
        return match || parsed;
      }
    } catch (e) {
      console.error('Error restoring selected vehicle:', e);
    }
    return FLEET_DATA[0];
  });

  // Restore booking pickup location upon refresh
  const [bookingPickup, setBookingPickup] = useState(() => {
    try {
      return sessionStorage.getItem('kuiky_booking_pickup') || '';
    } catch (e) {
      return '';
    }
  });

  // Restore booking destination location upon refresh
  const [bookingDestination, setBookingDestination] = useState(() => {
    try {
      return sessionStorage.getItem('kuiky_booking_destination') || '';
    } catch (e) {
      return '';
    }
  });
  
  // Restore current user login state from local storage if available
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('kuiky_current_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (err) {
      console.error('Failed to load user from localStorage:', err);
      return null;
    }
  });
  
  const [pendingBooking, setPendingBooking] = useState(false);
  
  // Restore customer bookings from local storage if available
  const [customerBookings, setCustomerBookings] = useState(() => {
    try {
      const savedBookings = localStorage.getItem('kuiky_customer_bookings');
      return savedBookings ? JSON.parse(savedBookings) : [];
    } catch (err) {
      console.error('Failed to load bookings from localStorage:', err);
      return [];
    }
  });

  // Initialize browser history entry & sync back/forward browser button navigation
  useEffect(() => {
    const initialPage = sessionStorage.getItem('kuiky_current_page') || window.history.state?.page || 'home';
    window.history.replaceState({ page: initialPage }, '');

    const handlePopState = (e) => {
      const page = e.state && e.state.page ? e.state.page : 'home';
      setCurrentPage(page);
      try {
        sessionStorage.setItem('kuiky_current_page', page);
      } catch (err) {
        console.error(err);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToPage = (nextPage, replace = false) => {
    setCurrentPage(nextPage);
    try {
      sessionStorage.setItem('kuiky_current_page', nextPage);
    } catch (err) {
      console.error('Failed to save page to sessionStorage:', err);
    }

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
    const targetVehicle = vehicle || selectedVehicle || FLEET_DATA[0];
    setSelectedVehicle(targetVehicle);
    setBookingPickup(pickup);
    setBookingDestination(destination);

    try {
      sessionStorage.setItem('kuiky_selected_vehicle', JSON.stringify(targetVehicle));
      sessionStorage.setItem('kuiky_booking_pickup', pickup);
      sessionStorage.setItem('kuiky_booking_destination', destination);
    } catch (err) {
      console.error('Failed to save booking state:', err);
    }

    if (!currentUser) {
      setPendingBooking(true);
      navigateToPage('login');
    } else {
      navigateToPage('booking');
    }
  };

  const handleViewVehicleDetails = (vehicle) => {
    if (vehicle) {
      setSelectedVehicle(vehicle);
      try {
        sessionStorage.setItem('kuiky_selected_vehicle', JSON.stringify(vehicle));
      } catch (err) {
        console.error('Failed to save vehicle details:', err);
      }
    }
    navigateToPage('vehicle-details');
  };

  const handleNavigate = (page) => {
    navigateToPage(page);
  };

  const handleLoginSuccess = (userObj) => {
    setCurrentUser(userObj);
    try {
      localStorage.setItem('kuiky_current_user', JSON.stringify(userObj));
    } catch (err) {
      console.error('Failed to store login user in localStorage:', err);
    }
    if (pendingBooking) {
      setPendingBooking(false);
      navigateToPage('booking', true);
    } else {
      navigateToPage('home', true);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('kuiky_current_user');
    } catch (err) {
      console.error('Failed to clear user from localStorage:', err);
    }
    navigateToPage('login');
  };

  const handleBookingComplete = (newBookingObj) => {
    setCustomerBookings((prev) => {
      const updated = [newBookingObj, ...prev];
      try {
        localStorage.setItem('kuiky_customer_bookings', JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to save bookings to localStorage:', err);
      }
      return updated;
    });
  };

  const handleCancelBooking = (bookingId) => {
    setCustomerBookings((prev) => {
      const updated = prev.filter((b) => b.id !== bookingId);
      try {
        localStorage.setItem('kuiky_customer_bookings', JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to save bookings to localStorage:', err);
      }
      return updated;
    });
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
