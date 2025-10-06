// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { createBooking, getBookingsByCustomer } from "../../api/bookings";

// const sportRates = {
//   Cricket: 500,
//   Football: 400,
//   Badminton: 200,
//   Tennis: 300,
// };

// // Predefined time slots (you can customize)
// const allTimeSlots = [
//   "6:00 AM - 7:00 AM",
//   "7:00 AM - 8:00 AM",
//   "8:00 AM - 9:00 AM",
//   "5:00 PM - 6:00 PM",
//   "6:00 PM - 7:00 PM",
//   "7:00 PM - 8:00 PM",
//   "8:00 PM - 9:00 PM",
// ];

// const BookingForm = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     customerName: "",
//     sportType: "",
//     bookingDate: "",
//     timeSlot: "",
//     duration: 1,
//     status: "Pending",
//   });

//   const [price, setPrice] = useState(0);
//   const [availableSlots, setAvailableSlots] = useState(allTimeSlots);

//   // Update price whenever sport or duration changes
//   useEffect(() => {
//     if (formData.sportType && formData.duration > 0) {
//       setPrice((sportRates[formData.sportType] || 0) * formData.duration);
//     } else {
//       setPrice(0);
//     }
//   }, [formData.sportType, formData.duration]);

//   // Fetch already booked slots for selected date & sport
// useEffect(() => {
// const fetchBookedSlots = async () => {
// if (formData.bookingDate && formData.sportType) {
// try {
// const res = await getBookingsByCustomer("");
// const bookings = res.data.content || [];
// const bookedSlots = bookings
// .filter(
// (b) =>
// b.bookingDate === formData.bookingDate &&
// b.sportType === formData.sportType
// )
// .map((b) => b.timeSlot);

// setAvailableSlots(allTimeSlots.filter((slot) => !bookedSlots.includes(slot)));
// // Reset selected slot if it was already booked
// if (bookedSlots.includes(formData.timeSlot)) {
// setFormData((prev) => ({ ...prev, timeSlot: "" }));
// }
// } catch (err) {
// console.error(err);
// }
// } else {
// setAvailableSlots(allTimeSlots);
// }
// };
// fetchBookedSlots();
// }, [formData.bookingDate, formData.sportType, formData.timeSlot]);

// const handleChange = (e) => {
// const { name, value } = e.target;
// setFormData((prev) => ({ ...prev, [name]: value }));
// };

// const handleSlotSelect = (slot) => {
// setFormData((prev) => ({ ...prev, timeSlot: slot }));
// };

// const handleSubmit = async (e) => {
// e.preventDefault();

// if (!formData.customerName || !formData.sportType || !formData.bookingDate || !formData.timeSlot) {
// return alert("❌ Please fill all required fields");
// }

// try {
// const res = await createBooking(formData);
// alert(`✅ Booking created! Total Price: ₹${price}`);
// navigate(`/customer/payment/${res.data.id}`);
// } catch (err) {
// console.error(err);
// alert("❌ Booking failed");
// }
// };

// return (
// <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-gray-100 p-4">
// <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg">
// <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
// Book Your Turf
// </h2>

// <form onSubmit={handleSubmit} className="space-y-4">
// <input
// name="customerName"
// placeholder="Your Name"
// value={formData.customerName}
// onChange={handleChange}
// className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
// required
// />

// <select
// name="sportType"
// value={formData.sportType}
// onChange={handleChange}
// className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
// required
// >
// <option value="">Select Sport</option>
// {Object.keys(sportRates).map((sport) => (
// <option key={sport} value={sport}>
// {sport}
// </option>
// ))}
// </select>

// <input
// type="date"
// name="bookingDate"
// value={formData.bookingDate}
// min={new Date().toISOString().split("T")[0]}
// onChange={handleChange}
// className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
// required
// />

// <div className="space-y-2">
// <p className="font-medium text-gray-700">Select Time Slot:</p>
// <div className="grid grid-cols-3 gap-2">
// {availableSlots.length === 0 ? (
// <p className="col-span-3 text-red-500 text-sm">No slots available for selected date!</p>
// ) : (
// availableSlots.map((slot) => (
// <button
// type="button"
// key={slot}
// onClick={() => handleSlotSelect(slot)}
// className={`py-2 px-2 rounded-lg border text-sm transition-colors ${
// formData.timeSlot === slot
// ? "bg-green-600 text-white border-green-600"
// : "bg-white border-gray-300 hover:bg-green-100"
// }`}
// >
// {slot}
// </button>
// ))
// )}
// </div>
// </div>

