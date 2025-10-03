import React, { useEffect, useState } from 'react';
import { getBookingsByCustomer } from '../../api/bookings';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const res = await getBookingsByCustomer(); // API returns customer bookings
    setBookings(res.data || []);
  };

  useEffect(() => { fetchBookings(); }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>
      <h2 className="text-xl font-semibold mb-4">Upcoming Bookings</h2>
      {bookings.length === 0 ? (
        <p className="text-gray-600">No bookings yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map(b => (
            <div key={b.id} className="bg-white rounded-xl shadow overflow-hidden p-4">
              <h3 className="text-lg font-semibold">{b.sportType}</h3>
              <p className="text-gray-600">Date: {b.bookingDate}</p>
              <p className="text-gray-600">Time: {b.timeSlot}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
