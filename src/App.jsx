import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Contact from './pages/Contact';
import Services from './pages/Service';
import Development from './pages/Development';
import Design from './pages/Design';
import Consulting from './pages/Consulting';
import "./App.css";
import Navbarmenu from './components/layout/Navbarmenu';
import Playlist from './pages/Playlist/Playlist';
import CreateAccount from './pages/CreateAccount/CreateAccount';
import AllPackage from './pages/AllPackages/Packages';
import LoginPage from './pages/Login/LoginPage';

const App = () => {
  return (
    <div>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Navbarmenu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contactus" element={<Contact />} />
          <Route path="/packages" element={<AllPackage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/create" element={<CreateAccount />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/development" element={<Development />} />
          <Route path="/design" element={<Design />} />
          <Route path="/consulting" element={<Consulting />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
