import React from 'react';

const BookingCard = ({ booking }) => {
  return (
    <div className="border rounded-lg shadow p-4 m-2 w-full flex justify-between items-center hover:shadow-xl transition">
      <div>
        <h2 className="text-lg font-bold">{booking.facility.name}</h2>
        <p>Sport: {booking.sportType}</p>
        <p>Date: {booking.bookingDate}</p>
        <p>Time: {booking.timeSlot}</p>
      </div>
      <div>
        <p className={`font-semibold ${booking.status === 'completed' ? 'text-green-600' : 'text-red-600'}`}>
          {booking.status}
        </p>
      </div>
    </div>
  );
};

export default BookingCard;
