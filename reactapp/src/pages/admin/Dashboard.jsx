import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { getAllBookings } from "../../services/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, today: 0 });

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getAllBookings();
        const all = res.data || [];
        const todayStr = new Date().toISOString().split("T")[0];
        const todayCount = all.filter(b => b.bookingDate === todayStr).length;
        setStats({ total: all.length, today: todayCount });
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  return (
    <div>
      <h4>Admin Dashboard</h4>
      <Row className="g-3 mt-2">
        <Col md={4}>
          <Card className="p-3">
            <h5>Total Bookings</h5>
            <h2>{stats.total}</h2>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3">
            <h5>Bookings Today</h5>
            <h2>{stats.today}</h2>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3">
            <h5>Revenue (est.)</h5>
            <h2>₹{stats.total * 500}</h2>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
