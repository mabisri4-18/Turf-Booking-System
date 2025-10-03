import React, { useEffect, useState } from 'react';
import { getBookings, deleteBooking } from '../../api/bookings';

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const res = await getBookings();
    setBookings(res.data || []);
  };

  useEffect(() => { fetchBookings(); }, []);

  const handleDelete = async (id) => {
    await deleteBooking(id);
    fetchBookings();
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Booking Management</h1>
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
            {bookings.map(b => (
              <tr key={b.id} className="border-b">
                <td className="py-3 px-6">{b.customerName}</td>
                <td className="py-3 px-6">{b.sportType}</td>
                <td className="py-3 px-6">{b.bookingDate}</td>
                <td className="py-3 px-6">{b.timeSlot}</td>
                <td className="py-3 px-6">
                  <button onClick={() => handleDelete(b.id)} className="bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-700">Delete</button>
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
