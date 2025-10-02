import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AppNavbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Auth pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// User pages
import UserDashboard from "./pages/user/Dashboard";
import AddBooking from "./pages/user/AddBooking";
import Payment from "./pages/user/Payment";
import History from "./pages/user/History";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import ManageBookings from "./pages/admin/ManageBookings";
import Analytics from "./pages/admin/Analytics";

export default function App() {
  return (
    <div>
      <AppNavbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User routes */}
          <Route path="/user/dashboard" element={
            <ProtectedRoute role="USER"><UserDashboard /></ProtectedRoute>
          }/>
          <Route path="/user/add-booking" element={
            <ProtectedRoute role="USER"><AddBooking /></ProtectedRoute>
          }/>
          <Route path="/user/payment" element={
            <ProtectedRoute role="USER"><Payment /></ProtectedRoute>
          }/>
          <Route path="/user/history" element={
            <ProtectedRoute role="USER"><History /></ProtectedRoute>
          }/>

          {/* Admin routes */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute role="ADMIN"><AdminDashboard /></ProtectedRoute>
          }/>
          <Route path="/admin/manage-bookings" element={
            <ProtectedRoute role="ADMIN"><ManageBookings /></ProtectedRoute>
          }/>
          <Route path="/admin/analytics" element={
            <ProtectedRoute role="ADMIN"><Analytics /></ProtectedRoute>
          }/>

          <Route path="*" element={<h3>Page not found</h3>} />
        </Routes>
      </div>
    </div>
  );
}
