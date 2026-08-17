import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BookingPage from './pages/BookingPage';
import LoginPage from './pages/LoginPage';
import MyBookingsPage from './pages/MyBookingsPage';
import VehicleDetailsPage from './pages/VehicleDetailsPage';
import Footer from './components/Footer';
import { FLEET_DATA } from './data/fleetData';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedVehicle, setSelectedVehicle] = useState(FLEET_DATA[0]);
  const [bookingPickup, setBookingPickup] = useState('');
  const [bookingDestination, setBookingDestination] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [pendingBooking, setPendingBooking] = useState(false);
  const [customerBookings, setCustomerBookings] = useState([]);

  const handleStartBooking = (vehicle, pickup = '', destination = '') => {
    if (vehicle) setSelectedVehicle(vehicle);
    setBookingPickup(pickup);
    setBookingDestination(destination);

    if (!currentUser) {
      setPendingBooking(true);
      setCurrentPage('login');
    } else {
      setCurrentPage('booking');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewVehicleDetails = (vehicle) => {
    if (vehicle) setSelectedVehicle(vehicle);
    setCurrentPage('vehicle-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (userObj) => {
    setCurrentUser(userObj);
    if (pendingBooking) {
      setPendingBooking(false);
      setCurrentPage('booking');
    } else {
      setCurrentPage('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('login');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookingComplete = (newBookingObj) => {
    setCustomerBookings((prev) => [newBookingObj, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Navbar
        activePage={currentPage}
        currentUser={currentUser}
        bookingCount={customerBookings.length}
        onNavigate={handleNavigate}
        onStartBooking={() => handleStartBooking(selectedVehicle || FLEET_DATA[0], bookingPickup, bookingDestination)}
        onLogout={handleLogout}
      />

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
          onBackToHome={() => handleNavigate('home')}
        />
      )}

      {currentPage === 'login' && (
        <LoginPage
          isPendingBooking={pendingBooking}
          onLoginSuccess={handleLoginSuccess}
          onBackToHome={() => handleNavigate('home')}
        />
      )}

      {currentPage === 'my-bookings' && (
        <MyBookingsPage
          bookings={customerBookings}
          currentUser={currentUser}
          onSelectVehicleDetails={handleViewVehicleDetails}
          onBackToHome={() => handleNavigate('home')}
          onBookNewVehicle={() => handleNavigate('home')}
        />
      )}

      {currentPage === 'vehicle-details' && (
        <VehicleDetailsPage
          vehicle={selectedVehicle}
          onStartBooking={handleStartBooking}
          onBackToHome={() => handleNavigate('home')}
        />
      )}

      {currentPage !== 'login' && currentPage !== 'booking' && (
        <Footer onNavigate={handleNavigate} />
      )}
    </div>
  );
}
