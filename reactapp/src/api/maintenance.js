import axios from 'axios';

const BASE_URL = 'https://8080-bafddcaeceecbceaafbacadbcffceabd.premiumproject.examly.io/api/maintenance';

// Get all maintenance
export const getMaintenance = async () => {
  return await axios.get(`${BASE_URL}/all`);
};

// Get maintenance by status
export const getMaintenanceByStatus = async (status) => {
  return await axios.get(`${BASE_URL}/status?status=${status}`);
};

// Add or update maintenance
export const saveMaintenance = async (data) => {
  return await axios.post(`${BASE_URL}/add`, data);
};

// Delete maintenance
export const deleteMaintenance = async (id) => {
  return await axios.delete(`${BASE_URL}/${id}`);
};

// Pagination
export const getMaintenancePaginated = async (page = 0, size = 5, sortBy = 'maintenanceId', sortDir = 'asc') => {
  return await axios.get(`${BASE_URL}/paginated?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`);
};
