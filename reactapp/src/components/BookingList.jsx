import React from "react";

const BookingList = ({ bookings, onDelete }) => {
  return (
    <div>
      <h2>Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings available</p>
      ) : (
        <ul>
          {bookings.map((b) => (
            <li key={b.id}>
              <p>{b.customerName}</p>
              <p>{b.sportType}</p>
              <p>{b.bookingDate}</p>
              <p>{b.timeSlot}</p>
              <p>{b.duration} hrs</p>
              <button onClick={() => onDelete(b.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingList;
