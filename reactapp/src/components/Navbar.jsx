import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

export default function AppNavbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to={role === "ADMIN" ? "/admin/dashboard" : "/user/dashboard"}>
          TurfBooking
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="me-auto">
            {!role && <Nav.Link as={Link} to="/login">Login</Nav.Link>}
            {!role && <Nav.Link as={Link} to="/register">Register</Nav.Link>}

            {role === "USER" && <Nav.Link as={Link} to="/user/dashboard">Dashboard</Nav.Link>}
            {role === "USER" && <Nav.Link as={Link} to="/user/history">My Bookings</Nav.Link>}

            {role === "ADMIN" && <Nav.Link as={Link} to="/admin/dashboard">Dashboard</Nav.Link>}
            {role === "ADMIN" && <Nav.Link as={Link} to="/admin/manage-bookings">Manage Bookings</Nav.Link>}
            {role === "ADMIN" && <Nav.Link as={Link} to="/admin/analytics">Analytics</Nav.Link>}
          </Nav>
          {role && <Button variant="outline-light" onClick={handleLogout}>Logout</Button>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
