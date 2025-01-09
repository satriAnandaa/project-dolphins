import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { LayoutGrid, List } from "lucide-react";
import { getData, getDataPrivate, sendData, sendDataJSON } from "../../utils/api";
import { AuthContext } from "../../context/AuthContext";

function AllPackage() {
  const [dataSource, setDataSource] = useState([]);
  const [dataSourceFiltered, setDataSourceFiltered] = useState([]);
  const [isGridView, setIsGridView] = useState(true);
  const [filter, setFilter] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { userProfile } = useContext(AuthContext);

  useEffect(() => {
    getDataPackages();
  }, []);

  const getDataPackages = () => {
    setIsLoading(true);
    getDataPrivate("/api/v1/dolphin_packages/read/" + userProfile.user_id)
      .then((resp) => {
        setIsLoading(false);
        if (resp?.data) {
          setDataSource(
            resp?.data.map((item) => {
              return {
                ...item,
                is_favorite: item.is_favorite === 1,
                key: item.package_id,
              };
            })
          );
          setDataSourceFiltered(resp?.data);
        } else {
          console.log("Can't fetch data");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Error fetching data", err);
      });
  };


  const handleFavorite = (packageId) => {
    // Optimistically update the state
    const updatedData = dataSource.map((tour) => {
      return {
        ...tour,
        is_favorite: tour.package_id === packageId ? !tour.is_favorite : tour.is_favorite,
      };
    });
    setDataSource(updatedData);

    // Send the request to add/remove from favorites on the backend
    sendDataJSON("/api/v1/favorites/create", { user_id: userProfile.user_id, package_id: packageId })
      .then((resp) => {
        if (resp) {
          console.log(resp.message);
        } else {
          console.error("Failed to add/remove favorite");
        }
      })
      .catch((err) => {
        console.error("Error updating favorite status", err);
        // Rollback the optimistic update in case of an error
        const rolledBackData = dataSource.map((tour) => {
          return {
            ...tour,
            is_favorite: tour.package_id === packageId ? !tour.is_favorite : tour.is_favorite,
          };
        });
        setDataSource(rolledBackData);
      }).finally(()=>{
        getDataPackages()
      });
  };

  const handleBooking = (tour) => {
    navigate("/booking", { state: { card: tour } });
  };

  const handleSearch = (value) => {
    setSearchText(value.toLowerCase());
    setDataSourceFiltered(
      dataSource.filter(
        (tour) =>
          tour.package_name.toLowerCase().includes(value.toLowerCase()) ||
          tour.description.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const filteredTours = filter
    ? dataSourceFiltered.filter((tour) => tour.package === filter)
    : dataSourceFiltered;

  const filterByPrice = (tour) => {
    const price = parseInt(tour.price.replace("IDR ", "").replace(".", ""));
    if (filter === "cheap") {
      return price <= 5.00; // Filter untuk harga murah
    } else if (filter === "premium") {
      return price > 5.00; // Filter untuk harga premium
    }
    return true; // Jika tidak ada filter, tampilkan semua paket
  };

  const ListViewItem = ({ tour }) => (
    <div className="bg-white border shadow-lg rounded-lg p-4 mb-4 flex items-center hover:shadow-xl transition-shadow ">
      <img src={`http://localhost:5000/static/show_image/${tour.package_image}`}alt={`Tour ${tour.package_id}`} className="w-24 h-24 object-cover rounded-lg" />
      <div className="ml-4 flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-lg font-semibold text-gray-800">{tour.package_name}</p>
            <p className="text-sm text-gray-600">⭐ {tour.rating}</p>
            <Tooltip title={tour.description} placement="top">
              <p className="text-sm text-gray-600 truncate">{tour.description}</p>
            </Tooltip>
            <p className="text-sm text-gray-500">Provider: {tour.provider}</p>
          </div>
          <p className="text-lg font-semibold text-gray-800">{tour.price}</p>
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className="text-sm text-gray-600">Seats Available: {tour.capacity}</p>
          <div className="flex items-center gap-4">
             <button
              className={`text-2xl ${tour.favorite ? 'text-red-500' : 'text-gray-400'}`}
              onClick={() => handleFavorite(tour.package_id)}
            >
              {tour.is_favorite ? "❤️" : "🤍"}
            </button>
            <div className="w-[1px] h-6 bg-gray-300 mx-2"></div>
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
    <div className="bg-white border shadow-lg rounded-lg overflow-hidden transform ">
      <img src={`http://localhost:5000/static/show_image/${tour.package_image}`}alt={`Tour ${tour.package_id}`} className="w-full h-48 object-cover" />
      <div className="p-4">
        <p className="text-sm text-gray-600 mb-2">⭐ {tour.rating}</p>
        <p className="text-lg font-semibold text-blue-500">{tour.price}</p>
        <Tooltip title={tour.package_name} placement="top">
          <p className="text-lg font-bold text-gray-600 mb-2 truncate">{tour.package_name}</p>
        </Tooltip>
        <Tooltip title={tour.description} placement="top">
          <p className="text-sm text-gray-600 mb-4 truncate">{tour.description}</p>
        </Tooltip>
        <p className="text-sm font-medium text-green-500 mb-2">{tour.package}</p>
        <p className="text-sm text-gray-500 mb-2">Provider: {tour.provider}</p>
        <p className="text-sm text-gray-600">Seats Available: {tour.capacity}</p>
        <div className="flex justify-between items-center mt-4">
          <button
            className={`text-2xl ${tour.is_favorite ? "text-red-500" : "text-gray-400"}`}
            onClick={() => handleFavorite(tour.package_id)}
          >
            {tour.is_favorite ? "❤️" : "🤍"}
          </button>
          <div className="w-[1px] h-6 bg-gray-300 mx-2"></div>
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
    <div className="flex flex-col p-6 bg-gradient-to-t from-white to-[#D9EAFD]">
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
            className={`p-2 ${!isGridView ? "bg-blue-50" : ""}`}
            onClick={() => setIsGridView(false)}
          >
            <List className="w-6 h-6" />
          </button>
          <button
            className={`p-2 ${isGridView ? "bg-blue-50" : ""}`}
            onClick={() => setIsGridView(true)}
          >
            <LayoutGrid className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 p-6">
        <div className="bg-white border shadow-lg rounded-lg p-4 w-full lg:w-1/4 sticky top-6 h-fit">
          <h3 className="text-lg font-semibold text-center mb-4">Browse Tour Packages</h3>
          <div className="flex flex-col gap-3">
            <button
              className={`py-2 px-4 rounded-md ${filter === "" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => setFilter("")}
            >
              All Packages
            </button>
            <button
              className={`py-2 px-4 rounded-md ${filter === "cheap" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => setFilter("cheap")}
            >
              Cheap
            </button>
            <button
              className={`py-2 px-4 rounded-md ${filter === "premium" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => setFilter("premium")}
            >
              Premium
            </button>
          </div>
        </div>

        {isGridView ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 flex-grow">
            {filteredTours.map((tour) => (
              <GridViewItem key={tour.package_id} tour={tour} />
            ))}
          </div>
        ) : (
          <div className="flex-grow">
            {filteredTours.map((tour) => (
              <ListViewItem key={tour.package_id} tour={tour} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AllPackage;
