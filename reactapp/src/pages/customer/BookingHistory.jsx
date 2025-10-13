
// import React, { useState, useEffect } from "react";
// import { getBookingsByCustomer } from "../../api/bookings";
// import { makePayment } from "../../api/payments";

// const BookingHistory = () => {
//   const [bookings, setBookings] = useState([]);
//   const [page, setPage] = useState(0);
//   const [size] = useState(6);
//   const [totalPages, setTotalPages] = useState(0);
//   const [customerName, setCustomerName] = useState("");
//   const [sortField, setSortField] = useState("");
//   const [sortOrder, setSortOrder] = useState("asc");
//   const [sportFilter, setSportFilter] = useState("");

//   // Fetch bookings inside useEffect to satisfy ESLint
//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const res = await getBookingsByCustomer(customerName, page, size);
//         let data = res.data.content || [];
//         setTotalPages(res.data.totalPages || 0);

//         // Apply sport filter
//         if (sportFilter) {
//           data = data.filter(
//             (b) => b.sportType.toLowerCase() === sportFilter.toLowerCase()
//           );
//         }

//         // Apply sorting
//         if (sortField) {
//           data = [...data].sort((a, b) => {
//             if (sortField === "bookingDate") {
//               return sortOrder === "asc"
//                 ? new Date(a.bookingDate) - new Date(b.bookingDate)
//                 : new Date(b.bookingDate) - new Date(a.bookingDate);
//             } else {
//               return sortOrder === "asc"
//                 ? a[sortField]?.localeCompare(b[sortField])
//                 : b[sortField]?.localeCompare(a[sortField]);
//             }
//           });
//         }

//         setBookings(data);
//       } catch (error) {
//         console.error(error);
//         setBookings([]);
//         setTotalPages(0);
//       }
//     };

//     fetchBookings();
//   }, [page, customerName, size, sortField, sortOrder, sportFilter]);

//   const handleNext = () => page + 1 < totalPages && setPage(page + 1);
//   const handlePrevious = () => page > 0 && setPage(page - 1);

//   const handleSearch = (e) => {
//     setCustomerName(e.target.value);
//     setPage(0);
//   };

//   const handlePay = async (booking) => {
//     try {
//       await makePayment({
//         booking: { id: booking.id },
//         amount: booking.amount || 100,
//         paymentStatus: "paid",
//         paymentDate: new Date(),
//       });

//       setBookings((prev) =>
// prev.map((b) =>
// b.id === booking.id ? { ...b, paymentStatus: "Paid" } : b
// )
// );
// alert("Payment successful ✅");
// } catch (err) {
// console.error(err);
// alert("Payment failed! Try again.");
// }
// };

// const handleSort = (field) => {
// if (sortField === field) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
// else {
// setSortField(field);
// setSortOrder("asc");
// }
// };

// return (
// <div className="p-8 bg-gradient-to-br from-gray-50 to-green-50 min-h-screen">
// <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8">
// <h1 className="text-3xl font-bold mb-6 text-green-700 flex items-center justify-between">
// Booking History
// <span className="text-sm font-medium text-gray-500">
// Total: {bookings.length} / Page {page + 1} of {totalPages}
// </span>
// </h1>

// {/* Search, Sort & Filter */}
// <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 flex-wrap">
// <input
// type="text"
// placeholder="🔍 Search by Customer Name..."
// value={customerName}
// onChange={handleSearch}
// className="p-3 border border-gray-300 rounded-lg w-full md:w-1/3 focus:ring-2 focus:ring-green-500 outline-none"
// />

// <div className="flex gap-2 flex-wrap">
// <button
// onClick={() => handleSort("sportType")}
// className="px-4 py-2 bg-green-200 text-green-800 rounded hover:bg-green-300"
// >
// Sport {sortField === "sportType" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
// </button>
// <button
// onClick={() => handleSort("bookingDate")}
// className="px-4 py-2 bg-green-200 text-green-800 rounded hover:bg-green-300"
// >
// Date {sortField === "bookingDate" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
// </button>
// <button
// onClick={() => handleSort("paymentStatus")}
// className="px-4 py-2 bg-green-200 text-green-800 rounded hover:bg-green-300"
// >
// Payment {sortField === "paymentStatus" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
// </button>

// <select
// value={sportFilter}
// onChange={(e) => setSportFilter(e.target.value)}
// className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
// >
// <option value="">All Sports</option>
// <option value="Cricket">Cricket</option>
// <option value="Football">Football</option>
// <option value="Badminton">Badminton</option>
// <option value="Tennis">Tennis</option>
// </select>
// </div>
// </div>

