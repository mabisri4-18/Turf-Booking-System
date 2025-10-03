import React, { useEffect, useState } from 'react';
import { getBookingsByCustomer } from '../../api/bookings';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const res = await getBookingsByCustomer();
    setBookings(res.data || []);
  };

  useEffect(() => { fetchBookings(); }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Booking History</h1>
      {bookings.length === 0 ? (
        <p className="text-gray-600">No bookings yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map(b => (
            <div key={b.id} className="bg-white rounded-xl shadow overflow-hidden p-4">
              <h3 className="text-lg font-semibold">{b.sportType}</h3>
              <p className="text-gray-600">Date: {b.bookingDate}</p>
              <p className="text-gray-600">Time: {b.timeSlot}</p>
              <p className="text-gray-600">Payment Status: {b.paymentStatus || 'Pending'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingHistory;
