import React, { useEffect, useState } from 'react';
import { getFacilities, deleteFacility } from '../../api/facilities';

const FacilityManagement = () => {
  const [facilities, setFacilities] = useState([]);

  const fetchFacilities = async () => {
    const res = await getFacilities();
    setFacilities(res.data || []);
  };

  useEffect(() => { fetchFacilities(); }, []);

  const handleDelete = async (id) => {
    await deleteFacility(id);
    fetchFacilities();
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Facility Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {facilities.map(facility => (
          <div key={facility.id} className="bg-white rounded-xl shadow overflow-hidden">
            <img
              src={facility.image || 'https://source.unsplash.com/400x300/?football,turf'}
              alt={facility.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{facility.name}</h2>
              <p className="text-gray-600">{facility.type}</p>
              <div className="mt-4 flex gap-2">
                <button className="bg-blue-600 text-white py-1 px-3 rounded-lg hover:bg-blue-700">Edit</button>
                <button onClick={() => handleDelete(facility.id)} className="bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-700">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacilityManagement;
