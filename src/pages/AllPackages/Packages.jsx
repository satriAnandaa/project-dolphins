import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { LayoutGrid, List } from "lucide-react";

function AllPackage() {
  const initialTours = [
  { id: 1, image: "src/assets/dol2.jpg", rating: 4.5, favorite: false, price: "IDR 100.000", description: "Explore the beautiful beaches and underwater life.", package: "Watch Dolphins", capacity: 6, bookedSeats: 2 },
  { id: 2, image: "src/assets/dol3.jpg", rating: 4.7, favorite: true, price: "IDR 120.000", description: "Enjoy swimming with dolphins and snorkeling.", package: "Watch and Snorkeling", capacity: 6, bookedSeats: 4 },
  { id: 3, image: "src/assets/dol2.jpg", rating: 4.3, favorite: false, price: "IDR 110.000", description: "A guided tour to discover dolphin habitats.", package: "Watch and Snorkeling", capacity: 6, bookedSeats: 2 },
  { id: 4, image: "src/assets/dol5.jpg", rating: 4.9, favorite: false, price: "IDR 90.000", description: "Experience dolphin shows and educational programs.", package: "Watch Dolphins", capacity: 6, bookedSeats: 2 },
  { id: 5, image: "src/assets/dol6.jpg", rating: 4.0, favorite: false, price: "IDR 90.000", description: "Experience dolphin shows and educational programs.", package: "Watch Dolphins", capacity: 6, bookedSeats: 2 },
  { id: 6, image: "src/assets/dol7.jpg", rating: 3.9, favorite: false, price: "IDR 90.000", description: "Experience dolphin shows and educational programs.", package: "Watch Dolphins", capacity: 6, bookedSeats: 2 },
  { id: 7, image: "src/assets/dol8.jpg", rating: 3.5, favorite: false, price: "IDR 90.000", description: "Experience dolphin shows and educational programs.", package: "Watch and Snorkeling", capacity: 6, bookedSeats: 2 },
  { id: 8, image: "src/assets/dol9.jpg", rating: 3.1, favorite: false, price: "IDR 90.000", description: "Experience dolphin shows and educational programs.", package: "Watch and Snorkeling", capacity: 6, bookedSeats: 2 },
  { id: 9, image: "src/assets/dol9.jpg", rating: 3.3, favorite: false, price: "IDR 90.000", description: "Experience dolphin shows and educational programs.", package: "Watch and Snorkeling", capacity: 6, bookedSeats: 2 },
  { id: 10, image: "src/assets/dol8.jpg", rating: 3.2, favorite: false, price: "IDR 90.000", description: "Experience dolphin shows and educational programs.", package: "Watch and Snorkeling", capacity: 6, bookedSeats: 4 },

  ];

  const [tours, setTours] = useState(initialTours);
  const [filter, setFilter] = useState("");
  const [searchText, setSearchText] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [isGridView, setIsGridView] = useState(true);
  const navigate = useNavigate();
  const toggleFavorite = (id) => {
    setTours(tours.map((tour) => (tour.id === id ? { ...tour, favorite: !tour.favorite } : tour)));
  };

  const filteredTours = filter ? tours.filter((tour) => tour.package === filter) : tours;

  const handleBooking = (tour) => {
    navigate("/booking", { state: { card: tour } });
  };

  const handleSearch = (value) => {
    setSearchText(value.toLowerCase());


  };

  let dataSourceFiltered = dataSource.filter((item) => {
    return (
      (item?.play_name?.toLocaleLowerCase() || " ").includes(searchText) ||
      (item?.play_genre?.toLocaleLowerCase() || " ").includes(searchText)
    );
  });

  const ListViewItem = ({ tour }) => (
    <div className="bg-white border shadow-lg rounded-lg p-4 mb-4 flex items-center hover:shadow-xl transition-shadow">
      <img src={tour.image} alt={`Tour ${tour.id}`} className="w-24 h-24 object-cover rounded-lg" />
      <div className="ml-4 flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-lg font-semibold text-gray-800">{tour.package}</p>
            <p className="text-sm text-gray-600">⭐ {tour.rating}</p>
            <p className="text-sm text-gray-600">{tour.description}</p>
          </div>
          <p className="text-lg font-semibold text-gray-800">{tour.price}</p>
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className="text-sm text-gray-600">Seats Available: {tour.capacity - tour.bookedSeats}</p>
          <div className="flex items-center gap-4">
            <button
              className={`text-2xl ${tour.favorite ? 'text-red-500' : 'text-gray-400'}`}
              onClick={() => toggleFavorite(tour.id)}
            >
              {tour.favorite ? "❤️" : "🤍"}
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition"
              onClick={() => handleBooking(tour)}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const GridViewItem = ({ tour }) => (
    <div className="bg-white border shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300">
      <img src={tour.image} alt={`Tour ${tour.id}`} className="w-full h-48 object-cover" />
      <div className="p-4">
        <p className="text-sm text-gray-600 mb-2">⭐ {tour.rating}</p>
        <p className="text-lg font-semibold text-gray-800">{tour.price}</p>
        <p className="text-sm text-gray-600 mb-4">{tour.description}</p>
        <p className="text-sm font-medium text-gray-700 mb-2">{tour.package}</p>
        <p className="text-sm text-gray-600">Seats Available: {tour.capacity - tour.bookedSeats}</p>
        
        <div className="w-full h-px bg-gray-300 my-4"></div>
        <div className="flex justify-between items-center mt-4">
          <button
            className={`text-2xl ${tour.favorite ? 'text-red-500' : 'text-gray-400'}`}
            onClick={() => toggleFavorite(tour.id)}
          >
            {tour.favorite ? "❤️" : "🤍"}
          </button>
          <div className="w-px h-8 bg-gray-300"></div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition"
            onClick={() => handleBooking(tour)}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col p-6">
      {/* Search Bar and View Toggle */}
      <div className="w-full flex justify-center items-center gap-4 mb-6">
        <Input
          placeholder="Search for tours..."
          prefix={<SearchOutlined />}
          className="rounded-lg shadow-lg focus:ring focus:ring-blue-300"
          allowClear
          size="large"
          onChange={(e) => handleSearch(e.target.value)}
          style={{ maxWidth: "600px", width: "100%" }}
        />
        <div className="flex bg-white border rounded-lg shadow-lg">
          <button
            className={`p-2 ${!isGridView ? 'bg-blue-50' : ''}`}
            onClick={() => setIsGridView(false)}
          >
            <List className="w-6 h-6" />
          </button>
          <button
            className={`p-2 ${isGridView ? 'bg-blue-50' : ''}`}
            onClick={() => setIsGridView(true)}
          >
            <LayoutGrid className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 p-6">
        {/* Sidebar */}
        <div className="bg-white border shadow-lg rounded-lg p-4 w-full lg:w-1/4 sticky top-6 h-fit">
          <h3 className="text-lg font-semibold text-center mb-4">Browse Tour Packages</h3>
          <button onClick={() => setFilter("")} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-2">All Packages</button>
          <button onClick={() => setFilter("Watch Dolphins")} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-2">Watch Dolphins</button>
          <button onClick={() => setFilter("Watch and Snorkeling")} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Watch and Snorkeling</button>
        </div>
        
        {/* Content */}
        {isGridView ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 flex-grow">
            {filteredTours.map((tour) => (
              <GridViewItem key={tour.id} tour={tour} />
            ))}
          </div>
        ) : (
          <div className="flex-grow">
            {filteredTours.map((tour) => (
              <ListViewItem key={tour.id} tour={tour} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AllPackage;