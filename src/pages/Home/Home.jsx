import React, { useState } from "react";
import { SmileOutlined, SafetyCertificateOutlined, StarOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useEffect } from 'react';
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const initialTours = [
    {
      id: 1,
      image: "src/assets/dol2.jpg",
      rating: 4.5,
      favorite: false,
      price: "IDR 100.000",
      description: "Explore the beautiful beaches and underwater life.",
      package: "Watch Dolphins"
    },
    {
      id: 2,
      image: "src/assets/dol3.jpg",
      rating: 4.7,
      favorite: true,
      price: "IDR 120.000",
      description: "Enjoy swimming with dolphins and snorkeling.",
      package: "Watch and Snorkeling"
    },
    {
      id: 3,
      image: "src/assets/dol2.jpg",
      rating: 4.3,
      favorite: false,
      price: "IDR 110.000",
      description: "A guided tour to discover dolphin habitats.",
      package: "Watch and Snorkeling"
    },
    {
      id: 4,
      image: "src/assets/dol5.jpg",
      rating: 4.9,
      favorite: false,
      price: "IDR 90.000",
      description: "Experience dolphin shows and educational programs.",
      package: "Watch Dolphins"
    },
    {
      id: 5,
      image: "src/assets/dol6.jpg",
      rating: 3.9,
      favorite: false,
      price: "IDR 90.000",
      description: "Experience dolphin shows and educational programs.",
      package: "Watch Dolphins"
    },
    {
      id: 6,
      image: "src/assets/dol7.jpg",
      rating: 4.7,
      favorite: false,
      price: "IDR 90.000",
      description: "Experience dolphin shows and educational programs.",
      package: "Watch Dolphins"
    },
  ];

  const [tours, setTours] = useState(initialTours);

  const toggleFavorite = (id) => {
    setTours(tours.map((tour) =>
      tour.id === id ? { ...tour, favorite: !tour.favorite } : tour
    ));
  };

  const navigate = useNavigate();

  const handleBooking = (tour) => {
    navigate("/booking", { state: { card: tour } }); 
  };


  useEffect(() => {
    AOS.init({
      duration: 800, // Durasi animasi dalam milidetik
      offset: 120, // Jarak elemen dari viewport sebelum animasi dimulai
      once: true, // Animasi hanya berjalan sekali
    });
  }, []);

  return (
    <div className="page-container">
      <div className="landing-page">
        <div className="hero">
          <Carousel interval={700}>
            <Carousel.Item>
              <div
                className="carousel-item"
                style={{
                  backgroundImage: "url('src/assets/act2.jpg')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '80vh',
                  color: 'white',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',

                }}
              >
                <h1>Discover the Beauty of Dolphin Watching</h1>
                <p>Join our tour for a once-in-a-lifetime experience of watching dolphins in their natural habitat.</p>
              </div>
            </Carousel.Item>

            <Carousel.Item>
              <div
                className="carousel-item"
                style={{
                  backgroundImage: "url('src/assets/act3.jpg')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '80vh',
                  color: 'white',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <h1>Experience Lovina Like Never Before</h1>
                <p>Relax and enjoy the serene beauty of Lovina Beach.</p>
              </div>
            </Carousel.Item>

            <Carousel.Item>
              <div
                className="carousel-item"
                style={{
                  backgroundImage: "url('src/assets/lumba.jpg')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '80vh',
                  color: 'white',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <h1>Unforgettable Sunrise Views</h1>
                <p>Marvel at the breathtaking sunset as you sail.</p>
              </div>
            </Carousel.Item>
          </Carousel>
        </div>

        <div id="about" className="about" data-aos="slide-up" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <h2>"Explore the Wonders of Lovina: Unforgettable Dolphin Encounters and Vibrant Snorkeling Adventures!"</h2>
            <p>Welcome to our website! We specialize in offering unforgettable tours to experience the beauty of Lovina's pristine waters. Our services include dolphin watching, where you can marvel at these magnificent creatures in their natural habitat, and snorkeling adventures, allowing you to explore vibrant coral reefs and underwater wonders.</p>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <img src="/src/assets/maskot.png" alt="Mascot" style={{ maxWidth: '70%', height: 'auto', marginLeft: '150px' }} />
          </div>
        </div>

        <div id="why-us" className="why-us" data-aos="slide-up">
  <h2>Why Choose Us</h2>
  <div className="why-us-grid">
    <div className="why-us-item">
      <div className="icon-box">
        <SmileOutlined />
      </div>
      <div className="text-box">
        <h3>Excellent Service</h3>
        <p>We provide friendly and professional customer service to make your experience unforgettable.</p>
      </div>
    </div>
    <div className="why-us-item">
      <div className="icon-box">
        <SafetyCertificateOutlined />
      </div>
      <div className="text-box">
        <h3>Guaranteed Safety</h3>
        <p>Our equipment and boats comply with international safety standards.</p>
      </div>
    </div>
    <div className="why-us-item">
      <div className="icon-box">
        <StarOutlined />
      </div>
      <div className="text-box">
        <h3>Memorable Experiences</h3>
        <p>Create lasting memories with our fun and exciting dolphin tours.</p>
      </div>
    </div>
  </div>
</div>



        {/* Special Offers Section */}
        <div className="special-offers-container" data-aos="slide-up">
          <h2 className="special-offers-title">Special Offers</h2>
          <p className="special-offers-description">
            Take advantage of exclusive discounts for a boat tour to see dolphins in Lovina. Book now for an unforgettable adventure at a special rate!
          </p>
          {/* Cards */}
          <div className="cards-container" data-aos="slide-up">
            {tours.map((tour) => (
              <Card
                key={tour.id}
                hoverable
                style={{
                  width: 400,
                  margin: '3px',
                }}
                cover={<img src={tour.image} alt={`Tour ${tour.id}`} className="card-img" />} data-aos="slide-up"
              >
                <div className="card-content">
                  <p className="rating">⭐ {tour.rating}</p>
                  <p className="price">{tour.price}</p>
                  <p className="description">{tour.description}</p>
                  <p className="package">{tour.package}</p>
                  <div className="buttons-container">
                    <button
                      className={`favorite-btn ${tour.favorite ? 'favorite' : ''}`}
                      onClick={() => toggleFavorite(tour.id)}
                    >
                      {tour.favorite ? "❤️" : "🤍"}
                    </button>
                    <button className="book-btn" onClick={() => handleBooking(tour)}>Book Now </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div id="contact" className="contact" data-aos="slide-up">
            <h2>Contact Us</h2>
            <form className="contact-form">
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" placeholder="Enter your name" required />
              <label htmlFor="email">Your Email</label>
              <input type="email" id="email" placeholder="Enter your email" required />
              <label htmlFor="message">Your Message</label>
              <textarea id="message" placeholder="Enter your message" required></textarea>
              <button type="submit" className="btn">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
