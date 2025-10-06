import React, { useEffect, useState } from 'react';
import { getBookings, deleteBooking } from '../../api/bookings';

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchBookings = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getBookings();
      setBookings(res.data || []);
    } catch (err) {
      console.error("Fetch failed:", err.response || err.message);
      setError('Failed to fetch bookings.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    setError('');
    try {
      console.log("Deleting booking ID:", id);
      await deleteBooking(id);
      alert("Booking deleted successfully!");
      fetchBookings(); // refresh after delete
    } catch (err) {
      console.error("Delete failed:", err.response || err.message);
      setError('Failed to delete booking.');
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
<div className="p-8 bg-gray-100 min-h-screen">
<h1 className="text-3xl font-bold mb-6">Booking Management</h1>

{loading && <p className="text-blue-600">Loading bookings...</p>}
{error && <p className="text-red-600 mb-4">{error}</p>}

<div className="overflow-x-auto">
<table className="min-w-full bg-white rounded-xl shadow overflow-hidden">
<thead className="bg-gray-200">
<tr>
<th className="py-3 px-6 text-left">Customer</th>
<th className="py-3 px-6 text-left">Turf</th>
<th className="py-3 px-6 text-left">Date</th>
<th className="py-3 px-6 text-left">Time Slot</th>
<th className="py-3 px-6 text-left">Action</th>
</tr>
</thead>
<tbody>
{bookings.length === 0 && !loading && (
<tr>
<td colSpan="5" className="text-center py-4">No bookings found.</td>
</tr>
)}
{bookings.map(b => (
<tr key={b.id} className="border-b hover:bg-gray-50">
<td className="py-3 px-6">{b.customerName}</td>
<td className="py-3 px-6">{b.sportType}</td>
<td className="py-3 px-6">{b.bookingDate}</td>
<td className="py-3 px-6">{b.timeSlot}</td>
<td className="py-3 px-6">
<button
onClick={() => handleDelete(b.id)}
className="bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-700"
>
Delete
</button>
</td>
</tr>
))}
</tbody>
</table>
</div>
</div>
);
};

export default BookingManagement;