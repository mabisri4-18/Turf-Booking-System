import axios from 'axios';

const BASE_URL = "http://localhost:8080/auth";

export const loginUser = (data) =>
  axios.post(`${BASE_URL}/login`, data, { withCredentials: true });

export const registerUser = (data) =>
  axios.post(`${BASE_URL}/register`, data, { withCredentials: true });

export const getAllUsers = () =>
  axios.get(`${BASE_URL}/get`, { withCredentials: true });

export const deleteUser = (id) =>
  axios.delete(`${BASE_URL}/users/${id}`, { withCredentials: true });
