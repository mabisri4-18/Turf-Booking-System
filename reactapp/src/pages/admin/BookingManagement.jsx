// import React, { useEffect, useState } from 'react';
// import { getBookings, deleteBooking } from '../../api/bookings';

// const BookingManagement = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const fetchBookings = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const res = await getBookings();
//       setBookings(res.data || []);
//     } catch (err) {
//       console.error("Fetch failed:", err.response || err.message);
//       setError('Failed to fetch bookings.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this booking?')) return;
//     setError('');
//     try {
//       console.log("Deleting booking ID:", id);
//       await deleteBooking(id);
//       alert("Booking deleted successfully!");
//       fetchBookings(); // refresh after delete
//     } catch (err) {
//       console.error("Delete failed:", err.response || err.message);
//       setError('Failed to delete booking.');
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   return (
// <div className="p-8 bg-gray-100 min-h-screen">
// <h1 className="text-3xl font-bold mb-6">Booking Management</h1>

// {loading && <p className="text-blue-600">Loading bookings...</p>}
// {error && <p className="text-red-600 mb-4">{error}</p>}

// <div className="overflow-x-auto">
// <table className="min-w-full bg-white rounded-xl shadow overflow-hidden">
// <thead className="bg-gray-200">
// <tr>
// <th className="py-3 px-6 text-left">Customer</th>
// <th className="py-3 px-6 text-left">Turf</th>
// <th className="py-3 px-6 text-left">Date</th>
// <th className="py-3 px-6 text-left">Time Slot</th>
// <th className="py-3 px-6 text-left">Action</th>
// </tr>
// </thead>
// <tbody>
// {bookings.length === 0 && !loading && (
// <tr>
// <td colSpan="5" className="text-center py-4">No bookings found.</td>
// </tr>
// )}
// {bookings.map(b => (
// <tr key={b.id} className="border-b hover:bg-gray-50">
// <td className="py-3 px-6">{b.customerName}</td>
// <td className="py-3 px-6">{b.sportType}</td>
// <td className="py-3 px-6">{b.bookingDate}</td>
// <td className="py-3 px-6">{b.timeSlot}</td>
// <td className="py-3 px-6">
// <button
// onClick={() => handleDelete(b.id)}
// className="bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-700"
// >
// Delete
// </button>
// </td>
// </tr>
// ))}
// </tbody>
// </table>
// </div>
// </div>
// );
// };

// export default BookingManagement;



import React, { useEffect, useState } from "react";
import { getBookings, deleteBooking } from "../../api/bookings";
import { Calendar, CheckCircle, Clock, XCircle, User, MapPin } from "lucide-react";

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({ total: 0, confirmed: 0, pending: 0, cancelled: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBookings = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getBookings();
      const data = res.data || [];
      setBookings(data);

      // Calculate stats dynamically
      const total = data.length;
      const confirmed = data.filter((b) => b.status === "Confirmed").length;
      const pending = data.filter((b) => b.status === "Pending").length;
      const cancelled = data.filter((b) => b.status === "Cancelled").length;
      setStats({ total, confirmed, pending, cancelled });
    } catch (err) {
      console.error("Fetch failed:", err);
      setError("Failed to fetch bookings.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      await deleteBooking(id);
      alert("Booking deleted successfully!");
      fetchBookings();
    } catch (err) {
      console.error("Delete failed:", err);
      setError("Failed to delete booking.");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

const statCards = [
{ title: "Total Bookings", value: stats.total, icon: <Calendar className="text-green-600" />, color: "text-green-700", bg: "bg-green-50" },
{ title: "Confirmed", value: stats.confirmed, icon: <CheckCircle className="text-green-600" />, color: "text-green-700", bg: "bg-green-50" },
{ title: "Pending", value: stats.pending, icon: <Clock className="text-yellow-600" />, color: "text-yellow-700", bg: "bg-yellow-50" },
{ title: "Cancelled", value: stats.cancelled, icon: <XCircle className="text-red-600" />, color: "text-red-700", bg: "bg-red-50" },
];

return (
<div className="p-8 bg-gray-100 min-h-screen">
<h1 className="text-3xl font-bold mb-2">Manage Bookings</h1>
<p className="text-gray-600 mb-8">Review and manage all turf bookings</p>

{/* Stats Section */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
{statCards.map((card, i) => (
<div
key={i}
className={`flex items-center justify-between p-6 rounded-xl shadow-sm border ${card.bg} hover:shadow-md transition`}
>
<div>
<h2 className="text-sm font-semibold text-gray-600">{card.title}</h2>
<p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
</div>
<div className="p-3 rounded-full bg-white shadow-inner">{card.icon}</div>
</div>
))}
</div>

{/* Error & Loading */}
{loading && <p className="text-blue-600">Loading bookings...</p>}
{error && <p className="text-red-600 mb-4">{error}</p>}

{/* Booking Cards */}
<div className="bg-white p-6 rounded-xl shadow-sm border">
<h2 className="text-2xl font-semibold mb-4">
All Bookings{" "}
<span className="text-gray-500 text-lg">({bookings.length})</span>
</h2>

<div className="space-y-4">
{bookings.length === 0 && !loading ? (
<p className="text-gray-500">No bookings found.</p>
) : (
bookings.map((b) => (
<div
key={b.id}
className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border rounded-lg hover:shadow transition"
>
<div>
<div className="flex items-center gap-2 mb-2">
<span className="text-sm font-semibold text-gray-600">#{b.bookingId}</span>
<span
className={`text-xs font-medium px-3 py-1 rounded-full ${
b.status === "Confirmed"
? "bg-green-100 text-green-700"
: b.status === "Pending"
? "bg-yellow-100 text-yellow-700"
: "bg-red-100 text-red-700"
}`}
>
{b.status}
</span>
</div>

<p className="font-semibold text-lg flex items-center gap-2">
<User size={16} /> {b.customerName}
</p>
<p className="text-gray-500 text-sm">{b.email}</p>

<div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm mt-2">
<div className="flex items-center gap-1">
<MapPin size={14} /> {b.sportType}
</div>
<div className="flex items-center gap-1">
<Calendar size={14} /> {b.bookingDate}
</div>
<div className="flex items-center gap-1">
<Clock size={14} /> {b.timeSlot}
</div>
</div>
</div>

<div className="flex gap-3 mt-4 sm:mt-0">
{b.status === "Pending" && (
<button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition">
Approve
</button>
)}
<button
onClick={() => handleDelete(b.id)}
className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
>
Cancel
</button>
</div>
</div>
))
)}
</div>
</div>
</div>
);
};

export default BookingManagement;