import React from 'react';

const BookingCard = ({ booking }) => {
  if (!booking) return null; // protect against undefined booking

  const facilityName = booking.facility?.name || 'Unknown Facility';
  const sportType = booking.sportType || 'Unknown Sport';
  const bookingDate = booking.bookingDate || 'N/A';
  const timeSlot = booking.timeSlot || 'N/A';
  const status = booking.status || 'Pending';

  return (
    <div className="border rounded-lg shadow p-4 m-2 w-full flex justify-between items-center hover:shadow-xl transition">
      <div>
        <h2 className="text-lg font-bold">{facilityName}</h2>
        <p>Sport: {sportType}</p>
        <p>Date: {bookingDate}</p>
        <p>Time: {timeSlot}</p>
      </div>
      <div>
        <p
          className={`font-semibold ${
            status.toLowerCase() === 'completed' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {status}
        </p>
      </div>
    </div>
  );
};

export default BookingCard;
