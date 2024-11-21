import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as Icons from "react-icons/gi"; 
import "./Navbarmenu.css";
import { navItems } from "./NavItem";
import Button from "../Button/Button";
import Dropdown from "../Dropdown/Dropdown";
import { useAuth } from "../../context/AuthContext"; // Import useAuth untuk autentikasi

function Navbarmenu() {
  const [dropdown, setDropdown] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false); // State untuk profile dropdown
  const [isHovered, setIsHovered] = useState(false); // State untuk mencegah dropdown hilang terlalu cepat
  const { isLoggedIn, logout } = useAuth(); // Mengambil status login dan fungsi logout dari AuthContext

  return (
    <>
      <nav className="navbar">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          WADOL
          <Icons.GiDolphin /> {/* Ganti ikon dengan lumba-lumba */}
        </Link>

        {/* Menu Items */}
        <ul className="nav-item">
          {navItems.map((item) => {
            if (item.title === "Pages") {
              return (
                <li
                  key={item.id}
                  className={item.cName}
                  onMouseEnter={() => setDropdown(true)}
                  onMouseLeave={() => setDropdown(false)}
                >
                  <Link to={item.path}>{item.title}</Link>
                  {dropdown && <Dropdown />}
                </li>
              );
            }
            return (
              <li key={item.id} className={item.cName}>
                <Link to={item.path}>{item.title}</Link>
              </li>
            );
          })}
        </ul>

        {/* Tampilkan Avatar atau Tombol Create Account */}
        {isLoggedIn ? (
          // Jika login, tampilkan avatar dan menu dropdown
          <div
            className="profile-dropdown h-20 w-20 flex justify-center items-center"
            onMouseEnter={() => {
              setIsHovered(true);
              setProfileDropdown(true);
            }} // Menampilkan dropdown saat hover
            onMouseLeave={() => {
              setIsHovered(false);
              setTimeout(() => {
                if (!isHovered) {
                  setProfileDropdown(false); // Menyembunyikan dropdown setelah sedikit delay
                }
              }, 200); // Delay sebelum menyembunyikan dropdown
            }}
          >
            <img
              src="/src/assets/wipa.JPG" // Ganti dengan URL gambar avatar
              alt="User Avatar"
              className="profile-avatar"
            />
            {profileDropdown && (
              <div className="dropdown-menu m-3">
                <ul>
                  <li>
                    <Link to="/profile">My Profile</Link>
                  </li>
                  <li>
                    <Link to="/history">My History</Link>
                  </li>
                  <li onClick={logout}>Logout</li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          // Jika belum login, tampilkan tombol Create Account
          <Button />
        )}
      </nav>
    </>
  );
}

export default Navbarmenu;
