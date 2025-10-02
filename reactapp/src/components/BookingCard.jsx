import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

/**
 * Shows a turf card.
 * turf: { id, name, sportType, slots }
 */
export default function BookingCard({ turf }) {
  return (
    <Card style={{ width: "18rem", marginBottom: "1rem" }}>
      <Card.Body>
        <Card.Title>{turf.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{turf.sportType}</Card.Subtitle>
        <Card.Text>Available slots: {turf.slots}</Card.Text>
        <Button as={Link} to="/user/add-booking" state={{ sportType: turf.sportType }}>
          Book Now
        </Button>
      </Card.Body>
    </Card>
  );
}
