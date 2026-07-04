import React, { useState, useEffect } from "react";
import { createBooking, getBookings } from "../../api/bookings";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    sportType: "",
    bookingDate: "",
    timeSlot: "",
    duration: 1,
    status: "Pending",
  });

  const [bookedSlots, setBookedSlots] = useState([]);

  const sportOptions = [
    "Football",
    "Cricket",
    "Badminton",
    "Tennis",
  ];

  const timeSlots = [
    "06:00 AM - 07:00 AM",
    "07:00 AM - 08:00 AM",
    "08:00 AM - 09:00 AM",
    "05:00 PM - 06:00 PM",
    "06:00 PM - 07:00 PM",
    "07:00 PM - 08:00 PM",
  ];

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await getBookings();

      // Works whether backend returns List or Page
      const bookings = res.data.content || res.data || [];
      setBookedSlots(bookings);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isSlotBooked = (slot) => {
    return bookedSlots.some(
      (b) =>
        b.bookingDate === formData.bookingDate &&
        b.sportType === formData.sportType &&
        b.timeSlot === slot
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.customerName ||
      !formData.sportType ||
      !formData.bookingDate ||
      !formData.timeSlot
    ) {
      alert("Please fill all fields");
      return;
    }

    if (isSlotBooked(formData.timeSlot)) {
      alert("This slot is already booked.");
      return;
    }

    try {
      const res = await createBooking(formData);

      console.log(res.data);

      alert("Booking Successful!");

      setFormData({
        customerName: "",
        sportType: "",
        bookingDate: "",
        timeSlot: "",
        duration: 1,
        status: "Pending",
      });

      fetchBookings();
    } catch (err) {
      console.error("Booking Error:", err);

      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
      }

      alert("Booking Failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[450px]">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Book Your Turf
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="customerName"
            placeholder="Customer Name"
            value={formData.customerName}
            onChange={handleChange}
            className="w-full border rounded p-3"
            required
          />

          <select
            name="sportType"
            value={formData.sportType}
            onChange={handleChange}
            className="w-full border rounded p-3"
            required
          >
            <option value="">Select Sport</option>

            {sportOptions.map((sport) => (
              <option key={sport} value={sport}>
                {sport}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="bookingDate"
            value={formData.bookingDate}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
            className="w-full border rounded p-3"
            required
          />

          <select
            name="timeSlot"
            value={formData.timeSlot}
            onChange={handleChange}
            className="w-full border rounded p-3"
            required
          >
            <option value="">Select Time Slot</option>

            {timeSlots.map((slot) => (
              <option
                key={slot}
                value={slot}
                disabled={isSlotBooked(slot)}
              >
                {slot} {isSlotBooked(slot) ? "(Booked)" : ""}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="duration"
            value={formData.duration}
            min="1"
            onChange={handleChange}
            className="w-full border rounded p-3"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded p-3"
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
          </select>

          <button
            type="submit"
            className="w-full bg-green-600 text-white rounded p-3 hover:bg-green-700"
          >
            Book Now
          </button>

        </form>
      </div>
    </div>
  );
};

export default BookingForm;