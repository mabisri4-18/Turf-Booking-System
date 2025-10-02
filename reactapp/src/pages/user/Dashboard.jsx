import React, { useState } from "react";
import BookingCard from "../../components/BookingCard";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

/**
 * Since your backend doesn't have 'Turfs' entity yet, we show sample turfs.
 * If you add a Turf API later, replace sample list with fetch from server.
 */
const SAMPLE_TURFS = [
  { id: 1, name: "Green Field A", sportType: "Football", slots: 4 },
  { id: 2, name: "Cricket Arena 1", sportType: "Cricket", slots: 2 },
  { id: 3, name: "Badminton Court X", sportType: "Badminton", slots: 6 },
  { id: 4, name: "Tennis Court 3", sportType: "Tennis", slots: 3 },
];

export default function UserDashboard() {
  const [sport, setSport] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const filtered = SAMPLE_TURFS.filter(t => !sport || t.sportType === sport);

  return (
    <div>
      <div className="p-4 mb-3 bg-light rounded">
        <h2>Book Your Turf Now!</h2>
        <p>Select sport and date to see available turfs.</p>
        <Form className="row g-2">
          <div className="col-md-4">
            <Form.Select value={sport} onChange={(e) => setSport(e.target.value)}>
              <option value="">All Sports</option>
              <option>Cricket</option>
              <option>Football</option>
              <option>Badminton</option>
              <option>Tennis</option>
            </Form.Select>
          </div>
          <div className="col-md-4">
            <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="col-md-4">
            <Button onClick={() => navigate("/user/add-booking", { state: { sportType: sport, date }})}>
              Book Selected
            </Button>
          </div>
        </Form>
      </div>

      <Row>
        {filtered.map(t => (
          <Col md={3} key={t.id}>
            <BookingCard turf={t} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
