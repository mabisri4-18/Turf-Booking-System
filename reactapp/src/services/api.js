// src/services/api.jsx
import axios from "axios";

// =====================
// Base URLs
// =====================
const AUTH_BASE = "https://8080-bafddcaeceecbceaafbacadbcffceabd.premiumproject.examly.io/auth";
const BOOKING_BASE = "https://8080-bafddcaeceecbceaafbacadbcffceabd.premiumproject.examly.io/api/bookings";

// =====================
// AUTH APIs
// =====================

// Register a new user
export const registerUser = (user) => {
  return axios.post(`${AUTH_BASE}/register`, user);
};

// Login user
export const loginUser = (email, password) => {
  return axios.post(`${AUTH_BASE}/login`, { email, password });
};

// =====================
// BOOKINGS APIs
// =====================

// Get all bookings
export const getAllBookings = () => {
  return axios.get(`${BOOKING_BASE}/allBookings`);
};

// Add a new booking
export const addBooking = (booking) => {
  return axios.post(`${BOOKING_BASE}/addBooking`, booking);
};

// Delete a booking by ID
export const deleteBooking = (id) => {
  return axios.delete(`${BOOKING_BASE}/${id}`);
};

// Get bookings filtered by sport type
export const getBookingsBySport = (sportType) => {
  return axios.get(`${BOOKING_BASE}/bySport`, { params: { sportType } });
};

// Get bookings sorted by date
export const getBookingsSortedByDate = () => {
  return axios.get(`${BOOKING_BASE}/sortedByDate`);
};

// Get paginated bookings
export const getBookingPaginated = (
  customerName = "",
  page = 0,
  size = 5,
  sortBy = "id",
  sortDir = "asc"
) => {
  return axios.get(`${BOOKING_BASE}/paginated`, {
    params: { customerName, page, size, sortBy, sortDir },
  });
};