// <input
// type="number"
// name="duration"
// placeholder="Duration (hours)"
// value={formData.duration}
// onChange={handleChange}
// className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
// min={1}
// required
// />

// <p className="text-right font-medium text-green-700">
// Total Price: ₹{price}
// </p>

// <button
// type="submit"
// className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold transition-colors"
// >
// Proceed to Payment
// </button>
// </form>
// </div>
// </div>
// );
// };

// export default BookingForm;

import React, { useState, useEffect } from "react";
import axios from "axios";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    sportType: "",
    bookingDate: "",
    timeSlot: "",
    duration: 1,
    status: "Pending",
  });

  const [bookedSlots, setBookedSlots] = useState([]); // to check unavailable slots

  const sportOptions = ["Football", "Cricket", "Badminton", "Tennis"];
  const timeSlots = [
    "06:00 AM - 07:00 AM",
    "07:00 AM - 08:00 AM",
    "08:00 AM - 09:00 AM",
    "05:00 PM - 06:00 PM",
    "06:00 PM - 07:00 PM",
    "07:00 PM - 08:00 PM",
  ];

  // Fetch existing bookings to mark booked slots
  useEffect(() => {
    const fetchBookedSlots = async () => {
      try {
        const res = await axios.get(
          "https://8080-bafddcaeceecbceaafbacadbcffceabd.premiumproject.examly.io/api/bookings/allBookings"
        );
        setBookedSlots(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };
    fetchBookedSlots();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isSlotBooked = (slot) => {
    return bookedSlots.some(
      (b) =>
        b.sportType === formData.sportType &&
        b.bookingDate === formData.bookingDate &&
        b.timeSlot === slot
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.customerName || !formData.sportType || !formData.bookingDate || !formData.timeSlot) {
      return alert("❌ Please fill all required fields");
    }

    if (isSlotBooked(formData.timeSlot)) {
      return alert("❌ Selected time slot is already booked. Please choose another.");
    }

    try {
      await axios.post(
        "https://8080-bafddcaeceecbceaafbacadbcffceabd.premiumproject.examly.io/api/bookings/addBooking",
        formData
      );

      alert("✅ Booking created successfully!");
      // Reset form
      setFormData({
        customerName: "",
        sportType: "",
        bookingDate: "",
        timeSlot: "",
        duration: 1,
        status: "Pending",
      });
    } catch (err) {
      console.error("Booking error:", err.response || err.message);
      alert("❌ Booking failed");
    }
  };

  return (
<div className="min-h-screen flex items-center justify-center bg-gray-100">
<div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
<h2 className="text-2xl font-bold mb-6 text-center text-green-700">Book Your Turf</h2>
<form onSubmit={handleSubmit} className="space-y-4">

{/* Customer Name */}
<input
name="customerName"
placeholder="Your Name"
value={formData.customerName}
onChange={handleChange}
className="w-full p-2 border rounded"
required
/>

{/* Sport Type */}
<select
name="sportType"
value={formData.sportType}
onChange={handleChange}
className="w-full p-2 border rounded"
required
>
<option value="">Select Sport</option>
{sportOptions.map((sport) => (
<option key={sport} value={sport}>{sport}</option>
))}
</select>

{/* Booking Date */}
<input
type="date"
name="bookingDate"
value={formData.bookingDate}
onChange={handleChange}
className="w-full p-2 border rounded"
required
/>

{/* Time Slot */}
<select
name="timeSlot"
value={formData.timeSlot}
onChange={handleChange}
className="w-full p-2 border rounded"
required
disabled={!formData.sportType || !formData.bookingDate}
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

{/* Duration */}
<input
type="number"
name="duration"
placeholder="Duration (in hours)"
value={formData.duration}
onChange={handleChange}
className="w-full p-2 border rounded"
min={1}
required
/>

{/* Status */}
<select
name="status"
value={formData.status}
onChange={handleChange}
className="w-full p-2 border rounded"
>
<option value="Pending">Pending</option>
<option value="Confirmed">Confirmed</option>
</select>

{/* Submit Button */}
<button
type="submit"
className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
>
Book Now
</button>
</form>
</div>
</div>
);
};

export default BookingForm;