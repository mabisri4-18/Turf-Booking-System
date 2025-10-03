import axios from "axios";

const BASE_URL = "https://8080-bafddcaeceecbceaafbacadbcffceabd.premiumproject.examly.io/api/payments";

export const makePayment = (payment) => axios.post(`${BASE_URL}/addPayment`, payment);

// Get all payments
export const getPayments = () => axios.get(`${BASE_URL}/allPayments`);

// Get payment(s) by booking ID
export const getPaymentsByBooking = (bookingId) => axios.get(`${BASE_URL}/booking/${bookingId}`);

// Delete payment
export const deletePayment = (paymentId) => axios.delete(`${BASE_URL}/${paymentId}`);
