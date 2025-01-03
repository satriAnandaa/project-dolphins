import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Services from './pages/Service';
import Development from './pages/Development';
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

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="packages" element={<AllPackage />} />
            <Route path="services" element={<Services />} />
            <Route path="create" element={<CreateAccount />} />
            <Route path="playlist" element={<Playlist />} />
            <Route path="development" element={<Development />} />
            <Route path="design" element={<Design />} />
            <Route path="consulting" element={<Consulting />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="profile" element={<Profile />} />
            <Route path="booking" element={<BookingPage />} />
            <Route path="history" element={<BookingHistory />} />
          </Route>
          <Route path="/admin" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
