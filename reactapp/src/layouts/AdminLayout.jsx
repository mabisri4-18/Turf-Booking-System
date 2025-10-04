import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Admin Pages
import Dashboard from "../pages/admin/Dashboard";
import UserManagement from "../pages/admin/UserManagement";
import BookingManagement from "../pages/admin/BookingManagement";
import FacilityManagement from "../pages/admin/FacilityManagement";
import PaymentManagement from "../pages/admin/PaymentManagement";
import MaintenanceManagement from "../pages/admin/MaintenanceManagement";

const AdminLayout = () => {
  return (
    <>
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content */}
      <main style={{ padding: "2rem", minHeight: "80vh", background: "#f4f4f4" }}>
        <Routes>
          <Route path="/" element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="bookings" element={<BookingManagement />} />
          <Route path="facilities" element={<FacilityManagement />} />
          <Route path="payments" element={<PaymentManagement />} />
          <Route path="maintenance" element={<MaintenanceManagement />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default AdminLayout;
