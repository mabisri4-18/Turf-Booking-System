
// // export default BookingHistory;
// import React, { useState, useEffect } from "react";
// import { getBookingsByCustomer } from "../../api/bookings";
// import { useNavigate } from "react-router-dom";

// const BookingHistory = () => {
//   const [bookings, setBookings] = useState([]);
//   const [page, setPage] = useState(0); // current page
//   const [size] = useState(5); // items per page
//   const [totalPages, setTotalPages] = useState(0);
//   const [customerName, setCustomerName] = useState("");
//   const navigate = useNavigate();

//   // Fetch bookings for current page and search
//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const res = await getBookingsByCustomer(customerName, page, size);
//         const data = res.data;
//         setBookings(data.content || []);
//         setTotalPages(data.totalPages || 0);
//       } catch (error) {
//         console.error("Error fetching bookings:", error);
//         setBookings([]);
//         setTotalPages(0);
//       }
//     };
//     fetchBookings();
//   }, [page, customerName, size]);

//   const handleNext = () => {
//     if (page + 1 < totalPages) setPage(page + 1);
//   };

//   const handlePrevious = () => {
//     if (page > 0) setPage(page - 1);
//   };

//   const handleSearch = (e) => {
//     setCustomerName(e.target.value);
//     setPage(0); // reset to first page on search
//   };

//   const handlePay = (bookingId) => {
//     navigate(`/customer/payment/${bookingId}`);
//   };

//  return (
// <div className="p-8 bg-gray-100 min-h-screen">
// <h1 className="text-3xl font-bold mb-6">Booking History</h1>

// <input
// type="text"
// placeholder="Search by Customer Name"
// value={customerName}
// onChange={handleSearch}
// className="mb-4 p-2 border rounded w-full max-w-sm"
// />

// {bookings.length === 0 ? (
// <p className="text-gray-600">No bookings found.</p>
// ) : (
// <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// {bookings.map((b) => (
// <div key={b.id} className="bg-white rounded-xl shadow overflow-hidden p-4 flex flex-col justify-between">
// <div>
// <h3 className="text-lg font-semibold">{b.sportType}</h3>
// <p className="text-gray-600">Date: {b.bookingDate}</p>
// <p className="text-gray-600">Time: {b.timeSlot}</p>
// <p className="text-gray-600">
// Payment Status: {b.paymentStatus || "Pending"}
// </p>
// </div>

// {/* Show Pay Now button only if payment is pending */}
// {(!b.paymentStatus || b.paymentStatus.toLowerCase() === "pending") && (
// <button
// onClick={() => handlePay(b.id)}
// className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
// >
// Pay Now
// </button>
// )}
// </div>
// ))}
// </div>
// )}

// {/* Pagination Controls */}
// <div className="flex justify-center mt-6 gap-4">
// {page > 0 && (
// <button
// onClick={handlePrevious}
// className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
// >
// Previous
// </button>
// )}

// {page + 1 < totalPages && (
// <button
// onClick={handleNext}
// className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
// >
// Next
// </button>
// )}
// </div>

// <p className="text-center mt-2 text-gray-500">
// Page {page + 1} of {totalPages}
// </p>
// </div>
// );
// };

import React, { useState, useEffect } from "react";
import { getBookingsByCustomer } from "../../api/bookings";
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

  // Fetch bookings inside useEffect to satisfy ESLint
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

  const handleNext = () => page + 1 < totalPages && setPage(page + 1);
  const handlePrevious = () => page > 0 && setPage(page - 1);

  const handleSearch = (e) => {
    setCustomerName(e.target.value);
    setPage(0);
  };

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

const handleSort = (field) => {
if (sortField === field) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
else {
setSortField(field);
setSortOrder("asc");
}
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
Sport {sortField === "sportType" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
</button>
<button
onClick={() => handleSort("bookingDate")}
className="px-4 py-2 bg-green-200 text-green-800 rounded hover:bg-green-300"
>
Date {sortField === "bookingDate" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
</button>
<button
onClick={() => handleSort("paymentStatus")}
className="px-4 py-2 bg-green-200 text-green-800 rounded hover:bg-green-300"
>
Payment {sortField === "paymentStatus" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
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

{(!b.paymentStatus || b.paymentStatus.toLowerCase() === "pending") && (
<button
onClick={() => handlePay(b)}
className="mt-5 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors"
>
Pay Now
</button>
)}
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
</div>
);
};

export default BookingHistory;