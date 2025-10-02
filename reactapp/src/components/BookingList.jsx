import React, { useEffect, useState } from "react";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import { getBookingPaginated, deleteBooking } from "../services/api";
import Pagination from "./Pagination";

/**
 * props:
 *  role: "USER" or "ADMIN"
 *  initialCustomerName?: string to filter
 */
export default function BookingList({ role, initialCustomerName = "" }) {
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(1); // 1-based for UI
  const [totalPages, setTotalPages] = useState(1);
  const [size] = useState(5);
  const [sortBy, setSortBy] = useState("bookingDate");
  const [sortDir, setSortDir] = useState("asc");
  const [customerName, setCustomerName] = useState(initialCustomerName);
  const [sportFilter, setSportFilter] = useState("");

  const fetchPage = async (p = 1) => {
    try {
      const res = await getBookingPaginated(customerName, p - 1, size, sortBy, sortDir);
      const data = res.data;
      setBookings(data.content || []);
      setTotalPages(data.totalPages || 1);
      setPage(p);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
      setBookings([]);
      setTotalPages(1);
    }
  };

  useEffect(() => {
    fetchPage(1);
    // eslint-disable-next-line
  }, [sortBy, sortDir, customerName]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete booking?")) return;
    try {
      await deleteBooking(id);
      // refresh page
      fetchPage(page);
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const displayed = bookings.filter(b => !sportFilter || b.sportType === sportFilter);

  return (
<div>
<Row className="mb-2">
<Col md={4}>
<Form.Control placeholder="Filter by customer name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
</Col>
<Col md={2}>
<Form.Select value={sportFilter} onChange={(e) => setSportFilter(e.target.value)}>
<option value="">All sports</option>
<option>Cricket</option>
<option>Football</option>
<option>Badminton</option>
<option>Tennis</option>
</Form.Select>
</Col>
<Col md={3}>
<Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
<option value="bookingDate">Date</option>
<option value="customerName">Customer</option>
<option value="sportType">Sport</option>
<option value="id">ID</option>
</Form.Select>
</Col>
<Col md={2}>
<Form.Select value={sortDir} onChange={(e) => setSortDir(e.target.value)}>
<option value="asc">Asc</option>
<option value="desc">Desc</option>
</Form.Select>
</Col>
</Row>

<Table striped bordered hover responsive>
<thead>
<tr>
<th>#</th>
<th>Customer</th>
<th>Sport</th>
<th>Date</th>
<th>Time Slot</th>
<th>Duration (hrs)</th>
{role === "ADMIN" && <th>Actions</th>}
</tr>
</thead>
<tbody>
{displayed.map((b, idx) => (
<tr key={b.id}>
<td>{idx + 1 + (page - 1) * size}</td>
<td>{b.customerName}</td>
<td>{b.sportType}</td>
<td>{b.bookingDate}</td>
<td>{b.timeSlot}</td>
<td>{b.duration}</td>
{role === "ADMIN" && (
<td>
<Button variant="danger" size="sm" onClick={() => handleDelete(b.id)}>Delete</Button>
</td>
)}
</tr>
))}
{displayed.length === 0 && (
<tr><td colSpan={role === "ADMIN" ? 7 : 6} className="text-center">No bookings</td></tr>
)}
</tbody>
</Table>

<div className="d-flex justify-content-center">
<Pagination currentPage={page} totalPages={totalPages} onPageChange={(p) => fetchPage(p)} />
</div>
</div>
);
}