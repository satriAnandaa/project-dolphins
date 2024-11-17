import React, { useState } from "react";
import "./Home.css";

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
  ];

  // Use state to manage favorite status
  const [tours, setTours] = useState(initialTours);

  const toggleFavorite = (id) => {
    setTours(tours.map((tour) =>
      tour.id === id ? { ...tour, favorite: !tour.favorite } : tour
    ));
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="header-home">
        <img src="src/assets/HeaderHome.png" alt="Header" className="header-home-image" />
      </div>
      
      {/* Special Offers Section */}
      <div className="special-offers-container">
        <h2 className="special-offers-title">Special Offers</h2>
        <p className="special-offers-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      {/* Cards */}
      <div className="cards-container">
        {tours.map((tour) => (
          <div key={tour.id} className="card">
            <img src={tour.image} alt={`Tour ${tour.id}`} className="card-img" />
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
                <button className="book-btn">Book Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
