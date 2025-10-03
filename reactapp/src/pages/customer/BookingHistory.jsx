// import React, { useState, useEffect } from "react";
// import { getBookingsByCustomer } from "../../api/bookings";

// const BookingHistory = () => {
//   const [bookings, setBookings] = useState([]);
//   const [page, setPage] = useState(0); // current page
//   const [size] = useState(5); // items per page
//   const [totalPages, setTotalPages] = useState(0);
//   const [customerName, setCustomerName] = useState("");

//   // Fetch bookings for current page and search
//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const res = await getBookingsByCustomer(customerName, page, size);
//         const data = res.data;
//         setBookings(data.content || []); // backend returns paginated content
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

//   return (
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
// <div
// key={b.id}
// className="bg-white rounded-xl shadow overflow-hidden p-4"
// >
// <h3 className="text-lg font-semibold">{b.sportType}</h3>
// <p className="text-gray-600">Date: {b.bookingDate}</p>
// <p className="text-gray-600">Time: {b.timeSlot}</p>
// <p className="text-gray-600">
// Payment Status: {b.paymentStatus || "Pending"}
// </p>
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

// export default BookingHistory;
import React, { useState, useEffect } from "react";
import { getBookingsByCustomer } from "../../api/bookings";
import { useNavigate } from "react-router-dom";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(0); // current page
  const [size] = useState(5); // items per page
  const [totalPages, setTotalPages] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const navigate = useNavigate();

  // Fetch bookings for current page and search
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await getBookingsByCustomer(customerName, page, size);
        const data = res.data;
        setBookings(data.content || []);
        setTotalPages(data.totalPages || 0);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setBookings([]);
        setTotalPages(0);
      }
    };
    fetchBookings();
  }, [page, customerName, size]);

  const handleNext = () => {
    if (page + 1 < totalPages) setPage(page + 1);
  };

  const handlePrevious = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleSearch = (e) => {
    setCustomerName(e.target.value);
    setPage(0); // reset to first page on search
  };

  const handlePay = (bookingId) => {
    navigate(`/customer/payment/${bookingId}`);
  };

 return (
<div className="p-8 bg-gray-100 min-h-screen">
<h1 className="text-3xl font-bold mb-6">Booking History</h1>

<input
type="text"
placeholder="Search by Customer Name"
value={customerName}
onChange={handleSearch}
className="mb-4 p-2 border rounded w-full max-w-sm"
/>

{bookings.length === 0 ? (
<p className="text-gray-600">No bookings found.</p>
) : (
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
{bookings.map((b) => (
<div key={b.id} className="bg-white rounded-xl shadow overflow-hidden p-4 flex flex-col justify-between">
<div>
<h3 className="text-lg font-semibold">{b.sportType}</h3>
<p className="text-gray-600">Date: {b.bookingDate}</p>
<p className="text-gray-600">Time: {b.timeSlot}</p>
<p className="text-gray-600">
Payment Status: {b.paymentStatus || "Pending"}
</p>
</div>

{/* Show Pay Now button only if payment is pending */}
{(!b.paymentStatus || b.paymentStatus.toLowerCase() === "pending") && (
<button
onClick={() => handlePay(b.id)}
className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
>
Pay Now
</button>
)}
</div>
))}
</div>
)}

{/* Pagination Controls */}
<div className="flex justify-center mt-6 gap-4">
{page > 0 && (
<button
onClick={handlePrevious}
className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
>
Previous
</button>
)}

{page + 1 < totalPages && (
<button
onClick={handleNext}
className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
>
Next
</button>
)}
</div>

<p className="text-center mt-2 text-gray-500">
Page {page + 1} of {totalPages}
</p>
</div>
);
};

export default BookingHistory;