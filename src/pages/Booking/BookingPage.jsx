import React, { useState, useContext, useEffect } from "react";
import moment from "moment";
import "./BookingPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import { FloatButton, Tooltip, InputNumber, Divider, DatePicker, notification } from "antd";
import { WhatsAppOutlined } from "@ant-design/icons";
import { AuthContext } from "../../context/AuthContext";
import { getDataPrivate, sendDataPrivate } from "../../utils/api";

const BookingPage = () => {
  const location = useLocation();
  const selectedCard = location.state?.card || {};

  const today = moment();
  const [selectedDate, setSelectedDate] = useState(today);
  const [numPeople, setNumPeople] = useState(1);
  const [imageUrl, setImageUrl] = useState("");  // State for image URL
  const { userProfile } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true)

  const maxSeatsAvailable = selectedCard.capacity;
  const navigate = useNavigate();

  // Fetch the image based on the package_id
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await getDataPrivate(`api/v1/bookings/packages/image/${selectedCard.package_id}`);
        if (response?.package_image) {
          console.log(response)
          setImageUrl(response.package_image);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      } finally {
        setIsLoading(false)  // Set the image URL in the state
      }
    };

    if (selectedCard.package_id) {
      fetchImage();
    }
  }, [selectedCard.package_id]);

  const handlePeopleChange = (value) => {
    if (value > maxSeatsAvailable) {
      notification.warning({
        message: "Limit Exceeded",
        description: `Only ${maxSeatsAvailable} seats are available for this package.`,
        placement: "topRight",
      });
      setNumPeople(maxSeatsAvailable);
    } else {
      setNumPeople(value || 1);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date || today);
  };

  const openWhatsApp = () => {
    const phoneNumber = "6287762354021";
    const message = `Hello, I would like to book the ${selectedCard.package || "the selected package"} on ${selectedDate.format("dddd, MMMM Do YYYY")} for ${numPeople} ${numPeople > 1 ? "people" : "person"}.`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const openNotification = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
      placement: "topRight",
      duration: 4,
    });
  };

  const handleBooking = () => {
    console.log("Debug: Starting booking process...");

    const formData = new FormData();
    formData.append("package_id", selectedCard.package_id);
    formData.append("booking_date", selectedDate.format("YYYY-MM-DD"));
    formData.append("number_of_people", numPeople);
    formData.append("user_id", userProfile.user_id);
    formData.append("provider", providerName);
    formData.append("booking_price", selectedCard.price);

    console.log("FormData prepared:", {
      package_id: selectedCard.package_id,
      booking_date: selectedDate.format("YYYY-MM-DD"),
      number_of_people: numPeople,
      user_id: userProfile.user_id,
      provider: providerName,
      booking_price: selectedCard.price,
    });

    sendDataPrivate("api/v1/bookings/create", formData)
      .then((response) => {
        console.log("Debug: Received response:", response);

        if (response.booking_id) {
          console.log(response);
          navigate("/history", { replace: true });
        } else {
          console.error("Debug: Response not OK. Status:", response.status);
          throw new Error("Failed to book");
        }
      })
      .then((data) => {
        console.log("Debug: Booking successful. Response data:", data);
        openNotification(
          "success",
          "Booking Confirmed!",
          `Your booking for ${selectedCard.package} on ${selectedDate.format("dddd, MMMM Do YYYY")} for ${numPeople} ${numPeople > 1 ? "people" : "person"} is confirmed.`
        );
      })
      .catch((error) => {
        console.error("Debug: Booking error occurred:", error);
        openNotification(
          "error",
          "Booking Failed",
          "There was an error while processing your booking. Please try again."
        );
      });
  };

  const providerName = selectedCard.provider || "Unknown Provider";

  return (
    <div className="booking-page">
      {/* Informasi Paket */}
      {isLoading ? "" : console.log(imageUrl)}
      <div className="info-section">
        <img
          src={isLoading ? "" : `http://localhost:5000/static/show_image/${imageUrl}`}
          alt="Selected"
          className="card-image"
        />
        <div className="details">
          <h2>{selectedCard.package_name || "Package Name"}</h2>
          <p>{selectedCard.description}</p>
          <p>
            <strong>Price:</strong> {selectedCard.price || "Not available"}
          </p>
        </div>
      </div>

      {/* Booking Section */}
      <div className="booking-section">
        <h3>Booking Slots</h3>

        <div className="date-picker">
          <DatePicker
            value={selectedDate}
            onChange={handleDateChange}
            disabledDate={(current) => current && current < moment().startOf("day")}
            format="dddd, MMMM Do YYYY"
          />
        </div>
        <Divider />

        <div className="people-selection">
          <h4>Number of People</h4>
          <InputNumber
            min={1}
            value={numPeople}
            onChange={handlePeopleChange}
            style={{ width: "100px" }}
          />
        </div>
        <Divider />

        {/* Provider Name */}
        <div className="provider-selection">
          <h4>Provider: {providerName}</h4>
        </div>
        <Divider />

        {/* Book Button */}
        <button
          className="book-btn"
          disabled={maxSeatsAvailable <= 0}
          onClick={handleBooking}
        >
          {maxSeatsAvailable > 0 ? "Book Now" : "Fully Booked"}
        </button>
      </div>

      {/* WhatsApp Float Button */}
      <Tooltip title="Chat on WhatsApp" placement="left">
        <FloatButton
          icon={<WhatsAppOutlined />}
          type="primary"
          style={{
            right: 24,
            bottom: 24,
            backgroundColor: "#25D366",
            borderColor: "#25D366",
          }}
          onClick={openWhatsApp}
        />
      </Tooltip>
    </div>
  );
};

export default BookingPage;
