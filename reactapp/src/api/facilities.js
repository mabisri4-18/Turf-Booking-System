import axios from 'axios';

const API_URL = 'http://localhost:8080/facilities';

// Get all facilities
export const getFacilities = async () => {
  return await axios.get(API_URL);
};

// Get facilities by type
export const getFacilitiesByType = async (type) => {
  return await axios.get(`${API_URL}?type=${type}`);
};

// Create or update facility
export const saveFacility = async (facility) => {
  return await axios.post(API_URL, facility);
};

// Delete facility
export const deleteFacility = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
