import React, { useEffect, useState } from 'react';
import { getFacilities } from '../../api/facilities';
import { Link } from 'react-router-dom';

const TurfList = () => {
  const [facilities, setFacilities] = useState([]);

  const fetchFacilities = async () => {
    const res = await getFacilities();
    setFacilities(res.data || []);
  };

  useEffect(() => { fetchFacilities(); }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Available Turfs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <Link to={`/customer/bookingform/${facility.id}`}>
                <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TurfList;
