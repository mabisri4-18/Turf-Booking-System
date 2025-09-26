import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", background: "#222", color: "white" }}>
      <h2>TurfTime</h2>
      <div>
        <Link to="/" style={{ marginRight: "20px", color: "white" }}>
          Home
        </Link>
        <Link to="/add" style={{ color: "white" }}>
          Add Booking
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
