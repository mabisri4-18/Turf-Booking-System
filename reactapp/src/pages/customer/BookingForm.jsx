// import React, { useState } from "react";
// import axios from "axios";

// const BookingForm = () => {
//   const [formData, setFormData] = useState({
//     customerName: "",
//     sportType: "",
//     bookingDate: "",
//     timeSlot: "",
//     duration: 1,
//     status: "Pending",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Simple validation
//     if (!formData.customerName || !formData.sportType || !formData.bookingDate || !formData.timeSlot) {
//       return alert("❌ Please fill all required fields");
//     }

//     try {
//       const response = await axios.post(
//         "https://8080-bafddcaeceecbceaafbacadbcffceabd.premiumproject.examly.io/api/bookings/addBooking",
//         formData
//       );
//       console.log("Booking response:", response.data);
//       alert("✅ Booking created successfully!");
//       // Reset form
//       setFormData({
//         customerName: "",
//         sportType: "",
//         bookingDate: "",
//         timeSlot: "",
//         duration: 1,
//         status: "Pending",
//       });
//     } catch (error) {
//       console.error("Booking error:", error.response || error.message);
//       alert("❌ Booking failed");
//     }
//   };

//  return (
// <div className="min-h-screen flex items-center justify-center bg-gray-100">
// <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
// <h2 className="text-2xl font-bold mb-6 text-center">Book Your Turf</h2>
// <form onSubmit={handleSubmit} className="space-y-4">
// <input
// name="customerName"
// placeholder="Your Name"
// value={formData.customerName}
// onChange={handleChange}
// className="w-full p-2 border rounded"
// required
// />
// <input
// name="sportType"
// placeholder="Sport Type (e.g., Football)"
// value={formData.sportType}
// onChange={handleChange}
// className="w-full p-2 border rounded"
// required
// />
// <input
// type="date"
// name="bookingDate"
// value={formData.bookingDate}
// onChange={handleChange}
// className="w-full p-2 border rounded"
// required
// />
// <input
// name="timeSlot"
// placeholder="Time Slot (e.g., 5:00 PM - 6:00 PM)"
// value={formData.timeSlot}
// onChange={handleChange}
// className="w-full p-2 border rounded"
// required
// />
// <input
// type="number"
// name="duration"
// placeholder="Duration (in hours)"
// value={formData.duration}
// onChange={handleChange}
// className="w-full p-2 border rounded"
// min={1}
// required
// />
// <select
// name="status"
// value={formData.status}
// onChange={handleChange}
// className="w-full p-2 border rounded"
// >
// <option value="Pending">Pending</option>
// <option value="Confirmed">Confirmed</option>
// </select>

// <button
// type="submit"
// className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
// >
// Proceed to Payment
// </button>
// </form>
// </div>
// </div>
// );
// };

// export default BookingForm;


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookingForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerName: "",
    sportType: "",
    bookingDate: "",
    timeSlot: "",
    duration: 1,
    status: "Pending",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.customerName || !formData.sportType || !formData.bookingDate || !formData.timeSlot) {
      return alert("❌ Please fill all required fields");
    }

    try {
      const response = await axios.post(
        "https://8080-bafddcaeceecbceaafbacadbcffceabd.premiumproject.examly.io/api/bookings/addBooking",
        formData
      );

      const bookingId = response.data.id;
      alert("✅ Booking created successfully!");
      navigate(`/customer/payment/${bookingId}`);
    } catch (error) {
      console.error("Booking error:", error.response || error.message);
      alert("❌ Booking failed");
    }
  };
 
return (
<div className="min-h-screen flex items-center justify-center bg-gray-100">
<div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
<h2 className="text-2xl font-bold mb-6 text-center">Book Your Turf</h2>
<form onSubmit={handleSubmit} className="space-y-4">
<input
name="customerName"
placeholder="Your Name"
value={formData.customerName}
onChange={handleChange}
className="w-full p-2 border rounded"
required
/>
<input
name="sportType"
placeholder="Sport Type (e.g., Football)"
value={formData.sportType}
onChange={handleChange}
className="w-full p-2 border rounded"
required
/>
<input
type="date"
name="bookingDate"
value={formData.bookingDate}
onChange={handleChange}
className="w-full p-2 border rounded"
required
/>
<input
name="timeSlot"
placeholder="Time Slot (e.g., 5:00 PM - 6:00 PM)"
value={formData.timeSlot}
onChange={handleChange}
className="w-full p-2 border rounded"
required
/>
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
<select
name="status"
value={formData.status}
onChange={handleChange}
className="w-full p-2 border rounded"
>
<option value="Pending">Pending</option>
<option value="Confirmed">Confirmed</option>
</select>

<button
type="submit"
className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
>
Proceed to Payment
</button>
</form>
</div>
</div>
);
};

export default BookingForm;