import React from "react";
import BookingList from "../../components/BookingList";

export default function ManageBookings() {
  return (
    <div>
      <h4>Manage Bookings</h4>
      <BookingList role="ADMIN" />
    </div>
  );
}
