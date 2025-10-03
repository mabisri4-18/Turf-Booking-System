// import axios from 'axios';

// const API_URL = 'https://8080-bafddcaeceecbceaafbacadbcffceabd.premiumproject.examly.io/api/facilities';

// // Get all facilities
// export const getFacilities = async () => {
//   return await axios.get(`${API_URL}/all`);
// };

// // Get facilities by type
// export const getFacilitiesByType = async (type) => {
//   return await axios.get(`${API_URL}/byType?type=${type}`);
// };

// // Create or update facility
// export const saveFacility = async (facility) => {
//   return await axios.post(API_URL, facility);
// };

// // Delete facility
// export const deleteFacility = async (id) => {
//   return await axios.delete(`${API_URL}/${id}`);
// };
import axios from 'axios';

const API_URL = 'https://8080-bafddcaeceecbceaafbacadbcffceabd.premiumproject.examly.io/api/facilities';

// ✅ Get all facilities
export const getFacilities = async () => {
  return await axios.get(`${API_URL}/all`);
};

// ✅ Get facilities by type
export const getFacilitiesByType = async (type) => {
  return await axios.get(`${API_URL}/byType?type=${type}`);
};

// ✅ Create or update facility
export const saveFacility = async (facility) => {
  return await axios.post(`${API_URL}/add`, facility);
};

// ✅ Delete facility
export const deleteFacility = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
