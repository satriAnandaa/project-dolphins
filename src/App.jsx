import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Services from './pages/Service';

import Design from './pages/Design';
import Consulting from './pages/Consulting';
import './App.css';

import Playlist from './pages/Playlist/Playlist';
import CreateAccount from './pages/CreateAccount/CreateAccount';
import AllPackage from './pages/AllPackages/Packages';
import LoginPage from './pages/Login/LoginPage';
import Profile from './pages/Profil';
import AboutUs from './pages/AboutUs/AboutuS';
import BookingPage from './pages/Booking/BookingPage';
import BookingHistory from './pages/History/BookingHistory';

import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/admin/Dashboard';
import PrivateRoute from './components/layout/PrivateRoute';
import AuthProvider from './context/AuthContext';
import ManageOther from './pages/admin/ManageOther';
import TourPackage from './pages/admin/TourPackage';

import LayoutAdmin from './pages/admin/LayoutAdmin';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Routes>

            <Route path="/" element={<PrivateRoute component={<Home />} />} />
            <Route path="about" element={<PrivateRoute component={<AboutUs />} />} />
            <Route path="packages" element={<PrivateRoute component={<AllPackage />} />} />
            <Route path="services" element={<PrivateRoute component={<Services />} />} />
            <Route path="playlist" element={<PrivateRoute component={<Playlist />} />} />
            <Route path="development" element={<PrivateRoute component={<Playlist />} />} />
            <Route path="design" element={<PrivateRoute component={<Design />} />} />
            <Route path="consulting" element={<PrivateRoute component={<Consulting />} />} />
            <Route path="profile" element={<PrivateRoute component={<Profile />} />} />
            <Route path="booking" element={<PrivateRoute component={<BookingPage />} />} />
            <Route path="history" element={<PrivateRoute component={<BookingHistory />} />} />

            <Route path="create" element={<CreateAccount />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="/dashboard" element={<LayoutAdmin > <Dashboard /> </LayoutAdmin>} />
            <Route path="/manage-other" element={<LayoutAdmin><ManageOther /></LayoutAdmin>} />
            <Route path="/tour-package" element={<LayoutAdmin><TourPackage /></LayoutAdmin>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
