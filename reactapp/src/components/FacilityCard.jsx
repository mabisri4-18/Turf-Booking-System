import React from 'react';
import { Link } from 'react-router-dom';

const FacilityCard = ({ facility }) => {
  return (
    <div className="border rounded-lg shadow-lg p-4 m-2 w-80 hover:shadow-2xl transition">
      <img
        src={facility.imageUrl || 'https://via.placeholder.com/300x180'}
        alt={facility.name}
        className="w-full h-44 object-cover rounded-md"
      />
      <h2 className="text-xl font-bold mt-2">{facility.name}</h2>
      <p className="text-gray-600">Type: {facility.type}</p>
      <p className="text-gray-600">Location: {facility.location}</p>
      <Link
        to={`/customer/booking/${facility.id}`}
        className="bg-green-600 text-white px-4 py-2 rounded mt-3 inline-block hover:bg-green-700"
      >
        Book Now
      </Link>
    </div>
  );
};

export default FacilityCard;
