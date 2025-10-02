import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

/**
 * Mock payment flow. On success show confirmation.
 */
export default function Payment() {
  const location = useLocation();
  const nav = useNavigate();
  const booking = location.state || {};

  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePay = (e) => {
    e.preventDefault();
    // Mock: assume payment success
    alert("Payment successful! Booking confirmed.");
    nav("/user/history");
  };

  return (
    <Card style={{ maxWidth: 720, margin: "1rem auto", padding: "1rem" }}>
      <h4>Payment</h4>
      <p>Booking summary: {booking.sportType} on {booking.bookingDate} | {booking.timeSlot}</p>
      <Form onSubmit={handlePay}>
        <Form.Group className="mb-2">
          <Form.Label>Name on Card</Form.Label>
          <Form.Control value={nameOnCard} onChange={(e) => setNameOnCard(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Card Number</Form.Label>
          <Form.Control value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>CVV</Form.Label>
          <Form.Control value={cvv} onChange={(e) => setCvv(e.target.value)} required />
        </Form.Group>

        <div className="d-flex justify-content-end">
          <Button variant="contained" type="submit">Pay</Button>
        </div>
      </Form>
    </Card>
  );
}
