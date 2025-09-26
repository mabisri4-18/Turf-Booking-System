import React, { useEffect, useState } from "react";
import { getBookings, getSorted, deleteBooking } from "../services/api";
import BookingList from "../components/BookingList";

const Home = () => {
  const [bookings, setBookings] = useState([]);

  const loadBookings = async () => {
    try {
      const res = await getBookings();
      setBookings(res.data);
    } catch (e) {
      setBookings([]); // handle API error
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleDelete = async (id) => {
    await deleteBooking(id);
    loadBookings();
  };

  const handleSort = async () => {
    const res = await getSorted();
    setBookings(res.data);
  };

  return (
    <div>
      <h1>Booking Management</h1>
      <button onClick={handleSort}>Sort by Date</button>
      <BookingList bookings={bookings} onDelete={handleDelete} />
    </div>
  );
};

export default Home;
