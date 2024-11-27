import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import SignBG from "/src/assets/WADOL.jpg";
import About from "/src/assets/AboutUs.png";

const AboutUs = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Durasi animasi dalam milidetik
      offset: 120,
      once: true,     // Animasi hanya berjalan sekali
    });
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", lineHeight: "1.6", textAlign: "center" }}>
      <div style={{ marginBottom: "20px" }} data-aos="fade-down">
        <img
          src={SignBG}
          alt="WADOL Logo"
          className="sign-img"
          style={{ width: "80%", borderRadius: "10px" }}
        />
      </div>
      <p style={{ fontSize: "22px" }} data-aos="fade-up" className="text-lg sm:text-xl mb-10 ml-20 mr-20">
        Welcome to <strong>WADOL</strong>, your trusted platform for purchasing tickets to witness the
        beauty and charm of dolphins up close! At WADOL, we are passionate about creating unforgettable
        experiences for families, nature enthusiasts, and marine life lovers alike.Founded on the principles of sustainability and conservation, WADOL is committed to not only
        offering extraordinary dolphin-watching experiences but also supporting the protection of
        these incredible marine creatures. Every ticket purchased helps contribute to marine
        conservation programs aimed at preserving the delicate balance of our ocean ecosystems. Join us in celebrating the wonder of dolphins and embark on a journey that will leave you with
        memories to cherish forever. At WADOL, we believe every moment matters, and we're here to make
        yours extraordinary.
      </p>
    
      <h2 style={{ color: "#007BFF", marginTop: "40px", fontSize:"25ps" }} data-aos="zoom-in">
        - Meet Our Beloved Team -
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: "20px",
        }}
      >
        <div style={{ margin: "10px", textAlign: "center" }} data-aos="slide-up">
          <img
            src={About}
            alt="About Our Team"
            style={{ width: "100%", height: "auto", objectFit: "cover", borderRadius: "25px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
