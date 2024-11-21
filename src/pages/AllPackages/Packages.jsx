import React, { useState } from "react";
import "./Packages.css";
import { useNavigate } from "react-router-dom";

function AllPackage() {
  const initialTours = [
    { id: 1, image: "src/assets/dol2.jpg", rating: 4.5, favorite: false, price: "IDR 100.000", description: "Explore the beautiful beaches and underwater life.", package: "Watch Dolphins" },
    { id: 2, image: "src/assets/dol3.jpg", rating: 4.7, favorite: true, price: "IDR 120.000", description: "Enjoy swimming with dolphins and snorkeling.", package: "Watch and Snorkeling" },
    { id: 3, image: "src/assets/dol2.jpg", rating: 4.3, favorite: false, price: "IDR 110.000", description: "A guided tour to discover dolphin habitats.", package: "Watch and Snorkeling" },
    { id: 4, image: "src/assets/dol5.jpg", rating: 4.9, favorite: false, price: "IDR 90.000", description: "Experience dolphin shows and educational programs.", package: "Watch Dolphins" },
    { id: 5, image: "src/assets/dol6.jpg", rating: 4.0, favorite: false, price: "IDR 90.000", description: "Experience dolphin shows and educational programs.", package: "Watch Dolphins" },
    { id: 6, image: "src/assets/dol7.jpg", rating: 3.9, favorite: false, price: "IDR 90.000", description: "Experience dolphin shows and educational programs.", package: "Watch Dolphins" },
    { id: 7, image: "src/assets/dol8.jpg", rating: 3.5, favorite: false, price: "IDR 90.000", description: "Experience dolphin shows and educational programs.", package: "Watch and Snorkling" },
    { id: 8, image: "src/assets/dol9.jpg", rating: 3.1, favorite: false, price: "IDR 90.000", description: "Experience dolphin shows and educational programs.", package: "Watch and Snorkling" },
    { id: 9, image: "src/assets/dol9.jpg", rating: 3.3, favorite: false, price: "IDR 90.000", description: "Experience dolphin shows and educational programs.", package: "Watch and Snorkling" },
    { id: 10, image: "src/assets/dol8.jpg", rating: 3.2, favorite: false, price: "IDR 90.000", description: "Experience dolphin shows and educational programs.", package: "Watch and Snorkling" },
  ];

  const [tours, setTours] = useState(initialTours);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  const toggleFavorite = (id) => {
    setTours(tours.map((tour) => (tour.id === id ? { ...tour, favorite: !tour.favorite } : tour)));
  };

  const filteredTours = filter ? tours.filter((tour) => tour.package === filter) : tours;

  const handleBooking = (tour) => {
    navigate("/booking", { state: { card: tour } }); // Kirim data paket ke BookingPage
  };

  return (
    <div className="layout-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h3>Browse Through the Tour Packages</h3>
        <button onClick={() => setFilter("")}>All Packages</button>
        <button onClick={() => setFilter("Watch Dolphins")}>Watch Dolphins</button>
        <button onClick={() => setFilter("Watch and Snorkling")}>Watch and Snorkling</button>
      </div>

      {/* Cards Container */}
      <div className="cards-container-packages">
        {filteredTours.map((tour) => (
          <div key={tour.id} className="card">
            <img src={tour.image} alt={`Tour ${tour.id}`} className="card-img" />
            <div className="card-content">
              <p className="rating">⭐ {tour.rating}</p>
              <p className="price">{tour.price}</p>
              <p className="description">{tour.description}</p>
              <p className="package">{tour.package}</p>
              <div className="buttons-container">
                <button
                  className={`favorite-btn ${tour.favorite ? "favorite" : ""}`}
                  onClick={() => toggleFavorite(tour.id)}
                >
                  {tour.favorite ? "❤️" : "🤍"}
                </button>
                <button
                  className="book-btn"
                  onClick={() => handleBooking(tour)} // Navigasi dengan data spesifik
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllPackage;
