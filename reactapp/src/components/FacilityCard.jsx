import React from 'react';
import { Link } from 'react-router-dom';

const FacilityCard = ({ facility }) => {
  if (!facility) return null; // protect against undefined facility

  const name = facility.name || 'Unknown Turf';
  const type = facility.type || 'Unknown Type';
  const location = facility.location || 'Unknown Location';
  const imageUrl =
    facility.image || 'https://5.imimg.com/data5/SELLER/Default/2023/6/319644438/HZ/LO/QF/191318154/artificial-green-turf-grass-for-outdoor.jpeg';

  return (
    <div className="border rounded-lg shadow-lg p-4 m-2 w-80 hover:shadow-2xl transition">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-44 object-cover rounded-md"
      />
      <h2 className="text-xl font-bold mt-2">{name}</h2>
      <p className="text-gray-600">Type: {type}</p>
      <p className="text-gray-600">Location: {location}</p>
      <Link to={`/customer/booking/${facility.id}`}>
        <button className="mt-3 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Book Now
        </button>
      </Link>
    </div>
  );
};

export default FacilityCard;
