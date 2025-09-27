import axios from "axios";

const API_BASE = "http://localhost:8080/api/bookings";

export const getBookings = () => axios.get(`${API_BASE}/allBookings`);
export const getBySport = (sportType) =>
  axios.get(`${API_BASE}/bySport?sportType=${sportType}`);
export const getSorted = () => axios.get(`${API_BASE}/sortedByDate`);
export const addBooking = (booking) =>
  axios.post(`${API_BASE}/addBooking`, booking);
export const deleteBooking = (id) => axios.delete(`${API_BASE}/${id}`);
