// import axios from 'axios';

// const BASE_URL = 'https://8080-bafddcaeceecbceaafbacadbcffceabd.premiumproject.examly.io/api/maintenance';

// // Get all maintenance
// export const getMaintenance = async () => {
//   return await axios.get(`${BASE_URL}/all`);
// };

// // Get maintenance by status
// export const getMaintenanceByStatus = async (status) => {
//   return await axios.get(`${BASE_URL}/status?status=${status}`);
// };

// // ✅ Update existing maintenance
// export const updateMaintenance = async (data) => {
//   return await axios.put(`${BASE_URL}/update/${data.maintenanceId}`, data);
// };
// // Add or update maintenance
// export const saveMaintenance = async (data) => {
//   return await axios.post(`${BASE_URL}/add`, data);
// };
// // Delete maintenance
// export const deleteMaintenance = async (id) => {
//   return await axios.delete(`${BASE_URL}/${id}`);
// };

// // Pagination
// export const getMaintenancePaginated = async (page = 0, size = 5, sortBy = 'maintenanceId', sortDir = 'asc') => {
//   return await axios.get(`${BASE_URL}/paginated?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`);
// };


import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/maintenance';

// ✅ Get all maintenance
export const getMaintenance = async () => {
  return await axios.get(`${BASE_URL}/all`);
};

// ✅ Get maintenance by status
export const getMaintenanceByStatus = async (status) => {
  return await axios.get(`${BASE_URL}/status?status=${status}`);
};

// ✅ Add new maintenance
export const addMaintenance = async (data) => {
  return await axios.post(`${BASE_URL}/add`, data);
};

// ✅ Update existing maintenance
export const updateMaintenance = async (data) => {
  return await axios.put(`${BASE_URL}/update/${data.maintenanceId}`, data);
};

// ✅ Delete maintenance
export const deleteMaintenance = async (id) => {
  return await axios.delete(`${BASE_URL}/${id}`);
};

// ✅ Pagination
export const getMaintenancePaginated = async (page = 0, size = 5, sortBy = 'maintenanceId', sortDir = 'asc') => {
  return await axios.get(`${BASE_URL}/paginated?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`);
};
