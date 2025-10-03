import React, { useEffect, useState } from "react";
import { getBookings, deleteBooking } from "../../api/bookings";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch bookings from backend
  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getBookings(); // Axios returns { data: [...] }
      // Ensure we always have an array
      if (Array.isArray(response.data)) {
        setBookings(response.data);
      } else if (response.data && response.data.content) {
        // if backend returns paginated object { content: [...] }
        setBookings(response.data.content);
      } else {
        console.warn("Unexpected bookings response:", response.data);
        setBookings([]);
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("Failed to fetch bookings. Please try again later.");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  // Delete a booking
  const handleDelete = async (id) => {
    try {
      await deleteBooking(id);
      setBookings(bookings.filter((b) => b.id !== id));
    } catch (err) {
      console.error("Error deleting booking:", err);
      setError("Failed to delete booking.");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
<div>
<h2>All Bookings</h2>
{bookings.length === 0 ? (
<p>No bookings found.</p>
) : (
<table>
<thead>
<tr>
<th>ID</th>
<th>Customer Name</th>
<th>Sport Type</th>
<th>Booking Date</th>
<th>Time Slot</th>
<th>Duration</th>
<th>Actions</th>
</tr>
</thead>
<tbody>
{bookings.map((booking) => (
<tr key={booking.id}>
<td>{booking.id}</td>
<td>{booking.customerName}</td>
<td>{booking.sportType}</td>
<td>{booking.bookingDate}</td>
<td>{booking.timeSlot}</td>
<td>{booking.duration}</td>
<td>
<button onClick={() => handleDelete(booking.id)}>Delete</button>
</td>
</tr>
))}
</tbody>
</table>
)}
</div>
);
};

export default Dashboard;