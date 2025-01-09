import React, { useState, useEffect } from "react";
import { SmileOutlined, SafetyCertificateOutlined, StarOutlined } from '@ant-design/icons';
import { ChevronUp } from 'lucide-react';
import { Card } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useNavigate } from "react-router-dom";

function Home() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

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
      duration: 800,
      offset: 120,
      once: true,
    });

    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="w-full bg-gradient-to-b from-blue-100 to-white font-montserrat">
      
      <div className="relative">
        <Carousel interval={700}>
          <Carousel.Item>
            <div
              className="bg-cover bg-center h-[80vh] text-white text-center flex flex-col justify-center items-center"
              style={{ backgroundImage: "url('src/assets/act2.jpg')" }}
            >
              <h1 className="text-6xl font-bold mb-5">Discover the Beauty of Dolphin Watching</h1>
              <p className="text-lg">Join our tour for a once-in-a-lifetime experience of watching dolphins in their natural habitat.</p>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div
              className="bg-cover bg-center h-[80vh] text-white text-center flex flex-col justify-center items-center"
              style={{ backgroundImage: "url('src/assets/act3.jpg')" }}
            >
              <h1 className="text-6xl font-bold mb-5">Experience Lovina Like Never Before</h1>
              <p className="text-lg">Relax and enjoy the serene beauty of Lovina Beach.</p>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div
              className="bg-cover bg-center h-[80vh] text-white text-center flex flex-col justify-center items-center"
              style={{ backgroundImage: "url('src/assets/lumba.jpg')" }}
            >
              <h1 className="text-6xl font-bold mb-5">Unforgettable Sunrise Views</h1>
              <p className="text-lg">Marvel at the breathtaking sunset as you sail.</p>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>

      <div id="about" className="flex flex-col md:flex-row items-center gap-8 p-8 md:px-20">
        <div className="flex-1 text-left">
          <h2 className="text-2xl font-bold text-gray-900">"Explore the Wonders of Lovina: Unforgettable Dolphin Encounters and Vibrant Snorkeling Adventures!"</h2>
          <p className="mt-4 text-lg leading-8">Welcome to our website! We specialize in offering unforgettable tours to experience the beauty of Lovina's pristine waters. Our services include dolphin watching, where you can marvel at these magnificent creatures in their natural habitat, and snorkeling adventures, allowing you to explore vibrant coral reefs and underwater wonders.</p>
        </div>
        <div className="flex-1 flex justify-center">
          <img src="/src/assets/maskot.png" alt="Mascot" className="w-3/4 md:w-2/3" />
        </div>
      </div>

      <div id="why-us" className="text-center p-8">
        <h2 className="text-3xl font-bold mb-8">Why Choose Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
          <div className="flex flex-col items-center">
            <div className="bg-blue-900 text-white w-20 h-20 flex justify-center items-center rounded-lg text-2xl mb-4">
              <SmileOutlined />
            </div>
            <h3 className="text-lg font-bold">Excellent Service</h3>
            <p className="text-gray-600">We provide friendly and professional customer service to make your experience unforgettable.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-blue-900 text-white w-20 h-20 flex justify-center items-center rounded-lg text-2xl mb-4">
              <SafetyCertificateOutlined />
            </div>
            <h3 className="text-lg font-bold">Guaranteed Safety</h3>
            <p className="text-gray-600">Our equipment and boats comply with international safety standards.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-blue-900 text-white w-20 h-20 flex justify-center items-center rounded-lg text-2xl mb-4">
              <StarOutlined />
            </div>
            <h3 className="text-lg font-bold">Memorable Experiences</h3>
            <p className="text-gray-600">Create lasting memories with our fun and exciting dolphin tours.</p>
          </div>
        </div>
      </div>

      <div className="text-center p-8">
        <h2 className="text-3xl font-bold mb-6">Special Offers</h2>
        <p className="text-gray-600 mb-8">Take advantage of exclusive discounts for a boat tour...</p>
        <div className="flex flex-wrap justify-center gap-20">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="w-full md:w-1/4"
              data-aos="fade-up"
            >
              <Card
                hoverable
                cover={<img alt={`Tour ${tour.id}`} src={tour.image} />}
                actions={[
                  <button
                    className={`text-2xl ${tour.favorite ? 'text-red-500' : 'text-gray-400'}`}
                    onClick={() => toggleFavorite(tour.id)}
                  >
                    {tour.favorite ? "❤️" : "🤍"}
                  </button>,
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                    onClick={() => handleBooking(tour)}
                  >
                    Book Now
                  </button>
                ]}
              >
                <Card.Meta
                  title={`⭐ ${tour.rating}`}
                  description={<div><p className="text-blue-500 font-bold text-lg">{tour.price}</p><p className="text-gray-600 text-sm">{tour.description}</p><p className="text-green-500 font-semibold text-sm">{tour.package}</p></div>}
                />
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div id="contact" className="text-center p-8">
        <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
        <form className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
          <label htmlFor="name" className="block text-lg font-bold mb-2">Your Name</label>
          <input type="text" id="name" placeholder="Enter your name" className="w-full p-3 border rounded mb-4" required />
          <label htmlFor="email" className="block text-lg font-bold mb-2">Your Email</label>
          <input type="email" id="email" placeholder="Enter your email" className="w-full p-3 border rounded mb-4" required />
          <label htmlFor="message" className="block text-lg font-bold mb-2">Your Message</label>
          <textarea id="message" placeholder="Enter your message" className="w-full p-3 border rounded mb-4" required></textarea>
          <button type="submit" className="bg-yellow-500 text-white py-3 px-6 rounded-full hover:bg-yellow-600">Submit</button>
        </form>
      </div>

      {isVisible && 
        <div 
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 cursor-pointer transform transition-transform duration-200 hover:scale-110"
        >
          <div className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg flex items-center justify-center">
            <ChevronUp size={24} />
          </div>
        </div>
      }
    </div>
  );
}

export default Home;