import React from "react";
import BookingList from "../../components/BookingList";

export default function History() {
  const username = localStorage.getItem("username") || "";
  return (
    <div>
      <h4>My Bookings</h4>
      <BookingList role="USER" initialCustomerName={username} />
    </div>
  );
}
