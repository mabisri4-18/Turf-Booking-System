import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

// Bookings
export const createBooking = (data) => axios.post(`${BASE_URL}/bookings`, data);
export const getBookings = () => axios.get(`${BASE_URL}/bookings`);
export const getBookingsByCustomer = (customerId) => axios.get(`${BASE_URL}/bookings/customer/${customerId}`);
export const deleteBooking = (id) => axios.delete(`${BASE_URL}/bookings/${id}`);
