import axios from 'axios';

const API_URL = 'http://localhost:8080/payments';

// Make payment
export const makePayment = async (paymentData) => {
  return await axios.post(API_URL, paymentData);
};

// Get all payments
export const getPayments = async () => {
  return await axios.get(API_URL);
};

// Get payments by status
export const getPaymentsByStatus = async (status) => {
  return await axios.get(`${API_URL}?status=${status}`);
};

// Delete payment
export const deletePayment = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
