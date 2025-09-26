import React, { useState } from "react";
import { addBooking } from "../services/api";

const BookingForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    sportType: "",
    bookingDate: "",
    timeSlot: "",
    duration: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { customerName, sportType, bookingDate, timeSlot, duration } = formData;
    if (!customerName || !sportType || !bookingDate || !timeSlot || !duration) {
      return; // required fields check
    }

    await addBooking(formData);
    setFormData({
      customerName: "",
      sportType: "",
      bookingDate: "",
      timeSlot: "",
      duration: "",
    });
    onAdd();
  };

  return (
    <div>
      <h2>Add New Booking</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="customerName"
          placeholder="Customer Name"
          value={formData.customerName}
          onChange={handleChange}
        />
        <input
          name="sportType"
          placeholder="Sport Type"
          value={formData.sportType}
          onChange={handleChange}
        />
        <input
          type="date"
          name="bookingDate"
          placeholder="Booking Date"
          value={formData.bookingDate}
          onChange={handleChange}
        />
        <input
          name="timeSlot"
          placeholder="Time Slot"
          value={formData.timeSlot}
          onChange={handleChange}
        />
        <input
          type="number"
          name="duration"
          placeholder="Duration (hours)"
          value={formData.duration}
          onChange={handleChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default BookingForm;
