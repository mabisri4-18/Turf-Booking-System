import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TextField, Button, Card } from "@mui/material";
import { addBooking } from "../../services/api";

export default function AddBooking() {
  const location = useLocation();
  const nav = useNavigate();
  const pre = location.state || {};
  const username = localStorage.getItem("username") || "";

  const [customerName, setCustomerName] = useState(username || "");
  const [sportType, setSportType] = useState(pre.sportType || "");
  const [bookingDate, setBookingDate] = useState(pre.date || "");
  const [timeSlot, setTimeSlot] = useState("");
  const [duration, setDuration] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBooking({ customerName, sportType, bookingDate, timeSlot, duration });
      // after booking redirect to payment page
      nav("/user/payment", { state: { customerName, sportType, bookingDate, timeSlot, duration }});
    } catch (err) {
      console.error(err);
      alert("Booking failed");
    }
  };

  return (
    <Card style={{ maxWidth: 720, margin: "1rem auto", padding: "1rem" }}>
      <h4>Book Turf</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <TextField label="Customer Name" fullWidth value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
        </div>
        <div className="mb-2">
          <TextField label="Sport Type" fullWidth value={sportType} onChange={(e) => setSportType(e.target.value)} />
        </div>
        <div className="mb-2">
          <TextField label="Booking Date" type="date" fullWidth InputLabelProps={{ shrink: true }} value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} />
        </div>
        <div className="mb-2">
          <TextField label="Time Slot" placeholder="e.g. 18:00-19:00" fullWidth value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} />
        </div>
        <div className="mb-2">
          <TextField label="Duration (hours)" type="number" fullWidth value={duration} onChange={(e) => setDuration(e.target.value)} />
        </div>
        <div className="d-flex justify-content-end">
          <Button variant="contained" type="submit">Proceed to Payment</Button>
        </div>
      </form>
    </Card>
  );
}
