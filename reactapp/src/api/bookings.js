// import axios from 'axios';

// const BASE_URL = "http://localhost:8080/api/bookings";

// export const createBooking = (data) => axios.post(`${BASE_URL}/addBooking`, data);
// export const getBookings = () => axios.get(`${BASE_URL}/allBookings`);
// export const getBookingsByCustomer = (customerName = "", page = 0, size = 5) =>
//   axios.get(
//     `${BASE_URL}/paginated?customerName=${customerName}&page=${page}&size=${size}`
//   );
// export const deleteBooking = (id) => axios.delete(`${BASE_URL}/${id}`);

// export const updateBooking = async (id, bookingData) => {
//   return await axios.put(`${BASE_URL}/${id}`, bookingData);
// };

import axios from "axios";

const BASE_URL = "http://localhost:8080/api/bookings";

export const createBooking = (booking) =>
  axios.post(`${BASE_URL}/addBooking`, booking);

export const getBookings = () =>
  axios.get(`${BASE_URL}/allBookings`);

export const getBookingsByCustomer = (
  customerName = "",
  page = 0,
  size = 5
) =>
  axios.get(`${BASE_URL}/paginated`, {
    params: {
      customerName,
      page,
      size,
    },
  });

export const updateBooking = (id, booking) =>
  axios.put(`${BASE_URL}/${id}`, booking);

export const deleteBooking = (id) =>
  axios.delete(`${BASE_URL}/${id}`);