// {bookings.length === 0 ? (
// <div className="text-center py-20 text-gray-500">
// <p className="text-xl">No bookings found 😕</p>
// </div>
// ) : (
// <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
// {bookings.map((b) => (
// <div
// key={b.id}
// className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 p-5 flex flex-col justify-between"
// >
// <div>
// <h3 className="text-lg font-semibold text-green-700 mb-1">
// {b.sportType || "Turf Booking"}
// </h3>
// <p className="text-gray-600">📅 Date: {b.bookingDate}</p>
// <p className="text-gray-600">🕒 Time: {b.timeSlot}</p>
// <p
// className={`mt-2 font-medium ${
// b.paymentStatus?.toLowerCase() === "paid"
// ? "text-green-600"
// : "text-red-500"
// }`}
// >
// 💰 Payment Status: {b.paymentStatus || "Pending"}
// </p>
// </div>

// {(!b.paymentStatus || b.paymentStatus.toLowerCase() === "pending") && (
// <button
// onClick={() => handlePay(b)}
// className="mt-5 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors"
// >
// Pay Now
// </button>
// )}
// </div>
// ))}
// </div>
// )}

// {/* Pagination */}
// {totalPages > 1 && (
// <div className="flex justify-center mt-10 space-x-4">
// {page > 0 && (
// <button
// onClick={handlePrevious}
// className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors"
// >
// ← Previous
// </button>
// )}
// {page + 1 < totalPages && (
// <button
// onClick={handleNext}
// className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors"
// >
// Next →
// </button>
// )}
// </div>
// )}
// </div>
// </div>
// );
// };

// export default BookingHistory;
import React, { useState, useEffect } from "react";
import { getBookingsByCustomer, updateBooking } from "../../api/bookings";
import { makePayment } from "../../api/payments";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(6);
  const [totalPages, setTotalPages] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sportFilter, setSportFilter] = useState("");

  // For Editing
  const [editingBooking, setEditingBooking] = useState(null);
  const [formData, setFormData] = useState({});

  // Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await getBookingsByCustomer(customerName, page, size);
        let data = res.data.content || [];
        setTotalPages(res.data.totalPages || 0);

        // Apply sport filter
        if (sportFilter) {
          data = data.filter(
            (b) => b.sportType.toLowerCase() === sportFilter.toLowerCase()
          );
        }

        // Apply sorting
        if (sortField) {
          data = [...data].sort((a, b) => {
            if (sortField === "bookingDate") {
              return sortOrder === "asc"
                ? new Date(a.bookingDate) - new Date(b.bookingDate)
                : new Date(b.bookingDate) - new Date(a.bookingDate);
            } else {
              return sortOrder === "asc"
                ? a[sortField]?.localeCompare(b[sortField])
                : b[sortField]?.localeCompare(a[sortField]);
            }
          });
        }

        setBookings(data);
      } catch (error) {
        console.error(error);
        setBookings([]);
        setTotalPages(0);
      }
    };

    fetchBookings();
  }, [page, customerName, size, sortField, sortOrder, sportFilter]);

  // Pagination
  const handleNext = () => page + 1 < totalPages && setPage(page + 1);
  const handlePrevious = () => page > 0 && setPage(page - 1);

  // Search
  const handleSearch = (e) => {
    setCustomerName(e.target.value);
    setPage(0);
  };

 // Payment
const handlePay = async (booking) => {
try {
await makePayment({
booking: { id: booking.id },
amount: booking.amount || 100,
paymentStatus: "paid",
paymentDate: new Date(),
});

setBookings((prev) =>
prev.map((b) =>
b.id === booking.id ? { ...b, paymentStatus: "Paid" } : b
)
);
alert("Payment successful ✅");
} catch (err) {
console.error(err);
alert("Payment failed! Try again.");
}
};

// Sorting
const handleSort = (field) => {
if (sortField === field) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
else {
setSortField(field);
setSortOrder("asc");
}
};

// Edit Booking
const handleEdit = (booking) => {
setEditingBooking(booking);
setFormData({ ...booking });
};

// Update Booking
const handleUpdate = async () => {
try {
await updateBooking(editingBooking.id, formData);
alert("✅ Booking updated successfully!");
setEditingBooking(null);

// Update in frontend instantly
setBookings((prev) =>
prev.map((b) => (b.id === editingBooking.id ? formData : b))
);
} catch (err) {
console.error(err);
alert("❌ Failed to update booking");
}
};

const handleChange = (e) => {
setFormData({ ...formData, [e.target.name]: e.target.value });
};

