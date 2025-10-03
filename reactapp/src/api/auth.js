import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api'; // Update to your backend URL

// Auth
export const loginUser = (data) => axios.post(`${BASE_URL}/login`, data);
export const registerUser = (data) => axios.post(`${BASE_URL}/register`, data);

// Admin APIs
export const getAllUsers = () => axios.get(`${BASE_URL}/users`);
export const deleteUser = (id) => axios.delete(`${BASE_URL}/users/${id}`);
