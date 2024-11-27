import React, { useState } from "react";
import moment from "moment"; 
import "./BookingPage.css";
import { useLocation } from "react-router-dom";
import { FloatButton, Tooltip, Radio, InputNumber, Divider, DatePicker, notification } from "antd";
import { WhatsAppOutlined } from "@ant-design/icons";

const BookingPage = () => {
  const location = useLocation();
  const selectedCard = location.state?.card || {};

  
  const today = moment();
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedPackage, setSelectedPackage] = useState("watch-dolphin");
  const [numPeople, setNumPeople] = useState(1);

 
  const generateDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      dates.push(moment(today).add(i, "days"));
    }
    return dates;
  };

  
  const handlePeopleChange = (value) => {
    setNumPeople(value || 1); 
  };

  
  const handlePackageChange = (e) => {
    setSelectedPackage(e.target.value);
  };

  
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  
  const handleDateChange = (date) => {
    setSelectedDate(date || today); 
  };

  
  const openWhatsApp = () => {
    const phoneNumber = "6287762354021"; 
    const message = `Hello, I would like to book the ${
      selectedPackage === "watch-dolphin" ? "Watch Dolphin" : "Watch and Snorkeling"
    } package on ${selectedDate.format("dddd, MMMM Do YYYY")} for ${numPeople} ${
      numPeople > 1 ? "people" : "person"
    }.`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const openNotification = () => {
    notification.success({
      message: "Booking Confirmed!",
      description: `Your appointment has been booked on ${selectedDate.format(
        "dddd, MMMM Do YYYY"
      )} for ${numPeople} ${numPeople > 1 ? "people" : "person"}.`,
      placement: "topRight",
      duration: 4,
    });
  };
  

  return (
    <div className="booking-page">
      {/* Informasi Paket */}
      <div className="info-section">
        <img src={selectedCard.image} alt="Selected" className="card-image" />
        <div className="details">
          <h2>{selectedCard.package || "Package Name"}</h2>
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

        {/* Package Selection */}
        <div className="package-selection">
          <h4>Select Your Package</h4>
          <Radio.Group value={selectedPackage} onChange={handlePackageChange}>
            <Radio value="watch-dolphin">Watch Dolphin</Radio>
            <Radio value="watch-snorkeling">Watch and Snorkeling</Radio>
          </Radio.Group>
        </div>

        {/* Book Button */}
        <button
          className="book-btn"
          onClick={() =>
            openNotification(
              `Appointment booked on ${selectedDate.format(
                "dddd, MMMM Do YYYY"
              )} for ${numPeople} ${numPeople > 1 ? "people" : "person"}.`
            )
          }
        >
          Booking 
        </button>
      </div>
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