return (
<div className="p-8 bg-gradient-to-br from-gray-50 to-green-50 min-h-screen">
<div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8">
<h1 className="text-3xl font-bold mb-6 text-green-700 flex items-center justify-between">
Booking History
<span className="text-sm font-medium text-gray-500">
Total: {bookings.length} / Page {page + 1} of {totalPages}
</span>
</h1>

{/* Search, Sort & Filter */}
<div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 flex-wrap">
<input
type="text"
placeholder="🔍 Search by Customer Name..."
value={customerName}
onChange={handleSearch}
className="p-3 border border-gray-300 rounded-lg w-full md:w-1/3 focus:ring-2 focus:ring-green-500 outline-none"
/>

<div className="flex gap-2 flex-wrap">
<button
onClick={() => handleSort("sportType")}
className="px-4 py-2 bg-green-200 text-green-800 rounded hover:bg-green-300"
>
Sport{" "}
{sortField === "sportType"
? sortOrder === "asc"
? "↑"
: "↓"
: ""}
</button>
<button
onClick={() => handleSort("bookingDate")}
className="px-4 py-2 bg-green-200 text-green-800 rounded hover:bg-green-300"
>
Date{" "}
{sortField === "bookingDate"
? sortOrder === "asc"
? "↑"
: "↓"
: ""}
</button>
<button
onClick={() => handleSort("paymentStatus")}
className="px-4 py-2 bg-green-200 text-green-800 rounded hover:bg-green-300"
>
Payment{" "}
{sortField === "paymentStatus"
? sortOrder === "asc"
? "↑"
: "↓"
: ""}
</button>

<select
value={sportFilter}
onChange={(e) => setSportFilter(e.target.value)}
className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
>
<option value="">All Sports</option>
<option value="Cricket">Cricket</option>
<option value="Football">Football</option>
<option value="Badminton">Badminton</option>
<option value="Tennis">Tennis</option>
</select>
</div>
</div>

{/* Bookings Grid */}
{bookings.length === 0 ? (
<div className="text-center py-20 text-gray-500">
<p className="text-xl">No bookings found 😕</p>
</div>
) : (
<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
{bookings.map((b) => (
<div
key={b.id}
className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 p-5 flex flex-col justify-between"
>
<div>
<h3 className="text-lg font-semibold text-green-700 mb-1">
{b.sportType || "Turf Booking"}
</h3>
<p className="text-gray-600">📅 Date: {b.bookingDate}</p>
<p className="text-gray-600">🕒 Time: {b.timeSlot}</p>
<p
className={`mt-2 font-medium ${
b.paymentStatus?.toLowerCase() === "paid"
? "text-green-600"
: "text-red-500"
}`}
>
💰 Payment Status: {b.paymentStatus || "Pending"}
</p>
</div>

<div className="flex gap-2 mt-4">
<button
onClick={() => handleEdit(b)}
className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-3 rounded-lg font-medium transition-colors"
>
✏️ Edit
</button>

{(!b.paymentStatus ||
b.paymentStatus.toLowerCase() === "pending") && (
<button
onClick={() => handlePay(b)}
className="bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg font-medium transition-colors"
>
💳 Pay Now
</button>
)}
</div>
</div>
))}
</div>
)}

{/* Pagination */}
{totalPages > 1 && (
<div className="flex justify-center mt-10 space-x-4">
{page > 0 && (
<button
onClick={handlePrevious}
className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors"
>
← Previous
</button>
)}
{page + 1 < totalPages && (
<button
onClick={handleNext}
className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors"
>
Next →
</button>
)}
</div>
)}
</div>

{/* Edit Modal */}
{editingBooking && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
<div className="bg-white p-6 rounded-lg shadow-xl w-96">
<h2 className="text-xl font-bold mb-4 text-green-700">
Edit Booking
</h2>

<label className="block mb-2 text-gray-700">Customer Name</label>
<input
name="customerName"
value={formData.customerName || ""}
onChange={handleChange}
className="w-full p-2 border rounded mb-3"
/>

<label className="block mb-2 text-gray-700">Sport Type</label>
<input
name="sportType"
value={formData.sportType || ""}
onChange={handleChange}
className="w-full p-2 border rounded mb-3"
/>

<label className="block mb-2 text-gray-700">Booking Date</label>
<input
type="date"
name="bookingDate"
value={formData.bookingDate || ""}
onChange={handleChange}
className="w-full p-2 border rounded mb-3"
/>

<label className="block mb-2 text-gray-700">Time Slot</label>
<input
name="timeSlot"
value={formData.timeSlot || ""}
onChange={handleChange}
className="w-full p-2 border rounded mb-3"
/>

<label className="block mb-2 text-gray-700">Duration (hours)</label>
<input
type="number"
name="duration"
value={formData.duration || ""}
onChange={handleChange}
className="w-full p-2 border rounded mb-3"
/>

<div className="flex justify-end gap-3 mt-4">
<button
onClick={() => setEditingBooking(null)}
className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
>
Cancel
</button>
<button
onClick={handleUpdate}
className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
>
Update
</button>
</div>
</div>
</div>
)}
</div>
);
};

export default BookingHistory;