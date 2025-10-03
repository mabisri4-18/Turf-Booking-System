import axios from 'axios';

const API_URL = 'http://localhost:8080/maintenance';

// Get all maintenance
export const getMaintenance = async () => {
  return await axios.get(API_URL);
};

// Get maintenance by status
export const getMaintenanceByStatus = async (status) => {
  return await axios.get(`${API_URL}?status=${status}`);
};

// Add or update maintenance
export const saveMaintenance = async (data) => {
  return await axios.post(API_URL, data);
};

// Delete maintenance
export const deleteMaintenance = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
