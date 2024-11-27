import React from 'react';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, EnvironmentOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import './Footer.css'; // File CSS untuk styling

const Footers = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Kolom 1: Company Info */}
        <div className="footer-column">
          <h2 className="footer-title">WADOL</h2>
          <p className="footer-text">
          We specialize in offering unforgettable tours to experience the beauty of Lovina's pristine waters. Our services include dolphin watching, where you can marvel at these magnificent creatures in their natural habitat, and snorkeling adventures, allowing you to explore vibrant coral reefs and underwater wonders.
          </p>
        </div>

        {/* Kolom 2: Links */}
        <div className="footer-column">
          <h3 className="footer-title">Links</h3>
          <ul className="footer-list">
            <li><a href="#home" className="footer-link">Home</a></li>
            <li><a href="#about" className="footer-link">Pages</a></li>
            <li><a href="#contact" className="footer-link">All Packages</a></li>
            <li><a href="#services" className="footer-link">Contact Us</a></li>
          </ul>
        </div>

        {/* Kolom 3: Provides */}
        <div className="footer-column">
          <h3 className="footer-title">Provides</h3>
          <ul className="footer-list">
            <li><a href="#html" className="footer-link">Watch dolphin</a></li>
            <li><a href="#css" className="footer-link">Snorkeling</a></li>
          </ul>
        </div>

        {/* Kolom 4: Contact Us */}
        <div className="footer-column">
          <h3 className="footer-title">Contact Us</h3>
          <ul className="footer-contact">
          <li>
        <EnvironmentOutlined style={{ marginRight: 8 }} />
        Kalibukbuk Village, Singaraja, Bali, Indonesia
      </li>
      <li>
        <PhoneOutlined style={{ marginRight: 8 }} />
        081234567890
      </li>
      <li>
        <MailOutlined style={{ marginRight: 8 }} />
        wadolovina@gmail.com
      </li>
          </ul>
          <div className="footer-icons">
            <a href="#facebook" className="footer-icon">
              <FacebookOutlined />
            </a>
            <a href="#twitter" className="footer-icon">
              <TwitterOutlined />
            </a>
            <a href="#instagram" className="footer-icon">
              <InstagramOutlined />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footers;
